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
        this.createButtons(this.app);
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

    createElement(app, options) {
            options = Object.assign({
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                interactive: true
            }, options);

            const sprite = PIXI.Sprite.fromImage(options.path);

            sprite.width = options.width;
            sprite.height = options.height;
            sprite.x = options.x;
            sprite.y = options.y;

            app.stage.addChild(sprite);

            return sprite;
    }

    createButtons(app) {
        const refreshButton = this.createElement(app, {
                x: x,
                y: y,
                width: 64,
                height: 64,
                path: 'images/btn-refresh.png'
            });

            const deleteButton = createElement(app, {
                x: x,
                y: y,
                width: 64,
                height: 64,
                path: 'images/btn-delete.png.png'
            });

        refreshButton.on("click", () => {
            console.log("refreshButton");
        });

        deleteButton.on("click", () => {
            console.log("deleteButton");
        });

        app.stage.addChild(refreshButton);
        app.stage.addChild(deleteButton);
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
        const type = randomInteger(1, 2);
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
        element.uniqId = Math.random().toString(16).slice(2);
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

function toPercent(x, y) {
    const pxX = WIDTH * x / 100;
    const pxY = HEIGHT * y / 100;
        return { x: pxX, y: pxY };
}

new Game(8, 12);