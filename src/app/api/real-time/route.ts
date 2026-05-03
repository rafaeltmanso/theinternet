import { NextResponse } from 'next/server'

let notifications: { id: number; message: string; timestamp: string; type: string }[] = []
let idCounter = 0

const sampleData = [
  { message: 'Server usage at 45%', type: 'info' },
  { message: 'New user registered', type: 'success' },
  { message: 'Backup completed', type: 'success' },
  { message: 'High memory usage detected', type: 'warning' },
  { message: 'API rate limit approaching', type: 'warning' },
  { message: 'Scheduled maintenance in 1 hour', type: 'info' },
  { message: 'New login from unknown device', type: 'error' },
  { message: 'Cache cleared successfully', type: 'success' },
  { message: 'Database connection slow', type: 'warning' },
  { message: 'New comment on your post', type: 'info' },
]

function generateNotification() {
  const data = sampleData[Math.floor(Math.random() * sampleData.length)]
  idCounter++
  return {
    id: idCounter,
    ...data,
    timestamp: new Date().toISOString(),
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const subscribe = searchParams.get('subscribe') === 'true'
  const action = searchParams.get('action')

  if (subscribe && action === 'start') {
    const newNotification = generateNotification()
    notifications = [...notifications.slice(-19), newNotification]
    
    return NextResponse.json({
      notifications,
      total: notifications.length,
      timestamp: new Date().toISOString(),
    })
  }

  if (action === 'stop') {
    return NextResponse.json({
      notifications,
      total: notifications.length,
      status: 'stopped',
    })
  }

  return NextResponse.json({
    notifications,
    total: notifications.length,
    timestamp: new Date().toISOString(),
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (body.action === 'clear') {
      notifications = []
      return NextResponse.json({ message: 'Notifications cleared', notifications: [] })
    }

    if (body.message) {
      const newNotification = {
        id: ++idCounter,
        message: body.message,
        type: body.type || 'info',
        timestamp: new Date().toISOString(),
      }
      notifications = [...notifications.slice(-19), newNotification]
      return NextResponse.json(newNotification, { status: 201 })
    }

    return NextResponse.json(
      { error: 'Invalid request. Provide { action: "clear" } or { message, type }' },
      { status: 400 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    )
  }
}