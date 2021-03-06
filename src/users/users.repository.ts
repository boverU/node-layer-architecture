import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './user.repository.interface';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ email, password, name }: User): Promise<UserModel> {
		return await this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}

	async find(email: string): Promise<UserModel | null> {
		return await this.prismaService.client.userModel.findUnique({
			where: {
				email,
			},
		});
	}

	async findAll(): Promise<UserModel[] | null> {
		return await this.prismaService.client.userModel.findMany({
			include: { todos: true },
		});
	}

	async getUserById(userId: number): Promise<UserModel | null> {
		return await this.prismaService.client.userModel.findUnique({
			where: {
				id: userId,
			},
		});
	}
}
