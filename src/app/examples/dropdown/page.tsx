'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Dropdown() {
  const [selectedOption, setSelectedOption] = useState<string>('')

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
          <h1 className="text-3xl font-bold text-foreground">Dropdown List</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Select an option from the dropdown list below.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="dropdown" className="block text-sm font-medium text-foreground mb-2">
                Dropdown List
              </label>
              <select
                id="dropdown"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="" disabled>
                  Please select an option
                </option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </select>
            </div>

            {selectedOption && (
              <div className="p-4 rounded-lg bg-accent/50 border border-border">
                <p className="text-foreground">
                  Selected: <span className="font-semibold">Option {selectedOption}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Dropdown selection example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
