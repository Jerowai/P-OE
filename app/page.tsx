'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Zap, ArrowRight, TrendingUp, FileText, Brain, Briefcase, CheckCircle, Star } from 'lucide-react'
import { AnimatedBg } from '@/components/ui/animated-bg'
import { BorderBeam } from '@/components/ui/border-beam'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ShimmerText, GradientText } from '@/components/ui/shimmer-text'
import { GlowCard } from '@/components/ui/glow-card'

const features = [
  {
    icon: Brain,
    title: 'AI Hiring Model',
    desc: 'Learns from every job application and adapts its predictions to find you the highest-probability opportunities.',
    color: 'var(--accent-green)',
  },
  {
    icon: FileText,
    title: 'Resume Studio',
    desc: 'AI-powered resume optimization with real-time scoring on skill density, impact statements, and keyword coverage.',
    color: 'var(--accent-blue)',
  },
  {
    icon: Briefcase,
    title: 'Smart Job Queue',
    desc: 'Curated job listings ranked by your hiring probability. Stop guessing, start applying with confidence.',
    color: 'var(--accent-purple)',
  },
  {
    icon: TrendingUp,
    title: 'LinkedIn + GitHub Score',
    desc: 'Analyse your professional digital presence and compare against market benchmarks for your target role.',
    color: 'var(--warning)',
  },
]

const stats = [
  { value: 10000, suffix: '+', label: 'Active Users', speed: 1200 },
  { value: 87, suffix: '%', label: 'Avg. Match Rate', speed: 1000 },
  { value: 4200, suffix: '+', label: 'Jobs Matched', speed: 1400 },
  { value: 7, suffix: 'x', label: 'Faster Hiring', speed: 800 },
]

