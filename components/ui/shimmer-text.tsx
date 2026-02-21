'use client'

import { CSSProperties, ReactNode } from 'react'

interface ShimmerTextProps {
    children: ReactNode
    className?: string
    shimmerWidth?: number
    speed?: number
}

export function ShimmerText({
    children,
    className = '',
    shimmerWidth = 100,
    speed = 2.5,
}: ShimmerTextProps) {
    return (
        <span
            className={className}
            style={{
                display: 'inline-block',
                backgroundImage: `linear-gradient(
                    90deg,
                    #E8E8F0 0%,
                    #E8E8F0 40%,
                    #00FF88 50%,
                    #00BFFF 55%,
                    #E8E8F0 60%,
                    #E8E8F0 100%
                )`,
                backgroundSize: `${shimmerWidth * 3}% 100%`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                animation: `shimmer-slide ${speed}s linear infinite`,
            } as CSSProperties}
        >
            {children}
            <style>{`
                @keyframes shimmer-slide {
                    from { background-position: 0% center; }
                    to { background-position: -200% center; }
                }
            `}</style>
        </span>
    )
}

export function GradientText({
    children,
    className = '',
    from = '#00FF88',
    to = '#00BFFF',
}: {
    children: ReactNode
    className?: string
    from?: string
    to?: string
}) {
    return (
        <span
            className={className}
            style={{
                background: `linear-gradient(135deg, ${from}, ${to})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
            } as CSSProperties}
        >
            {children}
        </span>
    )
}
