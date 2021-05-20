class Start extends Phaser.Scene{
    constructor(){
        super('Start');
    }

    //init() {
    //    console.log('Inicia narradores digitales');
    //    this.gameover = false;
    //}
    preload() {
        this.load.image('backginicio', 'assets/Start.png');
        

    }
    
    create () {
        this.backg = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backginicio');
        this.start = this.input.keyboard.once('keydown-SPACE', this.handleContinue, this);
        
            
    }
    update(time, delta) {

    }
    handleContinue()
	{
		this.scene.start('Scenesselector', { character: this.selectedKey });
        //this.scene.start('Firstscene', { character: this.selectedKey });
	}
}
export default Start;