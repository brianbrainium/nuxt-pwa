import { ref, onMounted, onUnmounted } from 'vue'

export function useMemoryMonitor(interval = 1000) {
  const usedJSHeapSize = ref<number | null>(null)
  let timer: ReturnType<typeof setInterval> | null = null

  const update = () => {
    const perf: any = (window as any).performance
    if (perf && perf.memory) {
      usedJSHeapSize.value = perf.memory.usedJSHeapSize
    } else {
      usedJSHeapSize.value = null
    }
  }

  onMounted(() => {
    const perf: any = (window as any).performance
    if (perf && perf.memory) {
      update()
      timer = setInterval(update, interval)
    }
  })

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }
  })

  return { usedJSHeapSize }
}
