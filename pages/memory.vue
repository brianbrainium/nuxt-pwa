<script setup lang="ts">
import { ref, onMounted } from 'vue'

const availableMemory = ref('Calculating...')

onMounted(async () => {
  if (navigator.storage && navigator.storage.estimate) {
    try {
      const { usage = 0, quota = 0 } = await navigator.storage.estimate()
      const free = quota - usage
      availableMemory.value = `${(free / (1024 * 1024)).toFixed(2)} MB`
    } catch {
      availableMemory.value = 'Unknown'
    }
  } else {
    availableMemory.value = 'Unknown'
  }
})
</script>

<template>
  <main class="p-4">
    <h1 class="text-xl font-bold mb-4">Available Memory</h1>
    <p>Available Storage: {{ availableMemory }}</p>
    <NuxtLink to="/" class="text-blue-500 underline mt-4 inline-block">Back to Home</NuxtLink>
  </main>
</template>
