import { FastifyInstance } from "fastify";
import { PostUseCase } from "@/useCases/posts.usecases";
import { PostCreate } from "@/interfaces/posts.interface";
import { authMiddleware } from "@/middleware/auth.middleware";

export async function postRoutes(fastify: FastifyInstance) {
  const postUseCase = new PostUseCase();

  fastify.addHook("preHandler", authMiddleware);

  fastify.get(
    "/",
    {
      schema: {
        description: "List all posts",
        tags: ["Posts"],
        summary: "List all posts",
        headers: {
          type: "object",
          properties: {
            email: { type: "string" },
          },
          required: ["email"],
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                title: { type: "string" },
                content: { type: "string" },
                user_email: { type: "string" },
              },
            },
          },
        },
      },
    },
    async (req, reply) => {
      try {
        const data = await postUseCase.list();

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
        description: "Find post by id",
        tags: ["Posts"],
        summary: "Find post by id",
        headers: {
          type: "object",
          properties: {
            email: { type: "string" },
          },
          required: ["email"],
        },
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
              title: { type: "string" },
              content: { type: "string" },
              user_email: { type: "string" },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      try {
        const data = await postUseCase.findById(id);

        return reply.code(200).send(data);
      } catch (error: any) {
        reply.code(500).send({ error: error.message });
      }
    }
  );

  fastify.post<{ Body: PostCreate }>(
    "/",
    {
      schema: {
        description: "Create a post",
        tags: ["Posts"],
        summary: "Create a post",
        body: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
          },
          required: ["title", "content"],
        },
        headers: {
          type: "object",
          properties: {
            email: { type: "string" },
          },
          required: ["email"],
        },
        response: {
          201: {
            type: "object",
            properties: {
              id: { type: "number" },
              title: { type: "string" },
              content: { type: "string" },
              user_email: { type: "string" },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { title, content } = req.body;

      const { email } = req.headers as { email: string };

      try {
        const data = await postUseCase.create({
          title,
          content,
          user_email: email,
        });

        return reply.code(201).send(data);
      } catch (error: any) {
        reply.code(500).send({ error: error.message });
      }
    }
  );

  fastify.put<{ Body: PostCreate; Params: { id: number } }>(
    "/:id",
    {
      schema: {
        description: "Update a post",
        tags: ["Posts"],
        summary: "Update a post",
        body: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
          },
          required: ["title", "content"],
        },
        headers: {
          type: "object",
          properties: {
            email: { type: "string" },
          },
          required: ["email"],
        },
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
              title: { type: "string" },
              content: { type: "string" },
              user_email: { type: "string" },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { title, content } = req.body;
      const { id } = req.params;

      try {
        const data = await postUseCase.update(id, { title, content });

        return reply.code(200).send(data);
      } catch (error: any) {
        reply.code(500).send({ error: error.message });
      }
    }
  );

  fastify.delete<{ Params: { id: number } }>(
    "/:id",
    {
      schema: {
        description: "Delete a post",
        tags: ["Posts"],
        summary: "Delete a post",
        params: {
          type: "object",
          properties: {
            id: { type: "number" },
          },
          required: ["id"],
        },
        headers: {
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
              title: { type: "string" },
              content: { type: "string" },
              user_email: { type: "string" },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      try {
        const data = await postUseCase.delete(id);

        return reply.code(200).send(data);
      } catch (error: any) {
        reply.code(500).send({ error: error.message });
      }
    }
  );

  fastify.get<{ Querystring: { search: string } }>(
    "/search",
    {
      schema: {
        description: "Search post by title or content",
        tags: ["Posts"],
        summary: "Search post by title or content",
        querystring: {
          type: "object",
          properties: {
            search: { type: "string" },
          },
          required: ["search"],
        },
        headers: {
          type: "object",
          properties: {
            email: { type: "string" },
          },
          required: ["email"],
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number" },
                title: { type: "string" },
                content: { type: "string" },
                user_email: { type: "string" },
              },
            },
          },
        },
      },
    },
    async (req, reply) => {
      const { search } = req.query;
      try {
        const data = await postUseCase.findByTitleOrContent(search);

        return reply.code(200).send(data);
      } catch (error: any) {
        reply.code(500).send({ error: error.message });
      }
    }
  );
}
