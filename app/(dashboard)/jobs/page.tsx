'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'

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
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">Job Queue</h1>
                <p className="text-[var(--muted)] text-sm sm:text-base">{allJobs.length} positions matched to your profile</p>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 sm:p-6 flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
                    <input
                        placeholder="Search jobs or companies..."
                        value={filters.search}
                        onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                        className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-[var(--card-border)] rounded-xl text-sm outline-none focus:border-[var(--accent-green)]/50 transition-colors"
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
                            className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/[0.04] border border-[var(--card-border)] rounded-xl text-sm outline-none cursor-pointer focus:border-[var(--accent-green)]/50 transition-colors"
                        >
                            {f.options.map(o => <option key={o.value} value={o.value} className="bg-[#08080E]">{o.label}</option>)}
                        </select>
                    ))}

                    <div className="flex items-center gap-2 px-4 py-2 text-[var(--muted)] text-sm font-bold bg-white/[0.02] rounded-xl border border-white/5">
                        <Filter size={14} /> {filtered.length} found
                    </div>
                </div>
            </div>

            {/* Job sections */}
            {[
                { label: '🟢 High Probability', jobs: high, color: 'var(--accent-green)' },
                { label: '🟡 Medium Probability', jobs: medium, color: 'var(--warning)' },
                { label: '🔴 Low Probability', jobs: low, color: 'var(--danger)' },
            ].map((section) => section.jobs.length > 0 && (
                <div key={section.label} className="space-y-6">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3" style={{ color: section.color }}>
                        {section.label} ({section.jobs.length})
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {section.jobs.map((job, i) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -3 }}
                                className="glass-card p-6 h-full flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight">{job.title}</h3>
                                            <div className="text-[var(--muted)] text-sm mt-1">{job.company} · {job.location}</div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="text-3xl font-black leading-none" style={{ color: section.color }}>{job.match}%</div>
                                            <div className="text-[10px] font-black text-[var(--muted)] uppercase tracking-wider mt-1">match</div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {job.keywords.map((k) => (
                                            <span key={k} className="px-2.5 py-1 bg-white/[0.04] border border-white/5 rounded-md text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">
                                                {k}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                                    <div className="px-3 py-1 bg-white/[0.03] rounded-full text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">
                                        {job.remote}
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-[10px] font-black text-[var(--muted)] uppercase tracking-widest leading-none mb-1">Status</div>
                                            <div className="text-xs font-black" style={{ color: section.color }}>{job.probability}% odds</div>
                                        </div>
                                        <button className="btn-primary !px-4 !py-2 !text-xs">Apply</button>
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
