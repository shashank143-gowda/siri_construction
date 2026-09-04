// Only the public static site is allowed to read cross-origin data from this
// backend (the read-only gallery list). Admin requests are same-origin here
// (served from this same Render app under /admin), so they never need this.
const allowedOrigins = (process.env.PUBLIC_SITE_ORIGIN ?? 'https://siriconstructions.com')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

export function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get('origin')
  if (!origin || !allowedOrigins.includes(origin)) return {}
  return {
    'Access-Control-Allow-Origin': origin,
    'Vary': 'Origin',
  }
}
