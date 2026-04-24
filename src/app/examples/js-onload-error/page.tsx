'use client'

import Link from 'next/link'

export default function JSOnloadError() {
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
          <h1 className="text-3xl font-bold text-foreground">JavaScript Onload Error</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 rounded-lg bg-card border border-border text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">This Page Has a JavaScript Error</h2>
            <p className="text-muted-foreground">
              The page intentionally has a JavaScript error that occurs during page load. Check your browser's console for details.
            </p>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Check browser console for JavaScript errors</li>
              <li>• Use <span className="font-mono">manage().logs().get(LogType.BROWSER)</span> in Selenium</li>
              <li>• Test how your application handles errors</li>
              <li>• Verify the page still loads despite errors</li>
            </ul>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">
              <strong>Expected Error:</strong> ReferenceError: This is an intentional JavaScript error on page load.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            JavaScript onload error example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
