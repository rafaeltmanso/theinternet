'use client'

import Link from 'next/link'

export default function DigestAuth() {
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
          <h1 className="text-3xl font-bold text-foreground">Digest Authentication</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 rounded-lg bg-card border border-border text-center">
            <div className="text-6xl font-bold text-green-500 mb-4">Success!</div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Digest Authentication</h2>
            <p className="text-muted-foreground">
              Congratulations! You must have provided the correct digest credentials.
            </p>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Digest auth is more secure than Basic auth</li>
              <li>• Credentials are hashed before transmission</li>
              <li>• Requires implementing the MD5 digest algorithm</li>
              <li>• Used username: <span className="font-mono">admin</span></li>
              <li>• Used password: <span className="font-mono">password</span></li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Digest authentication example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
