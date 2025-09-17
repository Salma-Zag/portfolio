---
layout: base
title: Snake Game
permalink: /snake
---

<style>
    body{}
    .wrap{ margin-left: auto; margin-right: auto; }
    canvas{ display: none; border-style: solid; border-width: 10px; border-color: #FFFFFF; }
    canvas:focus{ outline: none; }

    /* All screens style */
    #gameover p, #setting p, #menu p{ font-size: 20px; }
    #gameover a, #setting a, #menu a{
        font-size: 30px;
        display: block;
    }
    #gameover a:hover, #setting a:hover, #menu a:hover{ cursor: pointer; }
    #gameover a:hover::before, #setting a:hover::before, #menu a:hover::before{
        content: ">";
        margin-right: 10px;
    }
    #menu{ display: block; }
    #gameover{ display: none; }
    #setting{ display: none; }
    #setting input{ display:none; }
    #setting label{ cursor: pointer; }
    #setting input:checked + label{
        background-color: #FFF;
        color: #000;
    }

    #scoreboard {
        display: inline-block;
        padding: 10px 20px;
        border: 2px solid #057e38ff;
        border-radius: 8px; 
        background-color: rgba(0, 0, 0, 0.05);
        color: #057e38ff;
        font-size: 1.5rem;
        font-weight: bold;
        font-family: 'Orbitron', sans-serif;
        margin-bottom: 10px;
        box-shadow: 0 0 10px rgba(0,255,204,0.3);
        transition: all 0.3s ease;
        text-align: center;
    }
    #scoreboard:hover { background-color: rgba(0,255,204,0.15) }
    #score_value { margin-left: 8px; color: #ffffff; }

    #lives { margin-left: 15px; font-size: 1.5rem; color: red; }

    @keyframes bounce { 0% {transform: scale(1);} 50% {transform: scale(1.4);} 100% {transform: scale(1);} }
    .score-bounce { animation: bounce 0.3s ease; }
</style>

<h2>Snake</h2>
<div class="container">
    <div id="scoreboard">
        <span id="score_label">Score:</span>
        <span id="score_value">0</span>
        <span id="lives"></span>
    </div>
    <div class="container bg-secondary" style="text-align:center;">
        <!-- Main Menu -->
        <div id="menu" class="py-4 text-light">
            <p>Welcome to Snake, press <span style="background-color: #FFFFFF; color: #000000">space</span> to begin</p>
            <a id="new_game" class="link-alert">new game</a>
            <a id="setting_menu" class="link-alert">settings</a>
        </div>
        <!-- Game Over -->
        <div id="gameover" class="py-4 text-light">
            <p>Game Over, press <span style="background-color: #FFFFFF; color: #000000">space</span> to try again</p>
            <a id="new_game1" class="link-alert">new game</a>
            <a id="setting_menu1" class="link-alert">settings</a>
        </div>
        <!-- Play Screen -->
        <canvas id="snake" class="wrap" width="320" height="320" tabindex="1"></canvas>
        <!-- Settings Screen -->
        <div id="setting" class="py-4 text-light">
            <p>Settings Screen, press <span style="background-color: #FFFFFF; color: #000000">space</span> to go back to playing</p>
            <a id="new_game2" class="link-alert">new game</a>
            <br>
            <p>Speed:
                <input id="speed1" type="radio" name="speed" value="120" checked/>
                <label for="speed1">Slow</label>
                <input id="speed2" type="radio" name="speed" value="75"/>
                <label for="speed2">Normal</label>
                <input id="speed3" type="radio" name="speed" value="35"/>
                <label for="speed3">Fast</label>
                <input id="speed4" type="radio" name="speed" value="20"/>
                <label for="speed4">Impossible</label>
            </p>
            <p>Wall:
                <input id="wallon" type="radio" name="wall" value="1" checked/>
                <label for="wallon">On</label>
                <input id="walloff" type="radio" name="wall" value="0"/>
                <label for="walloff">Off</label>
            </p>
            <p>Number of Apples:
                <input id="apple1" type="radio" name="apple" value="1" checked/>
                <label for="apple1">One</label>
                <input id="apple2" type="radio" name="apple" value="2"/>
                <label for="apple2">Two</label>
                <input id="apple3" type="radio" name="apple" value="3"/>
                <label for="apple3">Three</label>
            </p>
        </div>
    </div>
