'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Checkboxes() {
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, checked: false, label: 'Checkbox 1' },
    { id: 2, checked: true, label: 'Checkbox 2' },
  ])

  const toggleCheckbox = (id: number) => {
    setCheckboxes(checkboxes.map(cb =>
      cb.id === id ? { ...cb, checked: !cb.checked } : cb
    ))
  }

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
          <h1 className="text-3xl font-bold text-foreground">Checkboxes</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Practice checking and unchecking checkboxes. Click on any checkbox to toggle its state.
            </p>
          </div>

          <div className="space-y-4">
            {checkboxes.map((checkbox) => (
              <label
                key={checkbox.id}
                className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card hover:border-accent hover:bg-accent/5 cursor-pointer transition-all"
              >
                <input
                  type="checkbox"
                  checked={checkbox.checked}
                  onChange={() => toggleCheckbox(checkbox.id)}
                  className="w-5 h-5 rounded border-2 border-input bg-background text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
                />
                <span className="text-foreground">{checkbox.label}</span>
              </label>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Current State:</h3>
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              {JSON.stringify(checkboxes, null, 2)}
            </pre>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Checkbox interaction example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
