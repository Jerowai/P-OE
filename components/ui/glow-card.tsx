'use client'

import { useRef, MouseEvent, ReactNode, CSSProperties } from 'react'

interface GlowCardProps {
    children: ReactNode
    className?: string
    style?: CSSProperties
    glowColor?: string
    intensity?: number
}

export function GlowCard({
    children,
    className = 'glass-card',
    style = {},
    glowColor = '0, 255, 136',
    intensity = 0.12,
}: GlowCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current
        if (!card) return

        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        card.style.background = `radial-gradient(
            600px circle at ${x}px ${y}px,
            rgba(${glowColor}, ${intensity}) 0%,
            transparent 50%
        ), var(--card-bg)`
    }

    const handleMouseLeave = () => {
        const card = cardRef.current
        if (!card) return
        card.style.background = 'var(--card-bg)'
    }

    return (
        <div
            ref={cardRef}
            className={className}
            style={{ transition: 'background 0.15s ease', ...style }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    )
}
