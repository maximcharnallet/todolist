import { NotFoundError } from "../errors/not-found.error";
import type { TaskRepository } from "../ports/task.repository";

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