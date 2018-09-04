class Game {
    constructor() {
        this._initApp();
    }

    _initApp() {
        this.app = new PIXI.Application(400, 500, { backgroundColor: 0x1099bb });
        document.body.appendChild(this.app.view);
    }
}

new Game;