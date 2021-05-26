import Countdown from "./Countdown.js";

const scenes = {
    0: 'casa',
    1: 'carro',
    2: 'parque',
    3: 'circo'
}

const characters = {
    0: 'boysprite1',
    1: 'girlsprite1',
    2: 'boysprite2',
    3: 'girlsprite2',
}

class Firstscene extends Phaser.Scene {

    /** @type {Countdown} */
    countdown
    matchesCount = 0

    constructor() {
        super('Firstscene');
    }

    init() {
        console.log('Inicia la narración');
        this.gameover = false;
        this.respawn = 0;
    }

    preload() {
        this.primerPersonaje = this.registry.get('primerPersonajeSeleccionado');
        this.segundoPersonaje = this.registry.get('segundoPersonajeSeleccionado');
        // LOAD IMAGES AND SPRITES
        //console.log('Segundo personaje')
        //console.log(this.game.personaje2)
        this.load.image('final', 'assets/final.png')
            .image('carro', 'assets/escenarios/carro.png')
            .image('casa', 'assets/escenarios/casa.png')
            .image('circo', 'assets/escenarios/circo.png')
            .image('parque', 'assets/escenarios/parque.png')
        //.image("bullet", "assets/bullet.png")
        //.image("virus", "assets/virus.png")
        this.load.spritesheet('girlsprite1', 'assets/SPRITENA1.png',
            { frameWidth: 95, frameHeight: 230 })
        this.load.spritesheet('girlsprite2', 'assets/SPRITENA2.png',
            { frameWidth: 95, frameHeight: 230 })

        this.load.spritesheet('boysprite1', 'assets/SPRITENO1.png',
            { frameWidth: 95, frameHeight: 230 });

        this.load.spritesheet('boysprite2', 'assets/SPRITENO2.png',
            { frameWidth: 95, frameHeight: 230 });
    }

    create() {
        console.log('Escena', this.registry.getAll())
        const { width, height } = this.scale

        const timerLabel = this.add.text(width * 0.5, 50, '300', { fontSize: 48 }).setOrigin(0.5)

        this.countdown = new Countdown(this, timerLabel)
        this.countdown.start(this.handleCowntdownFinished.bind(this))
        // CREATE AUDIOS

        //this.popSound = this.sound.add('pop');
        //this.shotSound = this.sound.add('shot');
        //this.killedSound = this.sound.add('killed');
        //this.reboundSound = this.sound.add('rebound');

        // CREATE KEYBOARD CURSOS
        this.keys = this.input.keyboard.addKeys('A,W,S,D,F');
        this.cursors = this.input.keyboard.createCursorKeys();
        //this.anims2 = this.anims;

        //SECOND PLAYER CONTROLS
        //upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        //downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        //leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        //rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

        // CREATE SPRITES

        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, `${scenes[this.registry.get('escenarioSeleccionado')]}`);
        //this.virus = this.physics.add.group({
        //    defaultKey: 'virus'
        //});


        /**JUGADOR 1 */
        //let player1 = new Personaje({ scene: this, x: this.sys.game.canvas.width / 3, y: this.sys.game.canvas.height - 120, type: 'boysprite' })

        this.player = this.physics.add.sprite(this.sys.game.canvas.width / 3, this.sys.game.canvas.height, `${characters[this.primerPersonaje]}`)
            .setBounce(0.2)
            .setCollideWorldBounds(true)
            .setGravityY(500)
            .setDepth(10);

        this.animatePlayer();

        /**JUGADOR 2 */
        //let player2 = new Personaje({ scene: this, x: this.sys.game.canvas.width / 2, y: this.sys.game.canvas.height, type: 'girlsprite' })


        if (this.registry.get('segundoPersonajeSeleccionado') !== null) {
            this.player2 = this.physics.add.sprite(this.sys.game.canvas.width / 2, this.sys.game.canvas.height, `${characters[this.segundoPersonaje]}`)
                .setBounce(0.2)
                .setCollideWorldBounds(true)
                .setGravityY(500)
                .setDepth(10);

            this.animatePlayer2(); //HERE´S THE DIMENSION ERROR 
        }

        this.bullets = this.physics.add.group({
            defaultKey: 'bullet'
        });



        // ADD COLIDERS BETWEEN SPRITES

