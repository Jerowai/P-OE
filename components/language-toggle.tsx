'use client'

import { useState, useEffect } from 'react'

const languages = [
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'tr', flag: '🇹🇷', name: 'Türkçe' },
    { code: 'es', flag: '🇪🇸', name: 'Español' },
]

export function LanguageToggle() {
    const [currentLang, setCurrentLang] = useState('en')
    const [isOpen, setIsOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const savedLang = localStorage.getItem('language') || 'en'
        setCurrentLang(savedLang)
    }, [])

    const toggleLanguage = (code: string) => {
        setCurrentLang(code)
        localStorage.setItem('language', code)
        setIsOpen(false)
        window.location.reload()
    }

    if (!mounted) return <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10" />

    const current = languages.find(l => l.code === currentLang) || languages[0]

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-xl"
                aria-label="Select language"
            >
                {current.flag}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl bg-[rgba(14,14,24,0.95)] border border-white/10 shadow-2xl overflow-hidden z-[200]">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => toggleLanguage(lang.code)}
                            className={`w-full px-4 py-3 flex items-center gap-3 text-sm hover:bg-white/5 transition-colors ${currentLang === lang.code ? 'bg-white/10' : ''}`}
                        >
                            <span>{lang.flag}</span>
                            <span className="font-medium text-[var(--foreground)]">{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
