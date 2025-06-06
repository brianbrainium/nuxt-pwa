import { PDFDocument } from 'pdf-lib'

export interface Section {
  name: string
  start: number // zero-based page index
  end: number   // exclusive page index
}

export interface OutlineEntry {
  title: string
  page: number // zero-based start page
}

export async function splitBySections(original: PDFDocument, selections: Section[]) {
  const results: { name: string; blob: Blob }[] = []
  for (let i = 0; i < selections.length; i++) {
    const sel = selections[i]
    const doc = await PDFDocument.create()
    const pages = await doc.copyPages(original, Array.from({ length: sel.end - sel.start }, (_, idx) => sel.start + idx))
    pages.forEach(p => doc.addPage(p))
    const bytes = await doc.save()
    results.push({ name: `${sel.name || 'part-' + (i + 1)}.pdf`, blob: new Blob([bytes], { type: 'application/pdf' }) })
  }
  return results
}

export async function splitBySize(original: PDFDocument, maxSizeMB: number) {
  const maxBytes = maxSizeMB * 1024 * 1024
  const results: { name: string; blob: Blob }[] = []
  let doc = await PDFDocument.create()
  let part = 1
  for (let i = 0; i < original.getPageCount(); i++) {
    const [page] = await doc.copyPages(original, [i])
    doc.addPage(page)
    let bytes = await doc.save()
    if (bytes.byteLength > maxBytes && doc.getPageCount() > 1) {
      doc.removePage(doc.getPageCount() - 1)
      bytes = await doc.save()
      results.push({ name: `part-${part}.pdf`, blob: new Blob([bytes], { type: 'application/pdf' }) })
      part++
      doc = await PDFDocument.create()
      const [pg] = await doc.copyPages(original, [i])
      doc.addPage(pg)
    }
  }
  const finalBytes = await doc.save()
  results.push({ name: `part-${part}.pdf`, blob: new Blob([finalBytes], { type: 'application/pdf' }) })
  return results
}

export async function splitByTopLevelTOC(original: PDFDocument, outline: OutlineEntry[]) {
  const results: { name: string; blob: Blob }[] = []
  const pages = original.getPageCount()
  for (let i = 0; i < outline.length; i++) {
    const start = outline[i].page
    const end = i + 1 < outline.length ? outline[i + 1].page : pages
    const section: Section = { name: outline[i].title, start, end }
    const docs = await splitBySections(original, [section])
    results.push(docs[0])
  }
  return results
}
