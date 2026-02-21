'use client'

import { useState, useEffect } from 'react'

export const translations = {
    en: {
        nav: {
            features: 'Features',
            pricing: 'Pricing',
            about: 'About',
            signIn: 'Sign In',
            startTrial: 'Start Trial',
        },
        hero: {
            badge: '7-Day Free Trial — No Credit Card Required',
            title1: 'Land Your',
            title2: 'Dream Job',
            title3: 'with AI precision.',
            subtitle: 'PIOE builds a personal hiring model that learns from your profile and predicts which jobs you\'ll actually get an interview for.',
            ctaPrimary: 'Start Free Trial',
            ctaSecondary: 'Sign In',
        },
        dashboard: {
            resumeScore: 'Resume Score',
            linkedin: 'LinkedIn',
            github: 'GitHub',
            match: 'match',
        },
        stats: {
            activeUsers: 'Active Users',
            avgMatch: 'Avg. Match Rate',
            jobsMatched: 'Jobs Matched',
            fasterHiring: 'Faster Hiring',
        },
        features: {
            badge: 'Features',
            title: 'Your unfair advantage in the job market',
            subtitle: 'Every tool you need to go from applicant to offer — powered by AI.',
            aiModelTitle: 'AI Hiring Model',
            aiModelDesc: 'Learns from every job application and adapts its predictions to find you the highest-probability opportunities.',
            resumeTitle: 'Resume Studio',
            resumeDesc: 'AI-powered resume optimization with real-time scoring on skill density, impact statements, and keyword coverage.',
            jobQueueTitle: 'Smart Job Queue',
            jobQueueDesc: 'Curated job listings ranked by your hiring probability. Stop guessing, start applying with confidence.',
            digitalPresenceTitle: 'LinkedIn + GitHub Score',
            digitalPresenceDesc: 'Analyse your professional digital presence and compare against market benchmarks for your target role.',
        }
    },
    tr: {
        nav: {
            features: 'Özellikler',
            pricing: 'Fiyatlandırma',
            about: 'Hakkımızda',
            signIn: 'Giriş Yap',
            startTrial: 'Ücretsiz Dene',
        },
        hero: {
            badge: '7 Günlük Ücretsiz Deneme — Kredi Kartı Gerekmez',
            title1: 'Hayalindeki',
            title2: 'İşi Bul',
            title3: 'Yapay zeka hassasiyetiyle.',
            subtitle: 'PIOE, profilinizden öğrenen ve hangi işlerden mülakat alma olasılığınızın yüksek olduğunu tahmin eden kişisel bir işe alım modeli oluşturur.',
            ctaPrimary: 'Hemen Başla',
            ctaSecondary: 'Giriş Yap',
        },
        dashboard: {
            resumeScore: 'CV Puanı',
            linkedin: 'LinkedIn',
            github: 'GitHub',
            match: 'uyum',
        },
        stats: {
            activeUsers: 'Aktif Kullanıcı',
            avgMatch: 'Ort. Uyum Oranı',
            jobsMatched: 'Eşleşen İşler',
            fasterHiring: 'Daha Hızlı İşe Alım',
        },
        features: {
            badge: 'Özellikler',
            title: 'İş piyasasında haksız avantajınız',
            subtitle: 'Başvurudan teklife kadar ihtiyacınız olan her araç — yapay zeka destekli.',
            aiModelTitle: 'Yapay Zeka İşe Alım Modeli',
            aiModelDesc: 'Her iş başvurusundan öğrenir ve en yüksek olasılıklı fırsatları bulmak için tahminlerini uyarlar.',
            resumeTitle: 'CV Stüdyosu',
            resumeDesc: 'Beceri yoğunluğu, etki ifadeleri ve anahtar kelime kapsamı üzerinde gerçek zamanlı puanlama ile AI destekli CV optimizasyonu.',
            jobQueueTitle: 'Akıllı İş Kuyruğu',
            jobQueueDesc: 'İşe alınma olasılığınıza göre sıralanmış küratörlü iş ilanları. Tahmin etmeyi bırakın, güvenle başvurun.',
            digitalPresenceTitle: 'LinkedIn + GitHub Puanı',
            digitalPresenceDesc: 'Profesyonel dijital varlığınızı analiz edin ve hedef rolünüz için pazar kriterleriyle karşılaştırın.',
        }
    },
    es: {
        nav: {
            features: 'Características',
            pricing: 'Precios',
            about: 'Nosotros',
            signIn: 'Iniciar Sesión',
            startTrial: 'Prueba Gratis',
        },
        hero: {
            badge: 'Prueba gratuita de 7 días - No se requiere tarjeta de crédito',
            title1: 'Consigue el',
            title2: 'Trabajo Ideal',
            title3: 'con precisión de IA.',
            subtitle: 'PIOE crea un modelo de contratación personal que aprende de tu perfil y predice en qué trabajos obtendrás realmente una entrevista.',
            ctaPrimary: 'Empieza Gratis',
            ctaSecondary: 'Iniciar Sesión',
        },
        dashboard: {
            resumeScore: 'Puntuación CV',
            linkedin: 'LinkedIn',
            github: 'GitHub',
            match: 'coincidencia',
        },
        stats: {
            activeUsers: 'Usuarios Activos',
            avgMatch: 'Tasa de Coincidencia',
            jobsMatched: 'Trabajos Encontrados',
            fasterHiring: 'Contratación Rápida',
        },
        features: {
            badge: 'Características',
            title: 'Tu ventaja injusta en el mercado laboral',
            subtitle: 'Cada herramienta que necesitas para pasar de solicitante a oferta, impulsada por IA.',
            aiModelTitle: 'Modelo de Contratación IA',
            aiModelDesc: 'Aprende de cada solicitud de empleo y adapta sus predicciones para encontrarte las oportunidades con mayor probabilidad.',
            resumeTitle: 'Estudio de CV',
            resumeDesc: 'Optimización de CV impulsada por IA con puntuación en tiempo real sobre densidad de habilidades y cobertura de palabras clave.',
            jobQueueTitle: 'Cola de Empleos Inteligente',
            jobQueueDesc: 'Anuncios de empleo seleccionados según tu probabilidad de contratación. Deja de adivinar, empieza a aplicar con confianza.',
            digitalPresenceTitle: 'Puntuación LinkedIn + GitHub',
            digitalPresenceDesc: 'Analiza tu presencia digital profesional y compárala con los referentes del mercado para tu puesto objetivo.',
        }
    }
}

export function useI18n() {
    const [lang, setLang] = useState<'en' | 'tr' | 'es'>('en')

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as 'en' | 'tr' | 'es'
        if (savedLang && translations[savedLang]) {
            setLang(savedLang)
        }
    }, [])

    return {
        t: translations[lang] || translations.en,
        lang
    }
}
