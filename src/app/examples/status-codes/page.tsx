'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function StatusCodes() {
  const router = useRouter()

  const codes = [
    { code: 200, description: 'OK', color: 'green' },
    { code: 301, description: 'Moved Permanently', color: 'yellow' },
    { code: 404, description: 'Not Found', color: 'red' },
    { code: 500, description: 'Internal Server Error', color: 'red' },
  ]

  const handleCodeClick = (code: number) => {
    router.push(`/examples/status-codes/${code}`)
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
          <h1 className="text-3xl font-bold text-foreground">Status Codes</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Click on the status codes below to see pages that return those HTTP status codes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 border border-border text-center">
              <p className="text-muted-foreground mb-3">Click on any status code:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {codes.map(item => (
                  <button
                    key={item.code}
                    onClick={() => handleCodeClick(item.code)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      item.color === 'green'
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20'
                        : 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20'
                    }`}
                  >
                    {item.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {codes.map(item => (
                <button
                  key={item.code}
                  onClick={() => handleCodeClick(item.code)}
                  className="w-full p-4 rounded-lg bg-card border border-border hover:border-accent hover:bg-accent/5 transition-all text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.code} {item.description}
                    </span>
                    <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <h3 className="font-semibold text-foreground mb-2">About Status Codes:</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• <strong>200</strong> - Request succeeded</li>
                <li>• <strong>301</strong> - URL has been permanently moved</li>
                <li>• <strong>404</strong> - Page not found</li>
                <li>• <strong>500</strong> - Server error occurred</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            HTTP status codes example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
