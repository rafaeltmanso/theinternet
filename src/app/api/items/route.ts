import { NextResponse } from 'next/server'

let items: { id: string; name: string; description: string; createdAt: string }[] = [
  { id: '1', name: 'Item One', description: 'First test item', createdAt: new Date().toISOString() },
  { id: '2', name: 'Item Two', description: 'Second test item', createdAt: new Date().toISOString() },
  { id: '3', name: 'Item Three', description: 'Third test item', createdAt: new Date().toISOString() },
]

export async function GET() {
  return NextResponse.json({ items, total: items.length })
}

export async function POST(request: Request) {
  const body = await request.json()
  
  if (!body.name) {
    return NextResponse.json(
      { error: 'Name is required' },
      { status: 400 }
    )
  }

  const newItem = {
    id: String(Date.now()),
    name: body.name,
    description: body.description || '',
    createdAt: new Date().toISOString(),
  }

  items.push(newItem)
  return NextResponse.json(newItem, { status: 201 })
}

export async function DELETE() {
  items = []
  return NextResponse.json({ message: 'All items deleted', items: [] })
}