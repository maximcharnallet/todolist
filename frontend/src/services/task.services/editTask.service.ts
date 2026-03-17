import { addTask } from './task.services/addTask.service'
import { deleteTask } from './task.services/deleteTask.service'

export async function editTask (_id: string, task: string) {
  await deleteTask(_id)
  await addTask(task)
}
