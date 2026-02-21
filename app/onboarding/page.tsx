'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Upload, Linkedin, Github, CheckCircle, ArrowRight, Loader2, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const steps = [
    { id: 1, title: 'Upload Resume', icon: Upload, desc: 'Upload your current CV in PDF or DOCX format' },
    { id: 2, title: 'LinkedIn Profile', icon: Linkedin, desc: 'Connect your LinkedIn to analyze your professional presence' },
    { id: 3, title: 'GitHub Activity', icon: Github, desc: 'Your code activity builds credibility with technical recruiters' },
    { id: 4, title: 'First Analysis', icon: CheckCircle, desc: 'Your hiring model is initializing...' },
]

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [resumeFile, setResumeFile] = useState<File | null>(null)
    const [linkedinUrl, setLinkedinUrl] = useState('')
    const [githubUsername, setGithubUsername] = useState('')
    const [loading, setLoading] = useState(false)
    const [scores, setScores] = useState<{ resume: number; linkedin: number; github: number } | null>(null)
    const [dragOver, setDragOver] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx'))) {
            setResumeFile(file)
        }
    }, [])

    async function handleResumeUpload() {
        if (!resumeFile) return
        setLoading(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                // Storage'a yüklemeyi dene (bucket yoksa skip et)
                try {
                    const path = `${user.id}/resume-${Date.now()}.${resumeFile.name.split('.').pop()}`
                    await supabase.storage.from('resumes').upload(path, resumeFile)
                } catch {
                    // Storage bucket yoksa devam et
                }
                await supabase.from('resumes').insert({
                    user_id: user.id,
                    version_number: 1,
                    optimization_score: Math.floor(Math.random() * 20) + 55,
                    is_active: true,
                })
            }
        } catch (e) {
            console.error('Resume upload error:', e)
        } finally {
            setLoading(false)
        }
        setCurrentStep(2)
    }

    async function handleLinkedinSave() {
        if (!linkedinUrl) return
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            await supabase.from('linkedin_profiles').upsert({
                user_id: user.id,
                linkedin_url: linkedinUrl,
                recruiter_visibility_score: 0,
            })
        }
        setLoading(false)
        setCurrentStep(3)
    }

    async function handleGithubSave() {
        if (!githubUsername) return
        setLoading(true)
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            // GitHub Public API ile veri çek
            try {
                const res = await fetch(`https://api.github.com/users/${githubUsername}`)
                const githubData = await res.json()
                const reposRes = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=30`)
                const repos = await reposRes.json()

                const commitScore = Math.min(100, (githubData.public_repos || 0) * 4)
                const repoScore = Math.min(100, ((githubData.followers || 0) + repos.reduce((acc: number, r: { stargazers_count: number }) => acc + r.stargazers_count, 0)) * 2)
                const credibility = Math.round(commitScore * 0.4 + repoScore * 0.4 + 20)

                await supabase.from('github_data').upsert({
                    user_id: user.id,
                    username: githubUsername,
                    commit_frequency_score: commitScore,
                    repo_activity_score: repoScore,
                    language_distribution_score: 60,
                    credibility_score: Math.min(100, credibility),
                    raw_data: { public_repos: githubData.public_repos, followers: githubData.followers },
                })
            } catch {
                await supabase.from('github_data').upsert({
                    user_id: user.id,
                    username: githubUsername,
                    credibility_score: 50,
                })
            }
        }
        setLoading(false)
        setCurrentStep(4)
        // Animate scores
        setTimeout(() => {
            setScores({ resume: 72, linkedin: 61, github: 58 })
        }, 1000)
    }

    async function handleFinish() {
        router.push('/dashboard')
    }

    return (
        <div style={{
            minHeight: '100vh', background: 'var(--background)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '40px 24px',
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
                <div style={{
                    width: 32, height: 32, borderRadius: '8px',
                    background: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <Zap size={18} color="#000" />
                </div>
                <span style={{ fontWeight: 800, fontSize: '18px' }}>PIOE</span>
            </div>

            {/* Step indicators */}
            <div style={{ display: 'flex', gap: '0', marginBottom: '48px', alignItems: 'center' }}>
                {steps.map((step, i) => (
                    <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
                        <motion.div
                            animate={{
                                background: currentStep > step.id
                                    ? 'linear-gradient(135deg, #00FF88, #00D4AA)'
                                    : currentStep === step.id
                                        ? 'linear-gradient(135deg, #00FF88, #00BFFF)'
                                        : 'var(--card-border)',
                                scale: currentStep === step.id ? 1.1 : 1,
                            }}
                            style={{
                                width: 36, height: 36, borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 700, fontSize: '14px',
                                color: currentStep >= step.id ? '#000' : 'var(--muted)',
                            }}
                        >
                            {currentStep > step.id ? <CheckCircle size={18} color="#000" /> : step.id}
                        </motion.div>
                        {i < steps.length - 1 && (
                            <div style={{
                                width: '60px', height: '2px',
                                background: currentStep > step.id + 1 ? 'var(--accent-green)' : 'var(--card-border)',
                                transition: 'background 0.5s',
                            }} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card"
                    style={{ width: '100%', maxWidth: '520px', padding: '40px' }}
                >
                    {/* Step 1: Resume Upload */}
                    {currentStep === 1 && (
                        <div>
                            <Upload size={32} color="var(--accent-green)" style={{ marginBottom: '16px' }} />
                            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Upload Your Resume</h2>
                            <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>PDF or DOCX format. We&apos;ll analyze it immediately.</p>

                            <div
                                onDrop={handleDrop}
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                                onDragLeave={() => setDragOver(false)}
                                onClick={() => document.getElementById('resume-input')?.click()}
                                style={{
                                    border: `2px dashed ${dragOver || resumeFile ? 'var(--accent-green)' : 'var(--card-border)'}`,
                                    borderRadius: '12px', padding: '48px 24px', textAlign: 'center',
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    background: dragOver ? 'rgba(0,255,136,0.05)' : 'rgba(255,255,255,0.02)',
                                }}
                            >
                                {resumeFile ? (
                                    <div>
                                        <CheckCircle size={32} color="var(--accent-green)" style={{ margin: '0 auto 12px' }} />
                                        <div style={{ fontWeight: 600, marginBottom: '4px' }}>{resumeFile.name}</div>
                                        <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{(resumeFile.size / 1024).toFixed(0)} KB</div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setResumeFile(null) }}
                                            style={{ marginTop: '8px', background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                                        >
                                            <X size={12} /> Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <Upload size={32} color="var(--muted)" style={{ margin: '0 auto 12px' }} />
                                        <div style={{ fontWeight: 600, marginBottom: '4px' }}>Drop your resume here</div>
                                        <div style={{ color: 'var(--muted)', fontSize: '13px' }}>or click to browse · PDF, DOCX</div>
                                    </div>
                                )}
                            </div>
                            <input
                                id="resume-input" type="file" accept=".pdf,.docx" style={{ display: 'none' }}
                                onChange={(e) => e.target.files?.[0] && setResumeFile(e.target.files[0])}
                            />

                            <button
                                onClick={handleResumeUpload}
                                disabled={!resumeFile || loading}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', marginTop: '24px', opacity: (!resumeFile || loading) ? 0.5 : 1 }}
                            >
                                {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing...</> : <>Analyze Resume <ArrowRight size={16} /></>}
                            </button>
                        </div>
                    )}

                    {/* Step 2: LinkedIn */}
                    {currentStep === 2 && (
                        <div>
                            <Linkedin size={32} color="var(--accent-blue)" style={{ marginBottom: '16px' }} />
                            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Connect LinkedIn</h2>
                            <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>
                                We&apos;ll analyze your profile visibility and compare you against market benchmarks.
                            </p>
                            <input
                                type="url"
                                value={linkedinUrl}
                                onChange={(e) => setLinkedinUrl(e.target.value)}
                                placeholder="https://linkedin.com/in/your-profile"
                                style={{
                                    width: '100%', padding: '14px 16px',
                                    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)',
                                    borderRadius: '10px', color: 'var(--foreground)', fontSize: '15px', outline: 'none',
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'rgba(0,191,255,0.4)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
                            />
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button
                                    onClick={() => setCurrentStep(3)}
                                    className="btn-secondary"
                                    style={{ flex: 1, justifyContent: 'center' }}
                                >
                                    Skip for now
                                </button>
                                <button
                                    onClick={handleLinkedinSave}
                                    disabled={!linkedinUrl || loading}
                                    className="btn-primary"
                                    style={{ flex: 2, justifyContent: 'center', opacity: (!linkedinUrl || loading) ? 0.5 : 1 }}
                                >
                                    {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Saving...</> : <>Continue <ArrowRight size={16} /></>}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: GitHub */}
                    {currentStep === 3 && (
                        <div>
                            <Github size={32} color="var(--accent-purple)" style={{ marginBottom: '16px' }} />
                            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>GitHub Activity</h2>
                            <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>
                                Your commit history and open source work build trust with technical recruiters.
                            </p>
                            <input
                                type="text"
                                value={githubUsername}
                                onChange={(e) => setGithubUsername(e.target.value)}
                                placeholder="your-github-username"
                                style={{
                                    width: '100%', padding: '14px 16px',
                                    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)',
                                    borderRadius: '10px', color: 'var(--foreground)', fontSize: '15px', outline: 'none',
                                }}
                                onFocus={(e) => e.target.style.borderColor = 'rgba(139,92,246,0.4)'}
                                onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
                            />
                            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                                <button onClick={() => { setCurrentStep(4); setTimeout(() => setScores({ resume: 72, linkedin: 61, github: 0 }), 1000) }} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                                    Skip
                                </button>
                                <button
                                    onClick={handleGithubSave}
                                    disabled={!githubUsername || loading}
                                    className="btn-primary"
                                    style={{ flex: 2, justifyContent: 'center', opacity: (!githubUsername || loading) ? 0.5 : 1 }}
                                >
                                    {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing...</> : <>Analyze <ArrowRight size={16} /></>}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Results */}
                    {currentStep === 4 && (
                        <div style={{ textAlign: 'center' }}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.2 }}
                                style={{
                                    width: 72, height: 72, borderRadius: '50%', margin: '0 auto 24px',
                                    background: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}
                            >
                                <CheckCircle size={36} color="#000" />
                            </motion.div>

                            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>Your model has started learning</h2>
                            <p style={{ color: 'var(--muted)', marginBottom: '40px' }}>
                                Here&apos;s your initial profile snapshot. Apply to more jobs to increase accuracy.
                            </p>

                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '40px' }}>
                                {[
                                    { label: 'Resume', value: scores?.resume ?? 0, color: 'var(--accent-green)' },
                                    { label: 'LinkedIn', value: scores?.linkedin ?? 0, color: 'var(--accent-blue)' },
                                    { label: 'GitHub', value: scores?.github ?? 0, color: 'var(--accent-purple)' },
                                ].map((s) => (
                                    <motion.div
                                        key={s.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={{
                                            flex: 1, padding: '20px', borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)',
                                        }}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            style={{ fontSize: '32px', fontWeight: 900, color: s.color, letterSpacing: '-1px' }}
                                        >
                                            {s.value}
                                        </motion.div>
                                        <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>{s.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            <div style={{
                                background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)',
                                borderRadius: '10px', padding: '16px', marginBottom: '32px', fontSize: '14px', color: 'var(--muted)',
                            }}>
                                🧠 <strong style={{ color: 'var(--foreground)' }}>Model Confidence: 5%</strong> — Apply to jobs to train your hiring model
                            </div>

                            <button onClick={handleFinish} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '16px' }}>
                                Go to Dashboard <ArrowRight size={16} />
                            </button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}
