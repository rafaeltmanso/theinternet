export interface StoreItem {
  id: string
  name: string
  description: string
  createdAt: string
}

export let items: StoreItem[] = []
let idCounter = 1

export function generateItemId(): string {
  return String(idCounter++)
}

export function addItem(item: StoreItem): void {
  items.push(item)
}

export function removeItem(id: string): void {
  items = items.filter(item => item.id !== id)
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
