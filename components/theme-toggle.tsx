'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => { setMounted(true) }, [])

    if (!mounted) return <div className="w-10 h-10 rounded-full border border-[var(--card-border)]" />

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative w-10 h-10 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] flex items-center justify-center hover:border-[var(--accent-green)]/40 hover:bg-[var(--foreground)]/5 transition-all duration-200"
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
    )
}
