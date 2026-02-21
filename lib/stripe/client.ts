import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover',
})

export const PLANS = {
    monthly: {
        name: 'Monthly Subscription',
        price: 2900, // $29 in cents
        interval: 'month' as const,
        priceId: process.env.STRIPE_PRICE_MONTHLY!,
    },
    career: {
        name: 'Career Accelerator',
        price: 4900, // $49 in cents
        interval: 'month' as const,
        priceId: process.env.STRIPE_PRICE_CAREER!,
    },
    hunt: {
        name: 'Job Hunt Mode',
        price: 3900, // $39 one-time
        priceId: process.env.STRIPE_PRICE_HUNT!,
    },
} as const
