'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploaded, setUploaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setUploaded(false)
    }
  }

  const handleUpload = () => {
    if (file) {
      setUploaded(true)
    }
  }

  const handleChooseFile = () => {
    fileInputRef.current?.click()
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
          <h1 className="text-3xl font-bold text-foreground">File Uploader</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Choose a file from your computer and then upload it.
            </p>
          </div>

          <div className="p-8 rounded-lg bg-card border border-border">
            <div className="space-y-6">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />

              <div className="flex gap-4">
                <button
                  onClick={handleChooseFile}
                  className="flex-1 px-6 py-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                >
                  Choose File
                </button>

                <button
                  onClick={handleUpload}
                  disabled={!file}
                  className="flex-1 px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload
                </button>
              </div>

              {file && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <p className="text-sm text-muted-foreground">
                    Selected file: <span className="text-foreground font-semibold">{file.name}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Size: {(file.size / 1024).toFixed(2)} KB • Type: {file.type || 'Unknown'}
                  </p>
                </div>
              )}

              {uploaded && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-green-500 font-semibold">
                    File Uploaded Successfully!
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {file?.name} has been uploaded.
                  </p>
                </div>
              )}
            </div>
          </div>

          {!file && (
            <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground text-center">
                No file chosen. Click "Choose File" to select a file.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            File upload example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
