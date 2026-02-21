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
      <header className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 backdrop-blur-xl bg-[rgba(8,8,14,0.85)]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-green)] to-[var(--accent-blue)] flex items-center justify-center">
              <Zap size={18} color="#000" />
            </div>
            <span className="font-extrabold text-xl tracking-tight hidden sm:inline-block">PIOE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[var(--muted)] text-sm font-medium hover:text-[var(--foreground)] transition-colors">
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-secondary !py-2 !px-4 !text-xs sm:!text-sm">Sign In</Link>
            <Link href="/signup" className="btn-primary !py-2 !px-4 !text-xs sm:!text-sm">Start Trial</Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20 pb-12 lg:pt-32 lg:pb-32 px-6">
        <AnimatedBg />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-8"
            >
              <span className="badge text-[10px] sm:text-xs">
                <span className="pulse-dot" />
                7-Day Free Trial — No Credit Card Required
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[36px] sm:text-[54px] lg:text-[84px] font-black tracking-tighter leading-[1.1] mb-6"
            >
              Land Your{' '}
              <ShimmerText speed={3}>
                Dream Job
              </ShimmerText>
              <br className="hidden sm:block" />
              <span className="text-[var(--muted)] font-light opacity-80"> with AI precision.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-[var(--muted)] leading-relaxed mb-10 max-w-xl mx-auto px-4"
            >
              PIOE builds a personal hiring model that learns from your profile and predicts which jobs you&apos;ll actually get an interview for.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-6"
            >
              <Link href="/signup" className="btn-primary !py-4 !px-8 text-lg w-full sm:w-auto">
                Start Free Trial <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link href="/login" className="btn-secondary !py-4 !px-8 text-lg w-full sm:w-auto">
                Sign In
              </Link>
            </motion.div>

            {/* Dashboard preview card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="float relative inline-block w-full max-w-3xl"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <BorderBeam duration={10} colorFrom="#00FF88" colorTo="#00BFFF" />
                <div className="glass-card p-4 sm:p-8 bg-[rgba(14,14,24,0.95)]">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { label: 'Resume Score', value: '72', color: 'var(--accent-green)' },
                      { label: 'LinkedIn', value: '61', color: 'var(--accent-blue)' },
                      { label: 'GitHub', value: '58', color: 'var(--accent-purple)' },
                    ].map(s => (
                      <div key={s.label} className="bg-white/[0.04] rounded-xl p-4 text-center">
                        <div className="text-3xl font-black tracking-tight" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-[10px] sm:text-xs text-[var(--muted)] mt-1 uppercase tracking-wider font-bold">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[
                      { company: 'Stripe', match: 87, dot: '🟢' },
                      { company: 'Vercel', match: 76, dot: '🟢' },
                      { company: 'Linear', match: 64, dot: '🟡' },
                    ].map(j => (
                      <div key={j.company} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-lg border border-white/5">
                        <span className="text-sm font-semibold">{j.dot} {j.company}</span>
                        <span className="text-sm font-bold" style={{ color: j.match >= 70 ? 'var(--accent-green)' : 'var(--warning)' }}>{j.match}% match</span>
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
      <section className="py-16 md:py-24 px-6 border-y border-[var(--card-border)] bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl lg:text-6xl font-black leading-none mb-2">
                  <NumberTicker
                    value={s.value}
                    suffix={s.suffix}
                    duration={s.speed}
                    className="gradient-text tracking-tighter"
                  />
                </div>
                <div className="text-[var(--muted)] text-xs md:text-sm font-bold uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge mb-4">Features</span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
                Your <GradientText>unfair advantage</GradientText><br />in the job market
              </h2>
              <p className="text-[var(--muted)] text-base md:text-lg max-w-lg mx-auto">
                Every tool you need to go from applicant to offer — powered by AI.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="p-8 h-full"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/10" style={{ background: `${f.color}14` }}>
                    <f.icon size={24} style={{ color: f.color }} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3">{f.title}</h3>
                  <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed">{f.desc}</p>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 md:py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge mb-4">Pricing</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
              Start free. <GradientText>Upgrade anytime.</GradientText>
            </h2>
            <p className="text-[var(--muted)] text-base md:text-lg">All plans include a 7-day free trial.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                {plan.highlighted && <BorderBeam duration={12} />}
                <div className={`glass-card p-8 sm:p-10 h-full flex flex-col ${plan.highlighted ? 'border-[var(--accent-green)]/30' : ''}`}>
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-blue)] text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="mb-8">
                    <div className={`font-bold text-sm mb-2 ${plan.highlighted ? 'text-[var(--accent-green)]' : 'text-[var(--muted)]'}`}>{plan.name}</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black tracking-tight">{plan.price}</span>
                      <span className="text-[var(--muted)] text-sm">{plan.period}</span>
                    </div>
                    <p className="text-[var(--muted)] text-sm mt-2">{plan.desc}</p>
                  </div>
                  <ul className="space-y-4 mb-10 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <CheckCircle size={16} className="text-[var(--accent-green)] flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup" className={`w-full justify-center ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}>
                    {plan.cta} <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="badge mb-4">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Trusted by <GradientText>job seekers</GradientText>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <GlowCard className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: t.rating }, (_, i) => (
                        <Star key={i} size={14} className="text-[var(--warning)] fill-[var(--warning)]" />
                      ))}
                    </div>
                    <p className="text-sm md:text-base italic leading-relaxed text-[var(--foreground)] mb-8">
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-[var(--accent-green)]">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{t.name}</div>
                      <div className="text-[var(--muted)] text-[10px] uppercase font-bold tracking-widest">{t.role}</div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-2xl"
          >
            <BorderBeam duration={8} colorFrom="#00FF88" colorTo="#8B5CF6" />
            <div className="bg-gradient-to-br from-[rgba(0,255,136,0.1)] to-[rgba(139,92,246,0.05)] border border-white/10 p-8 md:p-20 text-center">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
                Ready to land your <br className="sm:hidden" /> <GradientText>dream job?</GradientText>
              </h2>
              <p className="text-[var(--muted)] text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                Join 10,000+ engineers who use PIOE to navigate the job market with confidence.
              </p>
              <Link href="/signup" className="btn-primary !px-10 !py-5 text-xl w-full sm:w-auto">
                Start Free Trial <ArrowRight size={20} className="ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-[var(--card-border)] px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-green)] to-[var(--accent-blue)] flex items-center justify-center">
            <Zap size={18} color="#000" />
          </div>
          <span className="font-black text-lg tracking-tight">PIOE</span>
        </div>
        <p className="text-[var(--muted)] text-sm font-medium">
          © 2026 PIOE · AI-powered hiring intelligence
        </p>
      </footer>

    </div>
  )
}
