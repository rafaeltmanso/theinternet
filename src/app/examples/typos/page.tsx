'use client'

import { useState } from 'react'
import Link from 'next/link'

const paragraphs = [
  "This is a test of the emergncy broadcast system. This is only a test. In the event of an actual emergncy, you would have been instructed where to tune for more information.",
  "Sometimes you'll see a word that has a typo and you need to find it. This paragrah has one or two typos. Can you find them? Typo detection is an important skill.",
  "The quik brown fox jumps over the lazy dog. This sentance contains deliberate mistakes. Typos can happen to anyone, even in professtional writing.",
]

export default function Typos() {
  const [foundTypos, setFoundTypos] = useState<number>(0)
  const [highlightedWords, setHighlightedWords] = useState<Set<number>>(new Set())

  const toggleHighlight = (index: number) => {
    setHighlightedWords(prev => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
        setFoundTypos(prev => prev - 1)
      } else {
        newSet.add(index)
        setFoundTypos(prev => prev + 1)
      }
      return newSet
    })
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
          <h1 className="text-3xl font-bold text-foreground">Typos</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Find and click on the misspelled words in the paragraphs below.
            </p>
          </div>

          <div className="space-y-6">
            {paragraphs.map((paragraph, pIndex) => (
              <div
                key={pIndex}
                className="p-6 rounded-lg bg-card border border-border"
              >
                <p className="text-foreground leading-relaxed">
                  {paragraph.split(' ').map((word, wIndex) => {
                    const globalIndex = `${pIndex}-${wIndex}`
                    const isHighlighted = highlightedWords.has(parseInt(globalIndex.replace(/-/g, '')))

                    const possibleTypos = ['emergncy', 'paragrah', 'quik', 'sentance', 'professtional']
                    const isTypo = possibleTypos.includes(word.replace(/[.,]/g, '').toLowerCase())

                    return (
                      <span
                        key={wIndex}
                        onClick={() => isTypo && toggleHighlight(parseInt(globalIndex.replace(/-/g, '')))}
                        className={`inline px-1 py-0.5 rounded cursor-pointer transition-colors ${
                          isTypo
                            ? isHighlighted
                              ? 'bg-yellow-500/20 text-yellow-500'
                              : 'hover:bg-yellow-500/10'
                            : ''
                        }`}
                      >
                        {word}{' '}
                      </span>
                    )
                  })}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Typos Found: {foundTypos}/5</h3>
            <p className="text-sm text-muted-foreground">
              Click on the misspelled words to highlight them. There are 5 typos total across all paragraphs.
            </p>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Answer Key:</h3>
            <p className="text-sm text-muted-foreground">
              emergncy → emergency<br />
              paragrah → paragraph<br />
              quik → quick<br />
              sentance → sentence<br />
              professtional → professional
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Typos example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
