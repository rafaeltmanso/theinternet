'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'

export default function StatusCodePage() {
  const params = useParams()
  const router = useRouter()
  const code = parseInt(params.code as string)

  useEffect(() => {
    if (code === 200) return

    if (code === 301) {
      router.replace('/examples/status-codes/200')
      return
    }

    if (code === 404 || code === 500) {
      const title = code === 404 ? 'Not Found' : 'Server Error'
      document.title = `${code} ${title}`
    }
  }, [code, router])

  if (code === 301) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Redirecting...</h1>
        </div>
      </div>
    )
  }

  const codeInfo: Record<number, { title: string; description: string }> = {
    200: { title: 'OK', description: 'This page returned a 200 status code, which means the request was successful.' },
    404: { title: 'Not Found', description: 'This page returned a 404 status code, which means the requested resource was not found.' },
    500: { title: 'Internal Server Error', description: 'This page returned a 500 status code, which means the server encountered an error.' },
  }

  const info = codeInfo[code]

  if (!info) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Invalid Status Code</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/examples/status-codes" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Status Codes
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Status Codes</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 rounded-lg bg-card border border-border text-center">
            <div className="mb-6">
              <span className={`text-8xl font-bold ${
                code === 200 ? 'text-green-500' : 'text-red-500'
              }`}>
                {code}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">{info.title}</h2>
            <p className="text-muted-foreground">{info.description}</p>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground text-center">
              This page returned HTTP status code: <span className="font-mono text-foreground">{code}</span>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/examples/status-codes"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Status Codes
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            HTTP status code {code} example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
