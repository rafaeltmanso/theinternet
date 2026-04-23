'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DynamicContent() {
  const [content, setContent] = useState<null | { id: number; text: string }>(null)
  const [loading, setLoading] = useState(false)

  const fetchContent = () => {
    setLoading(true)
    setTimeout(() => {
      const id = Math.floor(Math.random() * 1000)
      setContent({ id, text: `Dynamic content #${id}` })
      setLoading(false)
    }, 500)
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
          <h1 className="text-3xl font-bold text-foreground">Dynamic Content</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Click the button below to fetch dynamic content.
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={fetchContent}
              disabled={loading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Get Dynamic Content'}
            </button>

            {content && (
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-2">Dynamic Content:</h3>
                <p className="text-foreground">{content.text}</p>
                <p className="text-sm text-muted-foreground mt-2">ID: {content.id}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Dynamic content example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
