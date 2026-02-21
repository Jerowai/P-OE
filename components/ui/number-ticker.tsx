'use client'

import { useEffect, useRef, useState } from 'react'

interface NumberTickerProps {
    value: number
    duration?: number
    className?: string
    prefix?: string
    suffix?: string
    decimalPlaces?: number
}

export function NumberTicker({
    value,
    duration = 1500,
    className = '',
    prefix = '',
    suffix = '',
    decimalPlaces = 0,
}: NumberTickerProps) {
    const [display, setDisplay] = useState(0)
    const startTime = useRef<number | null>(null)
    const rafRef = useRef<number | undefined>(undefined)
    const observerRef = useRef<IntersectionObserver | undefined>(undefined)
    const containerRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const start = () => {
            startTime.current = null
            const tick = (timestamp: number) => {
                if (!startTime.current) startTime.current = timestamp
                const elapsed = timestamp - startTime.current
                const progress = Math.min(elapsed / duration, 1)
                const eased = 1 - Math.pow(1 - progress, 3)
                setDisplay(parseFloat((eased * value).toFixed(decimalPlaces)))
                if (progress < 1) {
                    rafRef.current = requestAnimationFrame(tick)
                }
            }
            rafRef.current = requestAnimationFrame(tick)
        }

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    start()
                    observerRef.current?.disconnect()
                }
            },
            { threshold: 0.3 }
        )
        observerRef.current.observe(el)

        return () => {
            observerRef.current?.disconnect()
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [value, duration, decimalPlaces])

    return (
        <span ref={containerRef} className={className}>
            {prefix}{display.toLocaleString()}{suffix}
        </span>
    )
}
