'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function SlowResources() {
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  const [loading3, setLoading3] = useState(true)

  useEffect(() => {
    const timer1 = setTimeout(() => setLoading1(false), 5000)
    const timer2 = setTimeout(() => setLoading2(false), 10000)
    const timer3 = setTimeout(() => setLoading3(false), 15000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

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
          <h1 className="text-3xl font-bold text-foreground">Slow Resources</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              This page simulates slow loading resources. Wait for each image to load.
            </p>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-4">Image 1 (5 seconds)</h3>
              {loading1 ? (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-foreground font-semibold">Image 1 Loaded!</p>
                </div>
              )}
            </div>

            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-4">Image 2 (10 seconds)</h3>
              {loading2 ? (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-foreground font-semibold">Image 2 Loaded!</p>
                </div>
              )}
            </div>

            <div className="p-6 rounded-lg bg-card border border-border">
              <h3 className="font-semibold text-foreground mb-4">Image 3 (15 seconds)</h3>
              {loading3 ? (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                    <span className="text-muted-foreground">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-foreground font-semibold">Image 3 Loaded!</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Set appropriate timeout values in your tests</li>
              <li>• Use explicit waits instead of fixed sleeps</li>
              <li>• Test for both successful and timeout scenarios</li>
              <li>• Consider network throttling in your test environment</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Slow resources example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
