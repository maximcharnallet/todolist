import fastify from "fastify"
import mongodb from "@fastify/mongodb"
import fastifyJwt from "@fastify/jwt"
import bcrypt from "bcrypt"
import cors from "@fastify/cors"
import { UserRepository } from "./repositories/user.repository"
import type { User } from "./models/user.model"
import { RegisterUserUseCase } from "./usecases/user.register.handler"
import { BadRequestError } from "./error/bad-request.error"
import { ConflictError } from "./error/conflict.error"
import { registerAuthController } from "./controllers/auth.http"

const app = fastify({ logger: true })

app.register(mongodb, {
  forceClose: true,
  url: "mongodb://localhost:27017/todolist",
})

app.register(fastifyJwt, {
  secret: "secret",
})

app.register(cors, {
  origin: true,
})

registerAuthController(app)

//====================  Decorate ====================

app.decorate("authenticate", async (req: any, reply: any) => {
  try {
    await req.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

//===================== Tasks =========================

app.get(
  "/tasks",
  { onRequest: [(app as any).authenticate] },
  async (request, reply) => {
    const db = app.mongo.db
    const userId = (request.user as any).id
    const tasks = await db?.collection("tasks").find().toArray()
    return tasks
  },
)

app.post(
  "/tasks",
  { onRequest: [(app as any).authenticate] },
  async (request, reply) => {
    const { title } = request.body as { title: string }
    const userId = (request.user as any).id

    const collection = app.mongo.db?.collection("tasks")
    const result = await app.mongo.db?.collection("tasks").insertOne({
      title,
      userId,
    })
    return result
  },
)

app.delete("/tasks/:id", async (request, reply) => {
  const { id } = request.params as { id: string }
  const collection = app.mongo.db?.collection("tasks")
  const result = await collection?.deleteOne({
    _id: new app.mongo.ObjectId(id),
  })

  if (result?.deletedCount === 0) {
    return reply.code(404).send({ error: "Tâche non trouvée" })
  }
  return { success: true }
})

const start = async () => {
  try {
    await app.listen({ port: 3001, host: "0.0.0.0" })
    console.log(`Serveur prêt sur http://localhost:3001`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
