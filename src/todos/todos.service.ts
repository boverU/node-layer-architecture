import { ToDo } from "@prisma/client";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { TodoCreateDto } from "./dto/Todo.dto";
import { TodosRepository } from "./todos.repository";
import { ITodosService } from "./todos.service.interface";

@injectable()
export class TodosService implements ITodosService{
    constructor(@inject(TYPES.ITodosRepository) private todosRepository: TodosRepository){}

    async createTodo(dto: TodoCreateDto):Promise<ToDo | null>{
        return await this.todosRepository.createTodo(dto);
    };
}