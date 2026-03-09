import { defineStore } from 'pinia'
import { ref } from 'vue'

export const taskStore = defineStore('task', () => {
  const tasks = ref<{ title: string, done: boolean }[]>([])
  const addTask = (title: string) => {
    tasks.value.push({ title, done: false })
  }
  const toggleTask = (title: string) => {
    const task = tasks.value.find(t => t.title === title)
    if (task) {
      task.done = !task.done
    }
  }

  return {
    tasks,
    addTask,
    toggleTask,
  }
})
