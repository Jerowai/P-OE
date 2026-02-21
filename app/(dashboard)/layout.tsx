import { ReactNode } from 'react'
import DashboardNav from '@/components/dashboard/nav'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--background)' }}>
            <DashboardNav />
            <main style={{ flex: 1, marginLeft: '240px', padding: '32px', overflowY: 'auto' }}>
                {children}
            </main>
        </div>
    )
}
