import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'siri_admin_session'
const SESSION_DURATION_SECONDS = 60 * 60 * 8

function sessionSecret() {
  const value = process.env.AUTH_SECRET
  if (!value || value.length < 32) {
    throw new Error('AUTH_SECRET must be set to a value with at least 32 characters.')
  }
  return new TextEncoder().encode(value)
}

export type AdminSession = { adminId: string; email: string }

export async function createSession(session: AdminSession) {
  return new SignJWT({ email: session.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(session.adminId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(sessionSecret())
}

export async function getSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, sessionSecret())
    if (!payload.sub || typeof payload.email !== 'string') return null
    return { adminId: payload.sub, email: payload.email }
  } catch {
    return null
  }
}

export function sessionCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: SESSION_DURATION_SECONDS,
    },
  }
}

export function expiredSessionCookie() {
  return { name: COOKIE_NAME, value: '', options: { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' as const, path: '/', maxAge: 0 } }
}
