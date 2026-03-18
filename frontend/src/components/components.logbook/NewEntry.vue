<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { logbookStore } from '@/store/logbook.store'

  const store = logbookStore()
  const { newLog } = storeToRefs(store)

  const isActive = defineModel<boolean>()

  async function handleAddLog () {
    const dateTime = new Date(`${newLog.value.date}T${newLog.value.time}`)
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
          <v-text-field v-model="newLog.date" label="Date" type="date" />
          <v-text-field v-model="newLog.time" label="Heure" type="time" />
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
        <v-btn block class="mt-4" color="primary" @click="handleAddLog">Envoyer</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>
