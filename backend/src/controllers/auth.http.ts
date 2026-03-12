import type { FastifyInstance } from "fastify"
import { RegisterUserUseCase } from "../usecases/user.register.handler"
import { UserRepository } from "../repositories/user.repository"
import { ConflictError } from "../errors/conflict.error"
import { LoginUserUseCase } from "../usecases/user.login.handler"
import { NotAuthorizedError } from "../errors/not-authorized.error"
import { NotFoundError } from "../errors/not-found.error"

export function registerAuthController(app: FastifyInstance) {
    const userRepository = new UserRepository(app)

    app.post("/check_register", {
      schema: {
        tags: ['Auth'],
        body: {
          type: 'object',
          required: ['name', 'password', 'password2'],
          properties: {
            name: { type: 'string' },
            password: { type: 'string' },
            password2: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              userId: { type: 'string' }
            }
          },
          403: { 
            type: 'object',
            properties: {
              error: { type: 'string' } 
            } 
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string'}
            }
          }
        }
      },
    }, async (req, reply) => {
        const { name, password, password2 } = req.body as any

        const handler = new RegisterUserUseCase(userRepository)
        try {
            const userId = await handler.execute(name, password, password2)
            return { success: true, userId}
        } catch (e) {
            if (e instanceof ConflictError) {
                return reply.code(403).send({ error: e.message })
            }
            if (e instanceof Error) {
                return reply.code(400).send({ error: e.message })
            }
        }
    })

    app.post("/check_login",{
      schema: {
        tags: ['Auth'],
        body: {
          type: 'object',
          required: ['name', 'password'],
          properties: {
            name: { type: 'string' },
            password: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              token: { type: 'string' }
            }
          },
          404: { 
            type: 'object',
            properties: {
              error: { type: 'string' } 
            } 
          },
          403: { 
            type: 'object',
            properties: {
              error: { type: 'string' } 
            } 
          },
          401: { 
            type: 'object',
            properties: {
              error: { type: 'string' } 
            } 
          },
          400: {
            type: 'object',
            properties: {
              error: { type: 'string'}
            }
          }
        }
      }
    }, async (req, reply) => {
        const { name, password } = req.body as any 

        const handler = new LoginUserUseCase(userRepository, app.jwt)

        try {
            const token = await handler.execute(name, password)
            return { success: true, token }
        } catch (e) {
            if (e instanceof NotFoundError) {
                return reply.code(404).send({ error: e.message })
            }
            if (e instanceof NotAuthorizedError) { 
                return reply.code(401).send({ error: e.message })
        }
            if (e instanceof ConflictError) {
                return reply.code(403).send({ error: e.message })
            }
            if (e instanceof Error) {
                return reply.code(400).send({ error: e.message })
            }
        }
    })
}