        //this.physics.add.collider(this.player, this.virus, this.hitPlayer, null, this);
        //this.physics.add.collider(this.bullets, this.virus, this.hitvirus, null, this);
        this.start = this.input.keyboard.once('keydown-SPACE', this.handleContinue, this);

    }

    update(time, delta) {

        // if( true ) { console.log(this.virus.children.get());}

        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
            this.player.setVelocity(0, 0)
                .anims.play('turn_p1');
            //this.fire(this.player);
        }
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
                .anims.play('left_p1', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)
                .anims.play('right_p1', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocity(-160)
            this.player.setVelocityX(0)
                .anims.play('jump_p1', true);
        }
        else {
            this.player.setVelocityX(0)
                .anims.play('turn_p1');
        }

        if (this.registry.get('segundoPersonajeSeleccionado') !== null) {
            //---PLAYER 2 CONTROLS---- 
            if (this.keys.A.isDown) {
                this.player2.setVelocityX(-160)
                    .anims.play('left_p2', true);
            }
            else if (this.keys.D.isDown) {
                this.player2.setVelocityX(160)
                    .anims.play('right_p2', true);
            }
            else if (this.keys.W.isDown) {
                this.player2.setVelocity(-160)
                this.player2.setVelocityX(0)
                    .anims.play('jump_p2', true);
            }
            else {
                this.player2.setVelocityX(0)
                    .anims.play('turn_p2');
            }
        }

        if (this.keys.F.isDown) {
            const { width, height } = this.scale
            //this.add.text(width * 0.2, height * 0.2, 'Narración Finalizada', { fontSize: 60 })
            this.add.image(width * 0.5, height * 0.5, 'final')
            this.player.visible = false
            if (this.registry.get('segundoPersonajeSeleccionado') !== null) {
                this.player2.visible = false
            }
            this.countdown.stop()
        }
        // else if (this.keys.P.isDown){
        //     this.player.setVelocity(0, 0)
        //         .anims.play('turn');

        // }
        //if(this.keys.P.isDown){


        // this.add.image( width * 0.5, height * 0.5, 'play'  
        //);

        //}
        this.countdown.update()
        this.countdown.label.setDepth(100)
        //console.log(this.timerLabel)
    }


    handleCowntdownFinished() {
        const { width, height } = this.scale
        // this.add.text(width * 0.2, height * 0.2, 'Narración Finalizada', { fontSize: 60 })
        //No funciona porque no elimina lo personajes
        this.add.image(width * 0.5, height * 0.5, 'final')
        this.player.visible = false
        if (this.registry.get('segundoPersonajeSeleccionado') !== null)
            this.player2.visible = false
        //this.scene.pause();w
    }


    // CUSTOM FUNCTIONS

    hitPlayer(player, virus, player2) {
        //this.killedSound.play();
        ///this.backgroundMusic.stop();
        this.scene.pause();
    }

    handleContinue() {
        this.scene.start('Fin', { character: this.selectedKey });
    }

    animatePlayer() {
        this.anims.create({
            key: 'left_p1',
            frames: this.anims.generateFrameNumbers(`${characters[this.registry.get('primerPersonajeSeleccionado')]}`, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn_p1',
            frames: [{ key: `${characters[this.registry.get('primerPersonajeSeleccionado')]}`, frame: 4 }],
            frameRate: 20,
            // delay: 1.1
        });
        this.anims.create({
            key: 'jump_p1',
            frames: [{ key: `${characters[this.registry.get('primerPersonajeSeleccionado')]}`, frame: 10 }],
            frameRate: 20,
            // delay: 1.1
        });
        this.anims.create({
            key: 'right_p1',
            frames: this.anims.generateFrameNumbers(`${characters[this.registry.get('primerPersonajeSeleccionado')]}`, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


    } //problem 

    animatePlayer2() {
        this.player2.anims.create({
            key: 'left_p2',
            frames: this.anims.generateFrameNumbers(`${characters[this.registry.get('segundoPersonajeSeleccionado')]}`, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1

        });

        this.player2.anims.create({
            key: 'turn_p2',
            frames: [{ key: `${characters[this.registry.get('segundoPersonajeSeleccionado')]}`, frame: 4 }],
            frameRate: 20,
            // delay: 1.1
        });
        this.player2.anims.create({
            key: 'jump_p2',
            frames: [{ key: `${characters[this.registry.get('segundoPersonajeSeleccionado')]}`, frame: 10 }],
            frameRate: 20,
            // delay: 1.1
        });

        this.player2.anims.create({
            key: 'right_p2',
            frames: this.anims.generateFrameNumbers(`${characters[this.registry.get('segundoPersonajeSeleccionado')]}`, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
    }

}

export default Firstscene; //


