import type { FastifyInstance } from "fastify"
import { RegisterUserUseCase } from "../usecases/user.register.handler"
import { UserRepository } from "../repositories/user.repository"
import { ConflictError } from "../error/conflict.error"
import { LoginUserUseCase } from "../usecases/user.login.handler"
import { NotAuthorizedError } from "../error/not-authorized.error"

export function registerAuthController(app: FastifyInstance) {
  const userRepository = new UserRepository(app)

  app.post("/check_register", async (req, reply) => {
    const { name, password, password2 } = req.body as any

    const handler = new RegisterUserUseCase(userRepository)
    try {
      const userId = await handler.execute(name, password, password2)
      return { success: true, userId }
    } catch (e) {
      if (e instanceof ConflictError) {
        return reply.code(403).send({ error: e.message })
      }
      if (e instanceof Error) {
        return reply.code(400).send({ error: e.message })
      }
    }
  })

  app.post("/check_login", async (req, reply) => {
    const { name, password } = req.body as any

    const handler = new LoginUserUseCase(userRepository, app.jwt)

    try {
      const token = await handler.execute(name, password)
      return { success: true, token }
    } catch (e) {
      if (e instanceof NotAuthorizedError) {
        return reply.code(401).send({ error: e.message })
      }
      if (e instanceof Error) {
        return reply.code(400).send({ error: e.message })
      }
    }
  })
}
