import 'reflect-metadata';
import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './user.repository.interface';
import { UserService } from './users.service';
import { IUserService } from './users.service.interface';

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
	findAll: jest.fn(),
};

const container = new Container();

let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.IUsersRepository).toConstantValue(UsersRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.IUsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

describe('user service', () => {
	let createdUser: UserModel | null;
	it('Create user', async () => {
		configService.get = jest.fn().mockReturnValueOnce('1');
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		const createdUser = await usersService.createUser({
			email: 'a@a.com',
			name: 'Adam',
			password: '23',
		});

		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('23');
	});

	it('Validate User: user not found', async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const isVerified = await usersService.validateUser({ email: '22@dd.com', password: '1' });
		expect(isVerified).toBe(false);
	});

	it('Validate User: Successfully verify', async () => {
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		const createdUser = await usersService.createUser({
			email: 'a@a.com',
			name: 'Adam',
			password: '23',
		});
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const isVerified = await usersService.validateUser({ email: 'a@a.com', password: '23' });
		expect(isVerified).toBe(true);
	});

	it('Validate User: Wrong password', async () => {
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);
		const createdUser = await usersService.createUser({
			email: 'a@a.com',
			name: 'Adam',
			password: '23',
		});
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);

		const isVerified = await usersService.validateUser({ email: 'a@a.com', password: '555' });
		expect(isVerified).toBe(false);
	});
});
