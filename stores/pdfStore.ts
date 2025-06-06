import { defineStore } from 'pinia'
import { parsePdfSource, ParsedPdf } from '../utils/pdfParser'

export const usePdfStore = defineStore('pdf', {
  state: () => ({
    pdfInfo: null as any,
    toc: [] as any[],
    parsing: false
  }),
  actions: {
    async parsePdf(file: File | ArrayBuffer) {
      this.parsing = true
      try {
        const { metadata, outline }: ParsedPdf = await parsePdfSource(file)
        this.pdfInfo = metadata
        this.toc = outline
      } finally {
        this.parsing = false
      }
    }
  }
})
