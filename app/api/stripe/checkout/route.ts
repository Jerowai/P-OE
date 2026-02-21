import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    try {
        const { priceId, plan } = await request.json()

        if (!priceId) {
            return NextResponse.json({ error: 'Price ID is required' }, { status: 400 })
        }

        const supabase = await createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Please log in first' }, { status: 401 })
        }

        // Kullanıcı verisini al
        const { data: userData } = await supabase
            .from('users')
            .select('stripe_customer_id, full_name')
            .eq('id', user.id)
            .single()

        let customerId = userData?.stripe_customer_id

        // Stripe customer yoksa oluştur
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email!,
                name: userData?.full_name || user.email!,
                metadata: { supabase_user_id: user.id },
            })
            customerId = customer.id

            await supabase
                .from('users')
                .upsert({ id: user.id, email: user.email!, stripe_customer_id: customerId })
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

        // Stripe price tipini kontrol et — one-time mi recurring mi?
        const price = await stripe.prices.retrieve(priceId)
        const mode = price.type === 'recurring' ? 'subscription' : 'payment'

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            mode,
            ...(mode === 'subscription' && {
                subscription_data: { trial_period_days: 7 },
            }),
            success_url: `${appUrl}/dashboard?success=true`,
            cancel_url: `${appUrl}/dashboard?cancelled=true`,
            metadata: { user_id: user.id, plan: plan || 'monthly' },
        })

        if (!session.url) {
            return NextResponse.json({ error: 'Failed to create checkout URL' }, { status: 500 })
        }

        return NextResponse.json({ url: session.url })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        console.error('Stripe checkout error:', message)
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
