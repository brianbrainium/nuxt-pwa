<script setup lang="ts">
import { usePdfStore } from '~/stores/pdf'
import PdfDropZone from '~/components/PdfDropZone.vue'
import SplitOptions from '~/components/SplitOptions.vue'

const store = usePdfStore()
</script>

<template>
  <main class="p-4 space-y-4">
    <h1 class="text-xl font-bold">Upload PDF</h1>
    <PdfDropZone />
    <SplitOptions v-if="store.file" />
    <div v-if="store.splitParts.length" class="space-y-1">
      <h2 class="font-semibold">Parts</h2>
      <ul>
        <li v-for="(part, idx) in store.splitParts" :key="idx">
          {{ part.name }} ({{ (part.blob.size / 1024).toFixed(1) }} KB)
        </li>
      </ul>
    </div>
  </main>
</template>
