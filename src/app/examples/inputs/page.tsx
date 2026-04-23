'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Inputs() {
  const [values, setValues] = useState({
    number: '',
    text: '',
    password: '',
  })

  const handleChange = (field: string, value: string) => {
    setValues({ ...values, [field]: value })
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
          <h1 className="text-3xl font-bold text-foreground">Inputs</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Practice interacting with different types of input fields.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="number-input" className="block text-sm font-medium text-foreground mb-2">
                Number Input
              </label>
              <input
                id="number-input"
                type="number"
                value={values.number}
                onChange={(e) => handleChange('number', e.target.value)}
                placeholder="Enter a number..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <p className="text-xs text-muted-foreground mt-1">Only accepts numeric values</p>
            </div>

            <div>
              <label htmlFor="text-input" className="block text-sm font-medium text-foreground mb-2">
                Text Input
              </label>
              <input
                id="text-input"
                type="text"
                value={values.text}
                onChange={(e) => handleChange('text', e.target.value)}
                placeholder="Enter some text..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label htmlFor="password-input" className="block text-sm font-medium text-foreground mb-2">
                Password Input
              </label>
              <input
                id="password-input"
                type="password"
                value={values.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Enter a password..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <p className="text-xs text-muted-foreground mt-1">Characters are masked</p>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <h3 className="font-semibold text-foreground mb-2">Current Values:</h3>
              <pre className="text-sm text-muted-foreground overflow-x-auto">
                {JSON.stringify(values, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Input field interactions example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
