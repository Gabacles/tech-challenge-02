import {
  Post,
  PostCreate,
  PostRepository,
  PostUpdate,
} from "@/interfaces/posts.interface";
import { PostsRepositoryPrisma } from "@/repositories/posts.repository";
import { UserRepository } from "@/interfaces/users.interface";
import { UserRepositoryPrisma } from "@/repositories/users.repository";

export class PostUseCase {
  private postRepository: PostRepository;
  private userRepository: UserRepository;

  constructor() {
    this.postRepository = new PostsRepositoryPrisma();
    this.userRepository = new UserRepositoryPrisma();
  }

  async list(): Promise<Post[]> {
    return await this.postRepository.list();
  }

  async findById(id: number): Promise<any | null> {
    return await this.postRepository.findById(id);
  }

  async create({ title, content, user_email }: PostCreate): Promise<Post> {
    const userExists = await this.userRepository.findByEmail(user_email);

    if (!userExists) {
      throw new Error("User does not exist");
    }

    return await this.postRepository.create({ title, content, user_email });
  }

  async update(
    id: number,
    { title, content }: PostUpdate
  ): Promise<Post | null> {
    return await this.postRepository.update(id, { title, content });
  }

  async delete(id: number): Promise<Post | null> {
    return await this.postRepository.delete(id);
  }

  async findByTitleOrContent(search: string): Promise<Post[]> {
    return await this.postRepository.findByTitleOrContent(search);
  }
}
