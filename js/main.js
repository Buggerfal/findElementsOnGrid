const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Game {
    constructor(rowsCount, columnsCount) {
        this._rowsCount = rowsCount;
        this._columnsCount = columnsCount;
        this.elements = [];
        this.initApp();
        //Counts elements on grid
        this.drawElementsOnGrid();
    }

    initApp() {
        this.app = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor: 0xfd8263 });
        document.body.appendChild(this.app.view);
    }

    drawElementsOnGrid() {
        const rows = this._rowsCount;
        const columns = this._columnsCount;
        const container = new PIXI.Container();

        this.app.stage.addChild(container);

        //Draw elements on Y coordinates
        for (let i = 0; i <= rows; i++) {
            let columnNum = [];
            //Draw elements on X coordinates            
            for (let j = 0; j <= columns; j++) {
                const sprite = this.createSprite(container, j, i);

                this.setAttribute(i, j, sprite, sprite.type);
                columnNum.push(sprite);
            }

            this.elements.push(columnNum);
        }
        console.log(this.elements);

        container.x = (WIDTH / 2) - ((columns * 66) / 2);
        container.y = (HEIGHT / 2) - ((rows * 66) / 2);
    }

    checkElements(element) {
        console.log("s", this.elements[element.columnPosition][element.rowPosition]);
    }

    createSprite(container, x, y) {
        const type = randomInteger(1, 4);
        const sprite = PIXI.Sprite.fromImage(`images/${type}.png`);
        const spriteSize = 64;
        const spriteBorder = 2;

        sprite.width = spriteSize;
        sprite.height = spriteSize;
        sprite.x = x * (spriteSize + spriteBorder);
        sprite.y = y * (spriteSize + spriteBorder);
        sprite.interactive = true;

        //TO DO EventListener
        sprite.on("click", () => {
            Game.destroySprite(container, sprite);
            // console.log('column', sprite.columnPosition);
            // console.log('row', sprite.rowPosition);
            this.checkElements(sprite);
        });

        container.addChild(sprite);

        sprite.type = type;

        return sprite;
    }

    setAttribute(column, row, element, type) {
        element.typeId = type;
        element.uniqId = Math.random().toString(16).slice(2);
        element.columnPosition = column;
        element.rowPosition = row;

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

new Game(5, 5);