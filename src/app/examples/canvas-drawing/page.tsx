'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

type Tool = 'pen' | 'eraser' | 'line' | 'rectangle' | 'circle' | 'fill'

type Point = {
  x: number
  y: number
}

type HistoryState = ImageData | null

const colors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
  '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#808080',
]

export default function CanvasDrawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<Tool>('pen')
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)
  const [history, setHistory] = useState<HistoryState[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [startPoint, setStartPoint] = useState<Point | null>(null)
  const [currentPoint, setCurrentPoint] = useState<Point | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 500 })

  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(imageData)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  const undo = useCallback(() => {
    if (historyIndex <= 0) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const newIndex = historyIndex - 1
    ctx.putImageData(history[newIndex], 0, 0)
    setHistoryIndex(newIndex)
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const newIndex = historyIndex + 1
    ctx.putImageData(history[newIndex], 0, 0)
    setHistoryIndex(newIndex)
  }, [history, historyIndex])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    saveToHistory()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) {
          redo()
        } else {
          undo()
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  const getCanvasPoint = (e: React.MouseEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const point = getCanvasPoint(e)
    setIsDrawing(true)
    setStartPoint(point)
    setCurrentPoint(point)
    
    if (tool === 'pen' || tool === 'eraser') {
      const canvas = canvasRef.current
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      ctx.beginPath()
      ctx.moveTo(point.x, point.y)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const point = getCanvasPoint(e)
    setCurrentPoint(point)
    
    if (tool === 'pen') {
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineTo(point.x, point.y)
      ctx.stroke()
    } else if (tool === 'eraser') {
      ctx.strokeStyle = '#FFFFFF'
      ctx.lineWidth = brushSize * 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineTo(point.x, point.y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    if (!isDrawing || !startPoint || !currentPoint) {
      setIsDrawing(false)
      return
    }
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    if (tool === 'line') {
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
      ctx.beginPath()
      ctx.moveTo(startPoint.x, startPoint.y)
      ctx.lineTo(currentPoint.x, currentPoint.y)
      ctx.stroke()
    } else if (tool === 'rectangle') {
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
      ctx.beginPath()
      ctx.rect(
        startPoint.x,
        startPoint.y,
        currentPoint.x - startPoint.x,
        currentPoint.y - startPoint.y
      )
      ctx.stroke()
    } else if (tool === 'circle') {
      const radius = Math.sqrt(
        Math.pow(currentPoint.x - startPoint.x, 2) +
        Math.pow(currentPoint.y - startPoint.y, 2)
      )
      ctx.strokeStyle = color
      ctx.lineWidth = brushSize
      ctx.beginPath()
      ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI)
      ctx.stroke()
    } else if (tool === 'fill') {
      ctx.fillStyle = color
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else if (tool === 'pen' || tool === 'eraser') {
      ctx.closePath()
    }
    
    setIsDrawing(false)
    setStartPoint(null)
    setCurrentPoint(null)
    saveToHistory()
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    saveToHistory()
  }

  const downloadCanvas = (format: 'png' | 'jpg') => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = `drawing.${format}`
    
    if (format === 'png') {
      link.href = canvas.toDataURL('image/png')
    } else {
      link.href = canvas.toDataURL('image/jpeg', 0.9)
    }
    
    link.click()
  }

  const tools: { id: Tool; label: string; icon: string }[] = [
    { id: 'pen', label: 'Pen', icon: '✏️' },
    { id: 'eraser', label: 'Eraser', icon: '🧹' },
    { id: 'line', label: 'Line', icon: '📏' },
    { id: 'rectangle', label: 'Rectangle', icon: '⬜' },
    { id: 'circle', label: 'Circle', icon: '⭕' },
    { id: 'fill', label: 'Fill', icon: '🪣' },
  ]

  useEffect(() => {
    const handleResize = () => {
      const maxWidth = Math.min(800, window.innerWidth - 64)
      setCanvasSize({
        width: maxWidth,
        height: Math.min(500, (maxWidth * 5) / 8)
      })
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
          <h1 className="text-3xl font-bold text-foreground">Canvas Drawing</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Use the tools below to draw on the canvas. Test different drawing tools, colors, and brush sizes.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="p-4 rounded-lg bg-card border border-border space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">Tools</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {tools.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTool(t.id)}
                        className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                          tool === t.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">Color</h3>
                  <div className="grid grid-cols-6 gap-1">
                    {colors.map(c => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-8 h-8 rounded border-2 transition-transform hover:scale-110 ${
                          color === c ? 'border-primary scale-110' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="mt-2 w-full h-10 cursor-pointer"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-foreground mb-2">
                    Brush Size: {brushSize}px
                  </h3>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex gap-2">
                    <button
                      onClick={undo}
                      disabled={historyIndex <= 0}
                      className="flex-1 px-3 py-2 bg-muted text-muted-foreground rounded-lg text-sm hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Undo (Ctrl+Z)
                    </button>
                    <button
                      onClick={redo}
                      disabled={historyIndex >= history.length - 1}
                      className="flex-1 px-3 py-2 bg-muted text-muted-foreground rounded-lg text-sm hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Redo (Ctrl+Shift+Z)
                    </button>
                  </div>
                  <button
                    onClick={clearCanvas}
                    className="w-full px-3 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm hover:bg-destructive/90"
                  >
                    Clear Canvas
                  </button>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium text-foreground mb-2">Download</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadCanvas('png')}
                      className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90"
                    >
                      PNG
                    </button>
                    <button
                      onClick={() => downloadCanvas('jpg')}
                      className="flex-1 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/90"
                    >
                      JPG
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="relative rounded-lg overflow-hidden border border-border bg-white">
                <canvas
                  ref={canvasRef}
                  width={canvasSize.width}
                  height={canvasSize.height}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="cursor-crosshair"
                  style={{ maxWidth: '100%' }}
                />
                {(isDrawing && (tool === 'line' || tool === 'rectangle' || tool === 'circle')) && currentPoint && startPoint && (
                  <svg
                    className="absolute top-0 left-0 pointer-events-none"
                    width={canvasSize.width}
                    height={canvasSize.height}
                  >
                    {tool === 'line' && (
                      <line
                        x1={startPoint.x}
                        y1={startPoint.y}
                        x2={currentPoint.x}
                        y2={currentPoint.y}
                        stroke={color}
                        strokeWidth={brushSize}
                      />
                    )}
                    {tool === 'rectangle' && (
                      <rect
                        x={Math.min(startPoint.x, currentPoint.x)}
                        y={Math.min(startPoint.y, currentPoint.y)}
                        width={Math.abs(currentPoint.x - startPoint.x)}
                        height={Math.abs(currentPoint.y - startPoint.y)}
                        stroke={color}
                        strokeWidth={brushSize}
                        fill="none"
                      />
                    )}
                    {tool === 'circle' && (
                      <circle
                        cx={startPoint.x}
                        cy={startPoint.y}
                        r={Math.sqrt(
                          Math.pow(currentPoint.x - startPoint.x, 2) +
                          Math.pow(currentPoint.y - startPoint.y, 2)
                        )}
                        stroke={color}
                        strokeWidth={brushSize}
                        fill="none"
                      />
                    )}
                  </svg>
                )}
              </div>
              <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                <span>Canvas: {canvasSize.width} x {canvasSize.height}</span>
                <span>Tool: {tool}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
            <h3 className="font-semibold text-foreground mb-2">Testing Tips:</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Test all drawing tools (pen, eraser, line, rectangle, circle, fill)</li>
              <li>• Verify color selection works (preset and custom colors)</li>
              <li>• Test brush size adjustment (1-50px range)</li>
              <li>• Test undo/redo functionality with keyboard (Ctrl+Z, Ctrl+Shift+Z)</li>
              <li>• Verify canvas clears properly</li>
              <li>• Test download works for both PNG and JPG formats</li>
              <li>• Test shape preview while dragging (line, rectangle, circle)</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Canvas drawing example for automated testing
          </p>
        </div>
      </footer>
    </div>
  )
}