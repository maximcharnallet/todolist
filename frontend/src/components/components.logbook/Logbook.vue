<script setup lang="ts">
  import { jwtDecode } from 'jwt-decode'
  import { storeToRefs } from 'pinia'
  import { onMounted, ref } from 'vue'
  import { logbookStore } from '@/store/logbook.store'

  const userName = ref('')
  const token = localStorage.getItem('user_token')
  if (token) {
    const decoded: any = jwtDecode(token)
    userName.value = decoded.name
  }

  const store = logbookStore()

  const { newLog, logbook } = storeToRefs(store)

  async function handleAddLog () {
    const dateTime = new Date(`${newLog.value.date}T${newLog.value.time}`)
    await store.doAddLog({
      description: newLog.value.description,
      date: dateTime.toISOString(),
      // severity: newLog.value.severity,
      // type: newLog.value.type,
    })
  }

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
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2">
          <h3 class="mb-4 ml-4">Historique récent</h3>
          <v-timeline align="start" side="end">
            <v-timeline-item
              v-for="log in logbook"
              :key="log.date"
              :dot-color="'info'"
              size="small"
            >
              <template #opposite>
                <span class="text-caption font-weight-bold">
                  {{ new Date(log.date).toLocaleString('fr-FR') }}
                </span>
              </template>
              <v-card class="elevation-1">
                <v-card-title class="text-subtitle-1">
                  <small>{{ userName }}</small>
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
