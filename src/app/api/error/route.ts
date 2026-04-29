import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json(
    {
      error: 'This is a simulated server error',
      code: 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
    },
    { status: 500 }
  )
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const errorType = body.type || 'general'
    
    const statusCodes: Record<string, number> = {
      bad_request: 400,
      unauthorized: 401,
      forbidden: 403,
      not_found: 404,
      rate_limit: 429,
      server_error: 500,
      bad_gateway: 502,
      service_unavailable: 503,
    }

    const statusCode = statusCodes[errorType] || 500

    return NextResponse.json(
      {
        error: `Simulated ${errorType} error`,
        code: errorType.toUpperCase(),
        timestamp: new Date().toISOString(),
      },
      { status: statusCode }
    )
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}