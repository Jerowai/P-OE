'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingUp, FileText, Brain, Briefcase, CheckCircle, Star, RocketIcon, ArrowRightIcon, Zap } from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'
import { NumberTicker } from '@/components/ui/number-ticker'
import { GradientText } from '@/components/ui/shimmer-text'
import { GlowCard } from '@/components/ui/glow-card'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header-1'
import { LogoCloud } from '@/components/ui/logo-cloud'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const logos = [
  { src: "https://storage.efferd.com/logo/github-wordmark.svg", alt: "GitHub" },
  { src: "https://storage.efferd.com/logo/openai-wordmark.svg", alt: "OpenAI" },
  { src: "https://storage.efferd.com/logo/vercel-wordmark.svg", alt: "Vercel" },
  { src: "https://storage.efferd.com/logo/supabase-wordmark.svg", alt: "Supabase" },
  { src: "https://storage.efferd.com/logo/nvidia-wordmark.svg", alt: "Nvidia" },
  { src: "https://storage.efferd.com/logo/clerk-wordmark.svg", alt: "Clerk" },
  { src: "https://storage.efferd.com/logo/claude-wordmark.svg", alt: "Claude AI" },
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
  const { t } = useI18n()

  const features = [
    { icon: Brain, title: t.features.aiModelTitle, desc: t.features.aiModelDesc, color: 'var(--accent-green)' },
    { icon: FileText, title: t.features.resumeTitle, desc: t.features.resumeDesc, color: 'var(--accent-blue)' },
    { icon: Briefcase, title: t.features.jobQueueTitle, desc: t.features.jobQueueDesc, color: 'var(--accent-purple)' },
    { icon: TrendingUp, title: t.features.digitalPresenceTitle, desc: t.features.digitalPresenceDesc, color: 'var(--warning)' },
  ]

  const stats = [
    { value: 10000, suffix: '+', label: t.stats.activeUsers, speed: 1200 },
    { value: 87, suffix: '%', label: t.stats.avgMatch, speed: 1000 },
    { value: 4200, suffix: '+', label: t.stats.jobsMatched, speed: 1400 },
    { value: 7, suffix: 'x', label: t.stats.fasterHiring, speed: 800 },
  ]

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
      {/* HEADER */}
      <Header nav={t.nav} />

      <main>
        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative mx-auto w-full max-w-5xl overflow-hidden">

          {/* Radial gradient top glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,255,136,0.12), transparent)',
            }}
          />

          {/* Vertical border lines (desktop) */}
          <div aria-hidden="true" className="absolute inset-0 hidden lg:block pointer-events-none">
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--card-border)] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[var(--card-border)] to-transparent" />
          </div>

          {/* Inner border lines */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-[var(--card-border)] to-[var(--card-border)] md:left-8" />
            <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-[var(--card-border)] to-[var(--card-border)] md:right-8" />
            <div className="absolute inset-y-0 left-8 w-px bg-gradient-to-b from-transparent via-[var(--card-border)]/50 to-[var(--card-border)]/50 md:left-12" />
            <div className="absolute inset-y-0 right-8 w-px bg-gradient-to-b from-transparent via-[var(--card-border)]/50 to-[var(--card-border)]/50 md:right-12" />
          </div>

          <div className="relative flex flex-col items-center justify-center gap-6 pt-28 pb-20 px-6 text-center">
            {/* Animated badge */}
            <motion.a
              href="#features"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={cn(
                "group mx-auto flex w-fit items-center gap-3 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2 shadow-sm",
                "hover:border-[var(--accent-green)]/40 transition-all duration-300"
              )}
            >
              <RocketIcon className="size-3 text-[var(--accent-green)]" />
              <span className="text-xs text-[var(--muted)]">
                <span className="pulse-dot mr-2" />
                {t.hero.badge}
              </span>
              <span className="block h-4 border-l border-[var(--card-border)]" />
              <ArrowRightIcon className="size-3 text-[var(--muted)] duration-200 ease-out group-hover:translate-x-1" />
            </motion.a>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-3xl text-[40px] sm:text-5xl lg:text-7xl font-black tracking-tighter leading-[1.05] text-balance"
              style={{ textShadow: '0 0 60px rgba(0,255,136,0.15)' }}
            >
              {t.hero.title1}{' '}
              <span className="gradient-text">{t.hero.title2}</span>
              <br className="hidden sm:block" />
              <span className="text-[var(--muted)] font-light"> {t.hero.title3}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-base sm:text-lg text-[var(--muted)] leading-relaxed tracking-wide"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-row flex-wrap items-center justify-center gap-3 pt-2"
            >
              <Button variant="secondary" size="lg" className="rounded-full" asChild>
                <Link href="/login">
                  {t.nav.signIn}
                </Link>
              </Button>
              <Button size="lg" className="rounded-full" asChild>
                <Link href="/signup">
                  {t.hero.ctaPrimary}
                  <ArrowRightIcon className="size-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            {/* Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full max-w-3xl mt-8"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.15)] dark:shadow-[0_0_60px_rgba(0,0,0,0.4)] float">
                <BorderBeam duration={10} colorFrom="var(--accent-green)" colorTo="var(--accent-blue)" />
                <div className="border border-[var(--card-border)] rounded-2xl bg-[var(--card-bg)] p-5 sm:p-8">
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: t.dashboard.resumeScore, value: '72', color: 'var(--accent-green)' },
                      { label: t.dashboard.linkedin, value: '61', color: 'var(--accent-blue)' },
                      { label: t.dashboard.github, value: '58', color: 'var(--accent-purple)' },
                    ].map(s => (
                      <div key={s.label} className="bg-[var(--background)] rounded-xl p-4 text-center border border-[var(--card-border)]">
                        <div className="text-2xl sm:text-3xl font-black tracking-tight mb-1" style={{ color: s.color }}>{s.value}</div>
                        <div className="text-[9px] sm:text-[10px] text-[var(--muted)] uppercase tracking-wider font-bold">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[
                      { company: 'Stripe', match: 87 },
                      { company: 'Vercel', match: 76 },
                      { company: 'Linear', match: 64 },
                    ].map(j => (
                      <div key={j.company} className="flex items-center justify-between p-3 bg-[var(--background)] rounded-lg border border-[var(--card-border)] hover:border-[var(--accent-green)]/30 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: j.match >= 70 ? 'var(--accent-green)' : 'var(--warning)' }} />
                          <span className="text-sm font-semibold">{j.company}</span>
                        </div>
                        <span className="text-xs font-bold px-2 py-1 rounded-full" style={{
                          color: j.match >= 70 ? 'var(--accent-green)' : 'var(--warning)',
                          background: j.match >= 70 ? 'rgba(0,255,136,0.08)' : 'rgba(255,184,0,0.08)',
                        }}>
                          {j.match}% {t.dashboard.match}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── LOGO CLOUD ───────────────────────────────────────── */}
        <section className="border-t border-[var(--card-border)] py-8 bg-[var(--foreground)]/[0.01]">
          <p className="text-center text-sm font-medium text-[var(--muted)] tracking-widest uppercase mb-6">
            Trusted by professionals at
          </p>
          <div className="mx-auto max-w-4xl">
            <LogoCloud logos={logos} />
          </div>
        </section>

        {/* ─── STATS ────────────────────────────────────────────── */}
        <section className="py-20 md:py-28 px-6 border-y border-[var(--card-border)]">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="text-4xl md:text-6xl font-black leading-none mb-3">
                    <NumberTicker value={s.value} suffix={s.suffix} duration={s.speed} className="gradient-text tracking-tighter" />
                  </div>
                  <div className="text-[var(--muted)] text-xs font-bold uppercase tracking-[0.2em]">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURES ─────────────────────────────────────────── */}
        <section id="features" className="py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="badge mb-5">{t.features.badge}</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5 leading-tight">
                  Your <GradientText>unfair advantage</GradientText>
                  <br />in the job market
                </h2>
                <p className="text-[var(--muted)] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                  {t.features.subtitle}
                </p>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    className="glass-card p-7 h-full border border-[var(--card-border)] hover:border-[var(--accent-green)]/20 transition-colors"
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 border border-[var(--card-border)]" style={{ background: `${f.color}14` }}>
                      <f.icon size={22} style={{ color: f.color }} />
                    </div>
                    <h3 className="text-base md:text-lg font-bold mb-3">{f.title}</h3>
                    <p className="text-[var(--muted)] text-sm leading-relaxed">{f.desc}</p>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── PRICING ──────────────────────────────────────────── */}
        <section id="pricing" className="py-24 md:py-32 px-6 bg-[var(--foreground)]/[0.01] border-y border-[var(--card-border)]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="badge mb-5">Pricing</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                  Start free. <GradientText>Upgrade anytime.</GradientText>
                </h2>
                <p className="text-[var(--muted)]">All plans include a 7-day free trial. No credit card required.</p>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {plan.highlighted && <BorderBeam duration={12} />}
                  <div className={cn(
                    'glass-card p-7 h-full flex flex-col border',
                    plan.highlighted
                      ? 'border-[var(--accent-green)]/30'
                      : 'border-[var(--card-border)]'
                  )}>
                    {plan.highlighted && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-blue)] text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        Most Popular
                      </div>
                    )}
                    <div className="mb-7">
                      <div className={cn('font-bold text-xs mb-3 uppercase tracking-wider', plan.highlighted ? 'text-[var(--accent-green)]' : 'text-[var(--muted)]')}>
                        {plan.name}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black tracking-tight">{plan.price}</span>
                        <span className="text-[var(--muted)] text-sm">{plan.period}</span>
                      </div>
                      <p className="text-[var(--muted)] text-sm mt-2">{plan.desc}</p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-sm">
                          <CheckCircle size={14} className="flex-shrink-0" style={{ color: 'var(--accent-green)' }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.highlighted ? 'default' : 'outline'}
                      className="w-full rounded-full"
                      asChild
                    >
                      <Link href="/signup">
                        {plan.cta}
                        <ArrowRight size={14} className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <span className="badge mb-5">Testimonials</span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                  Trusted by <GradientText>job seekers</GradientText>
                </h2>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlowCard className="glass-card p-7 h-full flex flex-col justify-between border border-[var(--card-border)] hover:border-[var(--accent-green)]/20 transition-colors">
                    <div>
                      <div className="flex gap-1 mb-5">
                        {Array.from({ length: t.rating }, (_, i) => (
                          <Star key={i} size={13} className="fill-[var(--warning)] text-[var(--warning)]" />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-[var(--foreground)]/80 mb-7 italic">&ldquo;{t.text}&rdquo;</p>
                    </div>
                    <div className="flex items-center gap-3 pt-5 border-t border-[var(--card-border)]">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent-green)]/20 to-[var(--accent-blue)]/20 border border-[var(--card-border)] flex items-center justify-center font-bold text-[var(--accent-green)] text-sm">
                        {t.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-sm">{t.name}</div>
                        <div className="text-[var(--muted)] text-[10px] uppercase font-semibold tracking-wider">{t.role}</div>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ───────────────────────────────────────── */}
        <section className="py-20 px-6 border-t border-[var(--card-border)]">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden"
            >
              <BorderBeam duration={8} colorFrom="var(--accent-green)" colorTo="var(--accent-purple)" />
              <div className="border border-[var(--card-border)] rounded-3xl bg-gradient-to-br from-[var(--accent-green)]/8 via-[var(--card-bg)] to-[var(--accent-purple)]/5 p-10 md:p-16 text-center">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-5 leading-tight">
                  Ready to land your <GradientText>dream job?</GradientText>
                </h2>
                <p className="text-[var(--muted)] text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed">
                  Join 10,000+ professionals using PIOE to navigate the job market with confidence.
                </p>
                <Button size="lg" className="rounded-full px-10 shadow-2xl shadow-[var(--accent-green)]/20" asChild>
                  <Link href="/signup">
                    {t.hero.ctaPrimary}
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="py-10 border-t border-[var(--card-border)] px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent-green)] to-[var(--accent-blue)] flex items-center justify-center">
              <Zap size={14} className="text-black" />
            </div>
            <span className="font-black tracking-tight">PIOE</span>
          </div>
          <p className="text-[var(--muted)] text-sm">© 2026 PIOE · AI-powered hiring intelligence</p>
          <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
            <a href="#" className="hover:text-[var(--foreground)] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[var(--foreground)] transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
