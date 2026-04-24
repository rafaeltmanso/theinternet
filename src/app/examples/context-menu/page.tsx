'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContextMenu() {
  const [message, setMessage] = useState<string>('')

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setMessage('You selected a context menu')
    setTimeout(() => setMessage(''), 2000)
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
          <h1 className="text-3xl font-bold text-foreground">Context Menu</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Right-click in the box below to see the context menu.
            </p>
          </div>

          <div
            onContextMenu={handleContextMenu}
            className="p-12 rounded-lg bg-card border-2 border-border cursor-context-menu hover:border-accent transition-all"
          >
            <div className="text-center">
              <p className="text-foreground font-medium mb-2">Right-click here</p>
              <p className="text-sm text-muted-foreground">
                Context menu triggered: {message || 'None yet'}
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Instructions:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Right-click (or Ctrl+click on Mac) in the box above</li>
              <li>• A message will appear confirming the context menu was triggered</li>
              <li>• Note: The browser's native context menu is also shown</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Context menu example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
