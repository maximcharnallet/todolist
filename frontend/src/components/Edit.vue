<script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { ref, watch } from 'vue'
  import { taskStore } from '@/store/task.store'

  const store = taskStore()

  const { tasks, isError } = storeToRefs(store)

  const props = defineProps <{
    modelValue: boolean
    task: any
  }>()

  const localTask = ref({ ...props.task })

  watch(() => props.task, newVal => {
    localTask.value = { ...newVal }
  }, { deep: true })

  const emit = defineEmits(['update:modelValue', 'save'])

  function close () {
    emit('update:modelValue', false)
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
            <v-text-field v-if="task" v-model="localTask.title" />
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
          @click="close"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
