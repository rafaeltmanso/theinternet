'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

const examples = [
  { id: 'ab-testing', name: 'A/B Testing', description: 'Test control and variation versions' },
  { id: 'add-remove-elements', name: 'Add/Remove Elements', description: 'Dynamically add and delete elements' },
  { id: 'basic-auth', name: 'Basic Auth', description: 'HTTP Basic Authentication' },
  { id: 'broken-images', name: 'Broken Images', description: 'Images with broken links' },
  { id: 'challenging-dom', name: 'Challenging DOM', description: 'Dynamic DOM that changes' },
  { id: 'checkboxes', name: 'Checkboxes', description: 'Check and uncheck checkboxes' },
  { id: 'context-menu', name: 'Context Menu', description: 'Right-click context menu' },
  { id: 'digest-auth', name: 'Digest Authentication', description: 'HTTP Digest Authentication' },
  { id: 'disappearing-elements', name: 'Disappearing Elements', description: 'Elements that appear and disappear' },
  { id: 'drag-and-drop', name: 'Drag and Drop', description: 'Drag elements between containers' },
  { id: 'dropdown', name: 'Dropdown List', description: 'Select from dropdown options' },
  { id: 'dynamic-content', name: 'Dynamic Content', description: 'Content that loads dynamically' },
  { id: 'dynamic-controls', name: 'Dynamic Controls', description: 'Controls that enable/disable' },
  { id: 'dynamic-loading', name: 'Dynamic Loading', description: 'Content that loads on start' },
  { id: 'entry-ad', name: 'Entry Ad', description: 'Modal ad on page entry' },
  { id: 'exit-intent', name: 'Exit Intent', description: 'Modal on mouse exit' },
  { id: 'file-download', name: 'File Download', description: 'Download files' },
  { id: 'file-upload', name: 'File Upload', description: 'Upload files' },
  { id: 'floating-menu', name: 'Floating Menu', description: 'Menu that floats on scroll' },
  { id: 'forgot-password', name: 'Forgot Password', description: 'Password recovery flow' },
  { id: 'form-auth', name: 'Form Authentication', description: 'Login form with validation' },
  { id: 'frames', name: 'Frames', description: 'Working with iframe elements' },
  { id: 'geolocation', name: 'Geolocation', description: 'Get user location' },
  { id: 'horizontal-slider', name: 'Horizontal Slider', description: 'Slider input control' },
  { id: 'hovers', name: 'Hovers', description: 'Hover effects on elements' },
  { id: 'infinite-scroll', name: 'Infinite Scroll', description: 'Scroll to load more content' },
  { id: 'inputs', name: 'Inputs', description: 'Various input field types' },
  { id: 'jquery-ui-menus', name: 'JQuery UI Menus', description: 'jQuery-style menu interactions' },
  { id: 'js-alerts', name: 'JavaScript Alerts', description: 'Alert, confirm, and prompt dialogs' },
  { id: 'js-onload-error', name: 'JavaScript Onload Error', description: 'Page with onload error' },
  { id: 'key-presses', name: 'Key Presses', description: 'Capture keyboard input' },
  { id: 'large-dom', name: 'Large & Deep DOM', description: 'Page with many elements' },
  { id: 'multiple-windows', name: 'Multiple Windows', description: 'Open and switch windows' },
  { id: 'nested-frames', name: 'Nested Frames', description: 'Frames within frames' },
  { id: 'notification-messages', name: 'Notification Messages', description: 'Flash message notifications' },
  { id: 'redirect-link', name: 'Redirect Link', description: 'Page redirects' },
  { id: 'secure-download', name: 'Secure File Download', description: 'Authenticated file download' },
  { id: 'shadow-dom', name: 'Shadow DOM', description: 'Shadow DOM elements' },
  { id: 'shifting-content', name: 'Shifting Content', description: 'Content that shifts position' },
  { id: 'slow-resources', name: 'Slow Resources', description: 'Page with slow loading elements' },
  { id: 'sortable-tables', name: 'Sortable Data Tables', description: 'Sort table columns' },
  { id: 'status-codes', name: 'Status Codes', description: 'HTTP status code pages' },
  { id: 'typos', name: 'Typos', description: 'Find spelling errors' },
  { id: 'wysiwyg-editor', name: 'WYSIWYG Editor', description: 'Rich text editor' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">The Internet</h1>
              <p className="text-muted-foreground">A testing playground for automated testing practice</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Available Examples</h2>
            <p className="text-muted-foreground">Click on any example below to explore different testing scenarios</p>
          </div>

          <div className="grid gap-4">
            {examples.map((example) => (
              <Link
                key={example.id}
                href={`/examples/${example.id}`}
                className="group block p-6 rounded-lg border border-border bg-card hover:bg-accent hover:border-accent transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {example.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {example.description}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center text-muted-foreground group-hover:text-primary transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Built for automated testing practice with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
