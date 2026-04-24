'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function JSAlerts() {
  const [result, setResult] = useState<string>('')

  const handleAlert = () => {
    alert('I am an alert box!')
    setResult('Alert dismissed')
  }

  const handleConfirm = () => {
    const confirmed = confirm('I am a confirm box!')
    setResult(confirmed ? 'You clicked: Ok' : 'You clicked: Cancel')
  }

  const handlePrompt = () => {
    const input = prompt('I am a prompt box!', 'Type something here')
    if (input === null) {
      setResult('You clicked: Cancel')
    } else {
      setResult(`You entered: ${input}`)
    }
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
          <h1 className="text-3xl font-bold text-foreground">JavaScript Alerts</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Click on each button to test different JavaScript dialog types.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <button
              onClick={handleAlert}
              className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Click for JS Alert
            </button>

            <button
              onClick={handleConfirm}
              className="w-full px-6 py-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors"
            >
              Click for JS Confirm
            </button>

            <button
              onClick={handlePrompt}
              className="w-full px-6 py-4 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Click for JS Prompt
            </button>
          </div>

          {result && (
            <div className="p-6 rounded-lg bg-muted/50 border border-border">
              <h4 className="font-semibold text-foreground mb-2">Result:</h4>
              <p className="text-foreground">{result}</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            JavaScript dialog example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
