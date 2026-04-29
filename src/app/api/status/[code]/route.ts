import { NextResponse } from 'next/server'

const statusMessages: Record<number, string> = {
  200: 'OK - The request succeeded',
  201: 'Created - Resource successfully created',
  204: 'No Content - Request succeeded with no content',
  301: 'Moved Permanently - Resource has moved',
  302: 'Found - Resource temporarily moved',
  400: 'Bad Request - Invalid request format',
  401: 'Unauthorized - Authentication required',
  403: 'Forbidden - Access denied',
  404: 'Not Found - Resource not found',
  405: 'Method Not Allowed',
  408: 'Request Timeout',
  422: 'Unprocessable Entity',
  429: 'Too Many Requests',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params
  const statusCode = parseInt(code, 10)

  if (isNaN(statusCode) || statusCode < 100 || statusCode > 599) {
    return NextResponse.json(
      { error: 'Invalid status code. Use a number between 100-599' },
      { status: 400 }
    )
  }

  const message = statusMessages[statusCode] || 'Unknown status'

  return NextResponse.json(
    {
      status: statusCode,
      message,
      description: getDescription(statusCode),
    },
    { status: statusCode }
  )
}

function getDescription(code: number): string {
  if (code >= 200 && code < 300) return 'Success responses'
  if (code >= 300 && code < 400) return 'Redirection messages'
  if (code >= 400 && code < 500) return 'Client error responses'
  if (code >= 500) return 'Server error responses'
  return 'Informational responses'
}