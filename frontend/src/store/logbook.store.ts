import { defineStore } from 'pinia'
import { ref } from 'vue'
import { addLog } from '@/services/logbook.services/addLogs.service'
import { fetchLogbook } from '@/services/logbook.services/getLogs.service'

export const logbookStore = defineStore('logbook', () => {
  const logbook = ref<{
    userId: string
    type: string
    description: string
    severity: string
    date: string
  }[]>([])
  const isLoading = ref(false)
  const isError = ref(false)

  async function doGetLog () {
    isLoading.value = true
    try {
      const data = await fetchLogbook()
      logbook.value = data.logbook || []
    } catch {
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    } finally {
      isLoading.value = false
    }
  }
  const newLog = ref({
    userId: '',
    type: '',
    description: '',
    severity: '',
    date: '',
    time: '',
  })

  async function doAddLog (entry: {
    userId: string
    type: string
    description: string
    severity: string
    date: string
  }) {
    try {
      await addLog(entry)
      logbook.value.push({
        userId: entry.userId,
        type: entry.type,
        description: entry.description,
        severity: entry.severity,
        date: entry.date,
      })
      await doGetLog()
    } catch {
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    }
  }

  return { newLog, logbook, isError, isLoading, doGetLog, doAddLog }
})
