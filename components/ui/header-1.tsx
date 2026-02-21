'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useScroll } from '@/components/ui/use-scroll';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import Link from 'next/link';

type HeaderProps = {
    nav: {
        signIn: string;
        startTrial: string;
    }
}

export function Header({ nav }: HeaderProps) {
    const scrolled = useScroll(10);

    return (
        <header
            className={cn(
                'sticky top-0 z-[90] w-full border-b border-transparent transition-all duration-300',
                scrolled
                    ? 'bg-[var(--background)]/80 border-[var(--card-border)] backdrop-blur-xl'
                    : 'bg-transparent'
            )}
        >
            <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-end px-6 gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <LanguageToggle />
                        <ThemeToggle />
                    </div>
                    <div className="hidden sm:flex items-center gap-2 border-l border-[var(--card-border)] pl-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/login">{nav.signIn}</Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href="/signup">{nav.startTrial}</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
