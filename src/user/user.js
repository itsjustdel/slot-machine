/**
 * User class holding information about an account holder
 * 
 * @class
 */
export class User{
    /**
     * 
     * @param {string} id - user id
     * @param {string} name - user name
     * @param {int} tokens - user currency
     */
    constructor(id, name, tokens) {
        this.id = id
        this.name = name
        this.tokens = tokens
        this._create(id, name, tokens);
    }
}
