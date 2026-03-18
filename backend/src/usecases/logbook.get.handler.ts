import type { Logbook } from "../models/logbook.model"
import type { LogbookRepository } from "../ports/logbook.repository"

export class GetLogUsecase {
    private logbookRepository : LogbookRepository
    constructor(logbookRepository : LogbookRepository) {
        this.logbookRepository = logbookRepository
    }

    public async execute(userId: string){
        return await this.logbookRepository.getLogsByUserId(userId)
    }
}
