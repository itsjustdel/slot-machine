/**
 * User class holding information about an account holder
 * 
 * @class
 */
export class User{
    /**
     * Creates an instance of a User.
     * 
     * @param {string} id - The user ID.
     * @param {string} name - The user name.
     * @param {number} balance - The user's currency balance.
     */
    constructor(id, name, balance) {
        this._id = id;
        this._name = name;
        this._balance = balance;
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

    /**
     * Updates the balance value.
     * 
     * @param {number} value - The new balance value.
     */
    updateBalance(value) {
        this._balance = value;
    }

}
