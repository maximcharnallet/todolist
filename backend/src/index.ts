import fastify from 'fastify';
import mongodb from "@fastify/mongodb";
import fastifyJwt from "@fastify/jwt";
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fp from 'fastify-plugin';
import { registerAuthController } from './controllers/auth.http';
import { taskController } from './controllers/task.http';
import { logbookController } from './controllers/logbook.http';

const app = fastify({ logger: true });

// Swager OpenAPI
app.register(swagger, {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Todolist API',
      description: "Documentation de l'API Todolist avec Fastify",
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  }
});

app.register(swaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: true
  }
});


// Mongodb 
app.register(mongodb, {
  forceClose: true,
  url: "mongodb://localhost:27017/todolist" 
});


// Token Jwt
app.register(fastifyJwt, {
  secret: 'secret'
});

app.register(cors, {
  origin: true
});

app.decorate("authenticate", async (req: any, reply: any) => {
  try {
    const authenticatedUser = await req.jwtVerify();
    console.log("authenticatedUser :", authenticatedUser)
  } catch(err) {
    reply.send(err);
  }
});


// Controller
app.register(fp(async (instance) => {
  registerAuthController(instance)
  taskController(instance)
  logbookController(instance)
}))






const start = async () => {
  try {
    await app.ready();
    await app.listen({ port: 3001, host: '0.0.0.0' });
    console.log(`Serveur prêt sur http://localhost:3001`);
    console.log(`Documentation API sur http://localhost:3001/docs`)
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();