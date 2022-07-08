import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Wrong email address' })
	email: string;
	@IsString({ message: 'Password are not specified' })
	password: string;
}
