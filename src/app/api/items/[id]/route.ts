import { NextResponse } from 'next/server'

let items: { id: string; name: string; description: string; createdAt: string }[] = [
  { id: '1', name: 'Item One', description: 'First test item', createdAt: new Date().toISOString() },
  { id: '2', name: 'Item Two', description: 'Second test item', createdAt: new Date().toISOString() },
  { id: '3', name: 'Item Three', description: 'Third test item', createdAt: new Date().toISOString() },
]

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const item = items.find(i => i.id === id)

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
  const { id } = await params
  const body = await request.json()
  const index = items.findIndex(i => i.id === id)

  if (index === -1) {
    return NextResponse.json(
      { error: 'Item not found' },
      { status: 404 }
    )
  }

  items[index] = { ...items[index], ...body }
  return NextResponse.json(items[index])
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const index = items.findIndex(i => i.id === id)

  if (index === -1) {
    return NextResponse.json(
      { error: 'Item not found' },
      { status: 404 }
    )
  }

  const deleted = items.splice(index, 1)[0]
  return NextResponse.json({ message: 'Item deleted', item: deleted })
}