'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DynamicLoading() {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState<string>('')

  const startLoading = () => {
    setLoading(true)
    setContent('')

    setTimeout(() => {
      setLoading(false)
      setContent('Hello World!')
    }, 5000)
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
          <h1 className="text-3xl font-bold text-foreground">Dynamic Loading</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Click the button to start loading. Content will appear after 5 seconds.
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={startLoading}
              disabled={loading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Start Loading'}
            </button>

            {loading && (
              <div className="p-8 rounded-lg bg-card border border-border text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
                <p className="text-muted-foreground">Loading content... Please wait.</p>
              </div>
            )}

            {content && !loading && (
              <div className="p-8 rounded-lg bg-card border border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground mb-4">{content}</p>
                  <p className="text-muted-foreground">
                    Content loaded successfully after 5 seconds.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Dynamic loading example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
