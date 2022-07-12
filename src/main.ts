import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TodosController } from './todos/todos.controller';
import { ITodosController } from './todos/todos.controller.interface';
import { TodosRepository } from './todos/todos.repository';
import { ITodosRepository } from './todos/todos.repository.interface';
import { TodosService } from './todos/todos.service';
import { ITodosService } from './todos/todos.service.interface';
import { TYPES } from './types';
import { IUsersRepository } from './users/user.repository.interface';
import { UserController } from './users/users.controller';
import { IUserController } from './users/users.controller.interface';
import { UsersRepository } from './users/users.repository';
import { UserService } from './users/users.service';
import { IUserService } from './users/users.service.interface';

export interface BootstrapReturnType {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
	bind<IUserController>(TYPES.IUserController).to(UserController).inSingletonScope();
	bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(TYPES.IUsersRepository).to(UsersRepository).inSingletonScope();
	bind<ITodosRepository>(TYPES.ITodosRepository).to(TodosRepository).inSingletonScope();
	bind<ITodosService>(TYPES.ITodosService).to(TodosService).inSingletonScope();
	bind<ITodosController>(TYPES.ITodosController).to(TodosController).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<BootstrapReturnType> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { appContainer, app };
}

export const boot = bootstrap();
