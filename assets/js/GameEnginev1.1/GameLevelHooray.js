
import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Barrier from './essentials/Barrier.js';

class GameLevelHooray {
    constructor(gameEnv) {
        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/Hooray.png",
            pixels: { height: 400, width:700 }
        };

        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/kirby.png",
            SCALE_FACTOR: 5,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 200, y: 300 },
            pixels: { height: 36, width: 569 },
            orientation: { rows: 1, columns: 13 },
            down: { row: 0, start: 0, columns: 3 },
            downRight: { row: 0, start: 0, columns: 3, rotate: Math.PI/16 },
            downLeft: { row: 0, start: 0, columns: 3, rotate: -Math.PI/16 },
            left: { row: 0, start: 0, columns: 3 },
            right: { row: 0, start: 0, columns: 3 },
            up: { row: 0, start: 0, columns: 3 },
            upLeft: { row: 0, start: 0, columns: 3, rotate: Math.PI/16 },
            upRight: { row: 0, start: 0, columns: 3, rotate: -Math.PI/16 },
            hitbox: { widthPercentage: 0, heightPercentage: 0 },
            keypress: { up: 87, left: 65, down: 83, right: 68 }
            };
            
        const npcData3 = {
            id: 'Trophy',
            greeting: '"Great job!! Press E to claim your trophy. You earned it."',
            src: path + "/images/gamebuilder/sprites/BetterTrophy.png",
            SCALE_FACTOR: 1,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 280, y: 100 },
            pixels: { height: 400, width: 430 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.1, heightPercentage: 0.1 },
            dialogues: [
  ],

    interact: function() { 
        if (this.dialogueSystem) { 
            this.showRandomDialogue(); 
    }
        if (!this.listenerAdded) {
    this.listenerAdded = true; 
    document.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "e") {
        console.log("Entering maze...");
        window.location.href = "battlebusone.html";
      }
    });
  }
}
        }      
const dbarrier_1 = {
    id: 'dbarrier_1', x: 0, y: 0, width: 504, height: 109, visible: false,
    hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
    fromOverlay: true
};
this.classes = [      
      { class: GameEnvBackground, data: bgData },
      { class: Player, data: playerData },
      { class: Npc, data: npcData3 },
      { class: Barrier, data: dbarrier_1 }
];

        
    }
}

export default GameLevelHooray;