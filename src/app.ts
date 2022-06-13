import express, { Express } from "express";
import { Server } from 'http';
import { inject, injectable } from "inversify";
import { IExceptionFilter } from "./errors/exception.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { UserController } from "./users/users.controller";
import "reflect-metadata"
@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;
    constructor(@inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter) {
        this.app = express();
        this.port = 8000;
    }

    useRoutes() {
        this.app.use("/users", this.userController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server run at http:localhost:${this.port}`)
    }
}