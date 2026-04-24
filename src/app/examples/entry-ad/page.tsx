'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function EntryAd() {
  const [showAd, setShowAd] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setShowAd(false)
    setDismissed(true)
  }

  const handleReload = () => {
    setDismissed(false)
    setShowAd(false)
    window.location.reload()
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
          <h1 className="text-3xl font-bold text-foreground">Entry Ad</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              An advertisement modal appears after 1 second. You can dismiss it to access the page content.
            </p>
          </div>

          {showAd && !dismissed && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-card rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-2">This is a modal overlay</h2>
                  <p className="text-muted-foreground mb-4">
                    We'd love your feedback! Please take a moment to tell us what you think about this page.
                  </p>
                  <button
                    onClick={handleDismiss}
                    className="w-full px-4 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-semibold"
                  >
                    Close
                  </button>
                </div>
                <div className="bg-muted/30 px-6 py-3">
                  <p className="text-xs text-muted-foreground">
                    Modal appears on page load. Close to continue.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className={`p-6 rounded-lg bg-card border border-border ${!dismissed ? 'opacity-50' : ''}`}>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Page Content</h2>
            <p className="text-muted-foreground">
              This is the main content of the page. When you first visit, a modal advertisement will appear after 1 second.
              You need to dismiss the modal to access this content.
            </p>
            {dismissed && (
              <button
                onClick={handleReload}
                className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Reload Page
              </button>
            )}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Wait for the modal to appear (after 1 second)</li>
              <li>• Test dismissing the modal</li>
              <li>• Verify content is accessible after dismissal</li>
              <li>• Test reload to see modal again</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Entry ad example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
