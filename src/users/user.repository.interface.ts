import { UserModel } from '@prisma/client';
import { User } from './user.entity';
import { UserWithTodos } from './users.service.interface';

export interface IUsersRepository {
	create: (user: User) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
	findAll: () => Promise<Array<UserWithTodos> | null>;
}
