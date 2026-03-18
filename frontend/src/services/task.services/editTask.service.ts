import { addTask } from './addTask.service'
import { deleteTask } from './deleteTask.service'

export async function editTask (_id: string, task: string) {
  await deleteTask(_id)
  await addTask(task)
}
