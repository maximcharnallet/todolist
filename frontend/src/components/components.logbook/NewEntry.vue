<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { computed } from 'vue'
  import { logbookStore } from '@/store/logbook.store'

  const store = logbookStore()
  const { newLog } = storeToRefs(store)

  const isActive = defineModel<boolean>()

  const currentDate = computed({
    get: () => newLog.value.date || new Date().toISOString().slice(0, 10),
    set: val => newLog.value.date = val,
  })

  const currentTime = computed({
    get: () => newLog.value.time || new Date().toTimeString().slice(0, 5),
    set: val => newLog.value.time = val,
  })

  async function handleAddLog () {
    const dateTime = new Date(`${currentDate.value}T${currentTime.value}`)
    await store.doAddLog({
      description: newLog.value.description,
      date: dateTime.toISOString(),
      // severity: newLog.value.severity,
      // type: newLog.value.type,
    })
    isActive.value = false
  }

</script>
<template>
  <v-dialog v-model="isActive" max-width="600">
    <v-card class="pa-4" elevation="2">
      <v-card-title>Nouvelle entrée</v-card-title>
      <v-form>
        <v-textarea v-model="newLog.description" label="Description" rows="3" />
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
        <!-- <v-select
          v-model="newLog.type"
          :items="['Accident', 'Soin', 'Observation', 'Logistique', 'Urgence']"
          label="Type d'incident"
        /> -->
        <!-- <v-select
          v-model="newLog.severity"
          :items="['Bas', 'Moyen', 'Haut', 'Critique']"
          label="Niveau de gravité"
        /> -->
        <div class="d-flex justify-center mt-4">
          <v-btn color="primary" @click="handleAddLog">Envoyer</v-btn>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>
