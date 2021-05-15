class gameboy extends Phaser.Game{
    init(data) {
        console.log('Inicia el seleccionado');
        this.selectedCharacter = data.character

    }
    preload() {
        this.load.atlas(
			this.selectedCharacter,
			`personajes/${this.selectedCharacter}.png`,
			`personajes/${this.selectedCharacter}.json`
		)
    }

    create() {
        const idle = AnimationDefinition[this.selectedCharacter].idle
	    this.anims.create({
		key: 'sprite',
		frames: this.anims.generateFrameNames(this.selectedCharacter, idle.frames),
		frameRate: idle.frameRate,
		repeat: -1
	})
        this.anims.create({
            key: 'boysprite',
            frames: this.anims.generateFrameNames(this.selectedCharacter, {
                start: 0, end: 5, zeroPad: 3, prefix: 'boysprite', suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        })
    
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames(this.selectedCharacter, {
                start: 0, end: 5, zeroPad: 3, prefix: 'boysprite', suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        })

    }

    update(time, delta) {

    }



}
const AnimationDefinition = {
	boysprite: {
		idle: {
			frames: { start: 0, end: 5, zeroPad: 3, prefix: 'boysprite', suffix: '.png' },
			frameRate: 10
		},
		// other animations...
	},
	// other character keys...
}
export default gameboy
