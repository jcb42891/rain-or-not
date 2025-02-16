import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateCSRFToken } from '@/utils/csrf'

// Simple rate limiting map
const rateLimit = new Map()

// Rate limit configuration
const RATE_LIMIT_DURATION = 60 * 1000 // 1 minute
const MAX_REQUESTS = 10 // requests per minute

export async function middleware(request: NextRequest) {
  // Only apply to weather API route
  if (request.nextUrl.pathname === '/api/weather') {
    // Check if it's a POST request
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed' },
        { status: 405 }
      )
    }

    // Check origin
    const origin = request.headers.get('origin')
    if (!origin || !origin.includes(process.env.NEXT_PUBLIC_SITE_URL || '')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Rate limiting
    const ip = request.ip || '127.0.0.1'
    const now = Date.now()
    const userRequests = rateLimit.get(ip) || []
    const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_DURATION)

    if (recentRequests.length >= MAX_REQUESTS) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    rateLimit.set(ip, [...recentRequests, now])

    // Validate CSRF token
    if (!validateCSRFToken(request)) {
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      )
    }

    // Add security headers
    const response = NextResponse.next()
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'same-origin')

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/weather', '/api/csrf']
} 