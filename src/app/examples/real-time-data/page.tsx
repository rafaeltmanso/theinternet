'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

type Notification = {
  id: number
  message: string
  timestamp: string
  type: string
}

export default function RealTimeData() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isPolling, setIsPolling] = useState(false)
  const [pollInterval, setPollInterval] = useState(2000)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)
  const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const pollTimerRef = useRef<NodeJS.Timeout | null>(null)
  const notificationCount = useRef(0)

  const fetchNotifications = async () => {
    try {
      setApiStatus('loading')
      const url = `/api/real-time?subscribe=true&action=${isPolling ? 'start' : 'stop'}`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      setNotifications(data.notifications || [])
      setLastUpdate(data.timestamp)
      setApiStatus('idle')
      setErrorMessage('')
    } catch (err) {
      setApiStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Failed to fetch')
      setIsPolling(false)
    }
  }

  const startPolling = async () => {
    setIsPolling(true)
    fetchNotifications()
  }

  const stopPolling = async () => {
    setIsPolling(false)
    try {
      await fetch('/api/real-time?action=stop')
    } catch {
    }
  }

  const clearNotifications = async () => {
    try {
      await fetch('/api/real-time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear' }),
      })
      setNotifications([])
    } catch {
    }
  }

  const addManualNotification = async () => {
    const types = ['info', 'success', 'warning', 'error']
    const messages = [
      'Test notification triggered',
      'Manual action completed',
      'System check performed',
      'User interaction recorded',
    ]
    
    notificationCount.current++
    try {
      await fetch('/api/real-time', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messages[Math.floor(Math.random() * messages.length)],
          type: types[Math.floor(Math.random() * types.length)],
        }),
      })
      fetchNotifications()
    } catch {
    }
  }

  useEffect(() => {
    if (!isPolling) {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current)
        pollTimerRef.current = null
      }
      return
    }

    pollTimerRef.current = setInterval(fetchNotifications, pollInterval)

    return () => {
      if (pollTimerRef.current) {
        clearInterval(pollTimerRef.current)
      }
    }
  }, [isPolling, pollInterval])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'warning': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'error': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    }
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
          <h1 className="text-3xl font-bold text-foreground">Real-time Data</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              This page demonstrates real-time data polling. Toggle polling to receive automatic updates from the server.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 rounded-lg bg-card border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Controls</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Poll Interval (ms)
                  </label>
                  <select
                    value={pollInterval}
                    onChange={(e) => setPollInterval(Number(e.target.value))}
                    disabled={isPolling}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                  >
                    <option value={1000}>1000ms (1 second)</option>
                    <option value={2000}>2000ms (2 seconds)</option>
                    <option value={5000}>5000ms (5 seconds)</option>
                    <option value={10000}>10000ms (10 seconds)</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  {!isPolling ? (
                    <button
                      onClick={startPolling}
                      className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Start Polling
                    </button>
                  ) : (
                    <button
                      onClick={stopPolling}
                      className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                    >
                      Stop Polling
                    </button>
                  )}
                </div>

                <button
                  onClick={clearNotifications}
                  className="w-full px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
                >
                  Clear Notifications
                </button>

                <button
                  onClick={addManualNotification}
                  className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
                >
                  Add Manual Notification
                </button>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-card border border-border">
              <h2 className="text-xl font-semibold text-foreground mb-4">Status</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Polling Status:</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    isPolling 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {isPolling ? 'Active' : 'Stopped'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">API Status:</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    apiStatus === 'error' 
                      ? 'bg-red-500/10 text-red-500'
                      : apiStatus === 'loading'
                      ? 'bg-yellow-500/10 text-yellow-500'
                      : 'bg-green-500/10 text-green-500'
                  }`}>
                    {apiStatus === 'idle' ? 'Connected' : apiStatus === 'loading' ? 'Loading...' : 'Error'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Notifications:</span>
                  <span className="text-foreground font-mono">{notifications.length}</span>
                </div>

                {lastUpdate && (
                  <div className="pt-2 border-t border-border">
                    <span className="text-muted-foreground text-sm">Last Update:</span>
                    <p className="text-foreground font-mono text-sm">
                      {new Date(lastUpdate).toLocaleTimeString()}
                    </p>
                  </div>
                )}

                {errorMessage && (
                  <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                    <span className="text-red-500 text-sm">{errorMessage}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Notifications ({notifications.length})
            </h2>

            {notifications.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No notifications yet. Start polling or add a manual notification.
              </p>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {[...notifications].reverse().map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${getTypeColor(notification.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-medium capitalize">[{notification.type}]</span>
                        <span className="ml-2">{notification.message}</span>
                      </div>
                      <span className="text-xs opacity-70 whitespace-nowrap">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Test polling start/stop functionality</li>
              <li>• Verify notification count updates</li>
              <li>• Check that timestamps update in real-time</li>
              <li>• Test error handling when API is unavailable</li>
              <li>• Verify different poll intervals affect update frequency</li>
              <li>• Test notification types (info, success, warning, error)</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Real-time data example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}