import { defineStore } from 'pinia'
import { ref } from 'vue'

export const lockerStore = defineStore('logbook', () => {
  const errorMessage = ref<string | null>(null)
  const keyOutLocker = ref<{
    numAppart: string
    keyOutDate: string
    keyOutWho: string
    keyOutApprouve: string
    keyInDate: string
    keyInWho: string
    keyInApprouve: string
  }[]>([])

  function addKeyOut (entry: {
    numAppart: string
    date: string
    who: string
    approuve: string
  }) {
    keyOutLocker.value.push({
      numAppart: entry.numAppart,
      keyOutDate: entry.date,
      keyOutWho: entry.who,
      keyOutApprouve: entry.approuve,
      keyInDate: '',
      keyInWho: '',
      keyInApprouve: '',
    })
  }

  function addKeyIn (entry: {
    numAppart: string
    date: string
    who: string
    approuve: string
  }) {
    errorMessage.value = null
    const record = keyOutLocker.value.find(
      item => item.numAppart === entry.numAppart && item.keyInDate === '',
    )
    if (record) {
      record.keyInDate = entry.date
      record.keyInWho = entry.who
      record.keyInApprouve = entry.approuve
    } else {
      errorMessage.value = 'Aucune clé enregistré pour cet appartement ou clé déjà rendue.'
    }
  }

  return {
    keyOutLocker,
    errorMessage,
    addKeyOut,
    addKeyIn,
  }
})
