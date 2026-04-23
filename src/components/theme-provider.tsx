'use client'

import { useEffect } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
}

export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
  useEffect(() => {
    // Apply dark theme by default
    document.documentElement.classList.add('dark')

    // Store the theme preference
    localStorage.setItem('theme', defaultTheme)
  }, [defaultTheme])

  return <>{children}</>
}
