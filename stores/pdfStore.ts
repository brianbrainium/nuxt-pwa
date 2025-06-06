import { defineStore } from 'pinia'
import { splitPdfPages } from '~/utils/pdf'

export const usePdfStore = defineStore('pdf', {
  state: () => ({
    file: null as File | null,
    fileData: null as ArrayBuffer | null,
    metadata: null as any,
    outline: [] as any[],
    selectedItems: [] as any[],
    outputParts: [] as Uint8Array[]
  }),
  actions: {
    async loadFile() {
      if (this.file) {
        this.fileData = await this.file.arrayBuffer()
      }
    },
    async split() {
      if (!this.fileData) {
        await this.loadFile()
      }
      if (this.fileData) {
        this.outputParts = await splitPdfPages(this.fileData)
      }
    }
  }
})
