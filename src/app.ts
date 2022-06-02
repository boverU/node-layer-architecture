import express, { Express } from "express";
import { Server } from 'http';
import { ExceptioFilter } from "./errors/exception.filter";
import { ILogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
export class App {
    app: Express;
    server: Server;
    port: number;
    logger: ILogger;
    userController: UserController;
    exceptionFilter: ExceptioFilter;
    constructor(logger: ILogger, userController: UserController, exceptionFilter: ExceptioFilter) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
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