import { BadRequestError } from "../errors/bad-request.error";
import { ConflictError } from "../errors/conflict.error";
import { NotFoundError } from "../errors/not-found.error";
import { NotAuthorizedError } from "../errors/not-authorized.error";
import type { Task } from "../models/task.model";
import type { TaskRepository } from "../repositories/task.repository";

export class CreateTaskUseCase {
    private taskRepository : TaskRepository

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository
    }

    public async execute(title: string, userId: string) {
        const task: Task = {
            title: title,
            userId: userId, 
        }

        const result = await this.taskRepository.createTask(task)

        return result
    }
}