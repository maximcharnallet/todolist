<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  import { lockerStore } from '@/store/locker.store'
  import KeyIn from './KeyIn.vue'
  import KeyOut from './KeyOut.vue'

  const store = lockerStore()
  const { keyOutLocker, errorMessage } = storeToRefs(store)
  const dialogKeyOut = ref(false)
  const dialogKeyIn = ref(false)

  async function openKeyOutDialog () {
    store.errorMessage = null
    dialogKeyOut.value = true
    return
  }
  async function openKeyInDialog () {
    store.errorMessage = null
    dialogKeyIn.value = true
    return
  }

</script>
<template>
  <v-container>
    <v-alert
      v-if="store.errorMessage"
      class="mb-4"
      closable
      type="error"
      variant="tonal"
      @click:close="store.errorMessage = null"
    >
      {{ store.errorMessage }}
    </v-alert>
    <div class="d-flex align-center mb-6 gap-3">
      <v-btn class="mb-6" variant="tonal" @click="openKeyOutDialog()">Prise des clés</v-btn>
      <v-btn class="mb-6 ml-auto" variant="tonal" @click="openKeyInDialog()">Dépôt des clés</v-btn>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            N° Appart.
          </th>
          <th class="text-left">
            Prise clés - Date/Heure
          </th>
          <th class="text-left">
            Prise clés - Qui
          </th>
          <th class="text-left">
            Prise clés - Approuvé par
          </th>
          <th class="text-left">
            Dépôt clés - Date/Heure
          </th>
          <th class="text-left">
            Dépôt clés - Qui
          </th>
          <th class="text-left">
            Dépôt clés - Approuvé par
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="k in keyOutLocker"
          :key="k.numAppart"
        >
          <td>{{ k.numAppart }}</td>
          <td>{{ new Date(k.keyOutDate).toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) }}</td>
          <td>{{ k.keyOutWho }}</td>
          <td>{{ k.keyOutApprouve}}</td>
          <td>{{ k.keyInDate ? new Date(k.keyInDate).toLocaleString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '-' }}</td>
          <td>{{ k.keyInWho ? k.keyInWho : '-' }}</td>
          <td>{{ k.keyInApprouve ? k.keyInApprouve : '-' }}</td>

        </tr>
      </tbody>
    </v-table>
    <key-out
      v-model="dialogKeyOut"
    />
    <key-in
      v-model="dialogKeyIn"
    />

  </v-container>

</template>
