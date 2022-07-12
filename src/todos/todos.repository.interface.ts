import { ToDo } from '@prisma/client';
import { TodoCreateDto } from './dto/Todo.dto';
import { Todo } from './todo.entity';

export interface ITodosRepository {
	createTodo: (todo: TodoCreateDto) => Promise<ToDo>;
}
