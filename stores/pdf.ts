import { defineStore } from 'pinia'
import { PDFDocument } from 'pdf-lib'
import { splitBySections, splitBySize, splitByTopLevelTOC, Section, OutlineEntry } from '~/utils/pdfSplitter'
import { ref } from 'vue'

export const usePdfStore = defineStore('pdf', () => {
  const file = ref<File | null>(null)
  const pdfDoc = ref<PDFDocument | null>(null)
  const outline = ref<OutlineEntry[]>([])
  const selectedSections = ref<Section[]>([])
  const splitParts = ref<{ name: string; blob: Blob }[]>([])
  const progress = ref<number>(0)

  async function loadFile(f: File) {
    file.value = f
    const buf = await f.arrayBuffer()
    pdfDoc.value = await PDFDocument.load(buf)
  }

  async function splitBySelected() {
    if (!pdfDoc.value) return
    progress.value = 0
    splitParts.value = await splitBySections(pdfDoc.value, selectedSections.value)
    progress.value = 100
  }

  async function splitByMaxSize(sizeMB: number) {
    if (!pdfDoc.value) return
    progress.value = 0
    splitParts.value = await splitBySize(pdfDoc.value, sizeMB)
    progress.value = 100
  }

  async function splitByTOC() {
    if (!pdfDoc.value) return
    progress.value = 0
    splitParts.value = await splitByTopLevelTOC(pdfDoc.value, outline.value)
    progress.value = 100
  }

  return {
    file,
    pdfDoc,
    outline,
    selectedSections,
    splitParts,
    progress,
    loadFile,
    splitBySelected,
    splitByMaxSize,
    splitByTOC
  }
})
