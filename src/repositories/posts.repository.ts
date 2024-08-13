import { PostCreate, PostRepository, Post } from "@/interfaces/posts.interface";
import { prisma } from "..";

class PostsRepositoryPrisma implements PostRepository {
  async list(): Promise<Post[]> {
    return await prisma.posts.findMany();
  }

  async findById(id: number): Promise<any | null> {
    return await prisma.posts.findFirst({
      where: {
        id,
      },
    });
  }

  async create(data: PostCreate): Promise<Post> {
    return await prisma.posts.create({
      data: {
        title: data.title,
        content: data.content,
        user_email: data.user_email,
      },
    });
  }

  async update(id: number, data: PostCreate): Promise<Post | null> {
    return await prisma.posts.update({
      where: {
        id,
      },
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  async delete(id: number): Promise<Post | null> {
    return await prisma.posts.delete({
      where: {
        id,
      },
    });
  }

  async findByTitleOrContent(search: string): Promise<Post[]> {
    return await prisma.posts.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            content: {
              contains: search,
            },
          },
        ],
      },
    });
  }
}

export { PostsRepositoryPrisma };
