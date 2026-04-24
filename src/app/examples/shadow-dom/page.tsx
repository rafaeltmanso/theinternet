'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function ShadowDOM() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hostRef.current && !hostRef.current.shadowRoot) {
      const shadow = hostRef.current.attachShadow({ mode: 'open' })

      shadow.innerHTML = `
        <style>
          .shadow-content {
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 8px;
            color: white;
          }
          .shadow-content h2 {
            margin: 0 0 10px 0;
            font-size: 20px;
          }
          .shadow-content p {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
          }
        </style>
        <div class="shadow-content">
          <h2>I'm inside Shadow DOM</h2>
          <p>This content is encapsulated in the Shadow DOM tree and cannot be accessed directly from the main DOM.</p>
        </div>
      `
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
          <h1 className="text-3xl font-bold text-foreground">Shadow DOM</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Shadow DOM allows for DOM encapsulation. Elements inside a shadow root are separate from the main document DOM.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Shadow DOM Example</h2>
            <div className="bg-muted rounded-lg p-4">
              <div ref={hostRef} id="shadow-host"></div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              The styled content above is rendered inside a Shadow DOM tree.
            </p>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Shadow DOM elements are not accessible via normal DOM queries</li>
              <li>• Use JavaScript execution to access shadow root: <span className="font-mono">return element.shadowRoot</span></li>
              <li>• Shadow root must be <span className="font-mono">mode: 'open'</span> to be accessible</li>
              <li>• Query elements inside shadow root using shadowRoot.querySelector</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Shadow DOM example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
