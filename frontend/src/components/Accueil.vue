<script setup lang="ts">
  import { jwtDecode } from 'jwt-decode'
  import { storeToRefs } from 'pinia'
  import { ref } from 'vue'
  // import { useTask } from '@/composables/useTask'
  import { taskStore } from '@/stores/task.store'

  // const { tasks, isError, newTask, doAddTask, doGetTask, doDeleteTask } = useTask ()

  const token = localStorage.getItem('user_token')

  const userName = ref('')

  if (token) {
    const decoded: any = jwtDecode(token)
    userName.value = decoded.name
  }

  const title = ref('')
  const store = taskStore()
  const { tasks } = storeToRefs(store)

  function addTask () {
    store.addTask(title.value)
    title.value = ''
  }

</script>
<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar :title="`Bonjour ${userName}`" />
    <v-main class="d-flex align-center justify-center" height="700">
      <v-container>
        <v-text-field v-model="title" clearable label="Ajouter..." @keydown.enter="addTask">
          <template #append-inner>
            <v-btn color="primary" variant="text" @click="addTask">
              Ajouter
            </v-btn>
          </template>
        </v-text-field>

        <v-list>
          <v-list-item v-for="(task, index) in tasks" :key="index">
            <template #prepend>
              <v-checkbox-btn
                v-model="task.done"
                color="success"
              />
            </template>
            <v-list-item-title :class="{ 'text-decoration-line-through text-grey': task.done }">
              {{ task.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-layout>
</template>
