'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/context'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from '@/components/ui/language-switcher'

export default function LoginPage() {
    const { t } = useLanguage()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const supabase = createClient()

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
            {/* Top controls */}
            <div className="absolute top-6 right-6 flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
            </div>

            {/* Subtle background glow */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden"
            >
                <div className="w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.05]"
                    style={{ background: 'var(--accent-brand)' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="w-full max-w-[400px] relative z-10"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 mb-10 justify-center">
                    <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                        <Zap size={16} className="text-background" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">PIOE</span>
                </Link>

                <div className="glass-card p-8">
                    <h1 className="text-2xl font-bold tracking-tight mb-1">{t.auth.welcomeBack}</h1>
                    <p className="text-muted text-sm mb-8">{t.auth.signInSub}</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted block">
                                {t.auth.emailLabel}
                            </label>
                            <div className="relative">
                                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="you@example.com"
                                    style={{
                                        width: '100%',
                                        paddingLeft: '40px',
                                        paddingRight: '16px',
                                        paddingTop: '11px',
                                        paddingBottom: '11px',
                                        background: 'var(--surface-raised)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '10px',
                                        color: 'var(--foreground)',
                                        fontSize: '14px',
                                        outline: 'none',
                                        transition: 'border-color 0.15s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'var(--accent-brand)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted block">
                                {t.auth.passwordLabel}
                            </label>
                            <div className="relative">
                                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    style={{
                                        width: '100%',
                                        paddingLeft: '40px',
                                        paddingRight: '16px',
                                        paddingTop: '11px',
                                        paddingBottom: '11px',
                                        background: 'var(--surface-raised)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '10px',
                                        color: 'var(--foreground)',
                                        fontSize: '14px',
                                        outline: 'none',
                                        transition: 'border-color 0.15s',
                                    }}
                                    onFocus={e => e.target.style.borderColor = 'var(--accent-brand)'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg text-sm text-center"
                                style={{ background: 'rgb(220 38 38 / 0.08)', border: '1px solid rgb(220 38 38 / 0.2)', color: 'var(--danger)' }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full justify-center mt-2"
                            style={{ paddingTop: '13px', paddingBottom: '13px' }}
                        >
                            {loading ? (
                                <><Loader2 size={17} className="animate-spin" /> {t.auth.signingInBtn}</>
                            ) : (
                                <>{t.auth.signInBtn} <ArrowRight size={16} /></>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-muted text-sm mt-7 pt-6 border-t border-border">
                        {t.auth.noAccount}{' '}
                        <Link href="/signup" className="text-accent font-semibold hover:underline">
                            {t.auth.startTrial}
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
