'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AddRemoveElements() {
  const [elements, setElements] = useState<number[]>([])

  const addElement = () => {
    setElements([...elements, Date.now()])
  }

  const removeElement = (id: number) => {
    setElements(elements.filter(el => el !== id))
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
          <h1 className="text-3xl font-bold text-foreground">Add/Remove Elements</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Click the button to add elements, then click delete to remove them.
            </p>
          </div>

          <button
            onClick={addElement}
            className="mb-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Add Element
          </button>

          <div className="space-y-3">
            {elements.map((id) => (
              <button
                key={id}
                onClick={() => removeElement(id)}
                className="w-full px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors"
              >
                Delete
              </button>
            ))}
          </div>

          {elements.length === 0 && (
            <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border text-center">
              <p className="text-muted-foreground">No elements yet. Click "Add Element" to start.</p>
            </div>
          )}

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Element Count: {elements.length}</h3>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Dynamic element manipulation example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
