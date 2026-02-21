'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Zap,
    LayoutDashboard,
    FileText,
    CreditCard,
    Settings,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    Home,
    Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Sidebar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);
    const pathname = usePathname();

    const navItems = [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Features', href: '#features', icon: LayoutDashboard },
        { label: 'Resume Analyzer', href: '#analysis', icon: FileText },
        { label: 'Jobs', href: '#jobs', icon: Briefcase },
        { label: 'Pricing', href: '#pricing', icon: CreditCard },
    ];

    return (
        <>
            {/* Mobile Toggle */}
            <div className="fixed top-4 left-4 z-[110] md:hidden">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="bg-[var(--card-bg)] border-[var(--card-border)]"
                >
                    {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
            </div>

            {/* Sidebar Desktop */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-[100] h-screen border-r border-[var(--card-border)] bg-[var(--sidebar-bg)] sidebar-transition hidden md:flex flex-col",
                    isOpen ? "w-64" : "w-20"
                )}
            >
                {/* Logo Section */}
                <div className="h-16 flex items-center px-6 border-b border-[var(--card-border)] overflow-hidden">
                    <div className="flex items-center gap-3 min-w-max">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                            <Zap size={18} className="text-[var(--background)]" />
                        </div>
                        {isOpen && <span className="font-black text-xl tracking-tighter">PIOE</span>}
                    </div>
                </div>

                {/* Nav Links */}
                <div className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                                pathname === item.href
                                    ? "bg-[var(--accent)] text-[var(--background)]"
                                    : "text-[var(--muted)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
                            )}
                        >
                            <item.icon size={22} className={cn(
                                "shrink-0 transition-colors",
                                pathname === item.href ? "text-[var(--background)]" : "group-hover:text-[var(--foreground)]"
                            )} />
                            {isOpen && <span className="font-bold text-sm">{item.label}</span>}
                        </Link>
                    ))}
                </div>

                {/* Footer actions / Settings */}
                <div className="p-3 border-t border-[var(--card-border)]">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--muted)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-all group">
                        <Settings size={22} className="shrink-0 group-hover:text-[var(--foreground)]" />
                        {isOpen && <span className="font-bold text-sm">Settings</span>}
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="mt-2 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--muted)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-all group border border-transparent hover:border-[var(--card-border)]"
                    >
                        {isOpen ? <ChevronLeft size={22} className="shrink-0" /> : <ChevronRight size={22} className="shrink-0" />}
                        {isOpen && <span className="font-bold text-sm">Collapse</span>}
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[105] md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar Content */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-[110] h-screen w-3/4 max-w-xs bg-[var(--sidebar-bg)] border-r border-[var(--card-border)] transition-transform duration-300 transform md:hidden flex flex-col",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="h-16 flex items-center px-6 border-b border-[var(--card-border)]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                            <Zap size={18} className="text-[var(--background)]" />
                        </div>
                        <span className="font-black text-xl tracking-tighter">PIOE</span>
                    </div>
                </div>
                <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm",
                                pathname === item.href
                                    ? "bg-[var(--accent)] text-[var(--background)]"
                                    : "text-[var(--muted)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
                            )}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                </div>
            </aside>
        </>
    );
}
