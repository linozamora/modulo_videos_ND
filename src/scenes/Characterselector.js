class Characterselector extends Phaser.Scene {
    constructor() {
        super({ key: 'Characterselector' });
    }
    preload() {
        this.load.atlas('personajes', './assets/personajes.png', './assets/personajes_atlas.json')
        this.load.image('backgpers', 'assets/backpers1.png');
        this.registry.set('primerPersonajeSeleccionado', 1)
    }
    create() {
        this.keys = this.input.keyboard.addKeys('F');
        console.log(this.registry.getAll())
        //const graphics = this.add.graphics({          //OCULTAR LAS LINEAS DE LA FIGURA GEOMETRICA
        //    lineStyle: {width:2, color: 0x00ff00}     //OCULTAR LAS LINEAS DE LA FIGURA GEOMETRICA
        //});                                           //OCULTAR LAS LINEAS DE LA FIGURA GEOMETRICA
        this.backg = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backgpers');
        // this.add.text(width * 0.2, height * 0.2, 'Narración Finalizada', { fontSize: 60 })

        const elipse = new Phaser.Curves.Ellipse({
            x: 683,
            y: 370,
            xRadius: 300,
            yRadius: 120
        });
        const totalItems = 4;
        const points = elipse.getPoints(totalItems);
        points.pop();
        //console.log(points);

        console.log('puntos', points)
        let minY = points.reduce((prev, current) => (current.y <= prev) ? current.y : prev, points[0].y);
        let maxY = points.reduce((prev, current) => (current.y >= prev) ? current.y : prev, points[0].y);

        const alphaRange = 1 / (maxY - minY);
        const scaleRange = 0.4 / (maxY - minY);
        //console.log('punto minimo', minY , 'punto maximo', maxY);

        const images = points.map((point, index) => {
            const image = this.add.image(point.x, point.y, 'personajes', 'personajes_' + index);
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
                    this.registry.set('primerPersonajeSeleccionado', index)
                    console.log('Primero', index)
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
        //graphics.strokeEllipseShape(elipse, totalItems);  //OCULTAR LAS LINEAS DE LA FIGURA GEOMETRICA
        this.start = this.input.keyboard.once('keydown-SPACE', this.handleContinue, this);
    }
    update(time, delta){
        if (this.keys.F.isDown) {
            this.handleContinue2();
        }
    }
    handleContinue() {
        this.scene.start('Characterselector2', { character: this.selectedKey });
    }
    handleContinue2() {
        this.registry.set('segundoPersonajeSeleccionado', null)
        this.scene.start('Firstscene', { character: this.selectedKey }); 
    }
}

export default Characterselector;