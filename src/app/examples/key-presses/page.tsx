'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function KeyPresses() {
  const [lastKey, setLastKey] = useState<string>('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    setLastKey(e.key)
  }

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
          <h1 className="text-3xl font-bold text-foreground">Key Presses</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Press any key and see it displayed below.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="key-input" className="block text-sm font-medium text-foreground mb-2">
                Key Input
              </label>
              <input
                id="key-input"
                type="text"
                onKeyDown={handleKeyDown}
                placeholder="Press any key..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                autoFocus
              />
            </div>

            {lastKey && (
              <div className="p-6 rounded-lg bg-accent/50 border border-border text-center">
                <p className="text-sm text-muted-foreground mb-2">Last Key Pressed:</p>
                <p className="text-4xl font-bold text-foreground">{lastKey}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Keyboard input capture example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
