'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, User, ArrowRight, Loader2, Check } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useLanguage } from '@/lib/i18n/context'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from '@/components/ui/language-switcher'

const inputStyle: React.CSSProperties = {
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
}

function Input({
    icon: Icon,
    type,
    value,
    onChange,
    placeholder,
    minLength,
    required,
}: {
    icon: React.ElementType
    type: string
    value: string
    onChange: (v: string) => void
    placeholder: string
    minLength?: number
    required?: boolean
}) {
    const [focused, setFocused] = useState(false)
    return (
        <div className="relative">
            <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                minLength={minLength}
                style={{
                    ...inputStyle,
                    borderColor: focused ? 'var(--accent-brand)' : 'var(--border)',
                    boxShadow: focused ? '0 0 0 3px rgb(79 70 229 / 0.08)' : 'none',
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
        </div>
    )
}

export default function SignupPage() {
    const { t } = useLanguage()
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
                className="w-full max-w-[420px] relative z-10"
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 mb-8 justify-center">
                    <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                        <Zap size={16} className="text-background" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">PIOE</span>
                </Link>

                {/* Trial banner */}
                <div className="rounded-2xl p-4 mb-5 flex gap-3 items-start"
                    style={{ background: 'rgb(79 70 229 / 0.07)', border: '1px solid rgb(79 70 229 / 0.18)' }}>
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'var(--accent-brand)' }}>
                        <Check size={13} className="text-white" />
                    </div>
                    <div>
                        <div className="font-semibold text-sm" style={{ color: 'var(--accent-brand)' }}>
                            {t.auth.trialBadge}
                        </div>
                        <div className="text-muted text-xs mt-1 leading-relaxed">{t.auth.trialSub}</div>
                    </div>
                </div>

                <div className="glass-card p-8">
                    <h1 className="text-2xl font-bold tracking-tight mb-1">{t.auth.buildEngine}</h1>
                    <p className="text-muted text-sm mb-7">{t.auth.createAccountSub}</p>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted block">
                                {t.auth.fullNameLabel}
                            </label>
                            <Input icon={User} type="text" value={name} onChange={setName} placeholder="John Smith" required />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted block">
                                {t.auth.emailLabel}
                            </label>
                            <Input icon={Mail} type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted block">
                                {t.auth.passwordLabel}
                            </label>
                            <Input icon={Lock} type="password" value={password} onChange={setPassword} placeholder="••••••••" minLength={8} required />
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
                                <><Loader2 size={17} className="animate-spin" /> {t.auth.creatingAccountBtn}</>
                            ) : (
                                <>{t.auth.startTrial} <ArrowRight size={16} /></>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-muted text-sm mt-7 pt-6 border-t border-border">
                        {t.auth.alreadyHaveAccount}{' '}
                        <Link href="/login" className="text-accent font-semibold hover:underline">
                            {t.auth.signInBtn}
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
