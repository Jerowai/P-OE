'use client'

import { motion } from 'framer-motion'
import { TrendingUp, FileText, Linkedin, Github, ArrowRight, Briefcase, AlertCircle, Zap } from 'lucide-react'
import Link from 'next/link'
import { GlowCard } from '@/components/ui/glow-card'
import { NumberTicker } from '@/components/ui/number-ticker'
import { BorderBeam } from '@/components/ui/border-beam'

const mockData = {
    modelConfidence: 34,
    resumeScore: 72,
    linkedinScore: 61,
    githubScore: 58,
    applicationCount: 7,
    jobs: [
        { id: 1, company: 'Stripe', title: 'Senior Frontend Engineer', remote: 'Fully Remote', match: 87, probability: 74, location: '🇺🇸 USA' },
        { id: 2, company: 'Linear', title: 'Staff Engineer', remote: 'Fully Remote', match: 81, probability: 68, location: '🌍 Global' },
        { id: 3, company: 'Vercel', title: 'React Engineer', remote: 'Fully Remote', match: 76, probability: 61, location: '🌍 Global' },
        { id: 4, company: 'Shopify', title: 'Full Stack Developer', remote: 'Hybrid', match: 64, probability: 48, location: '🇨🇦 Canada' },
        { id: 5, company: 'Figma', title: 'Frontend Engineer', remote: 'Hybrid', match: 58, probability: 42, location: '🇺🇸 USA' },
        { id: 6, company: 'Meta', title: 'Software Engineer', remote: 'Onsite', match: 39, probability: 28, location: '🇺🇸 USA' },
    ],
}

function ScoreCard({ label, score, color, icon, href }: { label: string; score: number; color: string; icon: React.ReactNode; href: string }) {
    return (
        <Link href={href} style={{ textDecoration: 'none' }}>
            <GlowCard
                glowColor={color === 'var(--accent-green)' ? '0,255,136' : color === 'var(--accent-blue)' ? '0,191,255' : '139,92,246'}
                style={{ padding: '24px', cursor: 'pointer' }}
            >
                <motion.div whileHover={{ y: -3 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ color: 'var(--muted)', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
                        <div style={{ color, opacity: 0.8 }}>{icon}</div>
                    </div>
                    <div style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-2px', color, marginBottom: '12px', lineHeight: 1 }}>
                        <NumberTicker value={score} suffix="" duration={1200} />
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            transition={{ duration: 1.2, delay: 0.3 }}
                            style={{ height: '100%', background: color, borderRadius: '2px', opacity: 0.8 }}
                        />
                    </div>
                    <div style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '8px' }}>{score}/100</div>
                </motion.div>
            </GlowCard>
        </Link>
    )
}

function JobCard({ job }: { job: typeof mockData.jobs[0] }) {
    const isHigh = job.match >= 70
    const isMedium = job.match >= 40 && job.match < 70
    const color = isHigh ? 'var(--accent-green)' : isMedium ? 'var(--warning)' : 'var(--danger)'
    const dot = isHigh ? '🟢' : isMedium ? '🟡' : '🔴'

    return (
        <GlowCard
            glowColor={isHigh ? '0,255,136' : isMedium ? '255,184,0' : '255,68,68'}
            style={{ padding: '20px' }}
        >
            <motion.div whileHover={{ y: -2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '15px' }}>{job.title}</div>
                        <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '2px' }}>{dot} {job.company} · {job.location}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '26px', fontWeight: 900, color, letterSpacing: '-1px', lineHeight: 1 }}>{job.match}%</div>
                        <div style={{ color: 'var(--muted)', fontSize: '11px' }}>match</div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: '999px', background: 'rgba(255,255,255,0.04)', fontSize: '12px', color: 'var(--muted)', border: '1px solid var(--card-border)' }}>
                        {job.remote}
                    </div>
                    <div style={{ fontSize: '13px' }}>
                        <span style={{ color: 'var(--muted)' }}>Interview: </span>
                        <span style={{ color, fontWeight: 700 }}>{job.probability}%</span>
                    </div>
                </div>
            </motion.div>
        </GlowCard>
    )
}

