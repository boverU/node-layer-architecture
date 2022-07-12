export class Todo {
	constructor(
		private readonly _description: string,
		private readonly _completed: boolean,
		private readonly _userId: number,
	) {}

	get description(): string {
		return this._description;
	}

	get completed(): boolean {
		return this._completed;
	}

	get userId(): number {
		return this._userId;
	}
}
