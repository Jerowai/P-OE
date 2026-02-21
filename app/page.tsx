'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  FileText,
  Brain,
  Briefcase,
  CheckCircle,
  Star,
  Zap,
  ArrowRight
} from 'lucide-react'
import { NumberTicker } from '@/components/ui/number-ticker'
import { Button } from '@/components/ui/button'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/ui/header-1'
import { ProfessionalHero, LogosSection } from '@/components/ui/professional-hero'
import { GlowCard } from '@/components/ui/glow-card'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export default function LandingPage() {
  const { t } = useI18n()

  const features = [
    { icon: Brain, title: t.features.aiModelTitle, desc: t.features.aiModelDesc },
    { icon: FileText, title: t.features.resumeTitle, desc: t.features.resumeDesc },
    { icon: Briefcase, title: t.features.jobQueueTitle, desc: t.features.jobQueueDesc },
    { icon: TrendingUp, title: t.features.digitalPresenceTitle, desc: t.features.digitalPresenceDesc },
  ]

  const stats = [
    { value: 10000, suffix: '+', label: t.stats.activeUsers },
    { value: 87, suffix: '%', label: t.stats.avgMatch },
    { value: 4200, suffix: '+', label: t.stats.jobsMatched },
    { value: 7, suffix: 'x', label: t.stats.fasterHiring },
  ]

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* SIDEBAR - 요청하신 대로 왼쪽 메뉴 추가 */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col md:ml-20 sidebar-transition">
        <Header nav={t.nav} />

        <main className="flex-1">
          {/* HERO SECTION */}
          <ProfessionalHero />

          {/* LOGO CLOUD */}
          <LogosSection />

          {/* STATS SECTION */}
          <section className="py-24 border-y border-[var(--card-border)] bg-[var(--background)]">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="text-4xl md:text-5xl font-black tracking-tighter mb-2">
                      <NumberTicker value={s.value} suffix={s.suffix} duration={1000} className="variant-tabular-nums" />
                    </div>
                    <div className="text-[var(--muted)] text-[10px] font-bold uppercase tracking-[0.2em]">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURES SECTION */}
          <section id="features" className="py-32 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6 flex flex-col justify-center pr-12">
                  <div className="badge">{t.features.badge}</div>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1]">
                    Professional <br />
                    <span className="text-[var(--muted)] font-normal italic">Resource Management</span>
                  </h2>
                  <p className="text-[var(--muted)] text-lg leading-relaxed max-w-md">
                    {t.features.subtitle}
                  </p>
                  <div className="pt-4">
                    <Button variant="default" className="rounded-full shadow-lg h-12 px-8">
                      Explore Intelligence <CheckCircle size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {features.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <GlowCard className="glass-card p-6 flex items-start gap-4 hover:border-[var(--muted)] transition-all">
                        <div className="w-12 h-12 rounded-xl bg-[var(--secondary)] flex items-center justify-center shrink-0 border border-[var(--card-border)]">
                          <f.icon size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-base mb-1">{f.title}</h3>
                          <p className="text-sm text-[var(--muted)] leading-relaxed">{f.desc}</p>
                        </div>
                      </GlowCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA BANNER */}
          <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-3xl overflow-hidden border border-[var(--card-border)] bg-[var(--sidebar-bg)] p-12 md:p-20 text-center">
                <div
                  className="absolute inset-x-0 -top-24 h-64 -z-1 opacity-20"
                  style={{ background: 'radial-gradient(circle 400px at 50% 0%, var(--muted), transparent)' }}
                />
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                  Ready to elevate <br /> your professional trajectory?
                </h2>
                <p className="text-[var(--muted)] text-lg mb-10 max-w-sm mx-auto font-medium">
                  Join 10,000+ experts leveraging our neural career optimization platform.
                </p>
                <Button size="lg" className="rounded-full px-12 h-14 text-lg">
                  Launch Career Engine
                </Button>
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="py-12 border-t border-[var(--card-border)] px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                <Zap size={16} className="text-[var(--background)]" />
              </div>
              <span className="font-black text-xl tracking-tighter">PIOE</span>
            </div>
            <p className="text-[var(--muted)] text-sm font-medium">© 2026 PIOE · Neural Professional Assessment</p>
            <div className="flex items-center gap-6 text-sm font-bold text-[var(--muted)]">
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
