import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

await setup({ server: true })

describe('pages render', () => {
  it('home page is reachable', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div id="__nuxt"></div>')
  })

  it('memory page is reachable', async () => {
    const html = await $fetch('/memory')
    expect(html).toContain('<div id="__nuxt"></div>')
  })

  it('offline page is reachable', async () => {
    const html = await $fetch('/offline')
    expect(html).toContain('<div id="__nuxt"></div>')
  })

  it('upload page is reachable', async () => {
    const html = await $fetch('/upload')
    expect(html).toContain('<div id="__nuxt"></div>')
  })
})
