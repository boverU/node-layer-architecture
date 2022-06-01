import { BaseController } from "../common/base.controller";
import { LoggerService } from "../logger/logger.service";
import { Request, Response, NextFunction } from "express";
import { IControllerRoute } from "../common/route.interface";

export class UserController extends BaseController {

    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            { path: "/register", method: "post", func: this.register },
            { path: "/login", method: "post", func: this.login }])
    }

    login(req: Request, res: Response, next: NextFunction) {
        this.ok(res, "login")
        next();
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, "register")
        next();
    }


}