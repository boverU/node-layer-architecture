import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./src/app";
import { ExceptionFilter } from "./src/errors/exception.filter";
import { IExceptionFilter } from "./src/errors/exception.filter.interface";
import { ILogger } from "./src/logger/logger.interface";
import { LoggerService } from "./src/logger/logger.service";
import { TYPES } from "./src/types";
import { UserController } from "./src/users/users.controller";

export interface BootstrapReturnType {
    appContainer: Container, 
    app: App
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<ILogger>(TYPES.ILogger).to(LoggerService);
    bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
    bind<UserController>(TYPES.IUserController).to(UserController);
    bind<App>(TYPES.Application).to(App);
})

function bootstrap() {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application);
    app.init();
    return { appContainer, app }
}



export const { app, appContainer } = bootstrap()