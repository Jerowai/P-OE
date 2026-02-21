'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return <div className="w-9 h-9" />

    const isDark = theme === 'dark'

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="theme-toggle-btn"
        >
            {isDark ? (
                <Sun size={17} className="transition-transform duration-300 rotate-0 hover:rotate-12" />
            ) : (
                <Moon size={17} className="transition-transform duration-300 rotate-0 hover:-rotate-12" />
            )}
        </button>
    )
}
