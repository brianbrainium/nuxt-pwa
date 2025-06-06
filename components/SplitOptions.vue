<script setup lang="ts">
import { ref } from 'vue'
import { usePdfStore } from '~/stores/pdf'

const store = usePdfStore()
const mode = ref<'size' | 'sections' | 'toc'>('size')
const size = ref(1)

async function run() {
  if (mode.value === 'sections') {
    await store.splitBySelected()
  } else if (mode.value === 'toc') {
    await store.splitByTOC()
  } else {
    await store.splitByMaxSize(size.value)
  }
}
</script>

<template>
  <div class="space-y-2">
    <div class="space-x-2">
      <label><input type="radio" value="size" v-model="mode" /> By Size</label>
      <label><input type="radio" value="sections" v-model="mode" /> By Sections</label>
      <label><input type="radio" value="toc" v-model="mode" /> By TOC</label>
    </div>
    <div v-if="mode==='size'">
      <input type="number" step="0.1" v-model.number="size" class="border p-1" /> MB
    </div>
    <button class="px-3 py-1 bg-blue-500 text-white rounded" @click="run">Split</button>
    <div v-if="store.progress && store.progress < 100">Splitting... {{ store.progress }}%</div>
  </div>
</template>
