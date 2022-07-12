export const TYPES = {
	Application: Symbol.for('Application'),
	ILogger: Symbol.for('ILogger'),
	PrismaService: Symbol.for('PrismaService'),
	ConfigService: Symbol.for('ConfigService'),
	IExceptionFilter: Symbol.for('IExceptionFilter'),

	// Controllers 
	IUserController: Symbol.for('IUserController'),
	ITodosController: Symbol.for('ITodosController'),
	// Services
	UserService: Symbol.for('UserService'),
	ITodosService: Symbol.for("ITodosService"),
	// Repositories
	IUsersRepository: Symbol.for('IUserRepository'),
	ITodosRepository: Symbol.for("ITodosRepository")
};
