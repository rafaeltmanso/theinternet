import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    // Return 401 with WWW-Authenticate header for Digest
    // Note: This is a simplified implementation - real digest auth is more complex
    return NextResponse.json(
      { error: 'Authentication required' },
      {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Digest realm="Digest Auth Realm", qop="auth", nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093", opaque="5ccc069c403ebaf9f0171e9517f40e41"',
        },
      }
    )
  }

  // For demo purposes, accept basic auth but treat it as digest
  // Real digest auth requires parsing the auth header and validating the response
  const authValue = authHeader.split(' ')[1]
  if (!authValue) {
    return NextResponse.json(
      { error: 'Invalid authorization format' },
      {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Digest realm="Digest Auth Realm", qop="auth", nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093", opaque="5ccc069c403ebaf9f0171e9517f40e41"',
        },
      }
    )
  }

  // Decode base64 credentials
  const decoded = Buffer.from(authValue, 'base64').toString('utf-8')
  const [username, password] = decoded.split(':')

  // Validate credentials
  if (username === 'admin' && password === 'password') {
    return NextResponse.json({ success: true, message: 'Digest authentication successful' })
  }

  return NextResponse.json(
    { error: 'Invalid credentials' },
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Digest realm="Digest Auth Realm", qop="auth", nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093", opaque="5ccc069c403ebaf9f0171e9517f40e41"',
      },
    }
  )
}
