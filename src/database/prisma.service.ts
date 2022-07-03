import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		this.logger.log('[PrismaService] Successfully connected to databse');
		try {
			await this.client.$connect();
		} catch (err) {
			if (err instanceof Error)
				this.logger.error(`[PrismaService] Could not connect to database, ${err.message}`);
		}
	}
	async disconnect(): Promise<void> {
		this.logger.log('Disconnected from database');
		await this.client.$disconnect();
	}
}
