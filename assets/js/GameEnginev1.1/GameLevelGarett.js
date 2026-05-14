import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Barrier from './essentials/Barrier.js';

class GameLevelGarett {
    constructor(gameEnv) {
        this.gameEnv = gameEnv;
        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        // --- Music Setup ---
        const music = new Audio(path + "/assets/audio/Circus.mp3");
        music.loop = true;
        music.volume = 0.5;

        // Attempt to play immediately
        music.play().catch(() => {
            console.log("Music auto-play blocked. Waiting for user interaction...");
        });

        // Safety Trigger: Play music when any key is pressed (like WASD to move)
        const playMusicOnInteraction = () => {
            music.play();
            window.removeEventListener('keydown', playMusicOnInteraction);
        };
        window.addEventListener('keydown', playMusicOnInteraction);

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/BestGoodGrass.png",
            pixels: { height: 400, width: 700 }
        };

        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/kirby.png",
            SCALE_FACTOR: 5,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 100, y: 600 },
            pixels: { height: 36, width: 569 },
            orientation: { rows: 1, columns: 13 },
            down: { row: 0, start: 0, columns: 3 },
            downRight: { row: 0, start: 0, columns: 3, rotate: Math.PI / 16 },
            downLeft: { row: 0, start: 0, columns: 3, rotate: -Math.PI / 16 },
            left: { row: 0, start: 0, columns: 3 },
            right: { row: 0, start: 0, columns: 3 },
            up: { row: 0, start: 0, columns: 3 },
            upLeft: { row: 0, start: 0, columns: 3, rotate: Math.PI / 16 },
            upRight: { row: 0, start: 0, columns: 3, rotate: -Math.PI / 16 },
            hitbox: { widthPercentage: 0, heightPercentage: 0 },
            keypress: { up: 87, left: 65, down: 83, right: 68 }
        };

        const npcData1 = {
            id: 'Garrett The Popcorn Man',
            greeting: "Hi! I'm Garrett!",
            src: path + "/images/gamebuilder/sprites/GarettThePopcornMan.png",
            SCALE_FACTOR: 1,
            ANITION_RATE: 50,
            INIT_POSITION: { x: 650, y: 540 },
            pixels: { height: 523, width: 477 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.02, heightPercentage: 0.2 },
            dialogues: [
                "Welcome to Timmy's Fun World! I'm Garrett! Oh, and by the way, be wary of that circus tent, the Invisible Maze lies within...  Want some popcorn?",
            ],
            reaction: function () { if (this.dialogueSystem) { this.showReactionDialogue(); } else { console.log(this.greeting); } },
            interact: function () { if (this.dialogueSystem) { this.showRandomDialogue(); } }
        };

        const npcData3 = {
            id: 'Maze Tent',
            greeting: '"Would you like to enter the Invisible Maze? Press E to enter."',
            src: path + "/images/gamebuilder/sprites/tent.png",
            SCALE_FACTOR: 1.5,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: -50, y: 10 },
            pixels: { height: 400, width: 430 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.6, heightPercentage: 0.6 },
            dialogues: [],
            interact: function () {
                if (this.dialogueSystem) {
                    this.showRandomDialogue();
                }
                if (!this.listenerAdded) {
                    this.listenerAdded = true;
                    document.addEventListener("keydown", (e) => {
                        if (e.key.toLowerCase() === "e") {
                            console.log("Entering maze...");
                            music.pause(); // Stop the music when leaving the level
                            window.location.href = "timmycounter.html";
                        }
                    });
                }
            }
        };

        const dbarrier_1 = {
            id: 'dbarrier_1', x: 0, y: 0, width: 504, height: 109, visible: false,
            hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
            fromOverlay: true
        };

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData1 },
            { class: Npc, data: npcData3 },
            { class: Barrier, data: dbarrier_1 }
        ];
    }
}

export default GameLevelGarett;