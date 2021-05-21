import Countdown from "./Countdown.js";

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
        // LOAD IMAGES AND SPRITES

        this.load.image('background', 'assets/background.png')
                .image('pausa','assets/pausa.png')
                .image('play','assets/play.png')
                .image('final','assets/final.png')
            //.image("bullet", "assets/bullet.png")
            //.image("virus", "assets/virus.png")
            .spritesheet('boysprite', 'assets/boysprite.png',
                { frameWidth: 95, frameHeight: 230 }),
            this.load.spritesheet('girlsprite', 'assets/girlsprite.png',
                { frameWidth: 95, frameHeight: 230 });


        // LOAD AUDIOS

        //this.load.audio('pop',['assets/pop.wav'])
        //         .audio('shot',['assets/shot.wav'])
        //         .audio('killed',['assets/killed.wav'])
        //         .audio('rebound',['assets/rebound.wav'])
        //         .audio('bgmusic',['assets/bgmusic.mp3']);


    }

    create() {

        const { width, height } = this.scale

        const timerLabel = this.add.text(width * 0.5, 50, '45', { fontSize: 48 }).setOrigin(0.5)

        this.countdown = new Countdown(this, timerLabel)
        this.countdown.start(this.handleCowntdownFinished.bind(this))
        // CREATE AUDIOS

        //this.popSound = this.sound.add('pop');
        //this.shotSound = this.sound.add('shot');
        //this.killedSound = this.sound.add('killed');
        //this.reboundSound = this.sound.add('rebound');

        // BACKGROUND MUSIC

        //this.backgroundMusic = this.sound.add('bgmusic');
        //this.backgroundMusic.loop = true;
        //this.backgroundMusic.play();

        // CREATE KEYBOARD CURSOS
        this.keys = this.input.keyboard.addKeys('A,W,S,D,F');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.anims2 = this.anims;

        //SECOND PLAYER CONTROLS
        //upButton = game.input.keyboard.addKey(Phaser.Keyboard.W);
        //downButton = game.input.keyboard.addKey(Phaser.Keyboard.S);
        //leftButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
        //rightButton = game.input.keyboard.addKey(Phaser.Keyboard.D);

        // CREATE SPRITES

        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        //this.virus = this.physics.add.group({
        //    defaultKey: 'virus'
        //});

        this.player = this.physics.add.sprite(this.sys.game.canvas.width / 3, this.sys.game.canvas.height, 'boysprite')
            .setBounce(0.2)
            .setCollideWorldBounds(true)
            .setGravityY(500)
            .setDepth(10);

        this.animatePlayer();

        //this.player2 = this.physics.add
        this.player2 = this.physics.add.sprite(this.sys.game.canvas.width / 2, this.sys.game.canvas.height, 'girlsprite')
            .setBounce(0.2)
            .setCollideWorldBounds(true)
            .setGravityY(500)
            .setDepth(10);

        this.animatePlayer2(); //HERE´S THE DIMENSION ERROR 

        this.bullets = this.physics.add.group({
            defaultKey: 'bullet'
        });
        


        // ADD COLIDERS BETWEEN SPRITES

        //this.physics.add.collider(this.player, this.virus, this.hitPlayer, null, this);
        //this.physics.add.collider(this.bullets, this.virus, this.hitvirus, null, this);


    }

    update(time, delta) {

        // if( true ) { console.log(this.virus.children.get());}

        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
            this.player.setVelocity(0, 0)
                .anims.play('turn');
            //this.fire(this.player);
        }
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160)
                .anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160)
                .anims.play('right', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocity(-160)
            this.player.setVelocityX(0)
                .anims.play('jump', true);
        }
        else {
            this.player.setVelocityX(0)
                .anims.play('turn');
        }
        //---PLAYER 2 CONTROLS---- 
        if (this.keys.A.isDown) {
            this.player2.setVelocityX(-160)
                .anims.play('left', true);
        }
        else if (this.keys.D.isDown) {
            this.player2.setVelocityX(160)
                .anims.play('right', true);
        }
        else if (this.keys.W.isDown) {
            this.player2.setVelocity(-160)
            this.player2.setVelocityX(0)
                .anims.play('jump', true);
        }
        else {
            this.player2.setVelocityX(0)
                .anims.play('turn');
        }
        if (this.keys.F.isDown) {
            const { width, height } = this.scale
            //this.add.text(width * 0.2, height * 0.2, 'Narración Finalizada', { fontSize: 60 })
            this.add.image( width * 0.5, height * 0.5, 'pausa');  
        
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
        console.log(this.timerLabel)
    }


    handleCowntdownFinished() {
        const { width, height } = this.scale
        this.add.text(width * 0.2, height * 0.2, 'Narración Finalizada', { fontSize: 60 })
        //No funciona porque no elimina lo personajes
       // this.add.image( width * 0.5, height * 0.5, 'final'  ) 

    
        this.scene.pause();

    }


    // CUSTOM FUNCTIONS

    hitPlayer(player, virus, player2) {
        //this.killedSound.play();
        ///this.backgroundMusic.stop();
        this.scene.pause();
    }



    animatePlayer() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('boysprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1

        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'boysprite', frame: 4 }],
            frameRate: 20,
            // delay: 1.1
        });
        this.anims.create({
            key: 'jump',
            frames: [{ key: 'boysprite', frame: 10 }],
            frameRate: 20,
            // delay: 1.1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('boysprite', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


    } //problem 
    animatePlayer2() {
        this.anims2.create({
            key: 'left',
            frames: this.anims2.generateFrameNumbers('girlsprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1

        });

        this.anims2.create({
            key: 'turn',
            frames: [{ key: 'girlsprite', frame: 4 }],
            frameRate: 20,
            // delay: 1.1
        });
        this.anims2.create({
            key: 'jump',
            frames: [{ key: 'girlsprite', frame: 10 }],
            frameRate: 20,
            // delay: 1.1
        });

        this.anims2.create({
            key: 'right',
            frames: this.anims2.generateFrameNumbers('girlsprite', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


    }

}

export default Firstscene; //


