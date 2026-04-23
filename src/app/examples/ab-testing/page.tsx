'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ABTesting() {
  const [variant] = useState<'control' | 'variation'>(() =>
    Math.random() < 0.5 ? 'control' : 'variation'
  )

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Examples
          </Link>
          <h1 className="text-3xl font-bold text-foreground">A/B Testing</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              This page demonstrates A/B testing. Each time you load the page, you'll see either the control version or the variation.
            </p>
          </div>

          <div className="p-8 rounded-lg bg-card border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {variant === 'control' ? 'A/B Test Control' : 'A/B Test Variation 1'}
            </h2>

            <div className="space-y-4">
              {variant === 'control' ? (
                <>
                  <p className="text-foreground">
                    Also known as split testing. This is a way in which businesses are able to simultaneously test and learn from different versions of a page to see which version and/or element performs the best with a live audience.
                  </p>
                  <p className="text-muted-foreground">
                    This is the control version of the page.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-foreground">
                    Also known as split testing. This is a way in which businesses are able to simultaneously test and learn from different versions of a page to see which version and/or element performs the best with a live audience.
                  </p>
                  <p className="text-muted-foreground">
                    This is the variation version of the page with slightly different content for testing purposes.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-accent/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Current Variant:</h3>
            <p className="text-foreground">
              <span className="font-mono">{variant}</span>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            A/B Testing example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
