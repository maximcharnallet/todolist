import { BadRequestError } from "../errors/bad-request.error";
import { ConflictError } from "../errors/conflict.error";
import { NotFoundError } from "../errors/not-found.error";
import { NotAuthorizedError } from "../errors/not-authorized.error";
import type { Task } from "../models/task.model";
import type { TaskRepository } from "../repositories/task.repository";

export class DeleteTaskUseCase {
    private taskRepository : TaskRepository

    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository
    }

    public async execute(taskId: string) {
    
        const result = await this.taskRepository.deleteTask(taskId)
        
        if (result === 0) {
            throw new NotFoundError("Tâche non trouvé")
        }
        return { success: true };

    }
}