// To build GameLevels, each contains GameObjects from below imports
import GamEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';
// Using v1.1 DialogueSystem for improved ID sanitization
import DialogueSystem from './essentials/DialogueSystem.js';
import AiNpc from './essentials/AiNpc.js';
import GameControl from './essentials/GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';
import GameLevelMeteorBlaster from './GameLevelMeteorBlaster.js';
import GameLevelMinesweeper from './GameLevelMinesweeper.js';
import GameLevelEnd from './GameLevelEnd.js';
import Coin from './Coin.js';
import { pythonURI, fetchOptions } from '../api/config.js';

// Import PlatformerMini (game-in-game)
import PlatformerMini from './PlatformerMini.js';

class GameLevelCat {
 constructor(gameEnv) {
   let width = gameEnv.innerWidth;
   let height = gameEnv.innerHeight;
   let path = gameEnv.path;


   // Background data
   const image_src_desert = path + "/images/gamebuilder/bg/Doofinsmirtz.png"; // be sure to include the path
   const image_data_desert = {
       name: 'desert',
       greeting: "Welcome to the desert!  It is hot and dry here, but there are many adventures to be had!",
       src: image_src_desert,
       pixels: {height: 580, width: 1038}
   };


   // Player data for Chillguy
   const sprite_src_chillguy = path + "/images/gamebuilder/sprites/kirby.png"; // be sure to include the path
   const CHILLGUY_SCALE_FACTOR = 5;
   const sprite_data_chillguy = {
       id: 'Chill Guy',
       greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
       src: sprite_src_chillguy,
       SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
       STEP_FACTOR: 1000,
       ANIMATION_RATE: 50,
       INIT_POSITION: { x: 0.0, y: 0.9 },  // 0% from left, 90% from top (near bottom)
       pixels: { height: 36, width: 569 },
        orientation: { rows: 1, columns: 13 },
        down: { row: 0, start: 0, columns: 3 },
        left: { row: 0, start: 0, columns: 3 },
        right: { row: 0, start: 0, columns: 3 },
        up: { row: 0, start: 0, columns: 3 },
        hitbox: { widthPercentage: 0, heightPercentage: 0 },
       keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
   };


   const sprite_data_coin = {
       id: 'coin',
       greeting: false,
       INIT_POSITION: { x: 0.6, y: 0.6 },  // 60% from left, 60% from top
       width: 40,
       height: 70,
       color: '#FFD700',
       hitbox: { widthPercentage: 0.0, heightPercentage: 0.0 },
       zIndex: 12,
       value: 1
   };
   







  // ===== CUSTOM AI NPCs =====
  // AI NPCs use the AiNpc utility (essentials/AiNpc.js) for common behaviors
  // Just define data + simple orchestrator methods, then call AiNpc.showInteraction()
  /* 
   * EXAMPLE: 
   * 
   * const sprite_data_wizard = {
   *     id: "MerlinTheWizard",
   *     src: path + "/images/gamify/wizard.png",
   *     expertise: "magic",
   *     chatHistory: [],
   *     dialogues: ["Greetings, young apprentice!", "Seek magical wisdom?"],
   *     knowledgeBase: { magic: [...spells and lore...] },
   *     reaction: function() { ... },
   *     interact: function() { AiNpc.showInteraction(this); }
   * };
   * 
   * Then add to this.classes: { class: Npc, data: sprite_data_wizard }
   */

  
  const sprite_src_historian = path + "/images/gamebuilder/sprites/CatOnHellThrone.png";
  const sprite_greet_historian = "Hello! I'm an expert in history!";
  const sprite_data_historian = {
      id: "Professor History",
      greeting: sprite_greet_historian,
      src: sprite_src_historian,
      SCALE_FACTOR: 3,
      ANIMATION_RATE: 50,
      pixels: { height: 523, width: 477 },
      INIT_POSITION: { x: 500, y: 400 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.2, heightPercentage: 0.2 },
      
      // AI-specific properties (required for AiNpc utility)
      expertise: "gamelore",              // Topic area for backend
      chatHistory: [],                   // Conversation memory
      dialogues: [                       // Random greetings
          "You look like you still have questions.",
          "You're about to go meet the boss."
      ],
      knowledgeBase: {                   // Context hints for AI
          history: [
              {
                  question: "Who is the boss?",
                  answer: "Someone you know quite well. You'll see."
              },
              {
                  question: "How can I get to the boss's secret layer?",
                  answer: "It's just up on the hill over there. It's 'well' hidden. Walk."
              },
              {
                  question: "Where am I?",
                  answer: "This is what's underneath Timmy's Fun World... This is the true theme park."
              },
              {
                  question: "Why am I here?",
                  answer: "Because you found your way through the 'Invisible Maze' game in the park. Nobody does."
              }
          ]
      },
      
      // Orchestrator: Handle collision/proximity reactions
      reaction: function() {
          if (this.dialogueSystem) {
              this.showReactionDialogue();
          } else {
              console.log(sprite_greet_historian);
          }
      },
      
      // Orchestrator: Handle player interaction (E key press)
      interact: function() {
          // Delegate to AiNpc utility for full AI conversation interface
          AiNpc.showInteraction(this);
      }
  };

    const npcData3 = {
            id: 'Popcorn',
            greeting: '"The boss awaits."',
            src: path + "/images/gamebuilder/sprites/doorpopcorn.png",
            SCALE_FACTOR: 4,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 1500, y: 500 },
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
        window.location.href = "battle.html";
      }
    });
  }
    }
}    


   // ===== PLATFORMER MINI GAME SETUP =====
   // PlatformerMini is a game-in-game launched by Chicken Jockey NPC
   const platformerMini = new PlatformerMini(gameEnv);

   let isRpgPaused = false;
   let desertMovementInterval, desertAnimationInterval;

   const pauseRpg = () => {
     if (isRpgPaused) return;
     isRpgPaused = true;

     clearInterval(desertMovementInterval);
     clearInterval(desertAnimationInterval);
   };

   const resumeRpg = () => {
     if (!isRpgPaused) return;
     isRpgPaused = false;

     desertMovementInterval = setInterval(() => {
       // Resume any movement logic if needed
     }, 100);

     desertAnimationInterval = setInterval(() => {
       // Resume any animation logic if needed
     }, 5000);
   };


// List of objects defnitions for this level
   this.classes = [
     { class: GamEnvBackground, data: image_data_desert },
     { class: Player, data: sprite_data_chillguy },
     { class: Coin, data: sprite_data_coin },
     { class: Npc, data: sprite_data_historian },
     { class: Npc, data: npcData3 },
   ];

 }


}


export default GameLevelCat;