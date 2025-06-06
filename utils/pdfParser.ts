import * as pdfjsLib from 'pdfjs-dist'

export interface ParsedPdf {
  metadata: any
  outline: any[]
}

function resolveOutline(items: any[] | undefined): any[] {
  if (!items) return []
  return items.map(item => ({
    title: item.title,
    dest: item.dest,
    url: item.url,
    items: resolveOutline(item.items)
  }))
}

export async function parsePdfSource(input: File | ArrayBuffer): Promise<ParsedPdf> {
  let data = input instanceof File ? await input.arrayBuffer() : input
  if (data instanceof Buffer) {
    data = new Uint8Array(data)
  }
  const loadingTask = pdfjsLib.getDocument({ data })
  const pdf = await loadingTask.promise
  const meta = await pdf.getMetadata().catch(() => ({ info: null, metadata: null }))
  const outlineRaw = await pdf.getOutline().catch(() => [])
  const outline = resolveOutline(outlineRaw as any[])
  return { metadata: meta, outline }
}
