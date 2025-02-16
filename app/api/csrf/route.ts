import { NextResponse } from 'next/server';
import { setCSRFCookie } from '@/utils/csrf';

export async function GET() {
  try {
    const token = await setCSRFCookie();
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
} 