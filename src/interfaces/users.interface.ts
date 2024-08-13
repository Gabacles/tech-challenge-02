export interface User {
  id: number;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreate {
  username: string;
  email: string;
}

export interface UserRepository {
  list(): Promise<User[]>;
  create(user: UserCreate): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  delete(id: number): Promise<User | null>;
}
