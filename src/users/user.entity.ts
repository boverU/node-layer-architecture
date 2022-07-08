import { compare, hash } from 'bcryptjs';

export class User {
	private _password: string;
	passwordHash: string;
	constructor(
		private readonly _email: string,
		private readonly _name: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this.passwordHash = passwordHash;
		}
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get password(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}

	public async passwordCompare(pass: string): Promise<boolean> {
		return compare(pass, this.passwordHash);
	}
}
