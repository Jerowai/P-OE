'use client';
import React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { createPortal } from 'react-dom';

type HeaderProps = {
    nav: {
        features: string;
        pricing: string;
        about: string;
        signIn: string;
        startTrial: string;
    }
}

export function Header({ nav }: HeaderProps) {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);

    const links = [
        { label: nav.features, href: '#features' },
        { label: nav.pricing, href: '#pricing' },
        { label: nav.about, href: '#about' },
    ];

    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    return (
        <header
            className={cn(
                'sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300',
                scrolled
                    ? 'bg-[var(--background)]/90 border-[var(--card-border)] backdrop-blur-xl shadow-sm'
                    : 'bg-transparent'
            )}
        >
            <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity rounded-lg p-1">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent-green)] to-[var(--accent-blue)] flex items-center justify-center shadow-lg shadow-[var(--accent-green)]/25">
                        <Zap size={15} className="text-black" />
                    </div>
                    <span className="font-extrabold text-lg tracking-tight">PIOE</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-1 md:flex">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-2 md:flex">
                    <LanguageToggle />
                    <ThemeToggle />
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/login">{nav.signIn}</Link>
                    </Button>
                    <Button size="sm" asChild>
                        <Link href="/signup">{nav.startTrial}</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-2 md:hidden">
                    <LanguageToggle />
                    <ThemeToggle />
                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                        aria-label="Toggle menu"
                        className="h-9 w-9"
                    >
                        <MenuToggleIcon open={open} className="size-5" duration={300} />
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu open={open} nav={nav} links={links} />
        </header>
    );
}

type MobileMenuProps = {
    open: boolean;
    nav: HeaderProps['nav'];
    links: { label: string; href: string }[];
};

function MobileMenu({ open, nav, links }: MobileMenuProps) {
    if (!open || typeof window === 'undefined') return null;

    return createPortal(
        <div
            id="mobile-menu"
            className="bg-[var(--background)]/95 backdrop-blur-xl fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-[var(--card-border)] md:hidden"
        >
            <div
                data-slot={open ? 'open' : 'closed'}
                className="size-full p-6 flex flex-col justify-between animate-in fade-in slide-in-from-top-4 duration-300"
            >
                <div className="grid gap-y-1">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            className={buttonVariants({ variant: 'ghost', className: 'justify-start h-12 text-base' })}
                            href={link.href}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
                <div className="flex flex-col gap-3">
                    <Button variant="outline" className="w-full h-12 text-base" asChild>
                        <Link href="/login">{nav.signIn}</Link>
                    </Button>
                    <Button className="w-full h-12 text-base" asChild>
                        <Link href="/signup">{nav.startTrial}</Link>
                    </Button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
