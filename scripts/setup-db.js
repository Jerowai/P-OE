const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const SUPABASE_URL = 'https://ymizgnbxmgibojxchkbi.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltaXpnbmJ4bWdpYm9qeGNoa2JpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY3MDI1OCwiZXhwIjoyMDg3MjQ2MjU4fQ.cP7YfvnYA2d49cmQ9GoRy_SiqDc_dkl9vVx-hpX2QuI'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false }
})

const SQL = `
-- KULLANICILAR
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  subscription_status TEXT DEFAULT 'trial',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  trial_start TIMESTAMPTZ DEFAULT NOW(),
  trial_end TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ÖZGEÇMİŞLER
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  version_number INTEGER DEFAULT 1,
  raw_content TEXT,
  optimized_content TEXT,
  optimization_score INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ÖZGEÇMİŞ METRİKLERİ
CREATE TABLE IF NOT EXISTS resume_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID REFERENCES resumes(id) ON DELETE CASCADE,
  skill_density_score INTEGER DEFAULT 0,
  impact_score INTEGER DEFAULT 0,
  keyword_score INTEGER DEFAULT 0,
  leadership_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LİNKEDİN PROFİLLERİ
CREATE TABLE IF NOT EXISTS linkedin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  linkedin_url TEXT,
  headline TEXT,
  summary TEXT,
  experience_json JSONB,
  skills_json JSONB,
  connections_count INTEGER,
  follower_count INTEGER,
  recruiter_visibility_score INTEGER DEFAULT 0,
  persuasion_score INTEGER DEFAULT 0,
  last_scraped_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GITHUB VERİSİ
CREATE TABLE IF NOT EXISTS github_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  username TEXT,
  commit_frequency_score INTEGER DEFAULT 0,
  language_distribution_score INTEGER DEFAULT 0,
  repo_activity_score INTEGER DEFAULT 0,
  credibility_score INTEGER DEFAULT 0,
  raw_data JSONB,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- İŞ İLANLARI
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT DEFAULT 'linkedin',
  title TEXT NOT NULL,
  company TEXT,
  country TEXT,
  remote_type TEXT,
  description TEXT,
  extracted_keywords JSONB,
  seniority_level TEXT,
  job_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BAŞVURULAR
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id),
  resume_version_used UUID REFERENCES resumes(id),
  match_score INTEGER DEFAULT 0,
  probability_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'applied',
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

-- KİŞİSEL İŞE ALIM MODELİ
CREATE TABLE IF NOT EXISTS hiring_model (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  strongest_role_cluster TEXT,
  weak_segment TEXT,
  strongest_geography TEXT,
  probability_score INTEGER DEFAULT 0,
  model_confidence INTEGER DEFAULT 0,
  application_count INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);
`

async function setup() {
    console.log('🚀 Supabase bağlantısı test ediliyor...')

    // Bağlantı testi
    const { error: pingError } = await supabase.from('users').select('count').limit(1)

    if (pingError && pingError.code === '42P01') {
        console.log('✅ Bağlantı başarılı! Tablolar henüz yok, oluşturulacak...')
    } else if (!pingError) {
        console.log('✅ Bağlantı başarılı! users tablosu zaten mevcut.')
        await checkAllTables()
        return
    }

    // Management API ile SQL çalıştır
    console.log('📦 Tablolar oluşturuluyor...')

    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/run_sql`, {
        method: 'POST',
        headers: {
            'apikey': SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: SQL }),
    })

    if (!response.ok) {
        console.log('⚠️  RPC yöntemi çalışmadı, manuel kurulum gerekiyor.')
        console.log('')
        console.log('📋 Lütfen şu adımı yapın:')
        console.log('1. https://supabase.com/dashboard adresine gidin')
        console.log('2. Projenizi seçin (ymizgnbxmgibojxchkbi)')
        console.log('3. Sol menüden "SQL Editor" tıklayın')
        console.log('4. supabase/migrations/001_initial_schema.sql dosyasının içeriğini yapıştırın')
        console.log('5. "Run" butonuna tıklayın')
    } else {
        console.log('✅ Tablolar başarıyla oluşturuldu!')
        await checkAllTables()
    }
}

async function checkAllTables() {
    const tables = ['users', 'resumes', 'resume_metrics', 'linkedin_profiles', 'github_data', 'jobs', 'applications', 'hiring_model']

    console.log('\n📊 Tablo durumu:')
    for (const table of tables) {
        const { error } = await supabase.from(table).select('count').limit(1)
        if (error && error.code === '42P01') {
            console.log(`  ❌ ${table} — YOK`)
        } else {
            console.log(`  ✅ ${table} — HAZIR`)
        }
    }
}

setup().catch(console.error)
