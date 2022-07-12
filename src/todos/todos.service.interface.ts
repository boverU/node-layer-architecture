import { ToDo } from '@prisma/client';
import { TodoCreateDto } from './dto/Todo.dto';

export interface ITodosService {
	createTodo: (dto: TodoCreateDto) => Promise<ToDo | null>;
}
