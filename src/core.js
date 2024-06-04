import { renderer } from "./renderer.js";
import { assetLoader } from "./assetLoader.js";
import * as PIXI from "pixi.js";
import { symbolStore } from "./reels/symbolStore.js";
import { ReelManager } from "./reels/reelsManager.js";
import { timerManager } from "./utils/timermanager.js";
import { Button } from "./button.js";
import { CloudContainer } from "./clouds/cloudContainer.js";
import { BalanceContainer } from "./balanceContainer.js";
import { User } from "./user/user.js";

/**
 * Base entry point for the game
 * 
 * @class
 */
class Core {
    constructor() {        
        this._create();
    }

    /**
     * load all assets required for the game
     * 
     * @async
     */
    async loadAssets() {
        assetLoader.addToQueue({ alias: 'background', src: "./resource/@2x/gameBG_opt.png"});
        assetLoader.addToQueue({ alias: 'cloud1', src: "./resource/@2x/cloud1_opt.png"});
        assetLoader.addToQueue({ alias: 'cloud2', src: "./resource/@2x/cloud2_opt.png"});
        assetLoader.addToQueue({ alias: 'mask', src: "./resource/@2x/mask_opt.jpg"});
        assetLoader.addToQueue({ alias: 'reelSquare', src: "./resource/@2x/reelSquare.png"});
        assetLoader.addToQueue({ src: "./resource/@2x/controlPanel0_opt.json"});
        assetLoader.addToQueue({ alias: 'ace', src: "./resource/@2x/symbols/aceWin0_opt.json"});
        assetLoader.addToQueue({ alias: 'h2', src: "./resource/@2x/symbols/h2Win0_opt.json"});
        assetLoader.addToQueue({ alias: 'h3', src: "./resource/@2x/symbols/h3Win0_opt.json"});
        assetLoader.addToQueue({ alias: 'h4', src: "./resource/@2x/symbols/h4Win0_opt.json"});
        assetLoader.addToQueue({ alias: 'jack', src: "./resource/@2x/symbols/jackWin0_opt.json"});
        assetLoader.addToQueue({ alias: 'king', src: "./resource/@2x/symbols/kingWin0_opt.json"});
        assetLoader.addToQueue({ alias: 'nine', src: "./resource/@2x/symbols/nineWin0_opt.json"});
        assetLoader.addToQueue({ alias: 'queen', src: "./resource/@2x/symbols/queenWin0_opt.json"});
        assetLoader.addToQueue({ alias: 'ten', src: "./resource/@2x/symbols/tenWin0_opt.json"});
        await assetLoader.loadQueue();
    }

    /**
     * Create the renderer instance and initialise everything ready to play the game
     * 
     * @async
     * @private
     */
    async _create() {
        renderer.initialise({
            antialias: false,
            backgroundAlpha: 1,
            backgroundColour: '#000000',
            gameContainerDiv: document.getElementById("gameContainer"),
            width: 1024,
            height: 576
        });
        renderer.start();
        timerManager.init();
        await this.loadAssets();        
        this._createUser();
        this._createObjects(); 
    }

    /**
     * Create a user
     */
    _createUser(){
        this._user = new User(0, "John Smith", 100);
    }

    /**
     * Create all game objects ready to use
     * 
     * @async
     * @private
     */
    async _createObjects() {

        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x1099bb);
        graphics.drawRect(0, 0, 1024, 300);
        graphics.endFill();
        renderer.addChild(graphics);

        const background = PIXI.Sprite.from("background");
        renderer.addChild(background);

        this._clouds = new CloudContainer()
        renderer.addChild(this._clouds.native)

        symbolStore.createSymbols([
            {id: 0, name: "h2", value: 20},
            {id: 1, name: "h3", value: 20},
            {id: 2, name: "h4", value: 20},
            {id: 3, name: "ace", value: 14},
            {id: 4, name: "king", value: 13},
            {id: 5, name: "queen", value: 12},
            {id: 6, name: "jack", value: 11},
            {id: 7, name: "ten", value: 10},
            {id: 8, name: "nine", value: 9},
        ],
        3,
        3);

        const container = new PIXI.Container("reelSquares");
        container.x = 324;
        container.y = 95;
        renderer.addChild(container);
        let width = 125;
        let height = 105;
        for (let i = 0; i < 3; i++) {
            for( let j = 0; j < 3; j++) {
                const symbolBack = PIXI.Sprite.from("reelSquare");
                container.addChild(symbolBack);
                symbolBack.x = i * width;
                symbolBack.y = j * height;
            }
        }
        
        const handleBalanceChange = (winnings) => {
            if (winnings === 0) return;
            const newBalance = this._user.balance + winnings;
            this._user.updateBalance(newBalance);
            this._balanceContainer.refreshBalance();
            
            if (this._user.balance <= 0){
                button._native.visible = false
                button._native.interactive = false

                disabled_button._native.visible = true
                disabled_button._native.interactive = true
            }

        }
        this._reelManager = new ReelManager(3, 3, 125, 105, handleBalanceChange);

        renderer.addChild(this._reelManager.native);

        const buttonPosX = 475;
        const buttonPosY = 440;

        const button = new Button("playActive", async() => { 
            if (this._reelManager.spinning) return
            
            this._reelManager.startSpin();            
            await timerManager.startTimer(2000);
            this._reelManager.stopSpin();    
        });
        button.x = buttonPosX;
        button.y = buttonPosY;

        const disabled_button = new Button("playNonactive",() => {
            // play thump sound, pop up to add tokens perhaps
        });
        disabled_button.x = buttonPosX;
        disabled_button.y = buttonPosY;
        disabled_button._native.visible = false
        disabled_button._native.interactive = false
        
        renderer.addChild(button.native);
        renderer.addChild(disabled_button.native);

        this._balanceContainer = new BalanceContainer(this._user)

    }
}

window.startup = () => {
    const game = new Core();
};