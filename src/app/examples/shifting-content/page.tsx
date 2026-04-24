'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ShiftingContent() {
  const [menuOpen, setMenuOpen] = useState(false)

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
          <h1 className="text-3xl font-bold text-foreground">Shifting Content</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Click the links below to see content that shifts its position. This can cause issues with automated tests that rely on element positions.
            </p>
          </div>

          <div className="space-y-4">
            <a
              href="#example1"
              className="block p-4 rounded-lg bg-card border border-border hover:border-accent hover:bg-accent/5 transition-all"
            >
              <h3 className="font-semibold text-foreground">Example 1: Menu Element</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Clicking this link will shift the page content due to the appearing menu element above.
              </p>
            </a>

            <a
              href="#example2"
              className="block p-4 rounded-lg bg-card border border-border hover:border-accent hover:bg-accent/5 transition-all"
            >
              <h3 className="font-semibold text-foreground">Example 2: An Image</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Clicking this link will load an image that shifts content below it.
              </p>
            </a>

            <a
              href="#example3"
              className="block p-4 rounded-lg bg-card border border-border hover:border-accent hover:bg-accent/5 transition-all"
            >
              <h3 className="font-semibold text-foreground">Example 3: Both</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Clicking this link will trigger multiple content shifts.
              </p>
            </a>
          </div>

          <div id="example1" className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {menuOpen ? 'Close' : 'Open'} Menu
            </button>
            {menuOpen && (
              <div className="mt-4 p-4 bg-card rounded-lg border border-border">
                <p className="text-foreground">This menu element causes content below to shift when opened or closed.</p>
              </div>
            )}
          </div>

          <div id="example2" className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <button
              onClick={() => {
                const img = document.createElement('img')
                img.src = 'https://via.placeholder.com/600x200.png?text=Shifting+Content'
                img.className = 'w-full rounded-lg mt-4'
                img.alt = 'Shifting content image'
                const container = document.getElementById('image-container')
                if (container) {
                  container.innerHTML = ''
                  container.appendChild(img)
                }
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Load Image
            </button>
            <div id="image-container" className="mt-4"></div>
          </div>

          <div id="example3" className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mb-4"
            >
              {menuOpen ? 'Close' : 'Open'} Menu and Load Image
            </button>
            {menuOpen && (
              <div className="p-4 bg-card rounded-lg border border-border mb-4">
                <p className="text-foreground">Menu opened - content shifted!</p>
              </div>
            )}
            <button
              onClick={() => {
                const img = document.createElement('img')
                img.src = 'https://via.placeholder.com/600x200.png?text=More+Shifting+Content'
                img.className = 'w-full rounded-lg mt-4'
                img.alt = 'More shifting content'
                const container = document.getElementById('image-container-3')
                if (container) {
                  container.innerHTML = ''
                  container.appendChild(img)
                }
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Load Another Image
            </button>
            <div id="image-container-3" className="mt-4"></div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Content shifts can cause flaky tests if using coordinates</li>
              <li>• Use element selectors instead of absolute positions</li>
              <li>• Wait for animations and content to settle before assertions</li>
              <li>• Consider using explicit waits for dynamic content</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Shifting content example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
