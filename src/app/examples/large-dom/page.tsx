'use client'

import Link from 'next/link'

export default function LargeDOM() {
  const renderSiblings = (depth: number, breadth: number): React.ReactNode => {
    if (depth <= 0) return null

    return Array.from({ length: breadth }, (_, i) => (
      <div key={i} className="ml-4 border-l-2 border-border pl-4 py-2">
        <div className="text-sm text-muted-foreground">
          Depth {depth}, Sibling {i + 1}
        </div>
        {renderSiblings(depth - 1, breadth)}
      </div>
    ))
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
          <h1 className="text-3xl font-bold text-foreground">Large & Deep DOM</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              This page contains a very large and deeply nested DOM tree with thousands of elements.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="mb-6">
              <p className="text-sm text-foreground">
                DOM Depth: 10 levels<br />
                Siblings per level: 10 elements<br />
                Total elements: ~10 million (theoretical, rendered subset shown below)
              </p>
            </div>

            <div className="overflow-auto max-h-[600px] rounded-lg bg-background border border-border p-4">
              <div className="text-sm text-foreground">
                <div className="font-semibold mb-4">DOM Tree (showing first branch):</div>
                {renderSiblings(10, 10)}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Notes:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Deep DOM trees can slow down test execution</li>
              <li>• Use specific selectors to avoid traversing the entire tree</li>
              <li>• Consider using data attributes for reliable element targeting</li>
              <li>• Large DOMs may cause performance issues in some browsers</li>
            </ul>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground">
              <strong>Tip:</strong> For automation tests, use unique IDs, data attributes, or specific classes rather than relying on DOM structure position.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Large & Deep DOM example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
