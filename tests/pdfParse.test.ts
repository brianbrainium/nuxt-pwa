import { beforeEach, describe, expect, it } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePdfStore } from '../stores/pdfStore'
import { readFile } from 'fs/promises'
import { join } from 'path'

beforeEach(() => {
  setActivePinia(createPinia())
})

describe('pdf parsing', () => {
  it('stores metadata and outline', async () => {
    const store = usePdfStore()
    const buf = await readFile(join(__dirname, 'fixtures/sample.pdf'))
    await store.parsePdf(buf)
    expect(store.pdfInfo).toBeTruthy()
    expect(Array.isArray(store.toc)).toBe(true)
  })
})
