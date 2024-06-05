import * as PIXI from "pixi.js";
import { renderer } from "./renderer.js";
import { User } from "./user/user.js";

/**
 * Class to show user's balance
 */
export class BalanceContainer {
    /**
     * Creates a new container to display user balance
     * @param {User} user reference to user object
     */
    constructor(user) {      
        this._user = user
        this._create();
    }

    /**
     * Creates balance panel and text     
     * @private
     */
    _create() {        
        this._native = new PIXI.Container();
        this._native.x = 0;
        this._native.y = 3;

        const sprite = PIXI.Sprite.from("greenPanel");        
        this._native.addChild(sprite);

        
        const fontSize = 12
        this._balanceText = new PIXI.Text(`Tokens: ${this._user.balance}`, {
            fontFamily: "Arial",
            fontSize: fontSize,
            fill: 0xffffff,            
        });

        sprite.addChild(this._balanceText)

        this._balanceText.resolution = 8;
        this._balanceText.x = sprite.width *.5
        this._balanceText.y = 16 // can't use sprite height due to shadow
        this._balanceText.anchor.set(0.5, 0.5)

        this._native.addChild(this._balanceText);
        renderer.addChild(this._native);
    }

    refreshBalance(){
        this._balanceText.text = `Tokens: ${this._user.balance}`
    }

}