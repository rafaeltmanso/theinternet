'use client'

import Link from 'next/link'

export default function NestedFrames() {
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
          <h1 className="text-3xl font-bold text-foreground">Nested Frames</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Working with nested iframes (frames within frames).
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">Nested Iframe Example</h2>
            <div className="bg-muted rounded-lg p-4">
              <iframe
                src="data:text/html,%3Chtml%3E%3Cbody%3E%3Ch2%3EOuter%20Iframe%3C/h2%3E%3Ciframe%20src=%22data:text/html,%253Chtml%253E%253Cbody%253E%253Ch1%253EInner%2520Iframe%253C/h1%253E%253Cp%253ENested%2520two%2520levels%2520deep.%253C/p%253E%253C/body%253E%253C/html%253E%22%20height=%22100%22%20width=%22100%22%3E%3C/iframe%3E%3C/body%3E%3C/html%3E"
                className="w-full h-80 border-0 rounded"
                title="Nested Iframe Example"
              />
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Frame Structure:</h3>
            <div className="text-sm text-muted-foreground font-mono">
              <div className="ml-0">• Main Page</div>
              <div className="ml-4">• Iframe (Level 1)</div>
              <div className="ml-8">• Iframe (Level 2)</div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Switch to frame: <span className="font-mono">driver.switchTo().frame(0)</span></li>
              <li>• Then switch to nested frame: <span className="font-mono">driver.switchTo().frame(0)</span></li>
              <li>• To go back up: <span className="font-mono">driver.switchTo().parentFrame()</span></li>
              <li>• To exit all: <span className="font-mono">driver.switchTo().defaultContent()</span></li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Nested frames example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
