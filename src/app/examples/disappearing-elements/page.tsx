'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DisappearingElements() {
  const [visibleButtons, setVisibleButtons] = useState<string[]>(['home', 'about', 'contact', 'portfolio'])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleButtons(prev => {
        const available = ['home', 'about', 'contact', 'portfolio']
        const randomButton = available[Math.floor(Math.random() * available.length)]

        if (prev.includes(randomButton)) {
          return prev.filter(btn => btn !== randomButton)
        } else {
          return [...prev, randomButton]
        }
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const buttonLabels = {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    portfolio: 'Portfolio',
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
          <h1 className="text-3xl font-bold text-foreground">Disappearing Elements</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Watch as the buttons below randomly appear and disappear every few seconds.
            </p>
          </div>

          <div className="p-8 rounded-lg bg-card border border-border space-y-4">
            <div className="flex gap-4 flex-wrap">
              {['home', 'about', 'contact', 'portfolio'].map(btn => (
                <button
                  key={btn}
                  disabled={!visibleButtons.includes(btn)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    visibleButtons.includes(btn)
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  {buttonLabels[btn as keyof typeof buttonLabels]}
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Visible Buttons: <span className="text-foreground font-semibold">{visibleButtons.length}/4</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Current: {visibleButtons.map(btn => buttonLabels[btn as keyof typeof buttonLabels]).join(', ') || 'None'}
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">How it works:</h3>
            <p className="text-sm text-muted-foreground">
              Each button randomly toggles its visibility every 2 seconds. Use this to practice handling elements that may or may not be present during testing.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Disappearing elements example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
