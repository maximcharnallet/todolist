<script setup lang="ts">
  import { jwtDecode } from 'jwt-decode'
  import { storeToRefs } from 'pinia'
  import { onMounted, ref } from 'vue'
  import { taskStore } from '@/store/task.store'
  import Task from './Task.vue'

  const userName = ref('')

  const token = localStorage.getItem('user_token')

  if (token) {
    const decoded: any = jwtDecode(token)
    userName.value = decoded.name
  }

</script>
<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar :title="`Bonjour ${userName}`" />
    <task />
  </v-layout>
</template>
