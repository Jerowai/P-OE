'use client'

import { CSSProperties } from 'react'

interface BorderBeamProps {
    size?: number
    duration?: number
    colorFrom?: string
    colorTo?: string
    delay?: number
}

export function BorderBeam({
    size = 150,
    duration = 12,
    colorFrom = '#00FF88',
    colorTo = '#00BFFF',
    delay = 0,
}: BorderBeamProps) {
    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 'inherit',
                overflow: 'hidden',
                pointerEvents: 'none',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    inset: '-1px',
                    borderRadius: 'inherit',
                    background: `conic-gradient(from 0deg, transparent 0%, transparent 70%, ${colorFrom} 80%, ${colorTo} 90%, transparent 100%)`,
                    animation: `border-beam-spin ${duration}s linear infinite`,
                    animationDelay: `${delay}s`,
                    opacity: 0.7,
                } as CSSProperties}
            />
            <style>{`
                @keyframes border-beam-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}
