import type { FastifyInstance } from "fastify";
import { Collection } from "mongodb"; 
import type { Logbook } from "../models/logbook.model";
import type { LogbookRepository } from "../ports/logbook.repository";

export class LogbookRepositoryImpl implements LogbookRepository {
    private collection : Collection<Logbook> | undefined

    constructor(app: FastifyInstance) {
        this.collection = app.mongo.db?.collection<Logbook>("Logbooks")
    }

    public async createLogbook(logbook: Logbook): Promise<any> {
        if (!this.collection) throw new Error("Base de données non connectée");
        const result = await this.collection.insertOne({
            ...logbook,
            date: new Date(logbook.date) 
        });
        return result.insertedId;
    }

    public async getLogsByUserId(userId: string): Promise<Logbook[]> {
        if (!this.collection) throw new Error("Base de données non connectée");
        return await this.collection
            .find({ userId: userId })
            .sort({ date: -1 }) 
            .toArray();
    }
} 
