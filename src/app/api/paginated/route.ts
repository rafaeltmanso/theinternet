import { NextResponse } from 'next/server'

const generateMockData = (count: number) => {
  const statuses = ['Active', 'Inactive', 'Pending', 'Completed']
  const domains = ['example.com', 'test.org', 'demo.net', 'sample.io', 'mock.dev']
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    email: `user${i + 1}@${domains[i % domains.length]}`,
    status: statuses[i % statuses.length],
    createdAt: new Date(Date.now() - (count - i) * 24 * 60 * 60 * 1000).toISOString(),
    value: Math.floor(Math.random() * 10000) / 100,
  }))
}

const allData = generateMockData(500)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const sort = searchParams.get('sort') || 'id'
  const order = searchParams.get('order') || 'asc'
  const delay = parseInt(searchParams.get('delay') || '0', 10)

  if (delay > 0 && delay <= 5000) {
    await new Promise(resolve => setTimeout(resolve, delay))
  }

  let sortedData = [...allData]
  
  sortedData.sort((a, b) => {
    let aVal: string | number | Date = a[sort as keyof typeof a] as string | number
    let bVal: string | number | Date = b[sort as keyof typeof b] as string | number
    
    if (sort === 'createdAt') {
      aVal = new Date(a.createdAt).getTime()
      bVal = new Date(b.createdAt).getTime()
    }
    
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase()
      bVal = (bVal as string).toLowerCase()
    }
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })

  const totalItems = sortedData.length
  const totalPages = Math.ceil(totalItems / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedData = sortedData.slice(startIndex, endIndex)

  return NextResponse.json({
    data: paginatedData,
    pagination: {
      page,
      limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    sort: { field: sort, order },
  })
}