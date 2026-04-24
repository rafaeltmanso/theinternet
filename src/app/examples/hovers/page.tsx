'use client'

import Link from 'next/link'

const users = [
  { id: 1, name: 'user1', image: '1' },
  { id: 2, name: 'user2', image: '2' },
  { id: 3, name: 'user3', image: '3' },
]

export default function Hovers() {
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
          <h1 className="text-3xl font-bold text-foreground">Hovers</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Hover over the images below to see additional information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {users.map(user => (
              <div
                key={user.id}
                className="group relative overflow-hidden rounded-lg bg-card border border-border"
              >
                <div className="aspect-square flex items-center justify-center bg-muted">
                  <span className="text-6xl font-bold text-muted-foreground group-hover:hidden">
                    {user.image}
                  </span>
                </div>

                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                  <div className="text-primary-foreground">
                    <h3 className="font-bold text-xl mb-2">name: {user.name}</h3>
                    <p className="text-sm">View profile</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Instructions:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Hover over each card to reveal the user information</li>
              <li>• Move mouse away to hide the information again</li>
              <li>• Test hover actions with your automation tools</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Hover effects example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
