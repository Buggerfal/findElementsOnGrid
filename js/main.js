const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Game {
    constructor() {
        this.elements = [];
        this.initApp();
        //Counts elements on grid
        this.drawElementsOnGrid(5, 5);
    }

    initApp() {
        this.app = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor: 0xfd8263 });
        document.body.appendChild(this.app.view);
    }

    drawElementsOnGrid(row, column) {
        let x = 0;
        let y = 0;

        //Draw elements on Y coordinates
        for (let i = 0; i <= row; i++) {
            //Draw elements on X coordinates            
            for (let j = 0; j <= column; j++) {
                const type = randomInteger(1, 4);
                const sprite = createSprite(this.app, {
                    x: x,
                    y: y,
                    width: 64,
                    height: 64,
                    interactive: true,
                    path: `images/${type}.png`
                });

                this.setAttribute(i, j, sprite, type);
                this.elements.push(sprite);

                if (x !== row) {
                    x += 66;
                }
            }

            x = 0;

            if (i !== column) {
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
    }

    setAttribute(column, row, element, type) {
        element.typeId = type;
        element.uniqId = Math.random().toString(16).slice(2);
        element.columnPosition = column + 1;
        element.rowPosition = row + 1;

        return element;
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
        console.log(this.uniqId);
        console.log(this.columnPosition);
        console.log(this.rowPosition);
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