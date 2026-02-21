-- ============================================
-- PIOE Database Schema
-- Supabase SQL Editor'da çalıştırın
-- ============================================

-- KULLANICILAR (auth.users ile senkron)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
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
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  version_number INTEGER DEFAULT 1,
  raw_content TEXT,
  optimized_content TEXT,
  optimization_score INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ÖZGEÇMİŞ METRİKLERİ
CREATE TABLE IF NOT EXISTS public.resume_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE,
  skill_density_score INTEGER DEFAULT 0,
  impact_score INTEGER DEFAULT 0,
  keyword_score INTEGER DEFAULT 0,
  leadership_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- LİNKEDİN PROFİLLERİ
CREATE TABLE IF NOT EXISTS public.linkedin_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
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
CREATE TABLE IF NOT EXISTS public.github_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  username TEXT,
  commit_frequency_score INTEGER DEFAULT 0,
  language_distribution_score INTEGER DEFAULT 0,
  repo_activity_score INTEGER DEFAULT 0,
  credibility_score INTEGER DEFAULT 0,
  raw_data JSONB,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- İŞ İLANLARI
CREATE TABLE IF NOT EXISTS public.jobs (
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
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.jobs(id),
  resume_version_used UUID REFERENCES public.resumes(id),
  match_score INTEGER DEFAULT 0,
  probability_score INTEGER DEFAULT 0,
  status TEXT DEFAULT 'applied',
  applied_at TIMESTAMPTZ DEFAULT NOW()
);

-- KİŞİSEL İŞE ALIM MODELİ
CREATE TABLE IF NOT EXISTS public.hiring_model (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  strongest_role_cluster TEXT,
  weak_segment TEXT,
  strongest_geography TEXT,
  probability_score INTEGER DEFAULT 0,
  model_confidence INTEGER DEFAULT 0,
  application_count INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.linkedin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.github_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hiring_model ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own data" ON public.users;
CREATE POLICY "Users can manage own data" ON public.users
  FOR ALL USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can manage own resumes" ON public.resumes;
CREATE POLICY "Users can manage own resumes" ON public.resumes
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can see own metrics" ON public.resume_metrics;
CREATE POLICY "Users can see own metrics" ON public.resume_metrics
  FOR ALL USING (
    auth.uid() = (SELECT user_id FROM public.resumes WHERE id = resume_id)
  );

DROP POLICY IF EXISTS "Users can manage own linkedin" ON public.linkedin_profiles;
CREATE POLICY "Users can manage own linkedin" ON public.linkedin_profiles
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own github" ON public.github_data;
CREATE POLICY "Users can manage own github" ON public.github_data
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own applications" ON public.applications;
CREATE POLICY "Users can manage own applications" ON public.applications
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own model" ON public.hiring_model;
CREATE POLICY "Users can manage own model" ON public.hiring_model
  FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Jobs are publicly readable" ON public.jobs;
CREATE POLICY "Jobs are publicly readable" ON public.jobs
  FOR SELECT USING (true);

-- ============================================
-- AUTH TRIGGER: Signup sırasında users tablosunu doldur
-- ============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
