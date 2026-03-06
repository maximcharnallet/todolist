import { ref } from 'vue'
import { addTask } from '@/services/addTask.service'
import { deleteTask } from '@/services/deleteTask.service'
import { fetchTasks } from '@/services/getTask.service'

export function useTask () {
  const tasks = ref<{ _id?: string, title: string }[]>([])
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

  async function doGetTask () {
    try {
      const data = await fetchTasks()
      tasks.value = data.tasks || []
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
    } catch {
      isError.value = true
      setTimeout(() => {
        isError.value = false
      }, 3000)
    }
  }

  return {
    doAddTask,
    doGetTask,
    doDeleteTask,
    tasks,
    newTask,
    isError,
  }
}
