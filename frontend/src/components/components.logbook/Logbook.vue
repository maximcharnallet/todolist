<script setup lang="ts">

  import { ref } from 'vue'

  const user = ref('')

  const date = ref('')

  const time = ref('')

  const rules = [
    (value: any) => !!value || 'Ce champ est requis.',
  ]

  const logbooks = ref([
    { id: 1, user: 'Alice', type: 'Observation', desc: 'Ronde de nuit effectuée.', time: '10:30', color: 'info' },
    { id: 3, user: 'Tata', type: 'Logistique', desc: 'Livraison effectuée', time: '10h35', color: 'info' },
    { id: 4, user: 'Bob', type: 'Soin', desc: 'Pansement appliqué au genou.', time: '11:15', color: 'success' },
    { id: 5, user: 'Charlie', type: 'Urgence', desc: 'Appel SAMU suite malaise.', time: '12:00', color: 'error' },
  ])

</script>

<template>
  <v-container fluid>
    <h1 class="text-center pb-8">Main courante</h1>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="2">
          <v-card-title>Nouvelle entrée</v-card-title>
          <v-form @submit.prevent>
            <v-text-field v-model="user" label="Utilisateur" :rules="rules" />
            <v-select
              :items="['Accident', 'Soin', 'Observation', 'Logistique', 'Urgence']"
              label="Type d'incident"
            />
            <v-textarea label="Description" rows="3" />
            <v-select
              :items="['Bas', 'Moyen', 'Haut', 'Critique']"
              label="Niveau de gravité"
            />
            <div class="d-flex ga-2">
              <v-text-field v-model="date" label="Date" type="date" />
              <v-text-field v-model="time" label="Heure" type="time" />
            </div>
            <v-btn block class="mt-4" color="primary" type="submit">Envoyer</v-btn>
          </v-form>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="pa-4" elevation="2">
          <h3 class="mb-4 ml-4">Historique récent</h3>
          <v-timeline align="start" side="end">
            <v-timeline-item
              v-for="log in logbooks"
              :key="log.id"
              :dot-color="log.color"
              size="small"
            >
              <template #opposite>
                <span class="text-caption font-weight-bold">{{ log.time }}</span>
              </template>
              <v-card class="elevation-1">
                <v-card-title class="text-subtitle-1">
                  {{ log.type }} — <small>{{ log.user }}</small>
                </v-card-title>
                <v-card-text class="text-body-2">
                  {{ log.desc }}
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
