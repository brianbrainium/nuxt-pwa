<script setup lang="ts">
import { ref } from 'vue'

const status = ref('Click to test offline caching')

async function showMessage() {
  try {
    const res = await fetch('/hello.json')
    const data = await res.json()
    status.value = data.message
  } catch {
    status.value = 'Failed to load message'
  }
}
</script>

<template>
  <main class="p-4">
    <h1 class="text-xl font-bold mb-4">Offline Test</h1>
    <button @click="showMessage" class="px-3 py-1 bg-blue-500 text-white rounded">Test Offline</button>
    <p class="mt-2">{{ status }}</p>
  </main>
</template>
