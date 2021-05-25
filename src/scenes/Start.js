class Start extends Phaser.Scene {
    constructor() {
        super({ key: 'Start' });
    }

    preload() {
        this.load.image('backginicio', 'assets/Start.png');
        this.registry.set('escenarioSeleccionado', null);
        this.registry.set('primerPersonajeSeleccionado', null);
        this.registry.set('segundoPersonajeSeleccionado', null);
    }

    create() {
        this.backg = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backginicio');
        this.start = this.input.keyboard.once('keydown-SPACE', this.handleContinue, this);
    }

    update(time, delta) {

    }

    handleContinue() {
        this.scene.start('SceneSelector');
    }
}
export default Start;