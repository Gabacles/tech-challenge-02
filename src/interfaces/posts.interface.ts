export interface Post {
  id: number;
  title: string;
  content: string;
  user_email: string | null;
}

export interface PostCreate {
  title: string;
  content: string;
  user_email: string;
}

export interface PostUpdate {
  title: string;
  content: string;
}

export interface PostRepository {
  list(): Promise<Post[]>;
  findById(id: number): Promise<Post | null>;
  create(post: PostCreate): Promise<Post>;
  update(id: number, post: PostUpdate): Promise<Post | null>;
  delete(id: number): Promise<Post | null>;
  findByTitleOrContent(search: string): Promise<Post[]>;
}
