<script setup lang="ts">
  import { jwtDecode } from 'jwt-decode'
  import { storeToRefs } from 'pinia'
  import { onMounted, ref } from 'vue'
  import { logbookStore } from '@/store/logbook.store'
  import NewEntry from './NewEntry.vue'

  const userName = ref('')
  const token = localStorage.getItem('user_token')
  if (token) {
    const decoded: any = jwtDecode(token)
    userName.value = decoded.name
  }

  const store = logbookStore()

  const { logbook } = storeToRefs(store)

  const dialog = ref(false)
  const viewMode = ref<'timeline' | 'table'>('timeline')

  onMounted(() => {
    store.doGetLog()
    console.log('onMounted :', onMounted)
  })
  async function openNewEntryDialog () {
    dialog.value = true
    return
  }

</script>

<template>
  <v-container>
    <h1 class="text-center pb-8">Journal</h1>
    <div class="d-flex align-center mb-6 gap-3">
      <v-btn
        class="mb-6"
        variant="tonal"
        @click="openNewEntryDialog()"
      > Nouvelle entrée
      </v-btn>
      <v-btn-toggle
        v-model="viewMode"
        class="ml-auto"
        density="compact"
        mandatory
        variant="outlined"
      >
        <v-btn icon="mdi-timeline-text-outline" value="timeline" />
        <v-btn icon="mdi-table" value="table" />
      </v-btn-toggle>
    </div>
    <v-card class="pa-4" elevation="2">
      <h3 class="mb-4 ml-4">Historique récent</h3>
      <template v-if="viewMode === 'timeline'">
        <v-timeline align="start" side="end">
          <v-timeline-item
            v-for="log in logbook"
            :key="log.date"
            :dot-color="'info'"
            size="small"
          >
            <template #opposite>
              <span class="text-caption font-weight-bold">
                {{ new Date(log.date).toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) }}
              </span>
            </template>
            <v-card class="elevation-1">
              <v-card-title class="text-subtitle-1">
                <small>{{ log.user.name }}</small>
              </v-card-title>
              <v-card-text class="text-body-2">
                {{ log.description }}
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </template>
      <template v-else>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Date / Heure
              </th>
              <th class="text-left">
                Libellé de l'événement
              </th>
              <th class="text-left">
                Nom
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="log in logbook"
              :key="log.date"
            >
              <td>{{ new Date(log.date).toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) }}</td>
              <td>{{ log.description }}</td>
              <td>{{ log.user.name }}</td>
            </tr>
          </tbody>
        </v-table>
      </template>
    </v-card>
    <new-entry
      v-model="dialog"
    />
  </v-container>
</template>
<style scoped>
  :deep(.v-table tbody tr) {
    transition: background-color 0.2s ease;
  }

  :deep(.v-table tbody tr:hover) {
    background-color: rgba(var(--v-theme-info), 0.08);
    cursor: pointer;
  }
</style>
