<script setup lang="ts">
import { usePdfStore } from '~/stores/pdfStore'

const store = usePdfStore()
</script>

<template>
  <div v-if="store.pdfInfo" class="mt-4">
    <h2 class="text-lg font-semibold mb-2">PDF Metadata</h2>
    <pre class="whitespace-pre-wrap bg-gray-100 p-2">{{ store.pdfInfo }}</pre>
  </div>
</template>
