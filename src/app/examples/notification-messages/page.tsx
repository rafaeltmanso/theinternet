'use client'

import { useState } from 'react'
import Link from 'next/link'

type NotificationType = 'success' | 'error'

export default function NotificationMessages() {
  const [notification, setNotification] = useState<{ type: NotificationType; message: string } | null>(null)

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message })
  }

  const handleSuccess = () => {
    showNotification('success', 'Action successful!')
  }

  const handleError = () => {
    showNotification('error', 'Action unsuccessful!')
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
          <h1 className="text-3xl font-bold text-foreground">Notification Messages</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Click the buttons below to trigger notification messages.
            </p>
          </div>

          {notification && (
            <div className={`mb-6 p-4 rounded-lg border ${
              notification.type === 'success'
                ? 'bg-green-500/10 border-green-500/20'
                : 'bg-red-500/10 border-red-500/20'
            }`}>
              <p className={`font-semibold ${
                notification.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}>
                {notification.type === 'success' ? 'Success' : 'Error!'} {notification.message}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleSuccess}
              className="px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Trigger Success Message
            </button>

            <button
              onClick={handleError}
              className="px-6 py-4 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors"
            >
              Trigger Error Message
            </button>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Click each button to see different notification types</li>
              <li>• Verify the message content and styling</li>
              <li>• Test that notifications appear correctly</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Notification messages example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
