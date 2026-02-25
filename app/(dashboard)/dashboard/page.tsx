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
        <Link href={href} className="block group">
            <div className="card p-6 h-full transition-all hover:translate-y-[-4px]">
                <div className="flex justify-between items-start mb-6">
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{label}</div>
                    <div className="opacity-70 group-hover:opacity-100 transition-opacity" style={{ color }}>{icon}</div>
                </div>
                <div className="text-5xl font-black tracking-tighter mb-4" style={{ color }}>
                    <NumberTicker value={score} suffix="" duration={1200} />
                </div>
                <div className="h-1.5 bg-surface-raised rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="h-full rounded-full"
                        style={{ background: color, opacity: 0.8 }}
                    />
                </div>
                <div className="text-xs text-muted-foreground mt-3 font-medium">{score}/100 confidence</div>
            </div>
        </Link>
    )
}

function JobCard({ job }: { job: typeof mockData.jobs[0] }) {
    const isHigh = job.match >= 70
    const isMedium = job.match >= 40 && job.match < 70
    const color = isHigh ? 'var(--success)' : isMedium ? 'var(--warning)' : 'var(--danger)'

    return (
        <div className="card p-6 group hover:translate-y-[-2px]">
            <div className="flex justify-between items-start mb-5">
                <div>
                    <div className="font-bold text-base mb-1">{job.title}</div>
                    <div className="text-muted-foreground text-sm flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                        {job.company} · {job.location}
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black tracking-tighter leading-none" style={{ color }}>{job.match}%</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">match</div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-auto">
                <div className="badge !px-3 !py-1 text-[10px]">
                    {job.remote}
                </div>
                <div className="text-sm font-medium">
                    <span className="text-muted-foreground">Interview: </span>
                    <span className="font-bold" style={{ color }}>{job.probability}%</span>
                </div>
            </div>
        </div>
    )
}

export default function DashboardPage() {
    const highJobs = mockData.jobs.filter(j => j.match >= 70)
    const medJobs = mockData.jobs.filter(j => j.match >= 40 && j.match < 70)
    const lowJobs = mockData.jobs.filter(j => j.match < 40)

    const circumference = 2 * Math.PI * 54
    const offset = circumference - (mockData.modelConfidence / 100) * circumference

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">Dashboard</h1>
                    <p className="text-muted-foreground text-sm sm:text-base font-medium">
                        Your hiring engine is active · <span className="text-success font-bold">{mockData.applicationCount}</span> applications tracked
                    </p>
                </div>
                <Link href="/jobs" className="btn-primary !py-3 !px-6 text-sm w-full sm:w-auto">
                    <Briefcase size={16} /> Find Jobs <ArrowRight size={14} className="ml-1" />
                </Link>
            </motion.div>

            {/* Top row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Model Confidence */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-4 h-full"
                >
                    <div className="card p-8 flex flex-col items-center text-center h-full relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="relative w-32 h-32 sm:w-36 sm:h-36 mb-6">
                                <svg className="w-full h-full" viewBox="0 0 140 140">
                                    <circle cx="70" cy="70" r="54" fill="none" stroke="var(--border)" strokeWidth="8" />
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
                                            <stop offset="0%" stopColor="var(--success)" />
                                            <stop offset="100%" stopColor="var(--accent-brand)" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-4xl font-black gradient-text leading-none tracking-tighter"
                                    >
                                        {mockData.modelConfidence}%
                                    </motion.div>
                                </div>
                            </div>
                            <h3 className="font-bold text-xl mb-2">Model Confidence</h3>
                            <p className="text-muted-foreground text-sm mb-6 leading-relaxed max-w-[200px] mx-auto">
                                Apply to more jobs to increase accuracy
                            </p>
                            <div className="bg-success/10 border border-success/20 rounded-full px-4 py-2 text-[10px] font-black text-success uppercase tracking-widest inline-flex items-center gap-2">
                                <TrendingUp size={14} />
                                {mockData.applicationCount} apps tracked
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Score cards */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <ScoreCard label="Resume Score" score={mockData.resumeScore} color="var(--success)" icon={<FileText size={20} />} href="/resume" />
                    <ScoreCard label="LinkedIn" score={mockData.linkedinScore} color="var(--accent-blue)" icon={<Linkedin size={20} />} href="/model" />
                    <ScoreCard label="GitHub" score={mockData.githubScore} color="var(--accent-purple)" icon={<Github size={20} />} href="/model" />
                </div>
            </div>

            {/* Upgrade banner (if low confidence) */}
            {mockData.modelConfidence < 40 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-warning/5 border border-warning/20 rounded-2xl flex gap-4 items-start"
                >
                    <AlertCircle size={20} className="text-warning shrink-0 mt-0.5" />
                    <div>
                        <div className="font-bold text-sm text-warning tracking-tight">Your model needs more data</div>
                        <div className="text-muted-foreground text-sm mt-1 leading-relaxed opacity-80">
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
                <BorderBeam duration={15} colorFrom="var(--success)" colorTo="var(--accent-brand)" />
                <div className="bg-surface-raised/50 border border-border p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 backdrop-blur-sm">
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-xl bg-accent-brand/10 flex items-center justify-center shrink-0 border border-accent-brand/20">
                            <Zap size={22} className="text-accent-brand" />
                        </div>
                        <p className="text-sm leading-relaxed max-w-lg">
                            <span className="font-bold">Pro tip:</span> Connect your professional accounts to unlock the full potential of your AI model.
                        </p>
                    </div>
                    <Link href="/model" className="text-accent-brand text-sm font-bold flex items-center gap-2 hover:translate-x-1 transition-transform bg-accent-brand/5 px-5 py-2.5 rounded-xl border border-accent-brand/10">
                        Upgrade Model <ArrowRight size={14} />
                    </Link>
                </div>
            </motion.div>

            {/* Smart Job Queue */}
            <div className="space-y-8 pt-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <Briefcase size={24} className="text-success" /> Smart Job Queue
                    </h2>
                    <Link href="/jobs" className="text-muted-foreground hover:text-foreground text-sm font-bold flex items-center gap-2 transition-colors">
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                {/* High match */}
                {highJobs.length > 0 && (
                    <div className="space-y-5">
                        <div className="flex items-center gap-3 text-success font-black text-[10px] uppercase tracking-[0.2em]">
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
                    <div className="space-y-5">
                        <div className="text-warning font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                            Medium Probability ({medJobs.length})
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {medJobs.map((job) => <JobCard key={job.id} job={job} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
