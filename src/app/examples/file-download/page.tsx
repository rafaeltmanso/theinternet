'use client'

import Link from 'next/link'

export default function FileDownload() {
  const files = [
    { name: 'some-file.txt', type: 'text/plain', content: 'This is a sample text file.' },
    { name: 'sample.pdf', type: 'application/pdf', content: 'PDF file content (simulated)' },
  ]

  const downloadFile = (fileName: string, content: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
          <h1 className="text-3xl font-bold text-foreground">File Download</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Click on the files below to download them to your computer.
            </p>
          </div>

          <div className="space-y-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-card border border-border hover:border-accent transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{file.name}</h3>
                    <p className="text-sm text-muted-foreground">{file.type}</p>
                  </div>
                  <button
                    onClick={() => downloadFile(file.name, file.content, file.type)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Verify file is downloaded to the correct location</li>
              <li>• Check file content matches expected</li>
              <li>• Test different file types</li>
              <li>• Verify file permissions are correct</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            File download example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
