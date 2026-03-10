import { defineStore } from 'pinia'
import { ref } from 'vue'
import { addTask } from '@/services/addTask.service'
import { deleteTask } from '@/services/deleteTask.service'
import { editTask } from '@/services/editTask.service'
import { fetchTasks } from '@/services/getTask.service'

export const taskStore = defineStore('task', () => {
  const tasks = ref<{ _id?: string, title: string }[]>([])
  const isError = ref(false)
  const isLoading = ref(false)

  async function doGetTask () {
    isLoading.value = true
    try {
      const data = await fetchTasks()
      tasks.value = data.tasks || []
    } catch {
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    } finally {
      isLoading.value = false
    }
  }

  async function doAddTask (newTask: string) {
    try {
      await addTask(newTask)
      await doGetTask()
    } catch {
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    }
  }

  async function doDeleteTask (_id: string) {
    try {
      await deleteTask(_id)
      await doGetTask()
    } catch {
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    }
  }

  async function doEditTask (_id: string, task: string) {
    try {
      await editTask(_id, task)
      await doGetTask()
    } catch {
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    }
  }

  function $reset () {
    tasks.value = []
  }

  return { tasks, isError, isLoading, doGetTask, doAddTask, doDeleteTask, doEditTask, $reset }
})
