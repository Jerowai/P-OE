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
        <div style={{ maxWidth: '1200px' }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
            >
                <div>
                    <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>Dashboard</h1>
                    <p style={{ color: 'var(--muted)', fontSize: '15px' }}>
                        Your hiring engine is active · <span style={{ color: 'var(--accent-green)' }}>{mockData.applicationCount}</span> applications tracked
                    </p>
                </div>
                <Link href="/jobs" className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
                    <Briefcase size={15} /> Find Jobs <ArrowRight size={14} />
                </Link>
            </motion.div>

            {/* Top row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '20px' }}>
                {/* Model Confidence */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ position: 'relative', borderRadius: '16px' }}
                >
                    <GlowCard style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                        <div style={{ position: 'relative', width: 140, height: 140, marginBottom: '16px' }}>
                            <svg width="140" height="140" viewBox="0 0 140 140">
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
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    style={{ fontSize: '34px', fontWeight: 900, lineHeight: 1 }}
                                    className="gradient-text"
                                >
                                    {mockData.modelConfidence}%
                                </motion.div>
                            </div>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>Model Confidence</div>
                        <div style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5, marginBottom: '16px' }}>
                            Apply to more jobs to increase accuracy
                        </div>
                        <div style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.12)', borderRadius: '8px', padding: '8px 14px', fontSize: '12px', color: 'var(--accent-green)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <TrendingUp size={12} />
                            {mockData.applicationCount} applications tracked
                        </div>
                    </GlowCard>
                </motion.div>

                {/* Score cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
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
                    style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', marginBottom: '20px' }}
                >
                    <div style={{
                        background: 'rgba(255,184,0,0.05)', border: '1px solid rgba(255,184,0,0.15)',
                        borderRadius: '14px', padding: '16px 20px',
                        display: 'flex', gap: '12px', alignItems: 'flex-start',
                    }}>
                        <AlertCircle size={20} color="var(--warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--warning)' }}>Your model needs more data</div>
                            <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>
                                Apply to at least 10 jobs to unlock meaningful insights. Each application trains your hiring model.
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Pro tip banner */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', marginBottom: '28px' }}
            >
                <BorderBeam duration={15} colorFrom="#00FF88" colorTo="#8B5CF6" />
                <div style={{
                    background: 'linear-gradient(135deg, rgba(0,255,136,0.05), rgba(139,92,246,0.03))',
                    border: '1px solid rgba(0,255,136,0.12)',
                    borderRadius: '14px', padding: '14px 20px',
                    display: 'flex', gap: '12px', alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <Zap size={18} color="var(--accent-green)" />
                        <span style={{ fontSize: '14px', color: 'var(--foreground)' }}>
                            <strong>Pro tip:</strong> Connect your LinkedIn and GitHub to unlock your full hiring model potential.
                        </span>
                    </div>
                    <Link href="/model" style={{ color: 'var(--accent-green)', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Go to Model <ArrowRight size={13} />
                    </Link>
                </div>
            </motion.div>

            {/* Smart Job Queue */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Briefcase size={20} /> Smart Job Queue
                    </h2>
                    <Link href="/jobs" style={{ color: 'var(--accent-green)', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                {/* High match */}
                {highJobs.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-green)', marginBottom: '12px', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span className="pulse-dot" />
                            High Probability ({highJobs.length})
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                            {highJobs.map((job) => <JobCard key={job.id} job={job} />)}
                        </div>
                    </div>
                )}

                {/* Medium match */}
                {medJobs.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--warning)', marginBottom: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            🟡 Medium Probability ({medJobs.length})
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                            {medJobs.map((job) => <JobCard key={job.id} job={job} />)}
                        </div>
                    </div>
                )}

                {/* Low match */}
                {lowJobs.length > 0 && (
                    <div>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--danger)', marginBottom: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                            🔴 Low Probability ({lowJobs.length})
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                            {lowJobs.map((job) => <JobCard key={job.id} job={job} />)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
