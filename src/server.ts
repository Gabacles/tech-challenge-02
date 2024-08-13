import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/users.routes";
import { postRoutes } from "./routes/posts.routes";

const app: FastifyInstance = fastify({ logger: true });

app.register(userRoutes, { prefix: "/users" });
app.register(postRoutes, { prefix: "/posts" });

app.listen(
  {
    port: 3000,
  },
  () => {
    console.log("Server is running on http://localhost:3000");
  }
);
