import { ToDo } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { BaseController } from "../common/base.controller";
import { ValidateMiddleware } from "../common/validate.middleware";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { TodoCreateDto } from "./dto/Todo.dto";
import { ITodosController } from "./todos.controller.interface";
import { ITodosService } from "./todos.service.interface";

@injectable()
export class TodosController extends BaseController implements ITodosController{
    constructor(@inject(TYPES.ITodosService) private todosService: ITodosService,
    @inject(TYPES.ILogger) private loggerService: ILogger,
    ){
        super(loggerService);

        this.bindRoutes([
			{
				path: '/todo',
				method: 'post',
				func: this.createTodo,
				middlewares: [new ValidateMiddleware(TodoCreateDto)],
			},
		]);
    }
    async createTodo(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
        try {
            const createdTodo = await this.todosService.createTodo(req.body);
            this.created(res)    
        } catch (error) {
            next()
        }
		
	}
} 