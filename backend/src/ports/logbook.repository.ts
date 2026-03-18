import type { Logbook } from "../models/logbook.model";

export interface LogbookRepository {
    createLog (logbook: Logbook): Promise<any>;
    getLogs(): Promise<Logbook[]>;
}