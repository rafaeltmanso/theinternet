'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Geolocation() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setError(null)
      },
      (err) => {
        setError(`Error: ${err.message}`)
        setLocation(null)
      }
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
          <h1 className="text-3xl font-bold text-foreground">Geolocation</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Click the button below to get your current location.
            </p>
          </div>

          <div className="space-y-6">
            <button
              onClick={getLocation}
              className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Where am I?
            </button>

            {location && (
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="font-semibold text-foreground mb-4">Your Location:</h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    Latitude: <span className="text-foreground font-mono">{location.latitude.toFixed(6)}</span>
                  </p>
                  <p className="text-muted-foreground">
                    Longitude: <span className="text-foreground font-mono">{location.longitude.toFixed(6)}</span>
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href={`https://maps.google.com/?q=${location.latitude},${location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            )}

            {error && (
              <div className="p-6 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-destructive">{error}</p>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Browser will ask for location permission</li>
              <li>• You can mock geolocation in automated tests</li>
              <li>• Test both allow and deny scenarios</li>
              <li>• Handle cases where geolocation is unavailable</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Geolocation example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
