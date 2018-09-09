const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Game {
    constructor(rowsCount, columnsCount, countsTypes) {
        this._rowsCount = rowsCount;
        this._columnsCount = columnsCount;
        this._countsTypes = countsTypes;
        this.elements = [];
        this.initApp();
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

    checkElements(element) {
        const checkedElements = [];
        this.checkElement(element, checkedElements);
    }

    // ------- FIRST ALGORITHM REALIZATION ------- //

    checkElement(element, checked) {
        this.select(element);
        const x = element.xPosition;
        const y = element.yPosition;
        const width = this._columnsCount

        const array = [
            { x: element.xPosition - 1, y: element.yPosition },
            { x: element.xPosition + 1, y: element.yPosition },
            { x: element.xPosition, y: element.yPosition - 1 },
            { x: element.xPosition, y: element.yPosition + 1 }
        ];

        array
            .filter(c =>
                c.x >= 0 &&
                c.y >= 0 &&
                c.x < width &&
                c.y < this._rowsCount)
            .map(c => this.elements[width * c.y + c.x])
            .filter(el => el)
            .filter(el =>
                checked.filter(c => c === el).length === 0 &&
                element.type === el.type)
            .forEach(el => {
                checked.push(el);
                this.checkElement(el, checked);
            });
    }

    // ------- SECOND ALGORITHM REALIZATION ------- //

    // checkElement(element, checked) {
    //     this.select(element);
    //     const x = element.xPosition;
    //     const y = element.yPosition;

    //     for(let i = 0; i < this._rowsCount; i++) {
    //         for(let j = 0; j < this._columnsCount; j++) {
    //             let el = this.elements[this._columnsCount * i + j];
    //             const condition =
    //                 (((x - 1) === el.xPosition && el.yPosition === y) ||
    //                 ((x + 1) === el.xPosition && el.yPosition === y) ||
    //                 ((y - 1) === el.yPosition && el.xPosition === x) ||
    //                 ((y + 1) === el.yPosition && el.xPosition === x)) &&
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

    createSprite(container, x, y) {
        const type = randomInteger(1, this._countsTypes);
        const sprite = PIXI.Sprite.fromImage(`images/${type}.png`);
        const spriteSize = 64;
        const spriteBorder = 2;

        sprite.width = spriteSize;
        sprite.height = spriteSize;
        sprite.x = x * (spriteSize + spriteBorder);
        sprite.y = y * (spriteSize + spriteBorder);
        sprite.interactive = true;

        sprite.on("click", () => {
            this.checkElements(sprite);
        });

        container.addChild(sprite);

        sprite.type = type;
        sprite.xPosition = x;
        sprite.yPosition = y;

        return sprite;
    }

    setAttribute(column, row, element, type) {
        element.typeId = type;
        element.xPosition = column;
        element.yPosition = row;

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

//maximum in third argument - 4
new Game(7, 9, 3);