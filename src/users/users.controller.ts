import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { Request, Response, NextFunction } from "express";
import { IControllerRoute } from "../common/route.interface";
import { HTTPError } from "../errors/http-error.class";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { ILogger } from "../logger/logger.interface";
import "reflect-metadata"

@injectable()
export class UserController extends BaseController {

    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRoutes([
            { path: "/register", method: "post", func: this.register },
            { path: "/login", method: "post", func: this.login }])
    }

    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, "Not authorized", "Authentication error"))
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, "register")
    }


}