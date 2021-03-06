import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUsersRepository } from './user.repository.interface';
import { IUserService } from './users.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.IUsersRepository) private usersRepository: IUsersRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');

		await newUser.setPassword(password, Number(salt));
		const foundUser = await this.usersRepository.find(email);
		if (foundUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const foundUser = await this.usersRepository.find(email);
		if (!foundUser) {
			return false;
		}
		const user = new User(foundUser.email, foundUser.name, foundUser.password);
		return user.passwordCompare(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}
	async getAllUsers(): Promise<UserModel[] | null> {
		return this.usersRepository.findAll();
	}

	async getUserById(userId: number): Promise<UserModel | null> {
		const user = this.usersRepository.getUserById(userId);
		if (user) {
			return user;
		}
		return null;
	}
}
