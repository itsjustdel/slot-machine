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
        this._id = id
        this._name = name
        this._balance = balance
    }

      /**
     * Get the balance of the user
     * 
     * @member
     * @readonly
     */
      get balance() {
        return this._balance;
    }

    updateBalance(value){
        this._balance = value
    }
}
