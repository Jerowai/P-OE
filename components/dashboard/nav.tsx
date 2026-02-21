'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Zap, LayoutDashboard, FileText, Briefcase, Brain, Settings, LogOut, ArrowUpRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { BorderBeam } from '@/components/ui/border-beam'
import { motion } from 'framer-motion'

const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/resume', label: 'Resume Studio', icon: FileText },
    { href: '/jobs', label: 'Job Queue', icon: Briefcase },
    { href: '/model', label: 'Hiring Model', icon: Brain },
    { href: '/settings', label: 'Settings', icon: Settings },
]

export default function DashboardNav() {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const [upgrading, setUpgrading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/')
    }

    async function handleUpgrade() {
        setUpgrading(true)
        setError(null)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
                return
            }
            const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY
            if (!priceId) {
                setError('Price ID not configured')
                return
            }
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId, plan: 'monthly' }),
            })
            const data = await res.json()
            if (data.url) {
                window.location.href = data.url
            } else {
                setError(data.error || 'Failed to create checkout session')
            }
        } catch {
            setError('Something went wrong')
        } finally {
            setUpgrading(false)
        }
    }

    return (
        <aside style={{
            width: '256px',
            minHeight: '100vh',
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 16px',
            background: 'var(--sidebar-bg)',
            borderRight: '1px solid var(--card-border)',
            zIndex: 50,
        }}>
            {/* Logo */}
            <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', padding: '4px 8px' }}>
                <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    style={{
                        width: 36, height: 36, borderRadius: '10px',
                        background: 'linear-gradient(135deg, var(--accent-green), var(--accent-blue))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                    }}
                >
                    <Zap size={20} color="#000" />
                </motion.div>
                <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px' }}>PIOE</span>
            </Link>

            {/* Nav label */}
            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '16px' }}>
                Navigation
            </div>

            {/* Nav Items */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                        >
                            <item.icon size={17} />
                            {item.label}
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    style={{
                                        position: 'absolute',
                                        right: 12,
                                        width: 5,
                                        height: 5,
                                        borderRadius: '50%',
                                        background: 'var(--accent-green)',
                                    }}
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Upgrade Button */}
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--card-border)' }}>
                {error && (
                    <div style={{ fontSize: '12px', color: 'var(--danger)', marginBottom: '10px', padding: '8px 10px', background: 'rgba(255,68,68,0.08)', borderRadius: '8px' }}>
                        {error}
                    </div>
                )}
                <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', marginBottom: '8px' }}>
                    <BorderBeam duration={8} colorFrom="#00FF88" colorTo="#00BFFF" />
                    <button
                        onClick={handleUpgrade}
                        disabled={upgrading}
                        style={{
                            width: '100%',
                            padding: '11px 16px',
                            borderRadius: '14px',
                            background: 'linear-gradient(135deg, rgba(0,255,136,0.12), rgba(0,191,255,0.08))',
                            border: '1px solid rgba(0,255,136,0.25)',
                            color: 'var(--accent-green)',
                            fontWeight: 700,
                            fontSize: '13px',
                            cursor: upgrading ? 'wait' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                            opacity: upgrading ? 0.7 : 1,
                        }}
                        onMouseEnter={e => { if (!upgrading) e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,191,255,0.14))' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,255,136,0.12), rgba(0,191,255,0.08))' }}
                    >
                        <Zap size={15} />
                        {upgrading ? 'Redirecting...' : 'Upgrade — $29/mo'}
                        {!upgrading && <ArrowUpRight size={14} style={{ marginLeft: 'auto' }} />}
                    </button>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    style={{
                        width: '100%', padding: '9px 16px', borderRadius: '10px', border: 'none',
                        background: 'transparent', color: 'var(--muted)', fontSize: '14px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.background = 'rgba(255,68,68,0.06)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.background = 'transparent' }}
                >
                    <LogOut size={15} />
                    Sign Out
                </button>
            </div>
        </aside>
    )
}
