'use client'

import Link from 'next/link'

export default function MultipleWindows() {
  const openNewWindow = (url: string) => {
    window.open(url, '_blank', 'width=600,height=600')
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
          <h1 className="text-3xl font-bold text-foreground">Multiple Windows</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Click the buttons below to open new windows or tabs.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => openNewWindow('/examples/new-window')}
              className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Click Here
            </button>

            <button
              onClick={() => openNewWindow('/examples/new-window')}
              className="w-full px-6 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Open New Window
            </button>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Use <span className="font-mono">driver.getWindowHandles()</span> to get all windows</li>
              <li>• Use <span className="font-mono">driver.switchTo().window(handle)</span> to switch</li>
              <li>• Store the main window handle before opening new windows</li>
              <li>• Close windows when done: <span className="font-mono">driver.close()</span></li>
            </ul>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Some browsers block popup windows. Make sure popups are allowed in your browser settings.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Multiple windows example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
