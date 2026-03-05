import type { FastifyInstance } from "fastify";
import { Collection } from "mongodb"; 
import type { Task } from "../models/task.model";
import { ObjectId } from "@fastify/mongodb";

export class TaskRepository { 
    private collection: Collection<Task> | undefined

    constructor(app: FastifyInstance) {
        this.collection = app.mongo.db?.collection<Task>("tasks")
    }

    public async createTask(task: Task): Promise<ObjectId | undefined> {
        const result = await this.collection?.insertOne(task)
        return result?.insertedId
     }
    
    public async getTask(userId: string): Promise<any [] | null> {
        const existingTask = await this.collection?.find({ userId: userId }).toArray();
        if (existingTask) return existingTask
        return null 

     }

    public async deleteTask(id: string): Promise<number | undefined> {
        const result = await this.collection?.deleteOne({
            _id: new ObjectId(id)
        })
        return result?.deletedCount
    }
}
