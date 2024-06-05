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
     * Creates the container instance and adds initial clouds.
     * Sets up timed cloud additions and starts the update loop.
     * 
     * @private
     */
    _create() {
        this._native = new PIXI.Container("clouds");
    
        this._addCloud("cloud1", 0.5);
        this._addCloud("cloud2", 0.4);
        
        setTimeout(() => this._addCloud("cloud1", 0.3), 5000);
        setTimeout(() => this._addCloud("cloud2", 0.2), 6000);

        renderer.app.ticker.add(() => {
            this._update(renderer.app.ticker.elapsedMS);
        });
    }

    /**
     * Adds a cloud to the container.
     * 
     * @param {string} textureAlias - The alias for the cloud texture.
     * @param {number} [scrollSpeed=1] - The speed at which the cloud scrolls.
     * @param {number} [x=0] - The initial x position of the cloud.
     * @param {number} [y=0] - The initial y position of the cloud.
     * @private
     */
    _addCloud(textureAlias, scrollSpeed = 1, x = 0, y = 0) {
        const cloud = new Cloud(textureAlias, scrollSpeed, x, y);
        this._native.addChild(cloud._native);
        this._clouds.push(cloud);
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