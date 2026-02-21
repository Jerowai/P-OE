'use client'

import { motion } from 'framer-motion'
import { Lock, X, ArrowRight, Brain } from 'lucide-react'
import Link from 'next/link'

const lockedFeatures = [
    'Resume AI Optimization Engine',
    'Smart Job Queue (87 matches paused)',
    'Hiring Model — 34% confidence frozen',
    'LinkedIn Profile Analyzer',
    'GitHub Credibility Score',
    'Interview probability predictions',
]

export default function LockedPage() {
    return (
        <div style={{
            minHeight: '100vh', background: 'var(--background)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px', position: 'relative', overflow: 'hidden',
        }}>
            {/* Dark overlay pattern */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 0,
                background: 'repeating-linear-gradient(45deg, rgba(255,68,68,0.02) 0px, rgba(255,68,68,0.02) 1px, transparent 1px, transparent 20px)',
                pointerEvents: 'none',
            }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ maxWidth: '520px', width: '100%', textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
                {/* Lock icon */}
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    style={{
                        width: 80, height: 80, borderRadius: '20px', margin: '0 auto 28px',
                        background: 'rgba(255,68,68,0.12)', border: '1px solid rgba(255,68,68,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 40px rgba(255,68,68,0.1)',
                    }}
                >
                    <Lock size={36} color="var(--danger)" />
                </motion.div>

                <h1 style={{
                    fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px',
                    marginBottom: '12px', color: 'var(--foreground)',
                    textTransform: 'uppercase', lineHeight: 1.2,
                }}>
                    YOUR INTERVIEW OPTIMIZATION<br />ENGINE IS PAUSED
                </h1>

                <p style={{ color: 'var(--muted)', fontSize: '16px', marginBottom: '32px', lineHeight: 1.6 }}>
                    Your 7-day trial has ended. Don&apos;t lose the model you&apos;ve built — it took effort to get here.
                </p>

                {/* Model data teaser */}
                <div style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)',
                    borderRadius: '14px', padding: '20px', marginBottom: '28px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <Brain size={18} color="var(--accent-green)" />
                        <span style={{ fontWeight: 700, fontSize: '15px' }}>Your Model Data</span>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        {[
                            { label: 'Model Confidence', value: '34%', color: 'var(--accent-green)' },
                            { label: 'Applications', value: '7', color: 'var(--accent-blue)' },
                            { label: 'High Matches', value: '3', color: 'var(--warning)' },
                        ].map((s) => (
                            <div key={s.label} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 900, color: s.color }}>{s.value}</div>
                                <div style={{ color: 'var(--muted)', fontSize: '12px' }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                    <p style={{ color: 'var(--accent-green)', fontWeight: 700, fontSize: '15px', marginTop: '16px' }}>
                        34% — Don&apos;t lose this
                    </p>
                </div>

                {/* Locked features */}
                <div className="glass-card" style={{ padding: '20px', marginBottom: '28px', textAlign: 'left' }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Locked Features
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {lockedFeatures.map((f) => (
                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--muted)' }}>
                                <X size={14} color="var(--danger)" style={{ flexShrink: 0 }} />
                                {f}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <Link href="/signup" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '17px', padding: '16px', marginBottom: '12px' }}>
                    Continue Optimization — $29/month <ArrowRight size={18} />
                </Link>
                <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
                    Instant access · Cancel anytime · Your data is safe
                </p>
            </motion.div>
        </div>
    )
}
