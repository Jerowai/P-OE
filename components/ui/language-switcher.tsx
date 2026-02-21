'use client'

import { useLanguage } from '@/lib/i18n/context'
import type { Language } from '@/lib/i18n/translations'

const LANGUAGES: { code: Language; flag: string; label: string }[] = [
    { code: 'en', flag: '🇬🇧', label: 'EN' },
    { code: 'tr', flag: '🇹🇷', label: 'TR' },
    { code: 'es', flag: '🇪🇸', label: 'ES' },
]

export function LanguageSwitcher() {
    const { lang, setLang } = useLanguage()

    return (
        <div className="lang-switcher">
            {LANGUAGES.map(({ code, flag, label }) => (
                <button
                    key={code}
                    onClick={() => setLang(code)}
                    aria-label={`Switch to ${label}`}
                    className={`lang-btn ${lang === code ? 'lang-btn-active' : ''}`}
                    title={label}
                >
                    <span className="text-base leading-none">{flag}</span>
                </button>
            ))}
        </div>
    )
}
