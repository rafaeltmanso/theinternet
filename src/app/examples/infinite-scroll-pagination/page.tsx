'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

type Item = {
  id: number
  name: string
  email: string
  status: string
  createdAt: string
  value: number
}

type SortConfig = {
  field: string
  order: 'asc' | 'desc'
}

export default function InfiniteScrollPagination() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [limit, setLimit] = useState(10)
  const [sort, setSort] = useState<SortConfig>({ field: 'id', order: 'asc' })
  const [error, setError] = useState('')
  const [loadDelay, setLoadDelay] = useState(500)
  const loaderRef = useRef<HTMLDivElement>(null)
  const initialLoadDone = useRef(false)

  const fetchItems = useCallback(async (pageNum: number, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }
      setError('')

      const url = `/api/paginated?page=${pageNum}&limit=${limit}&sort=${sort.field}&order=${sort.order}&delay=${loadDelay}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const result = await response.json()

      if (isLoadMore) {
        setItems(prev => [...prev, ...result.data])
      } else {
        setItems(result.data)
      }

      setTotalPages(result.pagination.totalPages)
      setTotalItems(result.pagination.totalItems)
      setHasMore(result.pagination.hasNextPage)
      setPage(result.pagination.page)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load items')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [limit, sort, loadDelay])

  const resetAndFetch = useCallback(() => {
    setItems([])
    setPage(1)
    setHasMore(true)
    initialLoadDone.current = false
    fetchItems(1, false)
  }, [fetchItems])

  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true
      fetchItems(1, false)
    }
  }, [fetchItems])

  useEffect(() => {
    const handleScroll = () => {
      if (loadingMore || loading || !hasMore) return
      
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchItems(page + 1, true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loadingMore, loading, hasMore, page, fetchItems])

  const handleSort = (field: string) => {
    const newSort = {
      field,
      order: sort.field === field && sort.order === 'asc' ? 'desc' : 'asc'
    }
    setSort(newSort)
    setTimeout(resetAndFetch, 0)
  }

  const handlePageChange = (newPage: number) => {
    fetchItems(newPage, false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'Inactive': return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
      case 'Pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'Completed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const renderPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      
      if (page > 3) pages.push('...')
      
      const start = Math.max(2, page - 1)
      const end = Math.min(totalPages - 1, page + 1)
      
      for (let i = start; i <= end; i++) pages.push(i)
      
      if (page < totalPages - 2) pages.push('...')
      
      pages.push(totalPages)
    }
    
    return pages
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Examples
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Infinite Scroll & Pagination</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              This page demonstrates infinite scroll and pagination. Scroll to the bottom to load more items automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-card border border-border">
              <label className="block text-sm font-medium text-foreground mb-2">Items per page</label>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value))
                  setTimeout(resetAndFetch, 0)
                }}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              >
                <option value={10}>10 items</option>
                <option value={25}>25 items</option>
                <option value={50}>50 items</option>
                <option value={100}>100 items</option>
              </select>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <label className="block text-sm font-medium text-foreground mb-2">Load delay</label>
              <select
                value={loadDelay}
                onChange={(e) => {
                  setLoadDelay(Number(e.target.value))
                  setTimeout(resetAndFetch, 0)
                }}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              >
                <option value={0}>No delay</option>
                <option value={200}>200ms</option>
                <option value={500}>500ms</option>
                <option value={1000}>1000ms</option>
                <option value={2000}>2000ms</option>
              </select>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <label className="block text-sm font-medium text-foreground mb-2">Status</label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Total:</span>
                <span className="text-foreground font-mono">{totalItems}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Showing:</span>
                <span className="text-foreground font-mono">{items.length}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-500">Error: {error}</p>
              <button
                onClick={() => fetchItems(page, false)}
                className="mt-2 px-4 py-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          <div className="rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th 
                      className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70"
                      onClick={() => handleSort('id')}
                    >
                      <div className="flex items-center gap-1">
                        ID
                        {sort.field === 'id' && (
                          <span className="text-primary">{sort.order === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-1">
                        Name
                        {sort.field === 'name' && (
                          <span className="text-primary">{sort.order === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                      Email
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70"
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center gap-1">
                        Status
                        {sort.field === 'status' && (
                          <span className="text-primary">{sort.order === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center gap-1">
                        Date
                        {sort.field === 'createdAt' && (
                          <span className="text-primary">{sort.order === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70"
                      onClick={() => handleSort('value')}
                    >
                      <div className="flex items-center gap-1">
                        Value
                        {sort.field === 'value' && (
                          <span className="text-primary">{sort.order === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: limit }).map((_, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="px-4 py-3"><div className="h-4 w-8 bg-muted animate-pulse rounded" /></td>
                        <td className="px-4 py-3"><div className="h-4 w-24 bg-muted animate-pulse rounded" /></td>
                        <td className="px-4 py-3"><div className="h-4 w-40 bg-muted animate-pulse rounded" /></td>
                        <td className="px-4 py-3"><div className="h-4 w-16 bg-muted animate-pulse rounded" /></td>
                        <td className="px-4 py-3"><div className="h-4 w-24 bg-muted animate-pulse rounded" /></td>
                        <td className="px-4 py-3"><div className="h-4 w-12 bg-muted animate-pulse rounded" /></td>
                      </tr>
                    ))
                  ) : (
                    items.map((item) => (
                      <tr key={item.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3 text-sm text-foreground">{item.id}</td>
                        <td className="px-4 py-3 text-sm text-foreground">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">{item.email}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground font-mono">${item.value.toFixed(2)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div ref={loaderRef} className="py-4 text-center">
            {loadingMore && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-muted-foreground">Loading more...</span>
              </div>
            )}
            {!hasMore && items.length > 0 && (
              <p className="text-muted-foreground">No more items to load</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
                className="px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {renderPageNumbers().map((p, i) => (
                typeof p === 'number' ? (
                  <button
                    key={i}
                    onClick={() => handlePageChange(p)}
                    className={`px-3 py-2 rounded-lg border text-sm ${
                      p === page
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {p}
                  </button>
                ) : (
                  <span key={i} className="px-2 text-muted-foreground">...</span>
                )
              ))}
              
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={page === totalPages}
                className="px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Last
              </button>
            </div>
          )}

          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            title="Scroll to top"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Scroll to bottom to trigger infinite scroll loading</li>
              <li>• Test pagination controls (First, Previous, Next, Last)</li>
              <li>• Change page size and verify item count updates</li>
              <li>• Click column headers to sort data</li>
              <li>• Test loading delay settings (shows skeleton)</li>
              <li>• Verify "No more items" appears at end</li>
              <li>• Scroll to top button works</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Infinite scroll and pagination example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}