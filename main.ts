import { App } from "./src/app";
import { LoggerService } from "./src/logger/logger.service";
import { UserController } from "./src/users/users.controller";

async function bootstrap() {
    const app = new App(new LoggerService(), new UserController(new LoggerService()));
    await app.init();
}

bootstrap();