<script setup lang="ts">
  import { jwtDecode } from 'jwt-decode'
  import { ref } from 'vue'
  import { useLogout } from '@/composables/useLogout'
  import Task from './Task.vue'

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
  <v-layout class="rounded rounded-md border">
    <v-app-bar :title="`Bonjour ${userName}, voici vos tâches à faire`">
      <template #append>
        <v-btn color="primary" variant="text" @click="handleLogout()">
          Déconnecter
        </v-btn>
      </template>
    </v-app-bar>
    <task />
  </v-layout>
</template>
