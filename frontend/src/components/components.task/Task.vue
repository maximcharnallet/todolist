<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { onMounted, ref } from 'vue'
  import { taskStore } from '@/store/task.store'
  import Edit from './Edit.vue'

  const newTask = ref ('')

  const store = taskStore()

  const { tasks, isError } = storeToRefs(store)

  const dialog = ref(false)
  const selectedTask = ref<any>(null)

  onMounted(() => {
    store.doGetTask()
    console.log('onMounted :', onMounted)
  })

  async function handleAddTask () {
    await store.doAddTask(newTask.value)
    newTask.value = ''
  }

  async function handleDeleteTask (id: string) {
    await store.doDeleteTask(id)
  };

  async function openEditDialog (task: any) {
    selectedTask.value = { ...task }
    dialog.value = true
    return
  }

</script>
<template>
  <v-container>
    <h1 class="text-center pb-4"> Vos tâches à faire </h1>
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
            prepend-icon="mdi-pencil"
            text="Modifier"
            variant="tonal"
            @click="openEditDialog(task)"
          />
          <v-btn
            color="error"
            icon="mdi-delete"
            variant="text"
            @click="handleDeleteTask(task._id!)"
          />
        </template>
      </v-list-item>
    </v-list>
    <Edit
      v-model="dialog"
      :task="selectedTask"
    />
  </v-container>

</template>
