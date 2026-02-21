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
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">Resume Studio</h1>
                <p className="text-[var(--muted)] text-sm sm:text-base">Optimize, version and compare your resume</p>
            </div>

            {/* Score breakdown */}
            <div className="glass-card p-6 md:p-8">
                <div className="text-[10px] font-black text-[var(--muted)] uppercase tracking-[0.2em] mb-8">
                    Score Breakdown
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
                            <div key={key} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold opacity-70">{labels[key]}</span>
                                    <span className="text-lg font-black" style={{ color: colors[key] }}>{value}</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${value}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className="h-full rounded-full"
                                        style={{ background: colors[key], boxShadow: `0 0 10px ${colors[key]}44` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Version list */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="text-[10px] font-black text-[var(--muted)] uppercase tracking-[0.2em]">
                        Versions
                    </div>
                    <div className="space-y-3">
                        {mockVersions.map((v) => (
                            <motion.div
                                key={v.id}
                                whileHover={{ x: 3 }}
                                onClick={() => setSelected(v.id)}
                                className={`glass-card p-5 cursor-pointer transition-all ${selected === v.id ? 'border-[var(--accent-green)]/40 bg-[var(--accent-green)]/5' : 'hover:bg-white/[0.02]'
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="font-bold text-base">{v.version}</div>
                                    <div className="flex gap-3 items-center">
                                        {v.active && <Star size={14} className="text-[var(--accent-green)] fill-[var(--accent-green)]" />}
                                        <span className="text-xl font-black text-[var(--accent-green)]">{v.score}</span>
                                    </div>
                                </div>
                                <div className="text-[var(--muted)] text-xs mt-1">{v.date}</div>
                            </motion.div>
                        ))}

                        <button className="btn-secondary w-full justify-center !py-4">
                            <Plus size={16} className="mr-2" /> New Version
                        </button>
                    </div>
                </div>

                {/* Preview + actions */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="glass-card p-6 sm:p-10 min-h-[500px] relative flex flex-col">
                        <div className="absolute top-6 right-6">
                            <span className="bg-[var(--accent-green)]/10 text-[var(--accent-green)] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider border border-[var(--accent-green)]/20">
                                Active Version
                            </span>
                        </div>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 rounded-2xl bg-[var(--accent-green)]/10 flex items-center justify-center">
                                <FileText size={24} className="text-[var(--accent-green)]" />
                            </div>
                            <div>
                                <div className="font-black text-xl">Resume v2.1</div>
                                <div className="text-[var(--muted)] text-sm font-medium">Last modified Jan 10, 2025</div>
                            </div>
                        </div>

                        {/* Simulated document */}
                        <div className="space-y-4 opacity-40">
                            <div className="h-6 bg-white/10 rounded-md w-[60%]" />
                            <div className="h-4 bg-white/5 rounded-md w-[40%]" />
                            <div className="h-px bg-white/10 my-4" />
                            {[100, 90, 85, 95, 70, 80, 75].map((w, i) => (
                                <div key={i} className="h-3 bg-white/5 rounded-sm" style={{ width: `${w}%` }} />
                            ))}
                            <div className="h-px bg-white/10 my-4" />
                            {[85, 95, 70, 80, 60].map((w, i) => (
                                <div key={i} className="h-3 bg-white/5 rounded-sm" style={{ width: `${w}%` }} />
                            ))}
                        </div>

                        {optimized && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-auto bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/30 rounded-2xl p-6 text-sm text-[var(--accent-green)] flex gap-4 items-center"
                            >
                                <Zap size={20} className="shrink-0" />
                                <p className="font-bold leading-relaxed">
                                    AI optimization complete! Score improved from 72 → 84. Review suggested changes.
                                </p>
                            </motion.div>
                        )}
                    </div>

                    {/* Toolbar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        <button
                            onClick={handleOptimize}
                            disabled={optimizing}
                            className={`btn-primary !py-4 flex justify-center items-center ${optimizing ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {optimizing ? (
                                <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin mr-3" /> Optimizing...</>
                            ) : (
                                <><Zap size={18} className="mr-2" /> Optimize with AI</>
                            )}
                        </button>
                        <button className="btn-secondary !py-4 flex justify-center items-center">
                            <Plus size={18} className="mr-2" /> New Version
                        </button>
                        <button className="btn-secondary !py-4 flex justify-center items-center sm:col-span-2 xl:col-span-1">
                            <GitCompare size={18} className="mr-2" /> Compare Versions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
