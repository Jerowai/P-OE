'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ArrowRight, Briefcase, Zap } from 'lucide-react'

const allJobs = [
    { id: 1, company: 'Stripe', title: 'Senior Frontend Engineer', remote: 'Fully Remote', match: 87, probability: 74, location: '🇺🇸 USA', seniority: 'Senior', keywords: ['React', 'TypeScript', 'Node.js'] },
    { id: 2, company: 'Linear', title: 'Staff Engineer', remote: 'Fully Remote', match: 81, probability: 68, location: '🌍 Global', seniority: 'Staff', keywords: ['React', 'Go', 'GraphQL'] },
    { id: 3, company: 'Vercel', title: 'React Engineer', remote: 'Fully Remote', match: 76, probability: 61, location: '🌍 Global', seniority: 'Mid', keywords: ['React', 'Next.js', 'TypeScript'] },
    { id: 4, company: 'Shopify', title: 'Full Stack Developer', remote: 'Hybrid', match: 64, probability: 48, location: '🇨🇦 Canada', seniority: 'Mid', keywords: ['Ruby', 'React', 'GraphQL'] },
    { id: 5, company: 'Figma', title: 'Frontend Engineer', remote: 'Hybrid', match: 58, probability: 42, location: '🇺🇸 USA', seniority: 'Mid', keywords: ['React', 'WebGL', 'TypeScript'] },
    { id: 6, company: 'Atlassian', title: 'Software Engineer II', remote: 'Fully Remote', match: 71, probability: 56, location: '🌍 Global', seniority: 'Mid', keywords: ['React', 'Java', 'AWS'] },
    { id: 7, company: 'Notion', title: 'Frontend Developer', remote: 'Fully Remote', match: 83, probability: 70, location: '🌍 Global', seniority: 'Mid', keywords: ['React', 'TypeScript', 'Electron'] },
    { id: 8, company: 'Meta', title: 'Software Engineer', remote: 'Onsite', match: 39, probability: 28, location: '🇺🇸 USA', seniority: 'Senior', keywords: ['React', 'Hack', 'Python'] },
    { id: 9, company: 'Datadog', title: 'Frontend Engineer', remote: 'Fully Remote', match: 68, probability: 52, location: '🇺🇸 USA', seniority: 'Mid', keywords: ['Vue', 'TypeScript', 'Go'] },
]

type Filter = { remote: string; seniority: string; search: string }

export default function JobsPage() {
    const [filters, setFilters] = useState<Filter>({ remote: 'all', seniority: 'all', search: '' })

    const filtered = allJobs.filter((j) => {
        if (filters.remote !== 'all' && j.remote.toLowerCase().replace(' ', '_') !== filters.remote) return false
        if (filters.seniority !== 'all' && j.seniority.toLowerCase() !== filters.seniority) return false
        if (filters.search && !j.title.toLowerCase().includes(filters.search.toLowerCase()) && !j.company.toLowerCase().includes(filters.search.toLowerCase())) return false
        return true
    })

    const high = filtered.filter(j => j.match >= 70)
    const medium = filtered.filter(j => j.match >= 40 && j.match < 70)
    const low = filtered.filter(j => j.match < 40)

    return (
        <div className="max-w-7xl mx-auto space-y-10 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">Job Queue</h1>
                    <p className="text-muted-foreground text-sm sm:text-base font-medium">{allJobs.length} positions matched to your profile</p>
                </div>
                <div className="bg-surface-raised border border-border px-5 py-2.5 rounded-2xl flex items-center gap-3 text-sm font-bold">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    Live Scanning Active
                </div>
            </div>

            {/* Filters */}
            <div className="card p-5 sm:p-6 flex flex-col lg:flex-row gap-5">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground opacity-60" />
                    <input
                        placeholder="Search jobs, companies or keywords..."
                        value={filters.search}
                        onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                        className="w-full pl-12 pr-4 py-3 bg-surface-raised border border-border rounded-xl text-sm outline-none focus:border-accent-brand/40 transition-all font-medium"
                    />
                </div>

                <div className="flex flex-wrap gap-4">
                    {[
                        { key: 'remote', label: 'Remote Type', options: [{ value: 'all', label: 'All Remote' }, { value: 'fully_remote', label: 'Fully Remote' }, { value: 'hybrid', label: 'Hybrid' }, { value: 'onsite', label: 'Onsite' }] },
                        { key: 'seniority', label: 'Seniority', options: [{ value: 'all', label: 'All Levels' }, { value: 'junior', label: 'Junior' }, { value: 'mid', label: 'Mid' }, { value: 'senior', label: 'Senior' }, { value: 'staff', label: 'Staff' }] },
                    ].map((f) => (
                        <select
                            key={f.key}
                            value={filters[f.key as keyof Filter]}
                            onChange={(e) => setFilters(prev => ({ ...prev, [f.key]: e.target.value }))}
                            className="flex-1 sm:flex-initial px-5 py-3 bg-surface-raised border border-border rounded-xl text-sm outline-none cursor-pointer focus:border-accent-brand/40 transition-all font-bold appearance-none min-w-[140px]"
                        >
                            {f.options.map(o => <option key={o.value} value={o.value} className="bg-surface">{o.label}</option>)}
                        </select>
                    ))}

                    <div className="flex items-center gap-3 px-6 py-3 text-muted-foreground text-xs font-black uppercase tracking-widest bg-surface border border-border rounded-xl">
                        <Filter size={14} className="opacity-60" /> {filtered.length} found
                    </div>
                </div>
            </div>

            {/* Job sections */}
            {[
                { label: 'High Probability', jobs: high, color: 'var(--success)', icon: <span className="pulse-dot" /> },
                { label: 'Medium Probability', jobs: medium, color: 'var(--warning)', icon: <span className="w-1.5 h-1.5 rounded-full bg-warning" /> },
                { label: 'Low Probability', jobs: low, color: 'var(--danger)', icon: <span className="w-1.5 h-1.5 rounded-full bg-danger" /> },
            ].map((section) => section.jobs.length > 0 && (
                <div key={section.label} className="space-y-8">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3" style={{ color: section.color }}>
                        {section.icon}
                        {section.label} ({section.jobs.length})
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                        {section.jobs.map((job, i) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -4 }}
                                className="card p-7 h-full flex flex-col justify-between group"
                            >
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight group-hover:text-accent-brand transition-colors">{job.title}</h3>
                                            <div className="text-muted-foreground text-sm mt-1.5 font-medium">{job.company} · {job.location}</div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="text-3xl font-black tracking-tighter tabular-nums" style={{ color: section.color }}>{job.match}%</div>
                                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">match</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {job.keywords.map((k) => (
                                            <span key={k} className="px-3 py-1 bg-surface-raised border border-border rounded-lg text-[10px] font-bold text-muted-foreground uppercase tracking-wider group-hover:border-accent-brand/20 transition-colors">
                                                {k}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
                                    <div className="badge !px-3 !py-1 text-[10px] !bg-surface-raised">
                                        {job.remote}
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <div className="text-right">
                                            <div className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.15em] mb-1">Status</div>
                                            <div className="text-xs font-black tracking-tight" style={{ color: section.color }}>{job.probability}% odds</div>
                                        </div>
                                        <button className="btn-primary !px-5 !py-2.5 !text-xs shadow-md shadow-accent-brand/5">Apply Now</button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
