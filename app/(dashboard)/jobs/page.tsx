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
        <div style={{ maxWidth: '1200px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>Job Queue</h1>
                <p style={{ color: 'var(--muted)', fontSize: '15px' }}>{allJobs.length} positions matched to your profile</p>
            </div>

            {/* Filters */}
            <div className="glass-card" style={{ padding: '20px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: '1 1 200px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                    <input
                        placeholder="Search jobs or companies..."
                        value={filters.search}
                        onChange={(e) => setFilters(f => ({ ...f, search: e.target.value }))}
                        style={{
                            width: '100%', padding: '9px 12px 9px 36px',
                            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)',
                            borderRadius: '8px', color: 'var(--foreground)', fontSize: '14px', outline: 'none',
                        }}
                    />
                </div>

                {[
                    { key: 'remote', label: 'Remote Type', options: [{ value: 'all', label: 'All' }, { value: 'fully_remote', label: 'Fully Remote' }, { value: 'hybrid', label: 'Hybrid' }, { value: 'onsite', label: 'Onsite' }] },
                    { key: 'seniority', label: 'Seniority', options: [{ value: 'all', label: 'All' }, { value: 'junior', label: 'Junior' }, { value: 'mid', label: 'Mid' }, { value: 'senior', label: 'Senior' }, { value: 'staff', label: 'Staff' }] },
                ].map((f) => (
                    <select
                        key={f.key}
                        value={filters[f.key as keyof Filter]}
                        onChange={(e) => setFilters(prev => ({ ...prev, [f.key]: e.target.value }))}
                        style={{
                            padding: '9px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)',
                            borderRadius: '8px', color: 'var(--foreground)', fontSize: '14px', outline: 'none', cursor: 'pointer',
                        }}
                    >
                        {f.options.map(o => <option key={o.value} value={o.value} style={{ background: '#111117' }}>{o.label}</option>)}
                    </select>
                ))}

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '14px' }}>
                    <Filter size={14} /> {filtered.length} results
                </div>
            </div>

            {/* Job sections */}
            {[
                { label: '🟢 High Probability', jobs: high, color: 'var(--accent-green)' },
                { label: '🟡 Medium Probability', jobs: medium, color: 'var(--warning)' },
                { label: '🔴 Low Probability', jobs: low, color: 'var(--danger)' },
            ].map((section) => section.jobs.length > 0 && (
                <div key={section.label} style={{ marginBottom: '32px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: section.color, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {section.label} ({section.jobs.length})
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
                        {section.jobs.map((job, i) => (
                            <motion.div
                                key={job.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -3 }}
                                className="glass-card"
                                style={{ padding: '24px' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: '16px' }}>{job.title}</div>
                                        <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '2px' }}>{job.company} · {job.location}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '28px', fontWeight: 900, color: section.color, letterSpacing: '-1px', lineHeight: 1 }}>{job.match}%</div>
                                        <div style={{ color: 'var(--muted)', fontSize: '11px' }}>match</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                    {job.keywords.map((k) => (
                                        <span key={k} style={{
                                            background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)',
                                            borderRadius: '6px', padding: '3px 8px', fontSize: '12px', color: 'var(--muted)',
                                        }}>{k}</span>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{
                                        display: 'inline-flex', padding: '4px 10px', borderRadius: '999px',
                                        background: 'rgba(255,255,255,0.04)', fontSize: '12px', color: 'var(--muted)',
                                    }}>{job.remote}</div>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Interview: <strong style={{ color: section.color }}>{job.probability}%</strong></span>
                                        <button className="btn-primary" style={{ padding: '6px 14px', fontSize: '12px' }}>Apply</button>
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
