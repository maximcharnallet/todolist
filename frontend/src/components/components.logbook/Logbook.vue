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
    <h1 class="text-center pb-8">Main courante</h1>
    <v-btn
      class="mb-6"
      variant="tonal"
      @click="openNewEntryDialog()"
    > Nouvelle entrée
    </v-btn>
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
              <small>{{ log.userId }}</small>
            </v-card-title>

            <v-card-text class="text-body-2">
              {{ log.description }}
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card>
    <new-entry
      v-model="dialog"
    />
  </v-container>
</template>
