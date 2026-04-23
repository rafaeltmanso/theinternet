'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function WYSIWYGEditor() {
  const [content, setContent] = useState('')

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    setContent(document.getElementById('editor')?.innerHTML || '')
  }

  const handleInput = () => {
    setContent(document.getElementById('editor')?.innerHTML || '')
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
          <h1 className="text-3xl font-bold text-foreground">WYSIWYG Editor</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Type into the editor below. Use the toolbar buttons to format text.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                onClick={() => execCommand('bold')}
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 font-bold"
                title="Bold"
              >
                B
              </button>
              <button
                onClick={() => execCommand('italic')}
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 italic"
                title="Italic"
              >
                I
              </button>
              <button
                onClick={() => execCommand('underline')}
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 underline"
                title="Underline"
              >
                U
              </button>
              <div className="w-px bg-border mx-2"></div>
              <button
                onClick={() => execCommand('justifyLeft')}
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
                title="Align Left"
              >
                ←
              </button>
              <button
                onClick={() => execCommand('justifyCenter')}
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
                title="Align Center"
              >
                ↔
              </button>
              <button
                onClick={() => execCommand('justifyRight')}
                className="px-3 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
                title="Align Right"
              >
                →
              </button>
            </div>

            <div
              id="editor"
              contentEditable
              onInput={handleInput}
              className="min-h-64 p-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              style={{ minHeight: '256px' }}
            ></div>

            {content && (
              <div className="mt-4">
                <h3 className="font-semibold text-foreground mb-2">HTML Output:</h3>
                <pre className="p-4 bg-muted rounded-lg text-xs text-muted-foreground overflow-x-auto">
                  {content}
                </pre>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Type text directly into the contenteditable area</li>
              <li>• Use toolbar buttons to apply formatting</li>
              <li>• Check the HTML output to verify formatting</li>
              <li>• Test keyboard shortcuts (Ctrl+B, Ctrl+I, etc.)</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            WYSIWYG editor example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
