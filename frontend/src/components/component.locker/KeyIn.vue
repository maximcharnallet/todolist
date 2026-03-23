<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onMounted, ref } from 'vue'
  import { useFetchUsers } from '@/composables/useFetchUsers'
  import { lockerStore } from '@/store/locker.store'

  const store = lockerStore()
  const { keyOutLocker, errorMessage } = storeToRefs(store)
  const { isError, isLoading, users, doFetchUsers } = useFetchUsers()

  const currentDate = ref(new Date().toISOString().slice(0, 10))
  const currentTime = ref(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }))

  const newIn = ref({
    numAppart: '',
    who: '',
    approuve: '',
  })

  onMounted(() => {
    doFetchUsers()
  })

  const isActive = defineModel<boolean>()

  async function handleAddKeyOut () {
    const entry = {
      numAppart: newIn.value.numAppart,
      date: `${currentDate.value} ${currentTime.value}`,
      who: newIn.value.who,
      approuve: newIn.value.approuve,
    }
    store.addKeyIn(entry)

    newIn.value = { numAppart: '', who: '', approuve: '' }
    isActive.value = false
  }

</script>
<template>
  <v-dialog v-model="isActive" max-width="800">
    <v-card class="pa-4" elevation="2">
      <v-card-title>Nouvelle sortie de clés</v-card-title>
      <v-form>
        <div class="d-flex ga-2">
          <v-text-field v-model="newIn.numAppart" label="Numéro d'appartement" />
          <v-text-field v-model="newIn.who" label="Qui" />
          <v-select
            v-model="newIn.approuve"
            item-title="name"
            item-value="name"
            :items="users"
            label="Approuvé par"
          />
        </div>
        <div class="d-flex ga-2">
          <v-text-field
            v-model="currentDate"
            label="Date"
            type="date"
          />
          <v-text-field
            v-model="currentTime"
            label="Heure"
            step="60"
            type="time"
          />
        </div>
        <div class="d-flex justify-center mt-4">
          <v-btn color="primary" @click="handleAddKeyOut">Enregistrer</v-btn>
          <v-btn variant="text" @click="isActive = false">Annuler</v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>

</template>
