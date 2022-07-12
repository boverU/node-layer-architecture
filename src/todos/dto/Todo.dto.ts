import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class TodoCreateDto {
	@IsString({ message: 'Provide description text' })
	description: string;

	@IsBoolean({ message: 'Completed field should be a boolean' })
	completed: boolean;

	@IsNumber()
	userId: number;
}
