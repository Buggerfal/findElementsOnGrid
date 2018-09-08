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
        for (let i = 0; i < rows; i++) {
            //Draw elements on X coordinates
            for (let j = 0; j < columns; j++) {
                const sprite = this.createSprite(container, j, i);
                this.elements.push(sprite);
            }
        }

        container.x = (WIDTH / 2) - ((columns * 66) / 2);
        container.y = (HEIGHT / 2) - ((rows * 66) / 2);
    }

    //TODO
    checkElements(element) {
        const checkedElements = [];
        this.checkElement(element, checkedElements);
    }

    // checkElement2(element, checked) {
    //     this.select(element);
    //     const x = element.columnPosition;
    //     const y = element.rowPosition;

    //     for(let i = 0; i < this._rowsCount; i++) {
    //         for(let j = 0; j < this._columnsCount; j++) {
    //             let el = this.elements[this._columnsCount * i + j];
    //             const condition =
    //                 (((x - 1) === el.columnPosition && el.rowPosition === y) ||
    //                 ((x + 1) === el.columnPosition && el.rowPosition === y) ||
    //                 ((y - 1) === el.rowPosition && el.columnPosition === x) ||
    //                 ((y + 1) === el.rowPosition && el.columnPosition === x)) &&
    //                 (checked.filter((c) => c === el).length === 0) &&
    //                 (element.type === el.type);

    //             if(condition){
    //                 this.select(el);
    //                 checked.push(el);
    //                 this.checkElement(el, checked);
    //             }
    //         }
    //     }
    // }

    checkElement(element, checked) {
        this.select(element);
        const x = element.columnPosition;
        const y = element.rowPosition;
        const leftElement = this.elements[y * this._columnsCount + x - 1];
        const rightElement = this.elements[y * this._columnsCount + x + 1];
        const topElement = this.elements[(y - 1)* this._columnsCount + x];
        const bottomElement = this.elements[(y + 1)* this._columnsCount + x];
        const array = [leftElement, rightElement, topElement, bottomElement];
            for(let i = 0; i < array.length; i++) {
                const el = array[i];
                if(el === undefined){
                    continue;
                }
                const condition =
                (checked.filter((c) => c === el).length === 0) &&
                (element.type === el.type);

                if(condition) {
                    this.select(el);
                    checked.push(el);
                    this.checkElement(el, checked);
                }
            }
    }

    createSprite(container, x, y) {
        const type = randomInteger(1, 2);
        const sprite = PIXI.Sprite.fromImage(`images/${type}.png`);
        const spriteSize = 64;
        const spriteBorder = 2;

        sprite.width = spriteSize;
        sprite.height = spriteSize;
        sprite.x = x * (spriteSize + spriteBorder);
        sprite.y = y * (spriteSize + spriteBorder);
        sprite.interactive = true;

        //TODO EventListener
        sprite.on("click", () => {
            this.checkElements(sprite);
        });

        container.addChild(sprite);

        sprite.type = type;
        sprite.columnPosition = x;
        sprite.rowPosition = y;

        return sprite;
    }

    setAttribute(column, row, element, type) {
        element.typeId = type;
        element.uniqId = Math.random().toString(16).slice(2);
        element.columnPosition = column;
        element.rowPosition = row;

        return element;
    }

    select(sprite) {
        sprite.alpha = 0.5;
    }
}

function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    rand = Math.round(rand);
    return rand;
};

new Game(5, 5);