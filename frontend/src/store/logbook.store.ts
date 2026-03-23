import { defineStore } from 'pinia'
import { ref } from 'vue'
import { addLog } from '@/services/logbook.services/addLogs.service'
import { fetchLogbook } from '@/services/logbook.services/getLogs.service'

export const logbookStore = defineStore('logbook', () => {
  const logbook = ref<{
    description: string
    date: string
    user: {
      id: string
      name: string
    }
    isImportant: boolean

    // type: string
    // severity: string
  }[]>([])
  const newLog = ref({
    description: '',
    date: '',
    time: '',
    isImportant: false,
    // type: '',
    // severity: '',
  })

  const isLoading = ref(false)
  const isError = ref(false)

  async function doGetLog () {
    isLoading.value = true
    try {
      const data = await fetchLogbook()
      logbook.value = data.Logbook || []
    } catch {
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    } finally {
      isLoading.value = false
    }
  }

  async function doAddLog (entry: {
    description: string
    date: string
    isImportant: boolean
  }) {
    try {
      await addLog(entry)
      await doGetLog()
      newLog.value = {
        description: '',
        date: '',
        time: '',
        isImportant: false,
      }
    } catch {
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    }
  }

  return { newLog, logbook, isError, isLoading, doGetLog, doAddLog }
})
