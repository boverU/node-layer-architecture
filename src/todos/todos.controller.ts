import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { AuthGuard } from '../common/auth.guard';
import { BaseController } from '../common/base.controller';
import { ValidateMiddleware } from '../common/validate.middleware';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IUserService } from '../users/users.service.interface';
import { TodoCreateDto } from './dto/Todo.dto';
import { ITodosController } from './todos.controller.interface';
import { ITodosService } from './todos.service.interface';

@injectable()
export class TodosController extends BaseController implements ITodosController {
	constructor(
		@inject(TYPES.ITodosService) private todosService: ITodosService,
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(loggerService);

		this.bindRoutes([
			{
				path: '/todo',
				method: 'post',
				func: this.createTodo,
				middlewares: [
					new ValidateMiddleware(TodoCreateDto),
					new AuthGuard(),
					{
						execute: async (
							{ body, user }: Request,
							res: Response,
							next: NextFunction,
						): Promise<void | HTTPError> => {
							const foundUser = await this.userService.getUserById(body.userId);
							if (foundUser?.email === user) {
								return next();
							} else {
								next(new HTTPError(403, 'Bad Request', 'Authentication error'));
							}
						},
					},
				],
			},
		]);
	}
	async createTodo(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const createdTodo = await this.todosService.createTodo(req.body);
			this.created(res);
		} catch (error) {
			next();
		}
	}
}
