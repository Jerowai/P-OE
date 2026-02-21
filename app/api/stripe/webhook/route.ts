import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
    const body = await request.text()
    const sig = request.headers.get('stripe-signature')!

    let event

    try {
        event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err) {
        console.error('Webhook signature verification failed:', err)
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const supabase = await createClient()

    switch (event.type) {
        case 'customer.subscription.trial_will_end': {
            // Deneme 48 saat sonra bitiyor → Day 6 email
            const subscription = event.data.object
            const customerId = subscription.customer as string

            const { data: user } = await supabase
                .from('users')
                .select('id, email')
                .eq('stripe_customer_id', customerId)
                .single()

            if (user) {
                console.log(`Trial ending soon for user ${user.id} — send email`)
                // TODO: Resend ile email gönder
            }
            break
        }

        case 'customer.subscription.deleted':
        case 'invoice.payment_failed': {
            const subscription = event.data.object
            const customerId = (subscription as { customer: string }).customer

            await supabase
                .from('users')
                .update({ subscription_status: 'cancelled' })
                .eq('stripe_customer_id', customerId)
            break
        }

        case 'customer.subscription.updated': {
            const subscription = event.data.object
            const customerId = subscription.customer as string
            const status = subscription.status

            if (status === 'active') {
                await supabase
                    .from('users')
                    .update({
                        subscription_status: 'active',
                        stripe_subscription_id: subscription.id,
                    })
                    .eq('stripe_customer_id', customerId)
            }
            break
        }

        case 'checkout.session.completed': {
            const session = event.data.object
            const userId = session.metadata?.user_id

            if (userId && session.subscription) {
                await supabase
                    .from('users')
                    .update({
                        subscription_status: 'trial',
                        stripe_subscription_id: session.subscription as string,
                    })
                    .eq('id', userId)
            }
            break
        }
    }

    return NextResponse.json({ received: true })
}
