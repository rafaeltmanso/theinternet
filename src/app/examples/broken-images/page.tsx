'use client'

import Link from 'next/link'

const images = [
  { id: 1, alt: 'Image 1 - Broken' },
  { id: 2, alt: 'Image 2 - Broken' },
  { id: 3, alt: 'Image 3 - Working' },
  { id: 4, alt: 'Image 4 - Broken' },
]

export default function BrokenImages() {
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
          <h1 className="text-3xl font-bold text-foreground">Broken Images</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              The images below have broken links (except one). Use this to test how your application handles broken images.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map(img => (
              <div
                key={img.id}
                className="p-4 rounded-lg bg-card border border-border"
              >
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden mb-2">
                  <img
                    src={img.id === 3 ? `https://via.placeholder.com/300x200.png?text=Image+${img.id}` : `/broken-image-${img.id}.jpg`}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = `<div class="text-destructive text-center p-4">
                          <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                          </svg>
                          <span>Broken Image</span>
                        </div>`
                      }
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {img.alt}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Instructions:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Images 1, 2, and 4 have broken source URLs</li>
              <li>• Image 3 loads successfully from an external placeholder service</li>
              <li>• Test how your tools detect and handle broken images</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Broken images example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
