import type { Logbook } from "../models/logbook.model";

export interface LogbookRepository {
    createLogbook (logbook: Logbook): Promise<any>;
    getLogsByUserId(userId: string): Promise<Logbook[]>;
}