<script setup lang="ts">
import { computed } from 'vue'
import { useMemoryMonitor } from '../composables/useMemoryMonitor'

const { usedJSHeapSize } = useMemoryMonitor()

const memoryMB = computed(() => {
  return usedJSHeapSize.value !== null
    ? (usedJSHeapSize.value / (1024 * 1024)).toFixed(2)
    : 'N/A'
})

const supported = computed(() => usedJSHeapSize.value !== null)
</script>

<template>
  <div class="fixed bottom-0 right-0 p-1 text-xs text-gray-600">
    <span v-if="supported">Memory: {{ memoryMB }} MB</span>
    <span v-else>Memory: N/A</span>
  </div>
</template>
