<script setup lang="ts">
  import { ref } from 'vue'

  const newTask = ref ('')

  const tasks = ref(['Tâche 1', 'Tâche 2'])

  function addTask () {
    if (newTask.value.trim()) {
      tasks.value.push(newTask.value)
      newTask.value = ''
    }
  }

  console.log('tasks :', tasks)
</script>
<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar title="Mes tâches à faire"></v-app-bar>

    <v-main class="d-flex align-center justify-center" height="300">
      <v-container>
        <v-text-field v-model="newTask" clearable label="Ajouter..." @keydown.enter="addTask">
          <template #append-inner>
            <v-btn color="primary" variant="text" @click="addTask">
              Ajouter
            </v-btn>
          </template>
        </v-text-field>
        <v-list>
          <v-list-item v-for="task in tasks" :key="task" :title="task" />
        </v-list>
      </v-container>
    </v-main>
  </v-layout>
</template>
