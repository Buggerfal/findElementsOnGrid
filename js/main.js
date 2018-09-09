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

    checkElement(element, checked) {
        this.select(element);
        const x = element.xPosition;
        const y = element.yPosition;
        const width = this._columnsCount

        const array = [
            {
                //left element
                x: element.xPosition - 1,
                y: element.yPosition,
                position: "left"
            },
            {
                //right element
                x: element.xPosition + 1,
                y: element.yPosition,
                position: "right"
            },
            {
                //top element
                x: element.xPosition,
                y: element.yPosition - 1,
                position: "top"
            },
            {
                //bottom element
                x: element.xPosition,
                y: element.yPosition + 1,
                position: "bottom"
            }
        ];
        // console.log("до фильтра", array);
        // debugger;
        array
            .filter(c => (c.x >= 0 && c.y >= 0) &&
            (c.x <= this._columnsCount && c.y <= this._rowsCount))
            .map(c => {
                this.elements[c.x + c.y]
                console.log(this.elements[c.x + c.y]);
            })
            .map(index => this.elements[index])
            .filter(el => el)
            .filter(el => {
                return checked.filter(c => c === el).length === 0 &&
                    element.type === el.type;
            })
            .forEach(el => {
                this.select(el);
                checked.push(el);
                this.checkElement(el, checked);
            });

            // console.log("после фильтра", array);

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

        //TODO EventListener
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

new Game(5, 5);