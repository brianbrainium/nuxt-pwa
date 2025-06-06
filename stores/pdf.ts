import { defineStore } from 'pinia'

export interface TocItem {
  id: string
  title: string
  children?: TocItem[]
}

function findPath(items: TocItem[], id: string, path: TocItem[] = []): TocItem[] | null {
  for (const item of items) {
    const newPath = [...path, item]
    if (item.id === id) return newPath
    if (item.children) {
      const p = findPath(item.children, id, newPath)
      if (p) return p
    }
  }
  return null
}

function traverse(item: TocItem, cb: (n: TocItem) => void) {
  cb(item)
  item.children?.forEach(child => traverse(child, cb))
}

export const usePdfStore = defineStore('pdf', {
  state: () => ({
    file: null as File | null,
    fileData: null as ArrayBuffer | null,
    metadata: null as any,
    toc: [] as TocItem[],
    selectedSections: [] as string[],
    outputParts: [] as any[]
  }),
  actions: {
    setToc(items: TocItem[]) {
      this.toc = items
      this.selectedSections = []
    },
    toggleSection(id: string) {
      const path = findPath(this.toc, id)
      if (!path) return
      const item = path[path.length - 1]
      const selected = this.selectedSections.includes(id)
      if (selected) {
        traverse(item, n => {
          const idx = this.selectedSections.indexOf(n.id)
          if (idx !== -1) this.selectedSections.splice(idx, 1)
        })
      } else {
        traverse(item, n => {
          if (!this.selectedSections.includes(n.id))
            this.selectedSections.push(n.id)
        })
      }
      // update parents
      path.slice(0, -1).reverse().forEach(parent => {
        if (!parent.children) return
        const allSelected = parent.children.every(c => this.selectedSections.includes(c.id))
        const idx = this.selectedSections.indexOf(parent.id)
        if (allSelected) {
          if (idx === -1) this.selectedSections.push(parent.id)
        } else if (idx !== -1) {
          this.selectedSections.splice(idx, 1)
        }
      })
    }
  }
})
