<script setup lang="ts">
  import { jwtDecode } from 'jwt-decode'
  import { onMounted, ref } from 'vue'
  import { useTask } from '@/composables/useTask'

  const { tasks, isError, newTask, doAddTask, doGetTask, doDeleteTask } = useTask ()

  const token = localStorage.getItem('user_token')

  const userName = ref('')

  if (token) {
    const decoded: any = jwtDecode(token)
    userName.value = decoded.name
  }

  async function fetchTasks () {
    await doGetTask()
  }

  onMounted(fetchTasks)

  async function handleAddTask () {
    await doAddTask(newTask.value)
    newTask.value = ''
    await doGetTask()
  }

  async function handleDeleteTask (id: string) {
    await doDeleteTask(id)
    await doGetTask()
  };

</script>
<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar :title="`Bonjour ${userName}, voici tes tâches à faire`" />

    <v-main class="d-flex align-center justify-center" height="700">
      <v-container>
        <v-text-field v-model="newTask" clearable label="Ajouter..." @keydown.enter="handleAddTask()">
          <template #append-inner>
            <v-btn color="primary" variant="text" @click="handleAddTask()">
              Ajouter
            </v-btn>
          </template>
        </v-text-field>
        <v-list>
          <v-list-item v-for="task in tasks" :key="task._id" :title="task.title">
            <template #append>
              <v-btn
                color="error"
                variant="text"
                @click="handleDeleteTask(task._id!)"
              >Supprimer</v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-layout>
</template>
