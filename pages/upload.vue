<script setup lang="ts">
import { ref } from 'vue'

const selectedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const errorMessage = ref('')

function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files[0]) {
    selectedFile.value = files[0]
  }
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  const files = e.dataTransfer?.files
  if (files && files[0]) {
    if (files[0].type === 'application/pdf') {
      errorMessage.value = ''
      selectedFile.value = files[0]
    } else {
      errorMessage.value = 'Only PDF files are supported'
    }
  }
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
}
</script>

<template>
  <main class="p-4">
    <h1 class="text-xl font-bold mb-4">Upload PDF</h1>
    <div
      class="border-2 border-dashed rounded p-8 text-center cursor-pointer"
      @drop="onDrop"
      @dragover="onDragOver"
      @click="fileInput?.click()"
    >
      <p v-if="!selectedFile">Drag and drop a PDF here or click to choose</p>
      <p v-else>Selected file: {{ selectedFile.name }}</p>
      <input
        ref="fileInput"
        type="file"
        accept="application/pdf"
        class="hidden"
        @change="onFileChange"
      />
    </div>
    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
  </main>
</template>
