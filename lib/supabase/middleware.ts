import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname

    // Korunan rotalar
    const protectedRoutes = ['/dashboard', '/resume', '/jobs', '/model', '/settings', '/onboarding']
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup')

    // Giriş yapılmamışsa korunan sayfaya erişim engellenir
    if (!user && isProtectedRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    // Giriş yapılmışsa auth sayfasına erişimi engelle
    if (user && isAuthRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/dashboard'
        return NextResponse.redirect(url)
    }

    // Trial/subscription kontrolü
    if (user && isProtectedRoute && pathname !== '/locked') {
        const { data: userData } = await supabase
            .from('users')
            .select('subscription_status, trial_end')
            .eq('id', user.id)
            .single()

        if (userData) {
            const isTrialExpired = userData.trial_end && new Date(userData.trial_end) < new Date()
            const isCancelled = userData.subscription_status === 'cancelled' || userData.subscription_status === 'expired'

            if (isTrialExpired || isCancelled) {
                const url = request.nextUrl.clone()
                url.pathname = '/locked'
                return NextResponse.redirect(url)
            }
        }
    }

    return supabaseResponse
}
