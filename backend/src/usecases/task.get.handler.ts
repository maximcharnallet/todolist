import { BadRequestError } from "../errors/bad-request.error";
import { ConflictError } from "../errors/conflict.error";
import { NotFoundError } from "../errors/not-found.error";
import { NotAuthorizedError } from "../errors/not-authorized.error";
import type { Task } from "../models/task.model";
import type { TaskRepository } from "../ports/task.repository";

export class GetTaskUseCase {
    private taskRepository : TaskRepository

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository
    }

    public async execute(userId: string) {

        return await this.taskRepository.getTask(userId)

    }
}