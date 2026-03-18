import type { Logbook } from "../models/logbook.model"
import type { LogbookRepository } from "../ports/logbook.repository"

export class CreateLogUsecase {
    private logbookRepository : LogbookRepository
    constructor(logbookRepository : LogbookRepository) {
        this.logbookRepository = logbookRepository
    }

    public async execute(
        userId: string, 
        type: 'accident' | 'soin' | 'observation' | 'logistique' | 'urgence', 
        description: string, 
        severity: 'low' | 'medium' | 'high' | 'critical' ,
        date: Date,
    ) {
        const log: Logbook = {
            userId : userId,
            type : type,
            description: description,
            severity: severity,
            date: date
        }
        const result = await this.logbookRepository.createLog(log)

        return result
    }
}
