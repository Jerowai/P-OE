'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Zap, GitCompare, Plus, Star, ArrowRight } from 'lucide-react'

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

    const metrics = Object.entries(mockMetrics).map(([key, value]) => {
        const labels: Record<string, string> = {
            skillDensity: 'Skill Density',
            impact: 'Impact',
            keywords: 'Keywords',
            leadership: 'Leadership',
        }
        const colors: Record<string, string> = {
            skillDensity: 'var(--success)',
            impact: 'var(--accent-blue)',
            keywords: 'var(--accent-purple)',
            leadership: 'var(--warning)',
        }
        return { key, label: labels[key], value, color: colors[key] }
    })

    return (
        <div className="max-w-7xl mx-auto space-y-10 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">Resume Studio</h1>
                    <p className="text-muted-foreground text-sm sm:text-base font-medium">Optimize, version and compare your resume</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-secondary !py-2.5 !px-5 text-sm flex items-center gap-2">
                        <GitCompare size={16} /> Compare
                    </button>
                    <button className="btn-primary !py-2.5 !px-5 text-sm flex items-center gap-2">
                        <Plus size={16} /> New Version
                    </button>
                </div>
            </div>

            {/* Score breakdown */}
            <div className="card p-8 md:p-10 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-10 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-success" />
                        Live Score Breakdown
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {metrics.map((m) => (
                            <div key={m.key} className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-muted-foreground">{m.label}</span>
                                    <span className="text-2xl font-black tabular-nums" style={{ color: m.color }}>{m.value}</span>
                                </div>
                                <div className="h-2 bg-surface-raised rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${m.value}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className="h-full rounded-full"
                                        style={{ background: m.color, opacity: 0.8 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Version list */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1">
                        Recent Versions
                    </div>
                    <div className="space-y-3">
                        {mockVersions.map((v) => (
                            <motion.div
                                key={v.id}
                                whileHover={{ x: 4 }}
                                onClick={() => setSelected(v.id)}
                                className={`card p-5 cursor-pointer transition-all border-l-4 ${selected === v.id
                                    ? 'border-l-success bg-success/5 shadow-lg shadow-success/5'
                                    : 'border-l-transparent hover:bg-surface-raised'
                                    }`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-base flex items-center gap-2">
                                            {v.version}
                                            {v.active && <span className="text-[9px] font-black bg-success/10 text-success px-1.5 py-0.5 rounded uppercase tracking-wider">Active</span>}
                                        </div>
                                        <div className="text-muted-foreground text-[11px] mt-1 font-medium">{v.date}</div>
                                    </div>
                                    <div className="text-2xl font-black text-success tabular-nums">{v.score}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Preview + actions */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="card p-8 sm:p-12 min-h-[550px] relative flex flex-col group">
                        <div className="absolute top-8 right-8">
                            <div className="flex items-center gap-2 px-4 py-2 bg-surface-raised border border-border rounded-full text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                                <FileText size={12} className="text-success" /> Resume v2.1
                            </div>
                        </div>

                        <div className="flex items-center gap-5 mb-12">
                            <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center border border-success/20">
                                <FileText size={28} className="text-success" />
                            </div>
                            <div>
                                <div className="font-black text-2xl tracking-tight">Active Strategy</div>
                                <div className="text-muted-foreground text-sm font-medium mt-1">Last compiled Jan 10, 2025</div>
                            </div>
                        </div>

                        {/* Simulated document */}
                        <div className="space-y-6 opacity-30 select-none">
                            <div className="h-7 bg-foreground/10 rounded-md w-[50%] mb-4" />
                            <div className="h-5 bg-foreground/5 rounded-md w-[30%]" />
                            <div className="h-px bg-border my-6" />
                            {[100, 95, 85, 95, 75, 80, 85].map((w, i) => (
                                <div key={i} className="h-3.5 bg-foreground/5 rounded-sm" style={{ width: `${w}%` }} />
                            ))}
                            <div className="h-px bg-border my-6" />
                            {[85, 95, 75, 85, 65].map((w, i) => (
                                <div key={i} className="h-3.5 bg-foreground/5 rounded-sm" style={{ width: `${w}%` }} />
                            ))}
                        </div>

                        {optimized && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-auto bg-success/10 border border-success/30 rounded-2xl p-6 text-sm text-success flex gap-4 items-center backdrop-blur-sm"
                            >
                                <Zap size={22} className="shrink-0" />
                                <p className="font-bold leading-relaxed">
                                    AI optimization complete! Score improved from 72 → 84. Review suggested changes.
                                </p>
                            </motion.div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none rounded-[inherit]" />
                    </div>

                    {/* Toolbar */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={handleOptimize}
                            disabled={optimizing}
                            className={`btn-primary !py-4 flex justify-center items-center text-base shadow-lg shadow-accent-brand/5 ${optimizing ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            {optimizing ? (
                                <><div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin mr-3" /> Optimizing Profile...</>
                            ) : (
                                <><Zap size={20} className="mr-2" /> Optimize with AI</>
                            )}
                        </button>
                        <button className="btn-secondary !py-4 flex justify-center items-center text-base">
                            <ArrowRight size={20} className="mr-2" /> Apply to Jobs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
