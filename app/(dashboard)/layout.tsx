import { ReactNode } from 'react'
import DashboardNav from '@/components/dashboard/nav'
import Link from 'next/link'
import { LayoutDashboard, FileText, Briefcase, Brain, Settings } from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-[var(--background)]">
            <div className="hidden lg:block">
                <DashboardNav />
            </div>
            {/* Mobile Nav will be added here or inside children */}
            <main className="flex-1 w-full lg:ml-[256px] p-4 lg:p-8 overflow-y-auto pb-24 lg:pb-8">
                {children}
            </main>
            <div className="lg:hidden">
                <MobileNav />
            </div>
        </div>
    )
}

function MobileNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[var(--sidebar-bg)] border-t border-[var(--card-border)] backdrop-blur-lg z-50 flex items-center justify-around px-4">
            <Link href="/dashboard" className="flex flex-col items-center gap-1 text-[var(--muted)] hover:text-[var(--accent-green)] transition-colors">
                <LayoutDashboard size={20} />
                <span className="text-[10px] font-medium">Home</span>
            </Link>
            <Link href="/resume" className="flex flex-col items-center gap-1 text-[var(--muted)] hover:text-[var(--accent-green)] transition-colors">
                <FileText size={20} />
                <span className="text-[10px] font-medium">Resume</span>
            </Link>
            <Link href="/jobs" className="flex flex-col items-center gap-1 text-[var(--muted)] hover:text-[var(--accent-green)] transition-colors">
                <Briefcase size={20} />
                <span className="text-[10px] font-medium">Jobs</span>
            </Link>
            <Link href="/model" className="flex flex-col items-center gap-1 text-[var(--muted)] hover:text-[var(--accent-green)] transition-colors">
                <Brain size={20} />
                <span className="text-[10px] font-medium">Model</span>
            </Link>
            <Link href="/settings" className="flex flex-col items-center gap-1 text-[var(--muted)] hover:text-[var(--accent-green)] transition-colors">
                <Settings size={20} />
                <span className="text-[10px] font-medium">Settings</span>
            </Link>
        </nav>
    )
}

