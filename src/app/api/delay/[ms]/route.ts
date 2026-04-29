import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ ms: string }> }
) {
  const { ms } = await params
  const delayMs = parseInt(ms, 10)

  if (isNaN(delayMs) || delayMs < 0 || delayMs > 30000) {
    return NextResponse.json(
      { error: 'Invalid delay. Use a number between 0-30000 milliseconds' },
      { status: 400 }
    )
  }

  await new Promise(resolve => setTimeout(resolve, delayMs))

  return NextResponse.json({
    delayed: true,
    delayMs,
    message: `Response delayed by ${delayMs}ms`,
    timestamp: new Date().toISOString(),
  })
}