import { NextResponse } from 'next/server'
import { items, generateItemId, addItem, clearItems } from '@/lib/api-store'

export async function GET() {
  return NextResponse.json({ items, total: items.length })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    const newItem = {
      id: generateItemId(),
      name: body.name,
      description: body.description || '',
      createdAt: new Date().toISOString(),
    }

    addItem(newItem)
    return NextResponse.json(newItem, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    )
  }
}

export async function DELETE() {
  clearItems()
  return NextResponse.json({ message: 'All items deleted', items: [] })
}
