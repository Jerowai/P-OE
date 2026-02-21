'use client'

import { motion } from 'framer-motion'
import { TrendingUp, MapPin, Layers, AlertTriangle, Lightbulb } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const confidenceHistory = [
    { date: 'Week 1', confidence: 5 },
    { date: 'Week 2', confidence: 18 },
    { date: 'Week 3', confidence: 27 },
    { date: 'Week 4', confidence: 34 },
]

const improvements = [
    { text: 'Add TypeScript to your resume skills section — missing in 68% of matched jobs', priority: 'high' },
    { text: 'Your GitHub has low commit frequency. Try to commit daily for 30 days', priority: 'high' },
    { text: 'Apply to 3 more Senior Frontend roles to improve role cluster prediction', priority: 'medium' },
    { text: 'US-based remote roles show 2.1x better match rate for your profile', priority: 'medium' },
    { text: 'Enable LinkedIn "Open to Work" — increases recruiter visibility by ~40%', priority: 'low' },
]

export default function ModelPage() {
    const confidence = 34
    const circumference = 2 * Math.PI * 80
    const offset = circumference - (confidence / 100) * circumference

    return (
        <div style={{ maxWidth: '1100px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>Hiring Model</h1>
                <p style={{ color: 'var(--muted)', fontSize: '15px' }}>Your personalized interview probability engine</p>
            </div>

            {/* Main gauge + metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', marginBottom: '24px' }}>
                {/* Gauge */}
                <div className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ position: 'relative', width: 200, height: 200, marginBottom: '16px' }}>
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            <circle cx="100" cy="100" r="80" fill="none" stroke="var(--card-border)" strokeWidth="14" />
                            <motion.circle
                                cx="100" cy="100" r="80" fill="none"
                                stroke="url(#modelGrad)" strokeWidth="14"
                                strokeLinecap="round"
                                strokeDasharray={circumference}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset: offset }}
                                transition={{ duration: 1.8, ease: 'easeOut' }}
                                transform="rotate(-90 100 100)"
                            />
                            <defs>
                                <linearGradient id="modelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#00FF88" />
                                    <stop offset="100%" stopColor="#00BFFF" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="gradient-text"
                                style={{ fontSize: '48px', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1 }}
                            >
                                {confidence}%
                            </motion.div>
                            <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>confidence</div>
                        </div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '17px', marginBottom: '8px' }}>Overall Probability Score</div>
                    <div style={{ color: 'var(--muted)', fontSize: '13px' }}>Based on 7 applications</div>
                </div>

                {/* Metric cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                        { icon: <Layers size={20} />, label: 'Strongest Role Cluster', value: 'Frontend Engineering', color: 'var(--accent-green)', sub: 'React · TypeScript · Next.js' },
                        { icon: <MapPin size={20} />, label: 'Best Geography', value: 'Global / US Remote', color: 'var(--accent-blue)', sub: '87% of high-match jobs are remote-first' },
                        { icon: <AlertTriangle size={20} />, label: 'Weak Segment', value: 'Backend / Systems', color: 'var(--danger)', sub: 'Only 28% match rate — focus on frontend roles' },
                    ].map((m) => (
                        <motion.div
                            key={m.label}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass-card"
                            style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                        >
                            <div style={{
                                width: 44, height: 44, borderRadius: '10px', flexShrink: 0,
                                background: `rgba(${m.color === 'var(--accent-green)' ? '0,255,136' : m.color === 'var(--accent-blue)' ? '0,191,255' : '255,68,68'},0.1)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: m.color,
                            }}>
                                {m.icon}
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{m.label}</div>
                                <div style={{ fontWeight: 700, fontSize: '17px', color: m.color, marginBottom: '4px' }}>{m.value}</div>
                                <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{m.sub}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Confidence timeline */}
            <div className="glass-card" style={{ padding: '28px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <TrendingUp size={18} color="var(--accent-green)" />
                    <h3 style={{ fontWeight: 700, fontSize: '16px' }}>Model Confidence Over Time</h3>
                </div>
                <div style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={confidenceHistory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" />
                            <XAxis dataKey="date" tick={{ fill: 'var(--muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis domain={[0, 100]} tick={{ fill: 'var(--muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px' }}
                                labelStyle={{ color: 'var(--foreground)' }}
                                itemStyle={{ color: 'var(--accent-green)' }}
                            />
                            <Line
                                type="monotone" dataKey="confidence"
                                stroke="var(--accent-green)" strokeWidth={3}
                                dot={{ fill: 'var(--accent-green)', r: 5 }}
                                activeDot={{ r: 7 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Improvement suggestions */}
            <div className="glass-card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    <Lightbulb size={18} color="var(--warning)" />
                    <h3 style={{ fontWeight: 700, fontSize: '16px' }}>How to Improve</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {improvements.map((item, i) => {
                        const priority = item.priority === 'high' ? { bg: 'rgba(255,68,68,0.08)', border: 'rgba(255,68,68,0.2)', color: 'var(--danger)', label: 'HIGH' }
                            : item.priority === 'medium' ? { bg: 'rgba(255,184,0,0.08)', border: 'rgba(255,184,0,0.2)', color: 'var(--warning)', label: 'MED' }
                                : { bg: 'rgba(255,255,255,0.04)', border: 'var(--card-border)', color: 'var(--muted)', label: 'LOW' }

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                style={{
                                    display: 'flex', gap: '14px', alignItems: 'flex-start',
                                    background: priority.bg, border: `1px solid ${priority.border}`,
                                    borderRadius: '10px', padding: '14px 16px',
                                }}
                            >
                                <span style={{ fontSize: '11px', fontWeight: 800, color: priority.color, flexShrink: 0, marginTop: '2px' }}>
                                    {priority.label}
                                </span>
                                <p style={{ fontSize: '14px', lineHeight: 1.5 }}>{item.text}</p>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
