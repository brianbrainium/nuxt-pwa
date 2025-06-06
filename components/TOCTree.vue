<script setup lang="ts">
import { ref, defineComponent, h, computed, PropType } from 'vue'
import { usePdfStore } from '~/stores/pdf'
import type { TocItem } from '~/stores/pdf'

const store = usePdfStore()
const expanded = ref<Record<string, boolean>>({})

const TreeNode = defineComponent({
  name: 'TreeNode',
  props: {
    item: { type: Object as PropType<TocItem>, required: true },
    expanded: { type: Object as PropType<Record<string, boolean>>, required: true }
  },
  emits: ['toggle-expand'],
  setup(props, { emit }) {
    const store = usePdfStore()
    const isExpanded = computed(() => props.expanded[props.item.id])
    const toggleExpand = () => emit('toggle-expand', props.item.id)
    const toggleCheck = () => store.toggleSection(props.item.id)
    return () => h('li', { class: 'ml-4' }, [
      h('div', { class: 'flex items-center space-x-1' }, [
        props.item.children && props.item.children.length
          ? h('button', { class: 'w-4', onClick: toggleExpand }, isExpanded.value ? '-' : '+')
          : null,
        h('input', {
          type: 'checkbox',
          checked: store.selectedSections.includes(props.item.id),
          onChange: toggleCheck
        }),
        h('span', props.item.title)
      ]),
      props.item.children && isExpanded.value
        ? h('ul', {}, props.item.children.map(child =>
            h(TreeNode, {
              item: child,
              expanded: props.expanded,
              onToggleExpand: (id: string) => emit('toggle-expand', id)
            })
          ))
        : null
    ])
  }
})

function toggleExpand(id: string) {
  expanded.value[id] = !expanded.value[id]
}
</script>

<template>
  <ul class="space-y-1">
    <TreeNode
      v-for="item in store.toc"
      :key="item.id"
      :item="item"
      :expanded="expanded"
      @toggle-expand="toggleExpand"
    />
  </ul>
</template>
