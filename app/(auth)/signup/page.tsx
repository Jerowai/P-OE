'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, User, ArrowRight, Loader2, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const supabase = createClient()

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name },
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        if (data.user) {
            // Create user profile in users table
            await supabase.from('users').insert({
                id: data.user.id,
                email,
                full_name: name,
                subscription_status: 'trial',
                trial_start: new Date().toISOString(),
                trial_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            })

            router.push('/onboarding')
        }
    }

    return (
        <div style={{
            minHeight: '100vh', background: 'var(--background)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px', position: 'relative',
        }}>
            <div style={{
                position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)',
                width: '600px', height: '600px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,191,255,0.04) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', maxWidth: '440px' }}
            >
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', justifyContent: 'center' }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: '10px',
                        background: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Zap size={20} color="#000" />
                    </div>
                    <span style={{ fontWeight: 800, fontSize: '22px', letterSpacing: '-0.5px' }}>PIOE</span>
                </Link>

                {/* Trial banner */}
                <div style={{
                    background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)',
                    borderRadius: '12px', padding: '16px 20px', marginBottom: '20px',
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                }}>
                    <div style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: 'var(--accent-green)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: '2px',
                    }}>
                        <Check size={14} color="#000" />
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--accent-green)' }}>
                            7-Day Free Trial
                        </div>
                        <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>
                            Full access. No charge until day 8. Cancel anytime.
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '40px' }}>
                    <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '8px' }}>
                        Build your hiring engine
                    </h1>
                    <p style={{ color: 'var(--muted)', fontSize: '15px', marginBottom: '32px' }}>
                        Create your account to get started
                    </p>

                    <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px', display: 'block' }}>
                                Full Name
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="John Smith"
                                    style={{
                                        width: '100%', padding: '12px 14px 12px 40px',
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)',
                                        borderRadius: '10px', color: 'var(--foreground)', fontSize: '15px', outline: 'none',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'rgba(0,255,136,0.4)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px', display: 'block' }}>
                                Email
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@company.com"
                                    style={{
                                        width: '100%', padding: '12px 14px 12px 40px',
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)',
                                        borderRadius: '10px', color: 'var(--foreground)', fontSize: '15px', outline: 'none',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'rgba(0,255,136,0.4)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px', display: 'block' }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Min. 8 characters"
                                    minLength={8}
                                    style={{
                                        width: '100%', padding: '12px 14px 12px 40px',
                                        background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)',
                                        borderRadius: '10px', color: 'var(--foreground)', fontSize: '15px', outline: 'none',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'rgba(0,255,136,0.4)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
                                />
                            </div>
                        </div>

                        {error && (
                            <div style={{
                                background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.2)',
                                borderRadius: '8px', padding: '12px', fontSize: '14px', color: 'var(--danger)',
                            }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center', marginTop: '8px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Creating account...</> : <>Start Free Trial <ArrowRight size={16} /></>}
                        </button>

                        <p style={{ fontSize: '12px', color: 'var(--muted)', textAlign: 'center' }}>
                            By signing up, you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </form>

                    <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '14px', marginTop: '24px' }}>
                        Already have an account?{' '}
                        <Link href="/login" style={{ color: 'var(--accent-green)', fontWeight: 600 }}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>

            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}
