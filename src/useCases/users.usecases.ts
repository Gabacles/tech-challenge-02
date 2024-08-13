import {
  UserCreate,
  UserRepository,
  User,
} from "../interfaces/users.interface";
import { UserRepositoryPrisma } from "../repositories/users.repository";

export class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async list(): Promise<User[]> {
    return await this.userRepository.list();
  }

  async create({ username, email }: UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findByEmail(email);
    if (verifyIfUserExists) {
      throw new Error("User already exists");
    }

    return await this.userRepository.create({ username, email });
  }

  async delete(id: number): Promise<User | null> {
    return await this.userRepository.delete(id);
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }
}
