import { NextResponse } from 'next/server';
import { setCSRFCookie } from '@/utils/csrf';

export async function GET() {
  try {
    const { token, response } = await setCSRFCookie();
    return NextResponse.json({ token }, response);
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
} 