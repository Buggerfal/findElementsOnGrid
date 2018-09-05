const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Game {
    constructor() {
        this.elements = [];
        this._initApp();
        //Counts elements on grid
        this._drawElementsOnGrid(5, 5);
    }

    _initApp() {
        this.app = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor: 0xfd8263 });
        document.body.appendChild(this.app.view);
    }

    _drawElementsOnGrid(width, height) {
        let x = 0;
        let y = 0;

        //Draw elements on Y coordinates
        for (let i = 0; i <= width; i++) {
            //Draw elements on X coordinates            
            for (let j = 0; j <= height; j++) {
                const type = randomInteger(1, 4);
                const sprite = createSprite(this.app, {
                    x: x,
                    y: y,
                    width: 64,
                    height: 64,
                    interactive: true,
                    path: `images/${type}.png`
                });

                sprite.typeId = type;
                sprite.uniqId = Math.random().toString(16).slice(2);
                sprite.columnPosition = i;
                sprite.rawPosition = j;

                this.elements.push(sprite);

                if (x !== width) {
                    x += 66;
                }
            }

            x = 0;

            if (i !== height) {
                y += 66;
            }

            createSprite(this.app, {
                x: x,
                y: y,
                width: 64,
                height: 64,
                interactive: true,
                path: `images/${randomInteger(1,4)}.png`
            });
        }

        console.log(this.elements);
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

new Game; //