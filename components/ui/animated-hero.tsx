'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/context'

export function AnimatedHero() {
    const { t } = useLanguage()
    const [titleNumber, setTitleNumber] = useState(0)

    const titles = useMemo(
        () => [
            t.hero.headline2,
            'Top Offers',
            'Dream Career',
            'Next Interview',
            'Job Offer',
        ],
        [t.hero.headline2]
    )

    useEffect(() => {
        const id = setTimeout(() => {
            setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1))
        }, 2200)
        return () => clearTimeout(id)
    }, [titleNumber, titles])

    return (
        <div className="w-full">
            <div className="container mx-auto px-6">
                <div className="flex gap-6 py-24 lg:py-40 items-center justify-center flex-col">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="badge">
                            <Sparkles className="w-3 h-3" />
                            {t.hero.badge}
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex gap-3 flex-col items-center"
                    >
                        <h1 className="text-5xl md:text-7xl max-w-3xl tracking-tighter text-center font-bold leading-tight">
                            <span className="text-foreground">{t.hero.headline1} </span>
                            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 h-[1.2em]">
                                &nbsp;
                                {titles.map((title, index) => (
                                    <motion.span
                                        key={index}
                                        className="absolute font-bold text-accent-brand"
                                        initial={{ opacity: 0, y: 60 }}
                                        transition={{ type: 'spring', stiffness: 60, damping: 14 }}
                                        animate={
                                            titleNumber === index
                                                ? { y: 0, opacity: 1 }
                                                : { y: titleNumber > index ? -60 : 60, opacity: 0 }
                                        }
                                    >
                                        {title}
                                    </motion.span>
                                ))}
                            </span>
                        </h1>

                        <p className="text-base md:text-lg leading-relaxed text-muted-foreground max-w-xl text-center mt-2">
                            {t.hero.sub}
                        </p>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-3 mt-2"
                    >
                        <Button size="lg" className="gap-2" asChild>
                            <Link href="/signup">
                                {t.hero.cta}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="gap-2" asChild>
                            <Link href="/login">
                                {t.hero.ctaSecondary}
                            </Link>
                        </Button>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}
