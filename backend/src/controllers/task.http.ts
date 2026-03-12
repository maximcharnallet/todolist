import type { FastifyInstance } from "fastify"
import { TaskRepository } from "../repositories/task.repository"
import { GetTaskUseCase } from "../usecases/task.get.handler"
import { CreateTaskUseCase } from "../usecases/task.create.handler"
import { ConflictError } from "../errors/conflict.error"
import { DeleteTaskUseCase } from "../usecases/task.delete.handler"
import { NotFoundError } from "../errors/not-found.error"


export function taskController(app: FastifyInstance) {
    const taskRepository = new TaskRepository(app)

    app.get("/tasks", {
      onRequest: [(app as any).authenticate],
      schema: {
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }], 
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              tasks: { type: 'array', items: { type: 'object', additionalProperties: true } }
            }
          }
        }
      }
    }, async (request, reply) => {
        const userId = (request.user as any).id
        console.log("ID cherché :", userId);
        const handler = new GetTaskUseCase(taskRepository)

        const tasks = await handler.execute(userId)
        console.log("Tâches trouvées :", tasks);
        return { success: true, tasks}
    })

    app.post("/tasks", {
      onRequest: [(app as any).authenticate],
      schema: {
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        body: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              task: { type: 'object', items: { type: 'object', additionalProperties: true } }
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
        const { title } = request.body as { title: string};
        const userId = (request.user as any).id

        const handler = new CreateTaskUseCase(taskRepository)
        
        try {
            const task = await handler.execute(title, userId)
            return { success: true, task }
        } catch (e) {
            if (e instanceof ConflictError){
                return reply.code(403).send({ error: e.message })
            }
            if (e instanceof Error) {
                return reply.code(400).send({ error: e.message})
            }
        }
    })

    app.delete("/tasks/:_id", {
      onRequest: [(app as any).authenticate],
      schema: {
        tags: ['Tasks'],
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          properties: {
            _id: { type: 'string', description: 'ID de la tâche' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              success: { type: 'boolean' },
            }
          },
          404: {
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
        const { _id } = request.params as { _id: string };
        
        const handler = new DeleteTaskUseCase(taskRepository)

        try{
            const result = await handler.execute(_id)
            return { success: true };
        } catch(e) {
            if (e instanceof NotFoundError){
                return reply.code(404).send({ error: e.message })
            }
            if (e instanceof Error) {
                return reply.code(400).send({ error: e.message })
            }
        }
    })

}