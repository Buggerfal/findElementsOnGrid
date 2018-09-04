const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Game {
    constructor() {
        this._initApp();
        // this._drawElementsOnGrid();
    }

    _initApp() {
        this.app = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor: 0xfd8263 });
        document.body.appendChild(this.app.view);
    }

    _drawElementsOnGrid() {

    }
}

const createSprite = function(app, options) {
    options = Object.assign({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        interactive: false
    }, options);

    const sprite = PIXI.Sprite.fromImage(options.path);

    sprite.width = options.width;
    sprite.height = options.height;
    sprite.x = options.x;
    sprite.y = options.y;
    sprite.interactive = options.interactive;

    app.stage.addChild(sprite);

    return sprite;
};

function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
};

new Game;