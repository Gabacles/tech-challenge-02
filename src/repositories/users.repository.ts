import {
  UserRepository,
  User,
  UserCreate,
} from "../interfaces/users.interface";
import { prisma } from "..";

class UserRepositoryPrisma implements UserRepository {
  async list(): Promise<User[]> {
    return await prisma.users.findMany();
  }

  async create(data: UserCreate): Promise<User> {
    return await prisma.users.create({
      data: {
        username: data.username,
        email: data.email,
      },
    });
  }

  async delete(id: number): Promise<User | null> {
    return await prisma.users.delete({
      where: {
        id: Number(id),
      },
    });
  }

  async findById(id: number): Promise<User | null> {
    return await prisma.users.findFirst({
      where: {
        id: Number(id),
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.users.findFirst({
      where: {
        email,
      },
    });
  }
}

export { UserRepositoryPrisma };
