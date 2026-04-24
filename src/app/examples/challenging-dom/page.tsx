'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ChallengingDOM() {
  const [buttons, setButtons] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      label: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit', 'Sed', 'Do'][i]
    }))
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setButtons(prev => {
        const shuffled = [...prev].sort(() => Math.random() - 0.5)
        return shuffled.map((btn, index) => ({
          ...btn,
          label: ['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit', 'Sed', 'Do'][Math.floor(Math.random() * 10)]
        }))
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleClick = (id: number) => {
    alert(`Button ${id} was clicked`)
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
          <h1 className="text-3xl font-bold text-foreground">Challenging DOM</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              The buttons and text below change randomly every second, making it challenging to interact with specific elements.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border space-y-4">
            <div className="flex flex-wrap gap-2">
              {buttons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => handleClick(btn.id)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-foreground border-b border-border">
                      {['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit', 'Sed', 'Do'][Math.floor(Math.random() * 10)]}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-foreground border-b border-border">
                      {['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit', 'Sed', 'Do'][Math.floor(Math.random() * 10)]}
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold text-foreground border-b border-border">
                      {['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit', 'Sed', 'Do'][Math.floor(Math.random() * 10)]}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map(row => (
                    <tr key={row}>
                      <td className="px-4 py-2 text-sm text-foreground border-b border-border/50">
                        {['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit', 'Sed', 'Do'][Math.floor(Math.random() * 10)]}
                      </td>
                      <td className="px-4 py-2 text-sm text-foreground border-b border-border/50">
                        {['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit', 'Sed', 'Do'][Math.floor(Math.random() * 10)]}
                      </td>
                      <td className="px-4 py-2 text-sm text-foreground border-b border-border/50">
                        {['Lorem', 'Ipsum', 'Dolor', 'Sit', 'Amet', 'Consectetur', 'Adipiscing', 'Elit', 'Sed', 'Do'][Math.floor(Math.random() * 10)]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Challenge:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Button labels change randomly every second</li>
              <li>• Table content also changes randomly</li>
              <li>• Try to click a button before it changes</li>
              <li>• Use stable selectors or attributes for automation</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Challenging DOM example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
