import * as PIXI from "pixi.js";
import { Base } from "../base.js";

/**
 * Cloud 
 * 
 * @class
 * @extends Base
 */
export class Cloud extends Base {
    /**
     *      
     * @param {string} textureAlias - name of the texture
     * @param {number} [scrollSpeed=1] - speed at which the cloud scrolls
     */

    constructor(textureAlias, scrollSpeed = 1) {
        super();
        this.scrollSpeed = scrollSpeed;
        this._create(textureAlias);
    }
    
    /**
     * Scroll the cloud          
     */
    scroll() {
        this._native.x += this.scrollSpeed;
    }    

    /**
     * Reset the cloud position
     */
    reset(){
        this._native.x = -this._native.width;
    }

    /**
     * create the Cloud using PIXI sprite
     *      
     * @param {string} textureAlias - alias of the texture
     * @private
     */
    _create( textureAlias) {        
        this._native = PIXI.Sprite.from(textureAlias);

        if (this._native) {
            this._native.x = -this._native.width;
        }
    }
}