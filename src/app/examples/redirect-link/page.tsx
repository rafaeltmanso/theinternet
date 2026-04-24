'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RedirectLink() {
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/examples/status-codes/200')
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
          <h1 className="text-3xl font-bold text-foreground">Redirect Link</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Click the link below to be redirected to another page.
            </p>
          </div>

          <div className="p-8 rounded-lg bg-card border border-border text-center">
            <p className="text-foreground mb-6">
              This page demonstrates a redirect. When you click the link, you will be redirected to another page.
            </p>

            <button
              onClick={handleRedirect}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Click Here to Redirect
            </button>

            <p className="text-sm text-muted-foreground mt-6">
              You will be redirected to the Status Codes page (200 OK)
            </p>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Verify the URL changes after clicking the link</li>
              <li>• Check that the page loads the new content</li>
              <li>• Test navigation history (back button works)</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Redirect link example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
