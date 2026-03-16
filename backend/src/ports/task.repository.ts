import type { Task } from "../models/task.model";

export interface TaskRepository {
  createTask(task: Task): Promise<any>;
  getTask(userId: string): Promise<Task[] | null>; 
  deleteTask(id: string): Promise<number |undefined>;
}
