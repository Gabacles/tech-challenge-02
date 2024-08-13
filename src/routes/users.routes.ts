import { FastifyInstance } from "fastify";
import { UserUseCase } from "../useCases/users.usecases";
import { UserCreate } from "../interfaces/users.interface";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();

  fastify.get("/", async (req, reply) => {
    try {
      const data = await userUseCase.list();

      return reply.code(200).send(data);
    } catch (error: any) {
      reply.code(500).send({ error: error.message });
    }
  });

  fastify.post<{ Body: UserCreate }>("/", async (req, reply) => {
    const { username, email } = req.body;
    try {
      const data = await userUseCase.create({ username, email });

      return reply.code(201).send(data);
    } catch (error: any) {
      reply.code(500).send({ error: error.message });
    }
  });

  fastify.delete<{ Params: { id: number } }>("/:id", async (req, reply) => {
    const { id } = req.params;
    try {
      const data = await userUseCase.delete(id);

      return reply.code(200).send(data);
    } catch (error: any) {
      reply.code(500).send({ error: error.message });
    }
  });

  fastify.get<{ Params: { id: number } }>("/:id", async (req, reply) => {
    const { id } = req.params;
    console.log("TESTE", id);
    try {
      const data = await userUseCase.findById(id);

      return reply.code(200).send(data);
    } catch (error: any) {
      reply.code(500).send({ error: error.message });
    }
  });

  fastify.get<{ Params: { email: string } }>(
    "/email/:email",
    async (req, reply) => {
      const { email } = req.params;
      try {
        const data = await userUseCase.findByEmail(email);

        return reply.code(200).send(data);
      } catch (error: any) {
        reply.code(500).send({ error: error.message });
      }
    }
  );
}
