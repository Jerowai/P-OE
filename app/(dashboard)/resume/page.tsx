'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Zap, GitCompare, Plus, Star } from 'lucide-react'

const mockVersions = [
    { id: 1, version: 'v1.0', date: '2024-12-01', score: 55, active: false },
    { id: 2, version: 'v2.0', date: '2024-12-15', score: 68, active: false },
    { id: 3, version: 'v2.1', date: '2025-01-10', score: 72, active: true },
]

const mockMetrics = {
    skillDensity: 78,
    impact: 65,
    keywords: 81,
    leadership: 55,
}

export default function ResumePage() {
    const [selected, setSelected] = useState(3)
    const [optimizing, setOptimizing] = useState(false)
    const [optimized, setOptimized] = useState(false)

    async function handleOptimize() {
        setOptimizing(true)
        await new Promise(r => setTimeout(r, 2500))
        setOptimizing(false)
        setOptimized(true)
    }

    return (
        <div style={{ maxWidth: '1200px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>Resume Studio</h1>
                <p style={{ color: 'var(--muted)', fontSize: '15px' }}>Optimize, version and compare your resume</p>
            </div>

            {/* Score breakdown */}
            <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--muted)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Score Breakdown
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                    {Object.entries(mockMetrics).map(([key, value]) => {
                        const labels: Record<string, string> = {
                            skillDensity: 'Skill Density',
                            impact: 'Impact',
                            keywords: 'Keywords',
                            leadership: 'Leadership',
                        }
                        const colors: Record<string, string> = {
                            skillDensity: 'var(--accent-green)',
                            impact: 'var(--accent-blue)',
                            keywords: 'var(--accent-purple)',
                            leadership: 'var(--warning)',
                        }
                        return (
                            <div key={key}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{labels[key]}</span>
                                    <span style={{ fontSize: '13px', fontWeight: 700, color: colors[key] }}>{value}</span>
                                </div>
                                <div style={{ height: '6px', background: 'var(--card-border)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${value}%` }}
                                        transition={{ duration: 1 }}
                                        style={{ height: '100%', background: colors[key], borderRadius: '3px' }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>
                {/* Version list */}
                <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Versions
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {mockVersions.map((v) => (
                            <motion.div
                                key={v.id}
                                whileHover={{ x: 3 }}
                                onClick={() => setSelected(v.id)}
                                className="glass-card"
                                style={{
                                    padding: '16px', cursor: 'pointer',
                                    border: selected === v.id ? '1px solid rgba(0,255,136,0.4)' : '1px solid var(--card-border)',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontWeight: 700, fontSize: '15px' }}>{v.version}</div>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                        {v.active && <Star size={12} color="var(--accent-green)" fill="var(--accent-green)" />}
                                        <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-green)' }}>{v.score}</span>
                                    </div>
                                </div>
                                <div style={{ color: 'var(--muted)', fontSize: '12px', marginTop: '4px' }}>{v.date}</div>
                            </motion.div>
                        ))}

                        <button
                            className="btn-secondary"
                            style={{ width: '100%', justifyContent: 'center', marginTop: '8px', fontSize: '14px', padding: '10px' }}
                        >
                            <Plus size={14} /> New Version
                        </button>
                    </div>
                </div>

                {/* Preview + actions */}
                <div>
                    <div className="glass-card" style={{ padding: '32px', minHeight: '400px', marginBottom: '16px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                            <span style={{ background: 'rgba(0,255,136,0.1)', color: 'var(--accent-green)', fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '999px' }}>
                                Active Version
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <FileText size={24} color="var(--accent-green)" />
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '16px' }}>Resume v2.1</div>
                                <div style={{ color: 'var(--muted)', fontSize: '13px' }}>Last modified Jan 10, 2025</div>
                            </div>
                        </div>

                        {/* Simulated document */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ height: '20px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', width: '60%' }} />
                            <div style={{ height: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', width: '40%' }} />
                            <div style={{ height: '1px', background: 'var(--card-border)', margin: '8px 0' }} />
                            {[100, 90, 85, 95, 70, 80, 75].map((w, i) => (
                                <div key={i} style={{ height: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', width: `${w}%` }} />
                            ))}
                            <div style={{ height: '1px', background: 'var(--card-border)', margin: '8px 0' }} />
                            {[85, 95, 70, 80].map((w, i) => (
                                <div key={i} style={{ height: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', width: `${w}%` }} />
                            ))}
                        </div>

                        {optimized && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    position: 'absolute', bottom: '16px', left: '16px', right: '16px',
                                    background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)',
                                    borderRadius: '10px', padding: '12px', fontSize: '14px', color: 'var(--accent-green)',
                                }}
                            >
                                ✅ AI optimization complete! Score improved from 72 → 84. Review suggested changes.
                            </motion.div>
                        )}
                    </div>

                    {/* Toolbar */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={handleOptimize}
                            disabled={optimizing}
                            className="btn-primary"
                            style={{ flex: 1, justifyContent: 'center', opacity: optimizing ? 0.7 : 1 }}
                        >
                            {optimizing ? (
                                <><span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚡</span> Optimizing...</>
                            ) : (
                                <><Zap size={16} /> Optimize with AI</>
                            )}
                        </button>
                        <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                            <Plus size={16} /> Generate New Version
                        </button>
                        <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                            <GitCompare size={16} /> Compare Versions
                        </button>
                    </div>
                </div>
            </div>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}
