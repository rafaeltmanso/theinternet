'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FloatingMenu() {
  const [menuItems, setMenuItems] = useState([
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
    { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
    { id: 'gallery', label: 'Gallery', href: '#gallery' },
  ])

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
          <h1 className="text-3xl font-bold text-foreground">Floating Menu</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              The menu below floats and stays in view as you scroll.
            </p>
          </div>

          <nav className="sticky top-20 p-4 rounded-lg bg-card border border-border shadow-lg z-40 mb-8">
            <ul className="flex gap-2 flex-wrap justify-center">
              {menuItems.map(item => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-8">
            {menuItems.map((item, index) => (
              <section
                key={item.id}
                id={item.id}
                className="p-8 rounded-lg bg-card border border-border scroll-mt-32"
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">{item.label}</h2>
                <p className="text-muted-foreground">
                  This is the {item.label} section. As you scroll down, the floating menu will stay visible at the top, allowing you to easily navigate between sections.
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Section {index + 1} of {menuItems.length}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Instructions:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Scroll down to see the menu stay in view</li>
              <li>• Click on menu items to navigate between sections</li>
              <li>• The menu uses CSS sticky positioning to float above content</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Floating menu example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
