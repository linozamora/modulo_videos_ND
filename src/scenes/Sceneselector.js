class Sceneselector extends Phaser.Scene {
    constructor() {
        super('SceneSelector');
    }
    preload() {
        this.load.atlas('escenarios', './assets/escenarios.png', './assets/escenarios_atlas.json')
        this.load.image('backesc', 'assets/backesc.png');
        this.registry.set('escenarioSeleccionado', 0);
    }

    create() {
        this.backg = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backesc');
        const elipse = new Phaser.Curves.Ellipse({
            x: 683,
            y: 370,
            xRadius: 300,
            yRadius: 120
        });
        const totalItems = 4;
        const points = elipse.getPoints(totalItems);
        points.pop();

        let minY = points.reduce((prev, current) => (current.y <= prev) ? current.y : prev, points[0].y);
        let maxY = points.reduce((prev, current) => (current.y >= prev) ? current.y : prev, points[0].y);

        const alphaRange = 1 / (maxY - minY);
        const scaleRange = 0.4 / (maxY - minY);
        //console.log('punto minimo', minY, 'punto maximo', maxY);

        const images = points.map((point, index) => {
            const image = this.add.image(point.x, point.y, 'escenarios', 'escenarios_' + index);
            image.setScale(0.5 + scaleRange * (point.y - minY));
            image.setAlpha(alphaRange * (point.y - minY));
            image.setDepth(point.y);

            return image;
        });

        this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
            points.forEach((p, index) => {
                const finalPoint = (index === points.length - 1);

                const image = images[index];
                const point = (finalPoint) ? points[0] : points[index + 1];

                const x = point.x;
                const y = point.y;

                if (x === 683 && y === 490) {
                    this.registry.set('escenarioSeleccionado', index)
                }

                this.tweens.add({
                    targets: image,
                    x,
                    y,
                    ease: 'power1',
                    duration: 500,
                    onUpdate: (tween, target) => {
                        image.setScale(0.5 + scaleRange * (target.y - minY));
                        image.setAlpha(alphaRange * (target.y - minY));
                        image.setDepth(target.y);
                    }
                })
            });
            Phaser.Utils.Array.RotateLeft(points);
        });


        this.start = this.input.keyboard.once('keydown-SPACE', this.handleContinue, this);
    }
    handleContinue() {
        this.scene.start('Characterselector', { character: this.selectedKey });
    }
}
export default Sceneselector;