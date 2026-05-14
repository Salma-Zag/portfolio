import GameEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
import Barrier from './essentials/Barrier.js';

class GameLevelBattleBus {
    constructor(gameEnv) {
        this.gameEnv = gameEnv;
        const path = gameEnv.path;
        const width = gameEnv.innerWidth;
        const height = gameEnv.innerHeight;

        // Track current riddle progress
        this.currentRiddleIndex = 0;
        this.riddles = [
            { q: "Can a match box? (hint: all riddles are lowercase, this answer is 5 words with spaces in between)", a: "no but a tin can" },
            { q: "The more of this there is, the less you see. What is it? (hint: one word)", a: "darkness" },
            { q: "I have keys, but no locks. I have a space, but no room. What am I? (hint: one word)", a: "keyboard" }
        ];

        const music = new Audio(path + "/assets/audio/GourmetRace.mp3");
        music.loop = true;
        music.volume = 0.5;

        music.play().catch(e => console.log("Audio waiting for interaction"));
        window.onkeydown = (e) => {
            music.play().catch(() => {}); 
            if (e.key.toLowerCase() === 'g') {
                const player = gameEnv.gameObjects.find(obj => obj.spriteData && obj.spriteData.id === 'playerData');
                if (player) player.x = width - 200;
            }
        };

        const bgData = {
            name: "custom_bg",
            src: path + "/images/gamebuilder/bg/HellWithTravelSign.png",
            pixels: { height: 400, width: 700 }
        };

        const playerData = {
            id: 'playerData',
            src: path + "/images/gamebuilder/sprites/kirby.png",
            SCALE_FACTOR: 8,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 100, y: 500 },
            pixels: { height: 36, width: 569 },
            orientation: { rows: 1, columns: 13 },
            down: { row: 0, start: 0, columns: 3 },
            hitbox: { widthPercentage: 0, heightPercentage: 0 },
            keypress: { up: 87, left: 65, down: 83, right: 68 }
        };

        const npcData1 = {
            id: 'cat',
            greeting: "Mrow. Solve my three riddles to earn passage.",
            src: path + "/images/gamebuilder/sprites/CatOnHellThrone.png",
            SCALE_FACTOR: 3,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 470, y: 450 },
            pixels: { height: 523, width: 477 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.2, heightPercentage: 0.2 },
            interact: function() {
                if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) return;

                const level = window.hoorayLevelRef; // Reference to the class instance
                const currentRiddle = level.riddles[level.currentRiddleIndex];

                if (this.dialogueSystem) {
                    this.dialogueSystem.showDialogue(`Riddle ${level.currentRiddleIndex + 1}: ${currentRiddle.q}`, "The Cat", this.spriteData.src);

                    const inputContainer = document.createElement('div');
                    inputContainer.style.cssText = 'margin-top:10px; display:flex; gap:5px;';

                    const input = document.createElement('input');
                    input.type = 'text';
                    input.placeholder = 'Answer...';
                    input.style.cssText = 'padding:5px; color:white; background:rgba(0,0,0,0.6); border:1px solid white;';

                    input.addEventListener('keydown', (e) => {
                        e.stopPropagation(); 
                        if (e.key === 'Enter') checkAnswer();
                    });

                    const submitBtn = document.createElement('button');
                    submitBtn.textContent = 'Submit';
                    submitBtn.style.cssText = 'padding:5px 10px; background:#e84a7c; color:white; border:none; cursor:pointer;';

                    const checkAnswer = () => {
                        const val = input.value.trim().toLowerCase();
                        if (val === currentRiddle.a) {
                            level.currentRiddleIndex++;
                            this.dialogueSystem.closeDialogue();

                            if (level.currentRiddleIndex < level.riddles.length) {
                                alert(`Correct! Only ${level.riddles.length - level.currentRiddleIndex} more to go.`);
                            } else {
                                // Final Riddle Solved
                                const bus = gameEnv.gameObjects.find(obj => obj.canvas && obj.canvas.id === 'Battle Bus');
                                if (bus) {
                                    bus.y = 200; 
                                    bus.canvas.style.opacity = '1';
                                    bus.canvas.style.display = 'block';
                                }
                                const player = gameEnv.gameObjects.find(obj => obj.spriteData && obj.spriteData.id === 'playerData');
                                if (player) player.x = width - 200;

                                music.pause();
                                alert("All riddles solved! The Battle Bus awaits!");
                                window.location.href = "cats.html";
                            }
                        } else {
                            alert("Wrong! The Cat is not impressed.");
                            input.value = "";
                        }
                    };

                    submitBtn.onclick = checkAnswer;
                    inputContainer.appendChild(input);
                    inputContainer.appendChild(submitBtn);

                    const dialogueBox = document.getElementById('custom-dialogue-box-' + this.dialogueSystem.id);
                    if (dialogueBox) {
                        dialogueBox.appendChild(inputContainer);
                        setTimeout(() => input.focus(), 50);
                    }
                }
            }
        };

        const npcData3 = {
            id: 'Battle Bus',
            greeting: "All aboard!",
            src: path + "/images/gamebuilder/sprites/battlebus.png",
            SCALE_FACTOR: 1,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: width - 700, y: -2000 }, 
            pixels: { height: 700, width: 700 },
            orientation: { rows: 1, columns: 1 },
            down: { row: 0, start: 0, columns: 1 },
            hitbox: { widthPercentage: 0.6, heightPercentage: 0.6 },
            postInit: function() {
                if (this.canvas) this.canvas.style.opacity = '0'; 
            },
            interact: function() {
                music.pause();
                window.location.href = "battlebusone.html"; 
            }
        };

        this.classes = [
            { class: GameEnvBackground, data: bgData },
            { class: Player, data: playerData },
            { class: Npc, data: npcData1 },
            { class: Npc, data: npcData3 },
        ];

        // Ensure the NPC logic can find the level variables
        window.hoorayLevelRef = this;
    }
}

export default GameLevelBattleBus;