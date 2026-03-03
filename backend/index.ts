import fastify from 'fastify';
import mongodb from "@fastify/mongodb";
import fastifyJwt from "@fastify/jwt";
import bcrypt from "bcrypt";
import cors from '@fastify/cors'

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

//==================== Register =====================

app.post("/check_register", async (req, reply) => {
  const { name, password, password2 } = req.body as any; 
  const collection = app.mongo.db?.collection("users");

  const existingUser = await collection?.findOne({ name: name.toLowerCase() })

  if ( password !== password2 ){
    return reply.code(400).send({ error: "Les mots de passent ne correspondent pas"})

  }if (existingUser) {
    return reply.code(403).send({ error: "Ce nom existe déja" }); 
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await collection?.insertOne({
  name: name.toLowerCase(),
  password: hashedPassword
  })

  console.log("nom :", name)
  console.log("password :", password)
  return { success: true, userId: result?.insertedId }; 

  })


//==================== Login ====================

app.post("/check_login", async (req, reply) => {
  const { name, password } = req.body as any; 
  const collection = app.mongo.db?.collection("users");

  const user = await collection?.findOne({ name: name.toLowerCase() })

  if (user) {
    const valid = await bcrypt.compare(password, user.password); 
    if (valid) {
      const token = app.jwt.sign({
        id: user._id,
        name: user.name
      });

      return { success: true, token }
    }
  }
  return reply.code(403).send({ error: "Identifiants invalides" });
});

//====================  Decorate ====================

app.decorate("authenticate", async (req: any, reply: any) => {
  try {
    await req.jwtVerify();
  } catch(err) {
    reply.send(err);
  }
});


//===================== Tasks =========================


app.get("/tasks", {onRequest: [(app as any).authenticate]}, async (request, reply) => {

    const db = app.mongo.db;
    const userId = (request.user as any).id
    const tasks = await db?.collection("tasks").find().toArray();
    return tasks;
});

app.post("/tasks", {onRequest: [(app as any).authenticate]}, async (request, reply) => {
  const { title } = request.body as { title: string }; 
  const userId = (request.user as any).id;
  
  const collection = app.mongo.db?.collection("tasks"); 
  const result = await app.mongo.db?.collection("tasks").insertOne({ 
    title, 
    userId, 
  });
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