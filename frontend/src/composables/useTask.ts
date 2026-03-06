import { ref } from 'vue'
import { addTask } from '@/services/addTask.service'
import { deleteTask } from '@/services/deleteTask.service'

export function useTask () {
  const newTask = ref ('')
  const isError = ref (false)

  async function doAddTask (newTask: string) {
    try {
      await addTask(newTask)
    } catch {
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    }
  }

  async function doDeleteTask (id: string) {
    try {
      await deleteTask(id)
    } catch {
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    }
  }

  return {
    doAddTask,
    doDeleteTask,
    newTask,
    isError,
  }
}
