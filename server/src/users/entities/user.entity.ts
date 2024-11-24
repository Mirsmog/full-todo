import { Todo } from '@/todos/entities/todo.entity';

export class User {
  id: string;
  email: string;
  password: string;
  refreshToken?: string;
  todos?: Todo[];
  createdAt: Date;
  updatedAt: Date;
}
