<script setup lang="ts">
  import { jwtDecode } from 'jwt-decode'
  import { ref } from 'vue'
  import { useLogout } from '@/composables/useLogout'

  const userName = ref('')

  const token = localStorage.getItem('user_token')

  if (token) {
    const decoded: any = jwtDecode(token)
    userName.value = decoded.name
  }

  const { isError, isLoading, doLogout } = useLogout()

  function handleLogout () {
    doLogout()
  }

</script>
<template>
  <v-app>
    <v-layout class="rounded rounded-md border">
      <v-app-bar :title="`Bonjour ${userName}`">
        <template #append>
          <v-btn color="primary" variant="text" @click="handleLogout()">
            Déconnecter
          </v-btn>
        </template>
      </v-app-bar>
      <v-navigation-drawer permanent>
        <v-list nav>
          <v-list-item link title="Tâches" to="/accueil/task" />
          <v-list-item link title="Journal" to="/accueil/logbook" />
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>
