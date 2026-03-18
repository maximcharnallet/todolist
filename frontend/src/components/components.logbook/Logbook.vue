<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onMounted } from 'vue'
  import { logbookStore } from '@/store/logbook.store'

  const store = logbookStore()

  const { newLog, logbook } = storeToRefs(store)

  async function handleAddLog () {
    const dateTime = new Date(`${newLog.value.date}T${newLog.value.time}`)
    await store.doAddLog({
      userId: newLog.value.userId,
      type: newLog.value.type,
      description: newLog.value.description,
      severity: newLog.value.severity,
      date: dateTime.toISOString(),
    })
  }

  const severityColor: Record<string, string> = {
    Bas: 'green',
    Moyen: 'orange',
    Haut: 'red',
    Critique: 'purple',
  }

  const rules = [
    (value: any) => !!value || 'Ce champ est requis.',
  ]

  onMounted(() => {
    store.doGetLog()
    console.log('onMounted :', onMounted)
  })

</script>

<template>
  <v-container fluid>
    <h1 class="text-center pb-8">Main courante</h1>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="2">
          <v-card-title>Nouvelle entrée</v-card-title>
          <v-form>
            <v-text-field v-model="newLog.userId" label="Utilisateur" :rules="rules" />
            <v-select
              v-model="newLog.type"
              :items="['Accident', 'Soin', 'Observation', 'Logistique', 'Urgence']"
              label="Type d'incident"
            />
            <v-textarea v-model="newLog.description" label="Description" rows="3" />
            <v-select
              v-model="newLog.severity"
              :items="['Bas', 'Moyen', 'Haut', 'Critique']"
              label="Niveau de gravité"
            />
            <div class="d-flex ga-2">
              <v-text-field v-model="newLog.date" label="Date" type="date" />
              <v-text-field v-model="newLog.time" label="Heure" type="time" />
            </div>
            <v-btn block class="mt-4" color="primary" @click="handleAddLog">Envoyer</v-btn>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2">
          <h3 class="mb-4 ml-4">Historique récent</h3>
          <v-timeline align="start" side="end">
            <v-timeline-item
              v-for="log in logbook"
              :key="log.date"
              :dot-color="severityColor[log.severity] ?? 'grey'"
              size="small"
            >
              <template #opposite>
                <span class="text-caption font-weight-bold">
                  {{ new Date(log.date).toLocaleString('fr-FR') }}
                </span>
              </template>
              <v-card class="elevation-1">
                <v-card-title class="text-subtitle-1">
                  {{ log.type }} — <small>{{ log.userId }}</small>
                </v-card-title>
                <v-card-text class="text-body-2">
                  {{ log.description }}
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
