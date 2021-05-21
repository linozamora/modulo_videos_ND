// IMPORTAR LA PRIMERA ESCENA
import Characterselector from './scenes/Characterselector.js';
import Characterselector2 from './scenes/Characterselector2.js';
import Firstscene from './scenes/Firstscene.js'
import gameboy from './scenes/gameboy.js';
import MenuselectorS from './scenes/MenuselectorS.js';
import Sceneselector from './scenes/Sceneselector.js';
import Start from './scenes/Start.js';


const config = {

    // OPCIONALES
    title: 'Narradores_Digitales',
    url: 'url',
    version: '0.0.1',

    // OPCIONAL
    pixelArt: true, // REMARCAR LOS PIXELES DE LAS IMAGENES

    // OBLIGATORIO
    type: Phaser.CANVAS, // WEBGL O CANVAS O AUTOMATICO
    width: 1366, // TAMAÑO DEL LIENZO
    height: 740,
    parent: 'container', // ID DEL CONTENEDOR
    backgroundColor: '#56CDFF', // FONDO DEL LIENZO

    // INFORMACIÓN DE LA CONSOLA
    banner: {
        hidePhaser: true, // OCULTAR TEXTO DE PHASER EN CONSOLA
        text: '#000000', // CAMBIAR COLOR DEL TEXTO DEL TITULO DEL JUEGO EN CONSOLA
         // PALETA DE COLORES DE ADORNO EN CONSOLA
        background: [
            'red',
            'yellow',
            'red',
            'transparent'
        ]
       
    },
    scale: {    // CONFIGURACIÓN PARA RESPONSIVE
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
  },
    physics: {  //CONFIGURACIÓN DE FISICAS DEL PERSONAJE --- GRAVEDAD GENERAL
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: false
        }
    },

    //ESCENAS DEL JUEGO
    scene: [Start, Sceneselector, Characterselector, 
        Characterselector2, Firstscene]
};

// CREAR LA INSTANCIA DEL JUEGO
const game = new Phaser.Game(config);


