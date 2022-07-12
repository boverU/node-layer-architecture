import { NextFunction, Request, Response } from 'express';

export interface ITodosController {
	createTodo: (req: Request, res: Response, next: NextFunction) => void;
}
