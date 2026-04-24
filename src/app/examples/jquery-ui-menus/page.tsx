'use client'

import { useState } from 'react'
import Link from 'next/link'

const menuItems = [
  { id: 'enabled', label: 'Enabled', items: ['Downloads', 'PDF', 'CSV', 'Excel'] },
  { id: 'back', label: 'Back', items: ['ID', 'Name', 'Action'] },
]

export default function JQueryUIMenus() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

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
          <h1 className="text-3xl font-bold text-foreground">JQuery UI Menus</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Hover over the menu items below to see sub-menus appear.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <ul className="space-y-2">
              {menuItems.map(menu => (
                <li
                  key={menu.id}
                  className="relative"
                  onMouseEnter={() => setOpenMenu(menu.id)}
                  onMouseLeave={() => setOpenMenu(null)}
                >
                  <a
                    href="#"
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      openMenu === menu.id ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-accent/50'
                    }`}
                    onClick={(e) => e.preventDefault()}
                  >
                    {menu.label}
                  </a>
                  {openMenu === menu.id && (
                    <ul className="absolute left-full top-0 ml-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                      {menu.items.map(item => (
                        <li key={item}>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-foreground hover:bg-accent/50 first:rounded-t-lg last:rounded-b-lg"
                            onClick={(e) => e.preventDefault()}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Hover over menu items to reveal sub-menus</li>
              <li>• Use <span className="font-mono">moveToElement()</span> for hover actions</li>
              <li>• Wait for sub-menu to appear before interacting</li>
              <li>• Test both hover and keyboard navigation</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            jQuery UI Menus example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
