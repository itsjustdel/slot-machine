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
     * @param {int} balance - user currency
     */

    constructor(id, name, balance) {
        this.id = id
        this.name = name
        this.balance = balance
    }

    updateBalance(value){
        this.balance = value
    }
}
