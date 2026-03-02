import fastify from 'fastify';
import mongodb from "@fastify/mongodb";


const app = fastify({ logger: true });

app.register(mongodb, {
  forceClose: true,
  url: "mongodb://localhost:27017/" 
});

app.get('/', async () => {
  return { ok: true };
});

app.get("tasks", async (request, reply) => {

    const db = app.mongo.db;

    const tasks = await db?.collection("tasks").find().toArray();
    return tasks;
});




const start = async () => {
  try {
    await app.listen({ port: 3001, host: '0.0.0.0' });
    console.log(`Serveur prêt sur http://localhost:3001`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();