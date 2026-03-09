import fastify from 'fastify';
import mongodb from "@fastify/mongodb";
import fastifyJwt from "@fastify/jwt";
import cors from '@fastify/cors';
import { registerAuthController } from './controllers/auth.http';
import { taskController } from './controllers/task.http';

const app = fastify({ logger: true });

app.register(mongodb, {
  forceClose: true,
  url: "mongodb://localhost:27017/todolist" 
});

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

app.register(async (instance) => {
  registerAuthController(instance)
  taskController(instance)
})






const start = async () => {
  try {
    await app.ready();
    await app.listen({ port: 3001, host: '0.0.0.0' });
    console.log(`Serveur prêt sur http://localhost:3001`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();