export default function DashboardPage() {
    const highJobs = mockData.jobs.filter(j => j.match >= 70)
    const medJobs = mockData.jobs.filter(j => j.match >= 40 && j.match < 70)
    const lowJobs = mockData.jobs.filter(j => j.match < 40)

    const circumference = 2 * Math.PI * 54
    const offset = circumference - (mockData.modelConfidence / 100) * circumference

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">Dashboard</h1>
                    <p className="text-[var(--muted)] text-sm sm:text-base">
                        Your hiring engine is active · <span className="text-[var(--accent-green)] font-bold">{mockData.applicationCount}</span> applications tracked
                    </p>
                </div>
                <Link href="/jobs" className="btn-primary !py-3 !px-6 text-sm w-full sm:w-auto">
                    <Briefcase size={16} /> Find Jobs <ArrowRight size={14} />
                </Link>
            </motion.div>

            {/* Top row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Model Confidence */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-4 h-full"
                >
                    <GlowCard className="p-8 flex flex-col items-center text-center h-full">
                        <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-6">
                            <svg className="w-full h-full" viewBox="0 0 140 140">
                                <circle cx="70" cy="70" r="54" fill="none" stroke="var(--card-border)" strokeWidth="8" />
                                <motion.circle
                                    cx="70" cy="70" r="54" fill="none"
                                    stroke="url(#grad)" strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset: offset }}
                                    transition={{ duration: 1.8, ease: 'easeOut' }}
                                    transform="rotate(-90 70 70)"
                                />
                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#00FF88" />
                                        <stop offset="100%" stopColor="#00BFFF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-3xl font-black gradient-text leading-none"
                                >
                                    {mockData.modelConfidence}%
                                </motion.div>
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Model Confidence</h3>
                        <p className="text-[var(--muted)] text-sm mb-6 leading-relaxed">
                            Apply to more jobs to increase accuracy
                        </p>
                        <div className="bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 rounded-full px-4 py-1.5 text-xs font-bold text-[var(--accent-green)] inline-flex items-center gap-2">
                            <TrendingUp size={14} />
                            {mockData.applicationCount} apps tracked
                        </div>
                    </GlowCard>
                </motion.div>

                {/* Score cards */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <ScoreCard label="Resume Score" score={mockData.resumeScore} color="var(--accent-green)" icon={<FileText size={20} />} href="/resume" />
                    <ScoreCard label="LinkedIn" score={mockData.linkedinScore} color="var(--accent-blue)" icon={<Linkedin size={20} />} href="/model" />
                    <ScoreCard label="GitHub" score={mockData.githubScore} color="var(--accent-purple)" icon={<Github size={20} />} href="/model" />
                </div>
            </div>

            {/* Upgrade banner (if low confidence) */}
            {mockData.modelConfidence < 40 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-[var(--warning)]/10 border border-[var(--warning)]/20 rounded-2xl flex gap-4 items-start"
                >
                    <AlertCircle size={20} className="text-[var(--warning)] shrink-0 mt-1" />
                    <div>
                        <div className="font-bold text-sm text-[var(--warning)]">Your model needs more data</div>
                        <div className="text-[var(--muted)] text-sm mt-1 leading-relaxed">
                            Apply to at least 10 jobs to unlock meaningful insights. Each application trains your hiring model.
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Pro tip banner */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative rounded-2xl overflow-hidden group"
            >
                <BorderBeam duration={15} colorFrom="#00FF88" colorTo="#8B5CF6" />
                <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-xl bg-[var(--accent-green)]/10 flex items-center justify-center shrink-0">
                            <Zap size={20} className="text-[var(--accent-green)]" />
                        </div>
                        <p className="text-sm leading-relaxed">
                            <span className="font-bold">Pro tip:</span> Connect your professional accounts to unlock the full potential of your AI model.
                        </p>
                    </div>
                    <Link href="/model" className="text-[var(--accent-green)] text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
                        Upgrade Model <ArrowRight size={14} />
                    </Link>
                </div>
            </motion.div>

            {/* Smart Job Queue */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-3">
                        <Briefcase size={22} className="text-[var(--accent-green)]" /> Smart Job Queue
                    </h2>
                    <Link href="/jobs" className="text-[var(--accent-green)] text-sm font-bold flex items-center gap-2">
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                {/* High match */}
                {highJobs.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[var(--accent-green)] font-black text-xs uppercase tracking-widest">
                            <span className="pulse-dot" />
                            High Probability ({highJobs.length})
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {highJobs.map((job) => <JobCard key={job.id} job={job} />)}
                        </div>
                    </div>
                )}

                {/* Medium match */}
                {medJobs.length > 0 && (
                    <div className="space-y-4 pt-4">
                        <div className="text-[var(--warning)] font-black text-xs uppercase tracking-widest flex items-center gap-2">
                            🟡 Medium Probability ({medJobs.length})
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {medJobs.map((job) => <JobCard key={job.id} job={job} />)}
                        </div>
                    </div>
                )}

                {/* Low match */}
                {lowJobs.length > 0 && (
                    <div className="space-y-4 pt-4">
                        <div className="text-[var(--danger)] font-black text-xs uppercase tracking-widest flex items-center gap-2">
                            🔴 Low Probability ({lowJobs.length})
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {lowJobs.map((job) => <JobCard key={job.id} job={job} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
