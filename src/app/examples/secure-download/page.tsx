'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SecureDownload() {
  const [authenticated, setAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'admin' && password === 'password') {
      setAuthenticated(true)
    } else {
      alert('Invalid credentials')
    }
  }

  const downloadFile = () => {
    if (!authenticated) return
    const content = 'This is a secure file. You must be authenticated to download it.'
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'secure-file.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
          <h1 className="text-3xl font-bold text-foreground">Secure File Download</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          {!authenticated ? (
            <div className="p-6 rounded-lg bg-card border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Authentication Required</h2>
              <p className="text-muted-foreground mb-6">
                You must be logged in to download the secure file.
              </p>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground"
                    placeholder="Enter username (admin)"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground"
                    placeholder="Enter password (password)"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Login
                </button>
              </form>
            </div>
          ) : (
            <div className="p-6 rounded-lg bg-card border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Secure File</h2>
              <p className="text-muted-foreground mb-6">
                You are authenticated. You can now download the secure file.
              </p>
              <div className="p-4 rounded-lg bg-muted/50 border border-border mb-6">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">File:</span> secure-file.txt
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Type:</span> text/plain
                </p>
              </div>
              <button
                onClick={downloadFile}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Download Secure File
              </button>
              <button
                onClick={() => {
                  setAuthenticated(false)
                  setUsername('')
                  setPassword('')
                }}
                className="w-full mt-4 px-6 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
              >
                Logout
              </button>
            </div>
          )}

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Test that unauthenticated users cannot download</li>
              <li>• Verify authentication redirects</li>
              <li>• Test download with valid credentials</li>
              <li>• Verify session management</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Secure file download example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
