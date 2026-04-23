'use client'

import { useState } from 'react'
import Link from 'next/link'

type SortDirection = 'asc' | 'desc' | null

type Column = {
  id: string
  label: string
}

type Row = {
  [key: string]: string | number
}

const columns: Column[] = [
  { id: 'lastName', label: 'Last Name' },
  { id: 'firstName', label: 'First Name' },
  { id: 'email', label: 'Email' },
  { id: 'due', label: 'Due ($)' },
  { id: 'website', label: 'Web Site' },
]

const initialData: Row[] = [
  { lastName: 'Smith', firstName: 'John', email: 'jsmith@gmail.com', due: 50, website: 'http://www.jsmith.com' },
  { lastName: 'Bach', firstName: 'Frank', email: 'fbach@yahoo.com', due: 51, website: 'http://www.fbach.com' },
  { lastName: 'Doe', firstName: 'Jason', email: 'jdoe@hotmail.com', due: 100, website: 'http://www.jdoe.com' },
  { lastName: 'Conway', firstName: 'Tim', email: 'tconway@earthlink.net', due: 50, website: 'http://www.tway.com' },
]

export default function SortableTables() {
  const [data, setData] = useState<Row[]>(initialData)
  const [sortColumn, setSortColumn] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  const handleSort = (columnId: string) => {
    const newDirection: SortDirection = sortColumn === columnId && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortColumn(columnId)
    setSortDirection(newDirection)

    const sorted = [...data].sort((a, b) => {
      const aVal = a[columnId]
      const bVal = b[columnId]

      if (aVal < bVal) return newDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return newDirection === 'asc' ? 1 : -1
      return 0
    })

    setData(sorted)
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
          <h1 className="text-3xl font-bold text-foreground">Data Tables</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Click on column headers to sort the table data.
            </p>
          </div>

          <div className="rounded-lg border border-border overflow-hidden bg-card">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    {columns.map(column => (
                      <th
                        key={column.id}
                        onClick={() => handleSort(column.id)}
                        className="px-6 py-4 text-left text-sm font-semibold text-foreground cursor-pointer hover:bg-accent/50 transition-colors select-none"
                      >
                        <div className="flex items-center gap-2">
                          {column.label}
                          {sortColumn === column.id && (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {sortDirection === 'asc' ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              )}
                            </svg>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-t border-border hover:bg-accent/5 transition-colors ${
                        index % 2 === 0 ? '' : 'bg-muted/20'
                      }`}
                    >
                      {columns.map(column => (
                        <td
                          key={column.id}
                          className="px-6 py-4 text-sm text-foreground"
                        >
                          {column.id === 'website' ? (
                            <a
                              href={row[column.id] as string}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {row[column.id]}
                            </a>
                          ) : (
                            row[column.id]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Current Sort:</h3>
            <p className="text-sm text-muted-foreground">
              {sortColumn && sortDirection ? (
                <>Sorted by <span className="font-mono text-foreground">{sortColumn}</span> ({sortDirection === 'asc' ? 'ascending' : 'descending'})</>
              ) : (
                'No column sorted'
              )}
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Sortable data tables example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}
