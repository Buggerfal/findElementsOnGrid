const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Game {
    constructor() {
        this._initApp();
        //Counts elements on grid
        this._drawElementsOnGrid(6, 6);
    }

    _initApp() {
        this.app = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor: 0xfd8263 });
        document.body.appendChild(this.app.view);
    }

    _drawElementsOnGrid(width, height) {
        let x = 0;
        let y = 0;

        for (let i = 1; i <= width; i++) {
            for (let j = 1; j <= height; j++) {
                createSprite(this.app, {
                    x: x,
                    y: y,
                    width: 64,
                    height: 64,
                    interactive: true,
                    path: `images/${randomInteger(1,4)}.png`
                });

                x += 64;
            }

            x = 0;

            if (i !== height) {
                y += 64;
            }

            createSprite(this.app, {
                x: x,
                y: y,
                width: 64,
                height: 64,
                interactive: true,
                path: `images/${randomInteger(1,4)}.png`
            });

            x += 64;

        }
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

    sprite.on("click", function() {
        console.log("1");
    });

    app.stage.addChild(sprite);

    return sprite;
};

function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
};

new Game;