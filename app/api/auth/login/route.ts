import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { createSession, sessionCookie } from '@/lib/auth'
import { adminsCollection, ensureModelIndexes } from '@/lib/models'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''

    if (!email || !password || email.length > 254 || password.length > 256) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    await ensureModelIndexes()
    const admins = await adminsCollection()
    let admin = await admins.findOne({ email })

    // The first admin is provisioned with a bcrypt hash stored server-side.
    const configuredEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
    const configuredHash = process.env.ADMIN_PASSWORD_HASH
    if (!admin && email === configuredEmail && configuredHash && await bcrypt.compare(password, configuredHash)) {
      const now = new Date()
      const result = await admins.insertOne({ email, passwordHash: configuredHash, createdAt: now, updatedAt: now })
      admin = await admins.findOne({ _id: result.insertedId })
    }

    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const response = NextResponse.json({ ok: true })
    const cookie = sessionCookie(await createSession({ adminId: admin._id.toString(), email: admin.email }))
    response.cookies.set(cookie.name, cookie.value, cookie.options)
    return response
  } catch (error) {
    console.error('Admin login failed', error)
    return NextResponse.json({ error: 'Unable to sign in right now.' }, { status: 500 })
  }
}