const plans = [
  {
    name: 'Monthly',
    price: '$29',
    period: '/mo',
    desc: 'Perfect for active job seekers',
    features: ['AI Hiring Model', 'Resume Studio', 'Smart Job Queue', 'LinkedIn Analysis', '7-Day Free Trial'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Career',
    price: '$49',
    period: '/mo',
    desc: 'For serious career growth',
    features: ['Everything in Monthly', 'GitHub Analysis', 'Priority Support', 'Custom Job Alerts', '7-Day Free Trial'],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Job Hunt',
    price: '$39',
    period: ' one-time',
    desc: 'Single intensive 30-day sprint',
    features: ['30-day full access', 'All features included', 'No subscription', 'Priority Support'],
    cta: 'Buy Now',
    highlighted: false,
  },
]

const testimonials = [
  { name: 'Sarah K.', role: 'Frontend Engineer', text: 'Got 3 interviews in my first week. The job matching is eerily accurate.', rating: 5 },
  { name: 'Marc D.', role: 'Staff Engineer', text: 'The resume optimizer took my score from 58 to 84. Huge difference.', rating: 5 },
  { name: 'Aisha T.', role: 'Product Manager', text: 'Finally a tool that tells me WHY I\'m not getting interviews. Changed everything.', rating: 5 },
]

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)', minHeight: '100vh' }}>
      {/* NAV */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        background: 'rgba(8,8,14,0.85)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={20} color="#000" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>PIOE</span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {['Features', 'Pricing', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ color: 'var(--muted)', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >{item}</a>
            ))}
          </nav>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link href="/login" className="btn-secondary" style={{ padding: '8px 20px', fontSize: '14px' }}>Sign In</Link>
            <Link href="/signup" className="btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>Start Free Trial</Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: '64px' }}>
        <AnimatedBg />

        {/* Radial glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', paddingTop: '60px', paddingBottom: '80px' }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}
            >
              <span className="badge">
                <span className="pulse-dot" />
                7-Day Free Trial — No Credit Card Required
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontSize: 'clamp(44px, 7vw, 84px)', fontWeight: 900, letterSpacing: '-3px', lineHeight: 1.05, marginBottom: '24px' }}
            >
              Land Your{' '}
              <ShimmerText speed={3}>
                Dream Job
              </ShimmerText>
              <br />
              <span style={{ color: 'var(--muted)', fontWeight: 300, fontSize: '0.85em', letterSpacing: '-1px' }}>with AI precision.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: '20px', color: 'var(--muted)', lineHeight: 1.6, marginBottom: '48px', maxWidth: '560px', margin: '0 auto 48px' }}
            >
              PIOE builds a personal hiring model that learns from your profile and predicts which jobs you&apos;ll actually get an interview for.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}
            >
              <Link href="/signup" className="btn-primary" style={{ padding: '16px 36px', fontSize: '17px' }}>
                Start Free Trial <ArrowRight size={18} />
              </Link>
              <Link href="/login" className="btn-secondary" style={{ padding: '16px 36px', fontSize: '17px' }}>
                Sign In
              </Link>
            </motion.div>

            {/* Dashboard preview card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="float"
              style={{ position: 'relative', display: 'inline-block', maxWidth: '700px', width: '100%' }}
            >
              <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden' }}>
                <BorderBeam duration={10} colorFrom="#00FF88" colorTo="#00BFFF" />
                <div className="glass-card" style={{ padding: '28px', background: 'rgba(14,14,24,0.95)' }}>
                  {/* Mini dashboard preview */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                    {[
                      { label: 'Resume Score', value: '72', color: 'var(--accent-green)' },
                      { label: 'LinkedIn', value: '61', color: 'var(--accent-blue)' },
                      { label: 'GitHub', value: '58', color: 'var(--accent-purple)' },
                    ].map(s => (
                      <div key={s.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '32px', fontWeight: 900, color: s.color, letterSpacing: '-1px' }}>{s.value}</div>
                        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {[
                      { company: 'Stripe', match: 87, dot: '🟢' },
                      { company: 'Vercel', match: 76, dot: '🟢' },
                      { company: 'Linear', match: 64, dot: '🟡' },
                    ].map(j => (
                      <div key={j.company} style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{j.dot} {j.company}</span>
                        <span style={{ fontSize: '13px', color: j.match >= 70 ? 'var(--accent-green)' : 'var(--warning)', fontWeight: 700 }}>{j.match}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '80px 24px', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div style={{ fontSize: '52px', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1 }}>
                  <NumberTicker
                    value={s.value}
                    suffix={s.suffix}
                    duration={s.speed}
                    className="gradient-text"
                  />
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '15px', marginTop: '8px', fontWeight: 500 }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge" style={{ marginBottom: '20px' }}>Features</span>
              <h2 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-2px', marginBottom: '16px' }}>
                Your <GradientText>unfair advantage</GradientText><br />in the job market
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
                Every tool you need to go from applicant to offer — powered by AI.
              </p>
            </motion.div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlowCard
                  glowColor={f.color.replace('var(--accent-green)', '0,255,136').replace('var(--accent-blue)', '0,191,255').replace('var(--accent-purple)', '139,92,246').replace('var(--warning)', '255,184,0')}
                  style={{ padding: '36px' }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: '12px', background: `${f.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', border: `1px solid ${f.color}22` }}>
                    <f.icon size={24} color={f.color} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px' }}>{f.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: 1.6 }}>{f.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: '120px 24px', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="badge" style={{ marginBottom: '20px' }}>Simple Pricing</span>
            <h2 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-2px', marginBottom: '16px' }}>
              Start free. <GradientText>Upgrade anytime.</GradientText>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '18px' }}>All plans include a 7-day free trial.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'start' }}>
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ position: 'relative', borderRadius: '20px' }}
              >
                {plan.highlighted && <BorderBeam duration={12} />}
                <div className="glass-card" style={{
                  padding: '36px',
                  border: plan.highlighted ? '1px solid rgba(0,255,136,0.3)' : '1px solid var(--card-border)',
                }}>
                  {plan.highlighted && (
                    <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))', color: '#000', fontSize: '12px', fontWeight: 700, padding: '4px 16px', borderRadius: '0 0 10px 10px' }}>
                      MOST POPULAR
                    </div>
                  )}
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px', color: plan.highlighted ? 'var(--accent-green)' : 'var(--foreground)' }}>{plan.name}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                      <span style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-2px' }}>{plan.price}</span>
                      <span style={{ color: 'var(--muted)', fontSize: '15px' }}>{plan.period}</span>
                    </div>
                    <div style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '4px' }}>{plan.desc}</div>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                    {plan.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                        <CheckCircle size={16} color="var(--accent-green)" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup" className={plan.highlighted ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
                    {plan.cta} <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="badge" style={{ marginBottom: '20px' }}>Testimonials</span>
            <h2 style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-2px' }}>
              Trusted by <GradientText>job seekers</GradientText>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlowCard style={{ padding: '28px', height: '100%' }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                    {Array.from({ length: t.rating }, (_, i) => (
                      <Star key={i} size={16} color="var(--warning)" fill="var(--warning)" />
                    ))}
                  </div>
                  <p style={{ fontSize: '15px', lineHeight: 1.6, color: 'var(--foreground)', marginBottom: '20px' }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px' }}>{t.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{t.role}</div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden' }}
          >
            <BorderBeam duration={8} colorFrom="#00FF88" colorTo="#8B5CF6" />
            <div style={{
              background: 'linear-gradient(135deg, rgba(0,255,136,0.07), rgba(0,191,255,0.04))',
              border: '1px solid rgba(0,255,136,0.2)',
              borderRadius: '24px',
              padding: '64px',
              textAlign: 'center',
            }}>
              <h2 style={{ fontSize: '40px', fontWeight: 900, letterSpacing: '-2px', marginBottom: '16px' }}>
                Ready to land your <GradientText>dream job?</GradientText>
              </h2>
              <p style={{ color: 'var(--muted)', fontSize: '17px', marginBottom: '36px' }}>
                Join 10,000+ engineers who use PIOE to navigate the job market with confidence.
              </p>
              <Link href="/signup" className="btn-primary" style={{ padding: '16px 40px', fontSize: '17px' }}>
                Start Free Trial <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--card-border)', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ width: 28, height: 28, borderRadius: '8px', background: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={16} color="#000" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '16px' }}>PIOE</span>
        </div>
        <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
          © 2026 PIOE · AI-powered hiring intelligence
        </p>
      </footer>
    </div>
  )
}
