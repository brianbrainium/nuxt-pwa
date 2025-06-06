import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TOCTree from '../components/TOCTree.vue'
import { usePdfStore } from '../stores/pdf'

describe('TOCTree component', () => {
  it('renders and updates selection', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const store = usePdfStore()
    store.setToc([
      { id: '1', title: 'Chapter 1', children: [
        { id: '1.1', title: 'Section 1.1' }
      ] }
    ])
    const wrapper = mount(TOCTree, { global: { plugins: [pinia] } })
    expect(wrapper.text()).toContain('Chapter 1')
    await wrapper.find('input').setValue(true)
    expect(store.selectedSections).toContain('1')
    expect(store.selectedSections).toContain('1.1')
  })
})
