'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HorizontalSlider() {
  const [value, setValue] = useState<number>(5)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value))
  }

  const rangeValue = Math.round((value / 10) * 5)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Examples
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Horizontal Slider</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Move the slider to change its value.
            </p>
          </div>

          <div className="p-8 rounded-lg bg-card border border-border">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Range Slider</h3>
              <div className="space-y-4">
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={value}
                  onChange={handleChange}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2 mb-6">
              {[0, 1, 2, 3, 4, 5].map(num => (
                <div
                  key={num}
                  className={`h-12 flex items-center justify-center rounded-lg border-2 font-semibold transition-all ${
                    rangeValue >= num
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted text-muted-foreground border-border'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-foreground">
                Slider Value: <span className="font-mono font-bold text-xl">{value}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Range (0-5): <span className="font-mono">{rangeValue}</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Horizontal slider example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
