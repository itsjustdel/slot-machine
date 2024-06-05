import * as PIXI from "pixi.js";
import { Base } from "../base";
import { renderer } from "../renderer";
import { Cloud } from "./cloud";

/**
 * CloudContainer class to hold moving clouds
 * @class
 */
export class CloudContainer extends Base {    
    constructor() {
        super();
        this._clouds = [];
        this._create();
    }

    /**
     * Create container instance and adds clouds
     * 
     * @private
     */
    _create() {
        this._native = new PIXI.Container("clouds");
      
        this._addCloud("cloud1", 0.5)
        this._addCloud("cloud2", 0.4)
         
        setTimeout(() => this._addCloud("cloud1", 0.3), 5000);
        setTimeout(() => this._addCloud("cloud2", 0.2), 6000);


        renderer.app.ticker.add(() => {
            this._update(renderer.app.ticker.elapsedMS);
        });
    }

     /**
     * Add cloud to container
     * 
     * @private
     */
    _addCloud(textureAlias, scrollSpeed = 1, x = 0, y = 0){
        const cloud = new Cloud(textureAlias, scrollSpeed, x, y)        
        this._native.addChild(cloud._native)
        this._clouds.push(cloud)
    }

    /**
     * Update called each frame
     * 
     * @async
     * @private 
     */
    async _update() {
        this._clouds.forEach(cloud => {
            cloud.scroll()

            if (cloud._native.x > renderer._initialWidth)
                cloud.reset()
        });
    }
}