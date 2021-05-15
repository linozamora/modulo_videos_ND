class Start extends Phaser.Game{
    constructor(){
        super('Start');
    }

    init() {
        console.log('Inicia narradores digitales');
        this.gameover = false;
    }
    preload() {
        this.load.image('backginicio', 'assets/backginicio.png');
        this.load.video('rfid', 'assets/rfid.mp4', 'loadeddata', false, true);

    }
    
    create () {
        this.backg = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'backginicio');
        this.start = this.input.keyboard.once('keydown-SPACE', this.handleContinue, this);
        var vid = this.add.video(900, 450, 'rfid');
        vid.play(true);  
        vid.setPaused(false);
            
    }
    update(time, delta) {

    }
    handleContinue()
	{
		this.scene.start('MenuselectorS', { character: this.selectedKey });
        //this.scene.start('Firstscene', { character: this.selectedKey });
	}
}
export default Start;