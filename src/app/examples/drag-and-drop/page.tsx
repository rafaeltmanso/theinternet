'use client'

import { useState } from 'react'
import Link from 'next/link'

type Item = {
  id: string
  content: string
  column: 'A' | 'B'
}

export default function DragAndDrop() {
  const [items, setItems] = useState<Item[]>([
    { id: 'a', content: 'A', column: 'A' },
    { id: 'b', content: 'B', column: 'B' },
    { id: 'c', content: 'C', column: 'A' },
  ])

  const [draggedItem, setDraggedItem] = useState<Item | null>(null)

  const handleDragStart = (e: React.DragEvent, item: Item) => {
    setDraggedItem(item)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetColumn: 'A' | 'B') => {
    e.preventDefault()
    if (!draggedItem) return

    setItems(items.map(item =>
      item.id === draggedItem.id
        ? { ...item, column: targetColumn }
        : item
    ))

    setDraggedItem(null)
  }

  const columnA = items.filter(item => item.column === 'A')
  const columnB = items.filter(item => item.column === 'B')

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
          <h1 className="text-3xl font-bold text-foreground">Drag and Drop</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Drag the boxes between Column A and Column B.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column A */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'A')}
              className="min-h-64 p-6 rounded-lg bg-card border-2 border-border transition-all"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">Column A</h2>
              <div className="space-y-3">
                {columnA.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="w-full h-20 flex items-center justify-center bg-accent/50 border border-border rounded-lg cursor-move hover:border-primary transition-all select-none"
                  >
                    <span className="text-2xl font-bold text-foreground">{item.content}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column B */}
            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'B')}
              className="min-h-64 p-6 rounded-lg bg-card border-2 border-border transition-all"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">Column B</h2>
              <div className="space-y-3">
                {columnB.map(item => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="w-full h-20 flex items-center justify-center bg-accent/50 border border-border rounded-lg cursor-move hover:border-primary transition-all select-none"
                  >
                    <span className="text-2xl font-bold text-foreground">{item.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Current State:</h3>
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              {JSON.stringify(
                {
                  columnA: columnA.map(i => i.content),
                  columnB: columnB.map(i => i.content),
                },
                null,
                2
              )}
            </pre>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Drag and drop example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
