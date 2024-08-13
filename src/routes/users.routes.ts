import { FastifyInstance } from "fastify";
import { UserUseCase } from "../useCases/users.usecases";
import { UserCreate } from "../interfaces/users.interface";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();

  fastify.get(
    "/",
    {
      schema: {
        description: "List all users",
        tags: ["Users"],
        summary: "List all users",
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                username: { type: "string" },
                email: { type: "string" },
              },
            },
          },
        },
      },
    },
    async (req, reply) => {
      try {
        const data = await userUseCase.list();

        return reply.code(200).send(data);
      } catch (error: any) {
        reply.code(500).send({ error: error.message });
      }
    }
  );

  fastify.post<{ Body: UserCreate }>(
    "/",
    {
      schema: {
        description: "Create a user",
        tags: ["Users"],
        summary: "Create a user",
        body: {
          type: "object",
          properties: {
            username: { type: "string" },
            email: { type: "string" },
          },
          required: ["username", "email"],
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" },
              username: { type: "string" },
              email: { type: "string" },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { username, email } = req.body;
      try {
        const data = await userUseCase.create({ username, email });

        return reply.code(201).send(data);
      } catch (error: any) {
        reply.code(500).send({ error: error.message });
      }
    }
  );

  fastify.delete<{ Params: { id: number } }>(
    "/:id",
    {
      schema: {
        description: "Delete a user",
        tags: ["Users"],
        summary: "Delete a user",
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              username: { type: "string" },
              email: { type: "string" },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      try {
        const data = await userUseCase.delete(id);

        return reply.code(200).send(data);
      } catch (error: any) {
        reply.code(500).send({ error: error.message });
      }
    }
  );

  fastify.get<{ Params: { id: number } }>(
    "/:id",
    {
      schema: {
        description: "Find a user by id",
        tags: ["Users"],
        summary: "Find a user by id",
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              username: { type: "string" },
              email: { type: "string" },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      try {
        const data = await userUseCase.findById(id);

        return reply.code(200).send(data);
      } catch (error: any) {
        reply.code(500).send({ error: error.message });
      }
    }
  );

  fastify.get<{ Params: { email: string } }>(
    "/email/:email",
    {
      schema: {
        description: "Find a user by email",
        tags: ["Users"],
        summary: "Find a user by email",
        params: {
          type: "object",
          properties: {
            email: { type: "string" },
          },
          required: ["email"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              id: { type: "number" },
              username: { type: "string" },
              email: { type: "string" },
            },
          },
        },
      },
    },
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
