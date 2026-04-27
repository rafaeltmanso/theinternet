'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function BasicAuth() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const authHeader = btoa(`${formData.username}:${formData.password}`)

    try {
      const response = await fetch('/api/basic-auth', {
        headers: {
          'Authorization': `Basic ${authHeader}`,
        },
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'You logged into a secure area!' })
        setIsLoggedIn(true)
      } else {
        setMessage({ type: 'error', text: 'Invalid credentials!' })
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setFormData({ username: '', password: '' })
    setMessage(null)
  }

  if (isLoggedIn) {
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
            <h1 className="text-3xl font-bold text-foreground">Secure Area</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 flex-1">
          <div className="max-w-2xl mx-auto">
            <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <p className="text-green-500">
                <span className="font-semibold">Success!</span> {message?.text}
              </p>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border">
              <p className="text-muted-foreground mb-4">
                Welcome to the Secure Area. When you are done click logout below.
              </p>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors"
              >
                Logout
              </button>
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
        <div className="max-w-md mx-auto">
          <div className="mb-6 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground">
              This is where you can log into the secure area. Enter{' '}
              <span className="font-mono text-foreground">admin</span> for the username and{' '}
              <span className="font-mono text-foreground">password</span> for the password.
              If the information is wrong you should see error messages.
            </p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500/20 text-green-500'
                : 'bg-red-500/10 border border-red-500/20 text-red-500'
            }`}>
              <p className="font-semibold">{message.type === 'success' ? 'Success!' : 'Error!'} {message.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
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
