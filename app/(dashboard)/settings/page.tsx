'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, CreditCard, Bell, Shield, LogOut, Zap } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile')
    const [upgrading, setUpgrading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/')
    }

    async function handleUpgrade() {
        setUpgrading(true)
        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ priceId: 'price_1T3FGiCjh4TO0XY4NKG8mrS0', plan: 'monthly' }),
            })
            const data = await res.json()
            if (data.url) window.location.href = data.url
        } catch (e) {
            console.error(e)
        } finally {
            setUpgrading(false)
        }
    }

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ]

    return (
        <div style={{ maxWidth: '800px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '4px' }}>Settings</h1>
                <p style={{ color: 'var(--muted)', fontSize: '15px' }}>Manage your account and preferences</p>
            </div>

            <div style={{ display: 'flex', gap: '24px' }}>
                {/* Tabs */}
                <div style={{ width: '200px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    padding: '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                                    background: activeTab === tab.id ? 'rgba(255,255,255,0.06)' : 'transparent',
                                    color: activeTab === tab.id ? 'var(--foreground)' : 'var(--muted)',
                                    fontWeight: activeTab === tab.id ? 600 : 400,
                                    fontSize: '14px', textAlign: 'left', width: '100%',
                                    borderLeft: activeTab === tab.id ? '3px solid var(--accent-green)' : '3px solid transparent',
                                }}
                            >
                                <tab.icon size={16} color={activeTab === tab.id ? 'var(--accent-green)' : 'var(--muted)'} />
                                {tab.label}
                            </button>
                        ))}
                        <button
                            onClick={handleLogout}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '10px 14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                                background: 'transparent', color: 'var(--danger)', fontSize: '14px', marginTop: '16px', width: '100%',
                            }}
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="glass-card"
                        style={{ padding: '28px' }}
                    >
                        {activeTab === 'profile' && (
                            <div>
                                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Profile Information</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {[
                                        { label: 'Full Name', placeholder: 'John Smith', type: 'text' },
                                        { label: 'Email', placeholder: 'john@example.com', type: 'email' },
                                        { label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...', type: 'url' },
                                        { label: 'GitHub Username', placeholder: 'your-username', type: 'text' },
                                    ].map((field) => (
                                        <div key={field.label}>
                                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px', display: 'block' }}>
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                style={{
                                                    width: '100%', padding: '11px 14px',
                                                    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)',
                                                    borderRadius: '10px', color: 'var(--foreground)', fontSize: '14px', outline: 'none',
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <button className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'billing' && (
                            <div>
                                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Billing & Subscription</h2>
                                <div style={{
                                    background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)',
                                    borderRadius: '12px', padding: '20px', marginBottom: '24px',
                                }}>
                                    <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>
                                        🟢 Trial Active
                                    </div>
                                    <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                                        Your trial ends in 4 days. Upgrade to keep your hiring model.
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button
                                        className="btn-primary"
                                        onClick={handleUpgrade}
                                        disabled={upgrading}
                                        style={{ opacity: upgrading ? 0.7 : 1 }}
                                    >
                                        <Zap size={15} />
                                        {upgrading ? 'Redirecting...' : 'Upgrade to $29/month'}
                                    </button>
                                    <button className="btn-secondary">View Invoice History</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div>
                                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Notification Preferences</h2>
                                {[
                                    { label: 'New high-match jobs (>70%)', desc: 'Get notified when a strong match appears', enabled: true },
                                    { label: 'Resume optimization tips', desc: 'Weekly AI-generated improvement suggestions', enabled: true },
                                    { label: 'Model confidence milestones', desc: 'When your model crosses new thresholds', enabled: false },
                                    { label: 'Trial ending reminder', desc: '48 hours before your trial ends', enabled: true },
                                ].map((n) => (
                                    <div key={n.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 0', borderBottom: '1px solid var(--card-border)' }}>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{n.label}</div>
                                            <div style={{ color: 'var(--muted)', fontSize: '13px' }}>{n.desc}</div>
                                        </div>
                                        <div style={{
                                            width: 44, height: 24, borderRadius: '12px',
                                            background: n.enabled ? 'var(--accent-green)' : 'var(--card-border)',
                                            cursor: 'pointer', flexShrink: 0,
                                        }} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div>
                                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '24px' }}>Security</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {[
                                        { label: 'Current Password', placeholder: '••••••••', type: 'password' },
                                        { label: 'New Password', placeholder: 'Min. 8 characters', type: 'password' },
                                        { label: 'Confirm New Password', placeholder: '••••••••', type: 'password' },
                                    ].map((field) => (
                                        <div key={field.label}>
                                            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', marginBottom: '8px', display: 'block' }}>
                                                {field.label}
                                            </label>
                                            <input
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                style={{
                                                    width: '100%', padding: '11px 14px',
                                                    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--card-border)',
                                                    borderRadius: '10px', color: 'var(--foreground)', fontSize: '14px', outline: 'none',
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <button className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                                        Update Password
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
