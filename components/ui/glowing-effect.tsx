"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
    blur?: number;
    glow?: boolean;
    duration?: number;
    spread?: number;
    variant?: "default" | "white" | "blue" | "purple";
    disabled?: boolean;
    className?: string;
}

export const GlowingEffect = memo(
    ({
        blur = 20,
        glow = true,
        duration = 2,
        spread = 20,
        variant = "default",
        disabled = false,
        className,
    }: GlowingEffectProps) => {
        if (disabled) return null;

        const variantColors = {
            default: "from-[var(--accent-green)] to-[var(--accent-blue)]",
            white: "from-white to-white/50",
            blue: "from-[var(--accent-blue)] to-[var(--accent-purple)]",
            purple: "from-[var(--accent-purple)] to-[var(--accent-green)]",
        };

        return (
            <div
                className={cn(
                    "absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[inherit]",
                    className
                )}
            >
                <div
                    className={cn(
                        "absolute inset-[-100%] animate-[spin_var(--duration)_linear_infinite] opacity-0 transition-opacity duration-500 bg-gradient-to-r",
                        glow && "opacity-20",
                        variantColors[variant]
                    )}
                    style={
                        {
                            "--duration": `${duration}s`,
                            filter: `blur(${blur}px)`,
                            padding: spread,
                        } as React.CSSProperties
                    }
                />
            </div>
        );
    }
);

GlowingEffect.displayName = "GlowingEffect";
