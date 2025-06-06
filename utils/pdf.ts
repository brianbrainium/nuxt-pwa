import { PDFDocument } from 'pdf-lib'

/**
 * Split a PDF into individual page PDFs.
 * @param data ArrayBuffer representing the full PDF
 * @returns Promise resolving to an array of Uint8Array for each page
 */
export async function splitPdfPages(data: ArrayBuffer): Promise<Uint8Array[]> {
  const doc = await PDFDocument.load(data)
  const outputs: Uint8Array[] = []
  for (let i = 0; i < doc.getPageCount(); i++) {
    const out = await PDFDocument.create()
    const [page] = await out.copyPages(doc, [i])
    out.addPage(page)
    const bytes = await out.save()
    outputs.push(bytes)
  }
  return outputs
}
