<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { ref, watch } from 'vue'
  import { taskStore } from '@/store/task.store'

  const props = defineProps<{
    modelValue: boolean
    task: { _id?: string, title: string } | null
  }>()

  const store = taskStore()

  const { tasks, isError } = storeToRefs(store)

  const emit = defineEmits(['update:modelValue', 'save'])

  const localTask = ref('')

  watch(() => props.task, newTask => {
    localTask.value = newTask ? newTask.title : ''
  }, { immediate: true })

  function close () {
    emit('update:modelValue', false)
  }

  async function handleUpdate () {
    if (props.task && props.task._id) {
      await store.doEditTask(props.task._id, localTask.value)
      close()
    }
  }
</script>
<template>
  <v-dialog
    max-width="600"
    :model-value="modelValue"
    @update:model-value="val => emit('update:modelValue', val)"
  >
    <v-card
      title="Modifier la tâche"
    >
      <v-card-text>
        <v-row density="comfortable">
          <v-col
            cols="12"
            md="12"
            sm="12"
          >
            <v-text-field v-if="tasks" v-model="localTask" @keydown.enter="handleUpdate" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text="Fermer"
          variant="plain"
          @click="close"
        />
        <v-btn
          color="primary"
          text="Modifier"
          variant="tonal"
          @click="handleUpdate"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
