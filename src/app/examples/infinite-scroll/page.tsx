'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function InfiniteScroll() {
  const [items, setItems] = useState<number[]>(Array.from({ length: 20 }, (_, i) => i + 1))
  const [loading, setLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const loadMore = () => {
    if (loading) return

    setLoading(true)

    setTimeout(() => {
      setItems(prev => {
        const lastItem = prev[prev.length - 1]
        const newItems = Array.from({ length: 20 }, (_, i) => lastItem + i + 1)
        return [...prev, ...newItems]
      })
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current)
    }

    return () => observer.disconnect()
  }, [loading])

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
          <h1 className="text-3xl font-bold text-foreground">Infinite Scroll</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Scroll down to load more items. New items are loaded automatically when you reach the bottom.
            </p>
          </div>

          <div className="space-y-3">
            {items.map(item => (
              <div
                key={item}
                className="p-4 rounded-lg bg-card border border-border hover:border-accent transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">Item {item}</span>
                  <span className="text-sm text-muted-foreground">Scroll down for more</span>
                </div>
              </div>
            ))}
          </div>

          <div ref={sentinelRef} className="py-8 text-center">
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                <span className="text-muted-foreground">Loading more items...</span>
              </div>
            ) : (
              <span className="text-muted-foreground">Scroll to load more</span>
            )}
          </div>

          <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground text-center">
              Total Items: <span className="text-foreground font-semibold">{items.length}</span>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Infinite scroll example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
