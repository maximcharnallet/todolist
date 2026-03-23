import type { FastifyInstance } from "fastify"
import { Collection } from "mongodb"
import type { Logbook } from "../models/logbook.model"
import type { LogbookRepository } from "../ports/logbook.repository"

export class LogbookRepositoryImpl implements LogbookRepository {
    private collection : Collection<Logbook> | undefined 

    constructor(app: FastifyInstance) {
        this.collection = app.mongo.db?.collection<Logbook>("Logbooks")
    }

    public async createLog(logbook: Logbook): Promise<any> {
        if (!this.collection) throw new Error("Base de données non connectée");
        const result = await this.collection.insertOne({
            ...logbook,
            date: new Date(logbook.date) 
        })
        return result.insertedId;
    }

    public async getLogs(): Promise<any[]> {
        if (!this.collection) throw new Error("Base de données non connectée");

        return await this.collection.aggregate([
          {
            $addFields: {
                user_oid: { $toObjectId: "$userId" }
            }
          },
          {
            $lookup: {
              from: "users",           
              localField: "user_oid",     
              foreignField: "_id",      
              as: "userDetails"         
              }
          },
          { $unwind: "$userDetails" },      
          {
            $project: {                   
                _id: 1,
                description: 1,
                date: 1,
                user: {
                    id: "$userDetails._id",
                    name: "$userDetails.name"
                },
                isImportant: 1,
              }
        },
        { $sort: { date: -1 } }
    ]).toArray();    
}} 
