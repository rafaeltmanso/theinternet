import Link from 'next/link'
import { memo } from 'react'

interface ExampleCardProps {
  id: string
  name: string
  description: string
  category: string
}

export const ExampleCard = memo(function ExampleCard({ id, name, description, category }: ExampleCardProps) {
  const categoryColors: Record<string, string> = {
    'Interactive': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Advanced': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'Auth': 'bg-green-500/10 text-green-500 border-green-500/20',
    'Files': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'Media': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    'Testing': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  }

  return (
    <Link
      href={`/examples/${id}`}
      className="group block p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-accent transition-all duration-200 hover:shadow-lg"
    >
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1 truncate">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{description}</p>
          <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${categoryColors[category] || 'bg-gray-500/10 text-gray-500'}`}>
            {category}
          </span>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded bg-muted/50 group-hover:bg-primary/10 transition-colors">
          <svg className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
})
