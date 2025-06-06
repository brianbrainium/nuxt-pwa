<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PdfDropZone from '~/components/PdfDropZone.vue'

const availableMemory = ref('Calculating...')
const message = ref('')

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

async function fetchMessage() {
  try {
    const res = await fetch('/hello.json')
    const data = await res.json()
    message.value = data.message
  } catch {
    message.value = 'Failed to load message'
  }
}
</script>

<template>
  <main class="p-4">
    <h1 class="text-xl font-bold mb-4">Home Page</h1>
    <PdfDropZone class="mb-4" />
    <p class="mb-2">Available Storage: {{ availableMemory }}</p>
    <button @click="fetchMessage" class="px-3 py-1 bg-blue-500 text-white rounded">Fetch Offline Message</button>
    <p class="mt-2">{{ message }}</p>
    <nav class="mt-4 space-x-4">
      <NuxtLink to="/memory" class="text-blue-500 underline">Memory</NuxtLink>
      <NuxtLink to="/offline" class="text-blue-500 underline">Offline</NuxtLink>
      <NuxtLink to="/upload" class="text-blue-500 underline">Upload</NuxtLink>
    </nav>
  </main>
</template>
