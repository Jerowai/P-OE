'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { type Language, translations } from './translations'

interface LanguageContextType {
    lang: Language
    setLang: (l: Language) => void
    t: typeof translations['en']
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Language>('en')

    useEffect(() => {
        const saved = localStorage.getItem('pioe-lang') as Language | null
        if (saved && ['en', 'tr', 'es'].includes(saved)) {
            setLangState(saved)
        }
    }, [])

    const setLang = (l: Language) => {
        setLangState(l)
        localStorage.setItem('pioe-lang', l)
    }

    return (
        <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
    return ctx
}
