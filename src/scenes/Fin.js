class Fin extends Phaser.Scene{
    constructor(){
        super('Fin');
    }

    //init() {
    //    console.log('Inicia narradores digitales');
    //    this.gameover = false;
    //}
    preload() {
        this.load.image('backgfin', 'assets/final.png');
    
    }
    
    create () {
        this.backg = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backgfin');
        this.start = this.input.keyboard.once('keydown-SPACE', this.handleContinue, this);

            
    }
    update(time, delta) {

    }
    handleContinue()
	{
		this.scene.start('Start', { character: this.selectedKey });
        //this.scene.start('Firstscene', { character: this.selectedKey });
	}
}
export default Fin;