class MenuselectorS extends Phaser.Scene {
    constructor(){
        super('MenuselectorS');
    }

    init() {
        console.log('Inicia la selección');
        this.gameover = false;
    }
    preload() {
        this.load.image('backg', 'assets/backgp.png');
        this.load.image('boy', 'assets/boy.png');
        this.load.image('girl1', 'assets/girl1.png');
        this.load.image('boy2', 'assets/boy2.png');
        this.load.image('girl2', 'assets/girl2.png');
    }
    
    create () {
        this.backg = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backg');
        this.image = this.add.image(this.sys.game.canvas.width /5 , this.sys.game.canvas.height / 2, 'boy');
        this.image = this.add.image(this.sys.game.canvas.width /3 , this.sys.game.canvas.height / 2, 'girl1');
        this.image = this.add.image(this.sys.game.canvas.width /2 , this.sys.game.canvas.height / 2, 'boy2');
        this.image = this.add.image(this.sys.game.canvas.width /1.5 , this.sys.game.canvas.height / 2, 'girl2');

        this.start = this.input.keyboard.once('keydown-SPACE', this.handleContinue, this);
                
    }
    update(time, delta) {

    }
    handleContinue()
	{
		this.scene.start('Firstscene', { character: this.selectedKey });
	}
    
}
export default MenuselectorS;