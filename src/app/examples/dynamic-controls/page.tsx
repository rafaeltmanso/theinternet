'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function DynamicControls() {
  const [enabled, setEnabled] = useState(false)

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
          <h1 className="text-3xl font-bold text-foreground">Dynamic Controls</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Enable and disable controls dynamically.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setEnabled(!enabled)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {enabled ? 'Disable' : 'Enable'} Controls
              </button>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border space-y-4">
              <div>
                <label htmlFor="text-input" className="block text-sm font-medium text-foreground mb-2">
                  Text Input
                </label>
                <input
                  id="text-input"
                  type="text"
                  disabled={!enabled}
                  placeholder={enabled ? 'Enter text...' : 'Disabled'}
                  className={`w-full px-4 py-3 border rounded-lg text-foreground focus:ring-2 transition-all ${
                    enabled
                      ? 'bg-background border-border focus:border-primary'
                      : 'bg-muted border-border opacity-50 cursor-not-allowed'
                  }`}
                />
              </div>

              <div>
                <label htmlFor="checkbox" className="block text-sm font-medium text-foreground mb-2">
                  Checkbox
                </label>
                <input
                  id="checkbox"
                  type="checkbox"
                  disabled={!enabled}
                  className="w-5 h-5 rounded border-2 bg-background text-primary focus:ring-2"
                />
              </div>

              <button
                disabled={!enabled}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Button
              </button>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                Status: <span className={enabled ? 'text-green-500' : 'text-muted-foreground'}>
                  {enabled ? 'Controls Enabled' : 'Controls Disabled'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Dynamic controls example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
