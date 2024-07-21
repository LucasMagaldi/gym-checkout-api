export class EmailAlreadyExist extends Error {
    constructor() {
        super('E-mail already exists.')
    }
}