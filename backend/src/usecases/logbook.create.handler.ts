import type { Logbook } from "../models/logbook.model"
import type { LogbookRepository } from "../ports/logbook.repository"

export class CreateLogUsecase {
    private logbookRepository : LogbookRepository
    constructor(logbookRepository : LogbookRepository) {
        this.logbookRepository = logbookRepository
    }

    public async execute(
        userId: string, 
        description: string, 
        date: Date,
        // type: 'accident' | 'soin' | 'observation' | 'logistique' | 'urgence', 
        // severity: 'low' | 'medium' | 'high' | 'critical' ,
    ) {
        const log: Logbook = {
            userId : userId,
            description: description,
            date: date
            // type : type,
            // severity: severity,
        }
        const result = await this.logbookRepository.createLog(log)

        return result
    }
}
