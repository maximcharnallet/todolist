<script setup lang="ts">
  import { jwtDecode } from 'jwt-decode'
  import { onMounted, ref } from 'vue'

  const token = localStorage.getItem('user_token')
  const userName = ref('')
  if (token) {
    const decoded: any = jwtDecode(token)
    userName.value = decoded.name
  }

  const newTask = ref ('')

  const tasks = ref<{ _id?: string, title: string }[]>([])
  const API_URL = '/api/tasks'

  async function fetchTasks () {
    const res = await fetch(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    })
    tasks.value = await res.json()
  }

  onMounted(fetchTasks)

  async function addTask () {
    if (newTask.value.trim()) {
      const title = newTask.value

      await fetch (API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      })
      newTask.value = ''
      await fetchTasks()
    }
  }

  async function removeTask (id: string) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    await fetchTasks()
  };

</script>
<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar :title="`Bonjour ${userName}, voici tes tâches à faire`" />

    <v-main class="d-flex align-center justify-center" height="700">
      <v-container>
        <v-text-field v-model="newTask" clearable label="Ajouter..." @keydown.enter="addTask()">
          <template #append-inner>
            <v-btn color="primary" variant="text" @click="addTask()">
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
                @click="removeTask(task._id!)"
              >Supprimer</v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-layout>
</template>
