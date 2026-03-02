import fastify from 'fastify';
import mongodb from "@fastify/mongodb";


const app = fastify({ logger: true });

app.register(mongodb, {
  forceClose: true,
  url: "mongodb://localhost:27017/todolist" 
});


app.get("/tasks", async (request, reply) => {

    const db = app.mongo.db;

    const tasks = await db?.collection("tasks").find().toArray();
    return tasks;
});

app.post("/tasks", async (request, reply) => {
  const { title } = request.body as { title: string }; 
  const collection = app.mongo.db?.collection("tasks"); 
  const result = await collection?.insertOne({ title }); 
  return result; 
});

app.delete("/tasks/:id", async (request, reply) => {
  const { id } = request.params as { id: string };
  const collection = app.mongo.db?.collection("tasks");
  const result = await collection?.deleteOne({
    _id: new app.mongo.ObjectId(id)
  })

  if (result?.deletedCount === 0) {
    return reply.code(404).send({ error:"Tâche non trouvée" });
  }
   return { success: true };
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