</div>

<script>
(function(){
    const canvas = document.getElementById("snake");
    const ctx = canvas.getContext("2d");
    const SCREEN_SNAKE = 0;
    const screen_snake = document.getElementById("snake");
    const ele_score = document.getElementById("score_value");
    const ele_lives = document.getElementById("lives");
    const speed_setting = document.getElementsByName("speed");
    const wall_setting = document.getElementsByName("wall");
    const apple_setting = document.getElementsByName("apple"); // NEW
    const SCREEN_MENU = -1, SCREEN_GAME_OVER=1, SCREEN_SETTING=2;
    const screen_menu = document.getElementById("menu");
    const screen_game_over = document.getElementById("gameover");
    const screen_setting = document.getElementById("setting");
    const button_new_game = document.getElementById("new_game");
    const button_new_game1 = document.getElementById("new_game1");
    const button_new_game2 = document.getElementById("new_game2");
    const button_setting_menu = document.getElementById("setting_menu");
    const button_setting_menu1 = document.getElementById("setting_menu1");
    const BLOCK = 10;
    let SCREEN = SCREEN_MENU;
    let snake, snake_dir, snake_next_dir, snake_speed;
    let apples = [], appleCount = 1; // NEW: multiple apples
    let score, wall, lives;
    let obstacles = [];

    let showScreen = function(screen_opt){
        SCREEN = screen_opt;
        switch(screen_opt){
            case SCREEN_SNAKE:
                screen_snake.style.display = "block";
                screen_menu.style.display = "none";
                screen_setting.style.display = "none";
                screen_game_over.style.display = "none";
                break;
            case SCREEN_GAME_OVER:
                screen_snake.style.display = "block";
                screen_menu.style.display = "none";
                screen_setting.style.display = "none";
                screen_game_over.style.display = "block";
                break;
            case SCREEN_SETTING:
                screen_snake.style.display = "none";
                screen_menu.style.display = "none";
                screen_setting.style.display = "block";
                screen_game_over.style.display = "none";
                break;
        }
    }

    window.onload = function(){
        button_new_game.onclick = button_new_game1.onclick = button_new_game2.onclick = newGame;
        button_setting_menu.onclick = button_setting_menu1.onclick = function(){ showScreen(SCREEN_SETTING); };
        setSnakeSpeed(150);
        for(let i = 0; i < speed_setting.length; i++){
            speed_setting[i].addEventListener("click", function(){
                for(let i = 0; i < speed_setting.length; i++){
                    if(speed_setting[i].checked) setSnakeSpeed(speed_setting[i].value);
                }
            });
        }
        setWall(1);
        for(let i = 0; i < wall_setting.length; i++){
            wall_setting[i].addEventListener("click", function(){
                for(let i = 0; i < wall_setting.length; i++){
                    if(wall_setting[i].checked) setWall(wall_setting[i].value);
                }
            });
        }
        // NEW: update appleCount when settings change
        for(let i = 0; i < apple_setting.length; i++){
            apple_setting[i].addEventListener("click", function(){
                appleCount = parseInt(document.querySelector('input[name="apple"]:checked').value);
                generateApples();
            });
        }

        window.addEventListener("keydown", function(evt) {
            if(evt.code === "Space" && SCREEN !== SCREEN_SNAKE) newGame();
        }, true);
    }

    let mainLoop = function(){
        let _x = snake[0].x;
        let _y = snake[0].y;
        snake_dir = snake_next_dir;
        switch(snake_dir){ case 0: _y--; break; case 1: _x++; break; case 2: _y++; break; case 3: _x--; break; }
        snake.pop();
        snake.unshift({x: _x, y: _y});

        if(wall === 1){
            if(_x < 0 || _x === canvas.width / BLOCK || _y < 0 || _y === canvas.height / BLOCK){ loseLife(); return; }
        }else{
            for(let i = 0; i < snake.length; i++){
                if(snake[i].x < 0) snake[i].x += canvas.width / BLOCK;
                if(snake[i].x === canvas.width / BLOCK) snake[i].x -= canvas.width / BLOCK;
                if(snake[i].y < 0) snake[i].y += canvas.height / BLOCK;
                if(snake[i].y === canvas.height / BLOCK) snake[i].y -= canvas.height / BLOCK;
            }
        }

        for(let i = 1; i < snake.length; i++){
            if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){ loseLife(); return; }
        }

        for(let i = 0; i < obstacles.length; i++){
            if(snake[0].x === obstacles[i].x && snake[0].y === obstacles[i].y){ loseLife(); return; }
        }

        // Snake eats apples
        for(let i = 0; i < apples.length; i++){
    if(snake[0].x === apples[i].x && snake[0].y === apples[i].y){
        snake.push({x: snake[0].x, y: snake[0].y});
        altScore(++score);
        apples.splice(i,1);
        break; // remove break if you want multiple eaten at once, but one is enough
    }
}

// Only generate new apples if all are eaten
    if(apples.length === 0){
        generateApples();
    }

        // Paint
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        for(let i = 0; i < snake.length; i++){ activeDot(snake[i].x, snake[i].y); }

        // Apples
        for(let i = 0; i < apples.length; i++){
            ctx.font = BLOCK + "px Arial";
            ctx.fillText("🍎", apples[i].x * BLOCK, apples[i].y * BLOCK + BLOCK);
        }

        // Obstacles
        ctx.fillStyle = "#000000ff";
        for(let i = 0; i < obstacles.length; i++){
            ctx.fillRect(obstacles[i].x * BLOCK, obstacles[i].y * BLOCK, BLOCK, BLOCK);
        }

        setTimeout(mainLoop, snake_speed);
    }

    let newGame = function(){
        showScreen(SCREEN_SNAKE);
        screen_snake.focus();
        score = 0; lives = 3;
        altScore(score); updateLives();
        snake = []; snake.push({x:0,y:15}); snake_next_dir=1;
        generateApples(); generateObstacles();
        canvas.onkeydown = function(evt){ changeDir(evt.keyCode); }
        mainLoop();
    }

    let changeDir = function(key){
        switch(key){
            case 37: case 65: if(snake_dir!==1) snake_next_dir=3; break;
            case 38: case 87: if(snake_dir!==2) snake_next_dir=0; break;
            case 39: case 68: if(snake_dir!==3) snake_next_dir=1; break;
            case 40: case 83: if(snake_dir!==0) snake_next_dir=2; break;
        }
    }

    let activeDot = function(x,y){ ctx.fillStyle="#00BFFF"; ctx.fillRect(x*BLOCK,y*BLOCK,BLOCK,BLOCK); }

    // Multiple apples are generated
    let generateApples = function(){
    apples = [];
    for(let i=0;i<appleCount;i++){
        let ax, ay;
        do {
            ax = Math.floor(Math.random() * (canvas.width/BLOCK));
            ay = Math.floor(Math.random() * (canvas.height/BLOCK));
        } while(snake.some(s=>s.x===ax && s.y===ay) || apples.some(a=>a.x===ax && a.y===ay));
        apples.push({x:ax,y:ay});
        }
    }

    let generateObstacles = function(){
        obstacles=[];
        for(let i=0;i<3;i++){
            let ox=Math.floor(Math.random()*(canvas.width/BLOCK));
            let oy=Math.floor(Math.random()*(canvas.height/BLOCK));
            obstacles.push({x:ox,y:oy});
        }
    }

    let altScore = function(score_val){
        ele_score.innerHTML=String(score_val);
        ele_score.classList.remove("score-bounce");
        void ele_score.offsetWidth;
        ele_score.classList.add("score-bounce");
    }

    let updateLives = function(){ ele_lives.innerHTML = " ♥".repeat(lives); }

    function loseLife(){
        lives--; updateLives();
        if(lives<=0){ showScreen(SCREEN_GAME_OVER); return; }
        let length=snake.length; snake=[];
        for(let i=0;i<length;i++) snake.push({x:0,y:15+i});
        snake_next_dir=1;
        mainLoop();
    }

    let setSnakeSpeed = function(speed_value){ snake_speed = speed_value; }
    let setWall = function(wall_value){
        wall = wall_value;
        screen_snake.style.borderColor = wall===0 ? "#606060" : "#FFFFFF";
    }
})();
</script>