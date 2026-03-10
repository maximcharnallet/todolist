<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onMounted, ref } from 'vue'
  import { taskStore } from '@/store/task.store'

  const newTask = ref ('')

  const store = taskStore()

  const { tasks, isError } = storeToRefs(store)

  onMounted(() => {
    store.doGetTask()
  })

  async function handleAddTask () {
    await store.doAddTask(newTask.value)
    newTask.value = ''
  }

  async function handleDeleteTask (id: string) {
    await store.doDeleteTask(id)
  };

</script>
<template>
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

</template>
