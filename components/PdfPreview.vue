<script setup lang="ts">
import { computed } from 'vue'
import { usePdfStore } from '~/stores/pdfStore'

const store = usePdfStore()
const outputs = computed(() => store.outputParts)
</script>

<template>
  <div>
    <p v-if="outputs.length === 0">No pages generated</p>
    <ul v-else>
      <li v-for="(part, index) in outputs" :key="index">Page {{ index + 1 }}</li>
    </ul>
  </div>
</template>
