'use client'

import { useEffect, useRef } from 'react'

interface Meteor {
    x: number
    y: number
    length: number
    speed: number
    opacity: number
    angle: number
}

export function AnimatedBg({ className = '' }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const meteors: Meteor[] = Array.from({ length: 18 }, () => ({
            x: Math.random() * window.innerWidth * 2 - window.innerWidth * 0.5,
            y: Math.random() * window.innerHeight - window.innerHeight * 0.3,
            length: 80 + Math.random() * 180,
            speed: 0.8 + Math.random() * 1.6,
            opacity: 0.2 + Math.random() * 0.5,
            angle: 215, // degrees
        }))

        let animId: number
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            meteors.forEach((m) => {
                const rad = (m.angle * Math.PI) / 180
                const x2 = m.x + Math.cos(rad) * m.length
                const y2 = m.y + Math.sin(rad) * m.length

                const grad = ctx.createLinearGradient(m.x, m.y, x2, y2)
                grad.addColorStop(0, `rgba(0,255,136,${m.opacity})`)
                grad.addColorStop(0.5, `rgba(0,191,255,${m.opacity * 0.5})`)
                grad.addColorStop(1, `rgba(0,191,255,0)`)

                ctx.beginPath()
                ctx.moveTo(m.x, m.y)
                ctx.lineTo(x2, y2)
                ctx.strokeStyle = grad
                ctx.lineWidth = 1.5
                ctx.stroke()

                // Move
                m.x += Math.cos(rad) * m.speed
                m.y += Math.sin(rad) * m.speed

                // Reset when off screen
                if (m.x > canvas.width + 100 || m.y > canvas.height + 100) {
                    m.x = Math.random() * canvas.width * 0.6 - canvas.width * 0.1
                    m.y = Math.random() * canvas.height * 0.3 - canvas.height * 0.1
                    m.opacity = 0.2 + Math.random() * 0.5
                    m.length = 80 + Math.random() * 180
                    m.speed = 0.8 + Math.random() * 1.6
                }
            })

            animId = requestAnimationFrame(draw)
        }
        draw()

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    )
}
