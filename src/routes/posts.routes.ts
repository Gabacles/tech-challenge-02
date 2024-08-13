import { FastifyInstance } from "fastify";
import { PostUseCase } from "@/useCases/posts.usecases";
import { PostCreate } from "@/interfaces/posts.interface";
import { authMiddleware } from "@/middleware/auth.middleware";

export async function postRoutes(fastify: FastifyInstance) {
  const postUseCase = new PostUseCase();

  fastify.addHook("preHandler", authMiddleware);

  fastify.get("/", async (req, reply) => {
    try {
      const data = await postUseCase.list();

      return reply.code(200).send(data);
    } catch (error: any) {
      reply.code(500).send({ error: error.message });
    }
  });

  fastify.get<{ Params: { id: number } }>("/:id", async (req, reply) => {
    const { id } = req.params;
    try {
      const data = await postUseCase.findById(id);

      return reply.code(200).send(data);
    } catch (error: any) {
      reply.code(500).send({ error: error.message });
    }
  });

  fastify.post<{ Body: PostCreate }>("/", async (req, reply) => {
    const { title, content } = req.body;

    const { email } = req.headers;

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
  });

  fastify.put<{ Body: PostCreate; Params: { id: number } }>(
    "/:id",
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

  fastify.delete<{ Params: { id: number } }>("/:id", async (req, reply) => {
    const { id } = req.params;
    try {
      const data = await postUseCase.delete(id);

      return reply.code(200).send(data);
    } catch (error: any) {
      reply.code(500).send({ error: error.message });
    }
  });

  fastify.get<{ Querystring: { search: string } }>(
    "/search",
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
