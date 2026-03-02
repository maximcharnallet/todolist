<script setup lang="ts">
  import { ref } from 'vue'

  const newTask = ref ('')

  const tasks = ref<string[]>([])

  function addTask () {
    if (newTask.value.trim()) {
      tasks.value.push(newTask.value)
      newTask.value = ''
    }
  }

  function removeTask (index: number) {
    tasks.value.splice(index, 1)
  }

  console.log('tasks :', tasks)
</script>
<template>
  <v-layout class="rounded rounded-md border">
    <v-app-bar title="Mes tâches à faire" />

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
          <v-list-item v-for="(task, index) in tasks" :key="index" :title="task">
            <template #append>
              <v-btn
                color="error"
                variant="text"
                @click="removeTask(index)"
              >Supprimer</v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-container>
    </v-main>
  </v-layout>
</template>
