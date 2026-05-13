export interface StoreItem {
  id: string
  name: string
  description: string
  createdAt: string
}

// This store is intentionally process-local for API practice scenarios.
export const items: StoreItem[] = []
let idCounter = 1

export function generateItemId(): string {
  return String(idCounter++)
}

export function addItem(item: StoreItem): void {
  items.push(item)
}

export function removeItem(id: string): void {
  const index = items.findIndex(item => item.id === id)
  if (index !== -1) {
    items.splice(index, 1)
  }
}

export function updateItem(id: string, updates: Partial<StoreItem>): void {
  const index = items.findIndex(item => item.id === id)
  if (index !== -1) {
    items[index] = { ...items[index], ...updates }
  }
}

export function findItem(id: string): StoreItem | undefined {
  return items.find(item => item.id === id)
}

export function clearItems(): void {
  items.length = 0
  idCounter = 1
}
