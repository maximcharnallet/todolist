import type { FastifyInstance } from "fastify";
import type { User } from "../models/user.model";
import type { ObjectId } from "@fastify/mongodb";
import { Collection } from "mongodb";

export class UserRepository {
    private collection: Collection<User> | undefined

    constructor(app: FastifyInstance) {
        this.collection = app.mongo.db?.collection<User>("users")
    }

    public async createUser(user: User): Promise<ObjectId | undefined> {
        const result = await this.collection?.insertOne(user)
        return result?.insertedId
    }

    public async getUser(
        name: string,
    ): Promise<(User) | null> {
        const existingUser = await this.collection?.findOne({
            name:name,
        })
        if (existingUser) return existingUser
        return null
    }
}