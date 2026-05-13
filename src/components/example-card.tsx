import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { memo } from 'react'
import { categories, type ExampleCategory } from '@/app/examples-data'

interface ExampleCardProps {
  id: string
  name: string
  description: string
  category: ExampleCategory
}

export const ExampleCard = memo(function ExampleCard({ id, name, description, category }: ExampleCardProps) {
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
          <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${categories[category].color}`}>
            {categories[category].label}
          </span>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded bg-muted/50 group-hover:bg-primary/10 transition-colors">
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
        </div>
      </div>
    </Link>
  )
})
