import Link from 'next/link'
import { ExampleCard } from '@/components/example-card'

export const examples = [
  { id: 'ab-testing', name: 'A/B Testing', description: 'Test control and variation versions', category: 'Testing' },
  { id: 'add-remove-elements', name: 'Add/Remove Elements', description: 'Dynamically add and delete elements', category: 'Interactive' },
  { id: 'broken-images', name: 'Broken Images', description: 'Images with broken links', category: 'Media' },
  { id: 'canvas-drawing', name: 'Canvas Drawing', description: 'Drawing canvas with tools', category: 'Interactive' },
  { id: 'challenging-dom', name: 'Challenging DOM', description: 'Dynamic DOM that changes', category: 'Advanced' },
  { id: 'checkboxes', name: 'Checkboxes', description: 'Check and uncheck checkboxes', category: 'Interactive' },
  { id: 'context-menu', name: 'Context Menu', description: 'Right-click context menu', category: 'Interactive' },
  { id: 'disappearing-elements', name: 'Disappearing Elements', description: 'Elements that appear and disappear', category: 'Advanced' },
  { id: 'drag-and-drop', name: 'Drag and Drop', description: 'Drag elements between containers', category: 'Interactive' },
  { id: 'dropdown', name: 'Dropdown List', description: 'Select from dropdown options', category: 'Interactive' },
  { id: 'dynamic-content', name: 'Dynamic Content', description: 'Content that loads dynamically', category: 'Advanced' },
  { id: 'dynamic-controls', name: 'Dynamic Controls', description: 'Controls that enable/disable', category: 'Interactive' },
  { id: 'dynamic-loading', name: 'Dynamic Loading', description: 'Content that loads on start', category: 'Advanced' },
  { id: 'entry-ad', name: 'Entry Ad', description: 'Modal ad on page entry', category: 'Advanced' },
  { id: 'exit-intent', name: 'Exit Intent', description: 'Modal on mouse exit', category: 'Advanced' },
  { id: 'file-download', name: 'File Download', description: 'Download files', category: 'Files' },
  { id: 'file-upload', name: 'File Upload', description: 'Upload files', category: 'Files' },
  { id: 'floating-menu', name: 'Floating Menu', description: 'Menu that floats on scroll', category: 'Advanced' },
  { id: 'forgot-password', name: 'Forgot Password', description: 'Password recovery flow', category: 'Auth' },
  { id: 'form-auth', name: 'Form Authentication', description: 'Login form with validation', category: 'Auth' },
  { id: 'form-wizard', name: 'Form Wizard', description: 'Multi-step form with validation', category: 'Interactive' },
  { id: 'frames', name: 'Frames', description: 'Working with iframe elements', category: 'Advanced' },
  { id: 'geolocation', name: 'Geolocation', description: 'Get user location', category: 'Advanced' },
  { id: 'horizontal-slider', name: 'Horizontal Slider', description: 'Slider input control', category: 'Interactive' },
  { id: 'hovers', name: 'Hovers', description: 'Hover effects on elements', category: 'Interactive' },
  { id: 'infinite-scroll', name: 'Infinite Scroll', description: 'Scroll to load more content', category: 'Advanced' },
  { id: 'infinite-scroll-pagination', name: 'Infinite Scroll & Pagination', description: 'Pagination with infinite scroll', category: 'Advanced' },
  { id: 'inputs', name: 'Inputs', description: 'Various input field types', category: 'Interactive' },
  { id: 'jquery-ui-menus', name: 'JQuery UI Menus', description: 'jQuery-style menu interactions', category: 'Interactive' },
  { id: 'js-alerts', name: 'JavaScript Alerts', description: 'Alert, confirm, and prompt dialogs', category: 'Interactive' },
  { id: 'js-onload-error', name: 'JavaScript Onload Error', description: 'Page with onload error', category: 'Advanced' },
  { id: 'key-presses', name: 'Key Presses', description: 'Capture keyboard input', category: 'Interactive' },
  { id: 'large-dom', name: 'Large & Deep DOM', description: 'Page with many elements', category: 'Advanced' },
  { id: 'multiple-windows', name: 'Multiple Windows', description: 'Open and switch windows', category: 'Advanced' },
  { id: 'nested-frames', name: 'Nested Frames', description: 'Frames within frames', category: 'Advanced' },
  { id: 'notification-messages', name: 'Notification Messages', description: 'Flash message notifications', category: 'Interactive' },
  { id: 'real-time-data', name: 'Real-time Data', description: 'Live polling and async updates', category: 'Advanced' },
  { id: 'redirect-link', name: 'Redirect Link', description: 'Page redirects', category: 'Advanced' },
  { id: 'secure-download', name: 'Secure File Download', description: 'Authenticated file download', category: 'Files' },
  { id: 'shadow-dom', name: 'Shadow DOM', description: 'Shadow DOM elements', category: 'Advanced' },
  { id: 'shifting-content', name: 'Shifting Content', description: 'Content that shifts position', category: 'Advanced' },
  { id: 'slow-resources', name: 'Slow Resources', description: 'Page with slow loading elements', category: 'Advanced' },
  { id: 'sortable-tables', name: 'Sortable Data Tables', description: 'Sort table columns', category: 'Interactive' },
  { id: 'status-codes', name: 'Status Codes', description: 'HTTP status code pages', category: 'Testing' },
  { id: 'typos', name: 'Typos', description: 'Find spelling errors', category: 'Testing' },
  { id: 'wysiwyg-editor', name: 'WYSIWYG Editor', description: 'Rich text editor', category: 'Interactive' },
]

import { Fragment } from 'react'

export interface Example {
  id: string
  name: string
  description: string
  category: string
}

export const categories: Record<string, { label: string; color: string }> = {
  'Interactive': { label: 'Interactive', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  'Advanced': { label: 'Advanced', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  'Auth': { label: 'Authentication', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
  'Files': { label: 'Files', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  'Media': { label: 'Media', color: 'bg-pink-500/10 text-pink-500 border-pink-500/20' },
  'Testing': { label: 'Testing', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20' },
  'API': { label: 'API', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
}

export function PageHeader() {
  return (
    <Fragment>
      <h1 className="text-4xl font-bold text-foreground mb-2">The Internet</h1>
      <p className="text-muted-foreground">A testing playground for automated testing practice</p>
    </Fragment>
  )
}
