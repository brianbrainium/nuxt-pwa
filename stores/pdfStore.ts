import { defineStore } from 'pinia'

export const usePdfStore = defineStore('pdf', {
  state: () => ({
    file: null as File | null,
    fileData: null as ArrayBuffer | null,
    metadata: null as any,
    outline: [] as any[],
    selectedItems: [] as any[],
    outputParts: [] as any[]
  })
})
