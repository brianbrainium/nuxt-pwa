import { describe, it, expect } from 'vitest'
import { PDFDocument } from 'pdf-lib'
import { splitPdfPages } from '../utils/pdf'

describe('splitPdfPages', () => {
  it('splits a pdf into individual pages', async () => {
    const doc = await PDFDocument.create()
    doc.addPage()
    doc.addPage()
    doc.addPage()
    const bytes = await doc.save()
    const parts = await splitPdfPages(bytes)
    expect(parts.length).toBe(3)
    for (const part of parts) {
      const d = await PDFDocument.load(part)
      expect(d.getPageCount()).toBe(1)
    }
  })
})
