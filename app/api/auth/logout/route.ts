import { NextResponse } from 'next/server'
import { expiredSessionCookie } from '@/lib/auth'

export async function POST() {
  const response = NextResponse.json({ ok: true })
  const cookie = expiredSessionCookie()
  response.cookies.set(cookie.name, cookie.value, cookie.options)
  return response
}
