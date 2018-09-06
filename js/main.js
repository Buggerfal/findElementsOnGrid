const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const rowCounts = 5;
const columnCounts = 5;

class Game {
    constructor() {
        this.elements = [];
        this.initApp();
        //Counts elements on grid
        this.drawElementsOnGrid(rowCounts, columnCounts);
    }

    initApp() {
        this.app = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor: 0xfd8263 });
        document.body.appendChild(this.app.view);
    }

    createSprite(container, x, y) {
        const type = randomInteger(1, 4);
        const sprite = PIXI.Sprite.fromImage(`images/${type}.png`);

        sprite.width = 64;
        sprite.height = 64;
        sprite.x = x;
        sprite.y = y;
        sprite.interactive = true;

        sprite.on("click", function() {
            Game.destroySprite(container, sprite);
        });

        container.addChild(sprite);

        sprite.type = type;

        return sprite;
    }

    drawElementsOnGrid(row, column) {
        const container = new PIXI.Container();
        container.x = (WIDTH / 2) - ((columnCounts * 66) / 2);
        container.y = (HEIGHT / 2) - ((rowCounts * 66) / 2);

        this.app.stage.addChild(container);

        let x = 0;
        let y = 0;

        //Draw elements on Y coordinates
        for (let i = 0; i <= row; i++) {
            //Draw elements on X coordinates            
            for (let j = 0; j <= column; j++) {
                const sprite = this.createSprite(container, x, y);

                this.setAttribute(i, j, sprite, sprite.type);
                this.elements.push(sprite);

                if (x !== row) {
                    x += 66;
                }
            }

            x = 0;

            if (i !== column) {
                y += 66;
            }

            this.createSprite(container, x, y);
        }
    }

    setAttribute(column, row, element, type) {
        element.typeId = type;
        element.uniqId = Math.random().toString(16).slice(2);
        element.columnPosition = column + 1;
        element.rowPosition = row + 1;

        return element;
    }

    static destroySprite(container, sprite) {
        container.removeChild(sprite);
    }
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
};

new Game;