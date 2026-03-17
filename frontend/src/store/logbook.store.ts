import { defineStore } from 'pinia'
import { ref } from 'vue'

export const logbookStore = defineStore('logbook', () => {
  const logs = ref<{
    userId: string
    type: string
    description: string
    severity: string
    date: Date
  }[]>([])
})
