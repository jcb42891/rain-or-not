import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';

export async function generateToken(): Promise<string> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function setCSRFCookie() {
  const token = await generateToken();
  const response = new NextResponse();
  response.cookies.set({
    name: CSRF_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  return { token, response };
}

export function validateCSRFToken(request: NextRequest): boolean {
  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  // Debug logging
  console.log('CSRF Validation Debug:', {
    cookieToken,
    headerToken,
    hasCookie: !!cookieToken,
    hasHeader: !!headerToken,
    cookieName: CSRF_COOKIE_NAME,
    headerName: CSRF_HEADER_NAME,
    allCookies: request.cookies.getAll(),
  });

  if (!cookieToken || !headerToken) {
    console.log('Missing CSRF token', { cookieToken, headerToken });
    return false;
  }

  // Constant-time comparison
  if (cookieToken.length !== headerToken.length) {
    console.log('CSRF token length mismatch');
    return false;
  }

  let result = 0;
  for (let i = 0; i < cookieToken.length; i++) {
    result |= cookieToken.charCodeAt(i) ^ headerToken.charCodeAt(i);
  }
  
  console.log('CSRF comparison result:', { matches: result === 0 });
  return result === 0;
} 