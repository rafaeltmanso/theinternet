import { NextResponse } from 'next/server'
import { items, updateItem, removeItem, findItem } from '@/lib/api-store'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const item = findItem(id)

  if (!item) {
    return NextResponse.json(
      { error: 'Item not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(item)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const existing = findItem(id)
    if (!existing) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      )
    }

    // Only allow updating specific fields
    const updates: Partial<typeof existing> = {}
    if (body.name !== undefined) updates.name = body.name
    if (body.description !== undefined) updates.description = body.description

    updateItem(id, updates)
    return NextResponse.json(findItem(id))
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const existing = findItem(id)

  if (!existing) {
    return NextResponse.json(
      { error: 'Item not found' },
      { status: 404 }
    )
  }

  removeItem(id)
  return NextResponse.json({ message: 'Item deleted', item: existing })
}