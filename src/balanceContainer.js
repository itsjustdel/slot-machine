import * as PIXI from "pixi.js";
import { renderer } from "./renderer.js";

/**
 * Class to show user's balance
 */
export class BalanceContainer {
    /**
     * Constructs a new instance of Player/////////////Balance.
     * @param {number} [initialBalance=0] - The initial balance of the player, defaults to 0.
     */
    constructor(initialBalance = 100) {        
        this.balance = initialBalance;
        this._create();
    }

    /**
     * Creates balance panel and text     
     * @private
     */
    _create() {
        this._native = new PIXI.Container();
        this._native.x = 0;
        this._native.y = 0;

        const sprite = PIXI.Sprite.from("greenPanel");        
        this._native.addChild(sprite);

        
        const fontSize = 12
        this.balanceText = new PIXI.Text(`Tokens: ${this.balance}`, {
            fontFamily: "Arial",
            fontSize: fontSize,
            fill: 0xffffff,
        });

        sprite.addChild(this.balanceText)

        this.balanceText.x = sprite.width *.5
        this.balanceText.y = 16 // can't use sprite height due to shadow
        this.balanceText.anchor.set(0.5, 0.5)

        this._native.addChild(this.balanceText);
        renderer.addChild(this._native);
    }

}