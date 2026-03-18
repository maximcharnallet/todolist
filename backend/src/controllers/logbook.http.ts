import type { FastifyInstance } from "fastify"
import { LogbookRepositoryImpl } from "../repositories/logbook.repository"
import type { LogbookRepository } from "../ports/logbook.repository"
import type { Logbook } from "../models/logbook.model"
import { CreateLogUsecase } from "../usecases/logbook.create.handler"
import { ConflictError } from "../errors/conflict.error"
import { GetLogUsecase } from "../usecases/logbook.get.handler"



export function logbookController (app: FastifyInstance) { 
  const logbookRepository : LogbookRepository = new LogbookRepositoryImpl(app)

  interface JwtPayload {
    id: string;
    name: string
  }
  app.get("/logbook", {
    onRequest: [(app as any).authenticate],
    schema: {
      tags: ['Logbook'],
      security: [{ bearerAuth: [] }], 
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            Logbook: { type: 'array', items: { type: 'object', additionalProperties: true } }
          }
        }
      }
    }
  }, async (request, reply) => {
    const handler = new GetLogUsecase(logbookRepository)
    const logs = await handler.execute()
    console.log("Logbook :", logs)
    return { success: true, Logbook: logs}

  })


  app.post("/logbook", {
    onRequest: [(app as any).authenticate],
    schema: {
      tags: ['Logbook'],
      security: [{ bearerAuth: [] }],
      body: {
        type: 'object',
        required: ['logbook'],
        properties: {
          logbook: {
            type:'objet',
            required: ['description', 'date'],
            properties: {
            description: { type: 'string' },
            date: { type: 'string', format: 'date-time' } 
            }
          }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            newLog: { type: 'object', additionalProperties: true },
          }
        },
        403: {
          type: 'object',
          properties: { error: { type: 'string' } }
        },
        400: {
          type: 'object',
          properties: { error: { type: 'string' } }
        },
      }

    }
  }, async (request, reply) => {
      let newLog
      const user = (request.user as JwtPayload)
      console.log("user JWT payload :", user)
      const userId = user.name
      const { logbook } = request.body as { logbook: Logbook};
      const handler = new CreateLogUsecase(logbookRepository)
      
      try {
          newLog = await handler.execute(userId, logbook.description, logbook.date)
          return { success: true, newLog }
      } catch (e) {
          if (e instanceof ConflictError){
              return reply.code(403).send({ error: e.message })
          }
          if (e instanceof Error) {
              return reply.code(400).send({ error: e.message})
          }
      }
  })
}