'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { RocketIcon, ArrowRightIcon, PhoneCallIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoCloud } from "@/components/ui/logo-cloud";

export function ProfessionalHero() {
    return (
        <section className="relative mx-auto w-full max-w-5xl px-6 lg:px-0">
            {/* Top Refined Shades */}
            <div
                aria-hidden="true"
                className="absolute inset-0 isolate hidden overflow-hidden lg:block pointer-events-none"
            >
                <div
                    className="absolute inset-x-0 -top-24 h-[500px] -z-10 opacity-40 mix-blend-plus-lighter contain-strict"
                    style={{
                        background: 'radial-gradient(circle 500px at 50% 0%, var(--card-border), transparent)',
                    }}
                />
            </div>

            {/* Structural Borders */}
            <div
                aria-hidden="true"
                className="absolute inset-0 mx-auto hidden w-full max-w-5xl lg:block pointer-events-none"
            >
                <div className="mask-y-from-80% absolute inset-y-0 left-0 z-10 h-full w-px bg-[var(--border-line)]" />
                <div className="mask-y-from-80% absolute inset-y-0 right-0 z-10 h-full w-px bg-[var(--border-line)]" />
            </div>

            <div className="relative flex flex-col items-center justify-center gap-8 pt-32 pb-24 text-center">
                {/* Inner Content Grid Borders */}
                <div aria-hidden="true" className="absolute inset-0 -z-1 overflow-hidden pointer-events-none">
                    <div className="absolute inset-y-0 left-4 w-px bg-gradient-to-b from-transparent via-[var(--border-line)] to-[var(--border-line)] md:left-8 opacity-50" />
                    <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-[var(--border-line)] to-[var(--border-line)] md:right-8 opacity-50" />
                    <div className="absolute inset-y-0 left-12 w-px bg-gradient-to-b from-transparent via-[var(--border-line)] to-[var(--border-line)] md:left-24 opacity-20" />
                    <div className="absolute inset-y-0 right-12 w-px bg-gradient-to-b from-transparent via-[var(--border-line)] to-[var(--border-line)] md:right-24 opacity-20" />
                </div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <a
                        className={cn(
                            "group flex w-fit items-center gap-3 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-1.5 shadow-sm transition-all hover:border-[var(--muted)]/50",
                            "animate-in fade-in slide-in-from-bottom-10 fill-mode-backwards"
                        )}
                        href="#features"
                    >
                        <RocketIcon className="size-3 text-[var(--accent)]" />
                        <span className="text-xs font-medium text-[var(--muted)]">New optimization engine live</span>
                        <span className="block h-4 border-l border-[var(--card-border)]" />
                        <ArrowRightIcon className="size-3 text-[var(--muted)] duration-150 ease-out group-hover:translate-x-1" />
                    </a>
                </motion.div>

                {/* Headline */}
                <div className="space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className={cn(
                            "text-balance text-center text-4xl font-black tracking-tighter sm:text-6xl lg:text-8xl",
                            "text-shadow-glow"
                        )}
                        style={{ lineHeight: 1 }}
                    >
                        AI Carrier Intelligence <br />
                        <span className="text-[var(--muted)] font-normal opacity-80 italic">Redefined and Refined</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mx-auto max-w-xl text-center text-base font-medium text-[var(--muted)] tracking-tight sm:text-lg md:text-xl"
                    >
                        Connect with premium global opportunities through our <br className="hidden md:block" />
                        refined neural assessment engine.
                    </motion.p>
                </div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex flex-row flex-wrap items-center justify-center gap-4 pt-4"
                >
                    <Button className="rounded-full px-8 h-12" size="lg" variant="outline">
                        <PhoneCallIcon className="size-4 mr-2" />
                        Request Demo
                    </Button>
                    <Button className="rounded-full px-10 h-12 shadow-xl shadow-[var(--accent)]/10" size="lg">
                        Start Free Path
                        <ArrowRightIcon className="size-4 ml-2" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}

export function LogosSection() {
    const logos = [
        { src: "https://storage.efferd.com/logo/nvidia-wordmark.svg", alt: "Nvidia" },
        { src: "https://storage.efferd.com/logo/supabase-wordmark.svg", alt: "Supabase" },
        { src: "https://storage.efferd.com/logo/openai-wordmark.svg", alt: "OpenAI" },
        { src: "https://storage.efferd.com/logo/vercel-wordmark.svg", alt: "Vercel" },
        { src: "https://storage.efferd.com/logo/github-wordmark.svg", alt: "GitHub" },
        { src: "https://storage.efferd.com/logo/clerk-wordmark.svg", alt: "Clerk" },
    ];

    return (
        <section className="relative space-y-8 border-t border-[var(--card-border)] py-12 px-6">
            <div className="absolute inset-0 bg-[var(--secondary)]/30 -z-10" />
            <h2 className="text-center font-bold text-sm text-[var(--muted)] uppercase tracking-[0.2em]">
                Adopted by leading <span className="text-[var(--foreground)]">industry experts</span>
            </h2>
            <div className="relative z-10 mx-auto max-w-5xl">
                <LogoCloud logos={logos} />
            </div>
        </section>
    );
}
