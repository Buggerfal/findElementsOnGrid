const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

class Game {
    constructor() {
        this._initApp();
    }

    _initApp() {
        this.app = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor: 0xfd8263 });
        document.body.appendChild(this.app.view);
    }

    _drawElementsOnGrid() {

    }
}

new Game;