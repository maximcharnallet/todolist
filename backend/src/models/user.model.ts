import type { ObjectId } from "@fastify/mongodb";

export interface User {
    _id?: ObjectId; 
    name: string
    password: string
} 