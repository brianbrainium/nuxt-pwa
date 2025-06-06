import * as pdfjsLib from 'pdfjs-dist'
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf'
import { defineNuxtPlugin } from '#app'

// Set workerSrc to local path so it works offline
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js'

export default defineNuxtPlugin(() => {})
