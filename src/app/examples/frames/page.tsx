'use client'

import Link from 'next/link'

export default function Frames() {
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
          <h1 className="text-3xl font-bold text-foreground">Frames</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Working with iframes in web applications.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Example Iframe</h2>
            <div className="bg-muted rounded-lg p-4">
              <iframe
                src="data:text/html,%3Chtml%3E%3Cbody%3E%3Ch1%3EInside%20Iframe%3C/h1%3E%3Cp%3EThis%20content%20is%20loaded%20inside%20an%20iframe.%3C/p%3E%3C/body%3E%3C/html%3E"
                className="w-full h-64 border-0 rounded"
                title="Example Iframe"
              />
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              To interact with elements inside an iframe, you must switch the driver context to the iframe first.
            </p>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Use <span className="font-mono">switchTo().frame()</span> to enter iframe context</li>
              <li>• Use <span className="font-mono">switchTo().defaultContent()</span> to return</li>
              <li>• Nesting requires switching multiple times</li>
              <li>• Wait for iframe to load before interacting</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Frames example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
