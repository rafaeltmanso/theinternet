'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BasicAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // This will trigger browser's basic auth dialog if not authenticated
        const response = await fetch('/api/basic-auth?XTransformPort=3000')

        if (response.ok) {
          setAuthenticated(true)
        } else {
          setAuthenticated(false)
        }
      } catch (error) {
        setAuthenticated(false)
      } finally {
        setChecking(false)
      }
    }

    checkAuth()
  }, [])

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
          <h1 className="text-3xl font-bold text-foreground">Basic Auth</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          {checking ? (
            <div className="p-8 rounded-lg bg-card border border-border text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
              <p className="text-muted-foreground">Checking authentication...</p>
            </div>
          ) : authenticated ? (
            <div className="p-8 rounded-lg bg-card border border-border text-center">
              <div className="text-6xl font-bold text-green-500 mb-4">Success!</div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Basic Authentication</h2>
              <p className="text-muted-foreground">
                Congratulations! You must have provided the correct credentials.
              </p>
            </div>
          ) : (
            <div className="p-8 rounded-lg bg-card border border-border text-center">
              <div className="text-6xl font-bold text-red-500 mb-4">401</div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Unauthorized</h2>
              <p className="text-muted-foreground mb-6">
                Authentication is required to view this page. Your browser should have prompted you for credentials.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Use username: <span className="font-mono">admin</span></li>
              <li>• Use password: <span className="font-mono">password</span></li>
              <li>• The browser will prompt for credentials automatically</li>
              <li>• Valid credentials return 200, invalid return 401</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Basic authentication example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
