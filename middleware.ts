import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateCSRFToken } from '@/utils/csrf'

// Define types for rate limiting
type TimeStamp = number
type RateLimitMap = Map<string, TimeStamp[]>

// Simple rate limiting map
const rateLimit: RateLimitMap = new Map()

// Rate limit configuration
const RATE_LIMIT_DURATION = 60 * 1000 // 1 minute
const MAX_REQUESTS = 10 // requests per minute

function getIP(request: NextRequest) {
  // Get IP from various headers
  const xff = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (xff) {
    return xff.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  return '127.0.0.1'
}

function isValidOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  
  // Allow requests without origin header in production
  // This handles direct API calls from the same domain
  if (!origin) {
    const host = request.headers.get('host')
    return host === 'rainornot.com' || host === 'localhost:3000'
  }

  const allowedOrigins = [
    'http://localhost:3000',
    'https://rainornot.com',
  ]

  return allowedOrigins.includes(origin)
}

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
    if (!isValidOrigin(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Rate limiting
    const ip = getIP(request)
    const now = Date.now()
    const userRequests = rateLimit.get(ip) || []
    const recentRequests = userRequests.filter((time: TimeStamp) => now - time < RATE_LIMIT_DURATION)

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