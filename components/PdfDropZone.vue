<script setup lang="ts">
import { ref } from 'vue'
import { usePdfStore } from '~/stores/pdfStore'

const store = usePdfStore()
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const errorMessage = ref('')

function handleFiles(files: FileList | null) {
  if (!files || !files[0]) return
  const file = files[0]
  if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
    store.file = file
    store.fileData = null
  }
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  isDragging.value = false
  const files = e.dataTransfer?.files
  if (files && files[0]) {
    if (files[0].type === 'application/pdf') {
      errorMessage.value = ''
      handleFiles(files)
    } else {
      errorMessage.value = 'Only PDF files are supported'
    }
  }
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
  isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  handleFiles(files)
}

function openFile() {
  fileInput.value?.click()
}
</script>

<template>
  <div
    class="border-2 border-dashed rounded p-8 text-center cursor-pointer"
    :class="{ 'bg-blue-50': isDragging }"
    @drop="onDrop"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @click="openFile"
  >
    <p v-if="!store.file">Drop PDF here or click to upload</p>
    <p v-else>{{ store.file.name }} ({{ (store.file.size / 1024).toFixed(1) }} KB)</p>
    <input ref="fileInput" type="file" accept="application/pdf" class="hidden" @change="onFileChange" />
  </div>
  <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
</template>
