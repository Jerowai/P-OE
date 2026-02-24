'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Zap,
  ArrowRight,
  TrendingUp,
  FileText,
  Brain,
  Briefcase,
  CheckCircle,
  Star,
  ChevronRight,
} from 'lucide-react'
import { BorderBeam } from '@/components/ui/border-beam'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { useLanguage } from '@/lib/i18n/context'
import { AnimatedHero } from '@/components/ui/animated-hero'

/* ─── Fade-up animation helper ─────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function LandingPage() {
  const { t, lang } = useLanguage()

  const features = t.features.items.map((item, i) => ({
    ...item,
    icon: [Brain, FileText, Briefcase, TrendingUp][i],
  }))

  const stats = [
    { value: 10000, suffix: '+', label: t.stats[0].label },
    { value: 87, suffix: '%', label: t.stats[1].label },
    { value: 4200, suffix: '+', label: t.stats[2].label },
    { value: 7, suffix: 'x', label: t.stats[3].label },
  ]

  const pricingPlans = t.pricing.plans.map((p, i) => ({
    ...p,
    highlighted: i === 1,
    price: ['$29', '$49', '$39'][i],
    period: [
      lang === 'tr' ? '/ay' : '/mo',
      lang === 'tr' ? '/ay' : '/mo',
      lang === 'tr' ? ' tek sefer' : ' one-time',
    ][i],
  }))

  return (
    <div className="bg-background text-foreground min-h-screen">

      {/* ── NAV ─────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-[100] border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
              <Zap size={14} className="text-background" />
            </div>
            <span className="font-bold text-[15px] tracking-tight hidden sm:inline-block">PIOE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {[
              { href: '#features', label: t.nav.features },
              { href: '#pricing', label: t.nav.pricing },
              { href: '#about', label: t.nav.about },
            ].map(({ href, label }) => (
              <a key={href} href={href} className="text-foreground-muted text-sm hover:text-foreground transition-colors">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 mr-1">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <Link href="/login" className="btn-secondary !py-2 !px-4 !text-xs sm:!text-sm">{t.nav.signIn}</Link>
            <Link href="/signup" className="btn-primary  !py-2 !px-4 !text-xs sm:!text-sm">{t.nav.startTrial}</Link>
          </div>
        </div>
      </header>

      {/* Mobile controls */}
      <div className="sm:hidden fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
        <ThemeToggle />
        <div className="bg-surface border border-border p-1 rounded-xl shadow-md">
          <LanguageSwitcher />
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative pt-14">
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden"
        >
          <div className="mt-[-80px] h-[500px] w-[900px] rounded-full opacity-[0.06] blur-[120px]"
            style={{ background: 'var(--accent-brand)' }} />
        </div>

        <AnimatedHero />

        {/* Dashboard preview */}
        <motion.div
          {...fadeUp(0.4)}
          className="max-w-2xl mx-auto px-6 pb-24"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border bg-surface shadow-xl shadow-black/5">
            <BorderBeam duration={14} colorFrom="#4F46E5" colorTo="#818CF8" />
            <div className="p-6 sm:p-8">
              {/* Score row */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: 'Resume', value: '72', pct: 72 },
                  { label: 'LinkedIn', value: '61', pct: 61 },
                  { label: 'GitHub', value: '58', pct: 58 },
                ].map(s => (
                  <div key={s.label} className="bg-surface-raised rounded-xl p-4">
                    <div className="text-2xl font-bold mb-0.5" style={{ color: 'var(--accent-brand)' }}>
                      {s.value}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-2">
                      {s.label}
                    </div>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${s.pct}%`, background: 'var(--accent-brand)', opacity: 0.7 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Job match list */}
              <div className="space-y-2">
                {[
                  { company: 'Stripe', match: 87, level: 'high' },
                  { company: 'Vercel', match: 76, level: 'high' },
                  { company: 'Linear', match: 64, level: 'med' },
                ].map(j => (
                  <div key={j.company}
                    className="flex items-center justify-between p-3 bg-surface-raised rounded-lg border border-border">
                    <span className="text-sm font-medium">{j.company}</span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: j.level === 'high' ? 'var(--success)' : 'var(--warning)' }}
                    >
                      {j.match}% match
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS ───────────────────────────────────── */}
      <section className="py-16 border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...fadeUp(i * 0.08)} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-1 gradient-text">
                  <NumberTicker value={s.value} suffix={s.suffix} duration={1200} className="tabular-nums" />
                </div>
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────── */}
      <section id="features" className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="badge mb-5">{t.features.badge}</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t.features.title1}{' '}
              <span style={{ color: 'var(--accent-brand)' }}>{t.features.titleHighlight}</span>{' '}
              {t.features.title2}
            </h2>
            <p className="text-muted-foreground text-base max-w-md mx-auto">
              {t.features.sub}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <motion.div key={f.title} {...fadeUp(i * 0.08)}>
                <div className="card p-7 h-full group cursor-default">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 bg-surface-raised border border-border group-hover:border-border-strong transition-colors">
                    <f.icon size={20} className="text-foreground opacity-70" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────── */}
      <section id="pricing" className="py-24 md:py-32 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="badge mb-5">{t.pricing.badge}</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t.pricing.title1}{' '}
              <span style={{ color: 'var(--accent-brand)' }}>{t.pricing.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-base">{t.pricing.sub}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {pricingPlans.map((plan, i) => (
              <motion.div key={plan.name} {...fadeUp(i * 0.08)} className="relative h-full">
                {plan.highlighted && <BorderBeam duration={14} colorFrom="#4F46E5" colorTo="#818CF8" />}
                <div className={`card p-8 h-full flex flex-col ${plan.highlighted
                    ? 'border-[color:var(--accent-brand)] shadow-lg shadow-indigo-500/10'
                    : ''
                  }`}>
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider text-white"
                      style={{ background: 'var(--accent-brand)' }}>
                      {t.pricing.mostPopular}
                    </div>
                  )}
                  <div className="mb-7">
                    <div className="text-sm font-semibold mb-3"
                      style={{ color: plan.highlighted ? 'var(--accent-brand)' : 'var(--foreground-muted)' }}>
                      {plan.name}
                    </div>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground text-sm">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{plan.desc}</p>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent-brand)' }} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/signup"
                    className={plan.highlighted ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}
                  >
                    {plan.cta} <ChevronRight size={15} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────── */}
      <section className="py-24 md:py-32 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="badge mb-5">{t.testimonials.badge}</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t.testimonials.title1}{' '}
              <span style={{ color: 'var(--accent-brand)' }}>{t.testimonials.titleHighlight}</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.testimonials.items.map((item, i) => (
              <motion.div key={item.name} {...fadeUp(i * 0.08)}>
                <div className="card p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-0.5 mb-5">
                      {Array.from({ length: 5 }, (_, idx) => (
                        <Star key={idx} size={13} fill="var(--warning)" color="var(--warning)" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-foreground mb-7">
                      &ldquo;{item.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-5 border-t border-border">
                    <div className="w-9 h-9 rounded-full bg-surface-raised border border-border flex items-center justify-center font-semibold text-sm"
                      style={{ color: 'var(--accent-brand)' }}>
                      {item.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{item.name}</div>
                      <div className="text-[11px] text-muted-foreground font-medium">{item.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────── */}
      <section className="py-24 px-6 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp()} className="relative rounded-2xl overflow-hidden border border-border bg-surface text-center p-12 md:p-20">
            <BorderBeam duration={10} colorFrom="#4F46E5" colorTo="#818CF8" />
            {/* subtle glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(79,70,229,0.08) 0%, transparent 70%)',
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
                {t.cta.title1}{' '}
                <span style={{ color: 'var(--accent-brand)' }}>{t.cta.titleHighlight}</span>
              </h2>
              <p className="text-muted-foreground text-base mb-10 max-w-sm mx-auto leading-relaxed">
                {t.cta.sub}
              </p>
              <Link href="/signup" className="btn-primary !px-8 !py-3.5 text-base">
                {t.cta.button} <ArrowRight size={17} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────── */}
      <footer className="py-10 border-t border-border px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Zap size={12} className="text-background" />
            </div>
            <span className="font-bold text-sm tracking-tight">PIOE</span>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            {t.footer.copy}
          </p>
          <div className="flex items-center gap-5">
            <a href="#features" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
              {t.nav.features}
            </a>
            <a href="#pricing" className="text-muted-foreground text-sm hover:text-foreground transition-colors">
              {t.nav.pricing}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
