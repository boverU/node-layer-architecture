
export class Todo {
	
	constructor(
		private readonly _description: string,
		private readonly _completed: boolean,
        private readonly _userId: number
	) {}

    get description(){
        return this._description
    }

    get completed(){
        return this._completed;
    }

    get userId(){
        return this._userId
    }
	
}
