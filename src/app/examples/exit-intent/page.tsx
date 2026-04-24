'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function ExitIntent() {
  const [showModal, setShowModal] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const hasShownModal = useRef(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownModal.current) {
        hasShownModal.current = true
        setShowModal(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleDismiss = () => {
    setShowModal(false)
    setDismissed(true)
  }

  const handleReload = () => {
    hasShownModal.current = false
    setDismissed(false)
    setShowModal(false)
    window.location.reload()
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
          <h1 className="text-3xl font-bold text-foreground">Exit Intent</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Move your mouse cursor out of the viewport at the top to trigger the exit intent modal.
            </p>
          </div>

          {showModal && !dismissed && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-card rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-2">Fancy Modal!</h2>
                  <p className="text-muted-foreground mb-4">
                    It's commonly used to encourage users to sign up or make a purchase before they leave.
                  </p>
                  <button
                    onClick={handleDismiss}
                    className="w-full px-4 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-semibold"
                  >
                    Close
                  </button>
                </div>
                <div className="bg-muted/30 px-6 py-3">
                  <p className="text-xs text-muted-foreground">
                    This modal is triggered when you try to leave the page.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="p-6 rounded-lg bg-card border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Page Content</h2>
            <p className="text-muted-foreground mb-4">
              Move your mouse out of the browser window at the top to trigger the exit intent modal.
              This is a common pattern used to re-engage users before they leave.
            </p>

            {dismissed && (
              <div className="p-4 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  You triggered the exit intent modal. It won't show again until you reload the page.
                </p>
                <button
                  onClick={handleReload}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Reload Page
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Move mouse out of the viewport at the top</li>
              <li>• The modal should appear when exiting</li>
              <li>• Test dismissing the modal</li>
              <li>• Verify modal only shows once per session</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Exit intent example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
