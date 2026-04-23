import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    // Return 401 with WWW-Authenticate header to trigger browser auth dialog
    return NextResponse.json(
      { error: 'Authentication required' },
      {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Testing Realm"',
        },
      }
    )
  }

  // Parse Basic Auth header
  const authValue = authHeader.split(' ')[1]
  if (!authValue) {
    return NextResponse.json(
      { error: 'Invalid authorization format' },
      {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Testing Realm"',
        },
      }
    )
  }

  // Decode base64 credentials
  const decoded = Buffer.from(authValue, 'base64').toString('utf-8')
  const [username, password] = decoded.split(':')

  // Validate credentials (admin / password as shown in the page)
  if (username === 'admin' && password === 'password') {
    return NextResponse.json({ success: true, message: 'Authentication successful' })
  }

  return NextResponse.json(
    { error: 'Invalid credentials' },
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Testing Realm"',
      },
    }
  )
}
