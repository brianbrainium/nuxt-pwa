import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'
import PdfPreview from '../components/PdfPreview.vue'

describe('PdfPreview component', () => {
  it('renders empty state when no pages', () => {
    const wrapper = mount(PdfPreview, {
      global: { plugins: [createTestingPinia({ stubActions: false, createSpy: vi.fn })] }
    })
    expect(wrapper.text()).toContain('No pages generated')
  })
})
