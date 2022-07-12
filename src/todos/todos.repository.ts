import { ToDo } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';
import { TodoCreateDto } from './dto/Todo.dto';
import { ITodosRepository } from './todos.repository.interface';

@injectable()
export class TodosRepository implements ITodosRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async createTodo({ description, completed, userId }: TodoCreateDto): Promise<ToDo> {
		return await this.prismaService.client.toDo.create({
			data: {
				description,
				completed,
				userId,
			},
		});
	}
}
