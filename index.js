let canvas = document.querySelector('canvas');
canvas.style.border = '1px solid black';

let context= canvas.getContext("2d");

// set of variables------//
let gameStatus= "splash";
let dogpos = 250;
let dogSizeW= 150;
let dogSizeH= 150;
let nextFoodId = 0;
let activeFoods= {};
let foodSizeW= 65;
let foodSizeH= 65;
let score = 0;
let lives = 3;
let isGameOver= false;

let foodSpeed = 3000;
let foodInterval= null;

let instructionsEl = document.getElementById('instructions');

//dog speed slowing down
let dogSpeed = 5;

const allFoods= [
    {name:"cucumber", isBad: false, image: "images/cucumber5.png"},
    {name:"pumpkin", isBad: false, image: "images/pumpkin3.png"},
    {name:"peanut-butter", isBad: false, image: "images/peanut-butter.png"},
    {name:"chocolate", isBad: true, image: "images/chocolate3.png"},
    {name:"grapes", isBad: true, image: "images/grapes.png"}
]
// images------//
        
let splashImage = new Image();
    splashImage.src="images/splash2.png";

let kitchenImage = new Image();
    kitchenImage.src="images/kitchen3.jpg";

let endScreen = new Image();
    endScreen.src="images/gameover2.png"

let bobo= new Image();
    bobo.src="images/obi.png"

let winning= new Image();
    winning.src="images/winning.jpg"

createjs.Sound.registerSound("sounds/background.mp3", "background");
 //instance.on("click", this.handleComplete, this);
 //instance.volume = 0.02;

 createjs.Sound.registerSound("sounds/winning.mp3", "win");

 createjs.Sound.registerSound("sounds/losing.mp3", "loser");

 createjs.Sound.registerSound("sounds/yeah.mp3", "yeah");

 createjs.Sound.registerSound("sounds/nope.mp3", "nope");
 
//---------Event Listeners-------------//

let rightDown = false;
let leftDown = false;

setInterval(
    () => {
        if (rightDown === leftDown) {
            return false;
        }

        if (leftDown === true) {
            dogpos -= dogSpeed;
        } else if (rightDown === true){
            dogpos += dogSpeed;
        }
    
        if (dogpos < 0) {
            dogpos = 0;
        } else if (dogpos > canvas.width -dogSizeW){
            dogpos = canvas.width- dogSizeW;
        }
    },
    10
);

document.addEventListener("keydown", (e)=> {
    if (e.keyCode ==37) {
        leftDown = true;
    } else if (e.keyCode == 39){
        rightDown = true;
    }
});

document.addEventListener("keyup", (e)=> {
    if (e.keyCode ==37){
        leftDown = false;
    } else if (e.keyCode == 39){
        rightDown = false;
    }
});


canvas.addEventListener("click", (e)=> {

    if (gameStatus != "start") {
        let instance = createjs.Sound.play("background");
        instance.volume = 0.1;
        gameStatus = "start";

        instructionsEl.classList.add('hidden');
        canvas.classList.add('show');
        
        score = 0;
        lives = 3;
        foodSpeed = 3000;
    }
});

instructionsEl.addEventListener('click', (e) => {
    canvas.click();
});




//-----------Classes----------------//

class Food {
    constructor (foodId,isBad, foodName, foodX, imageSrc){
        this.isBad = isBad;
        this.foodId= foodId;
        this.foodName = foodName;
        this.foodX = foodX;
        this.foodY= 0;//-foodSizeH;
        this.imageSrc = imageSrc;
        this.image= new Image();
        this.image.src=this.imageSrc;


        this.topInterval = setInterval(() => {

            if (gameStatus !== 'start') {
                return;
            }

            this.foodY += 2;

            if (this.foodY > canvas.height - 50 - foodSizeH) {

                let touchesDog = false;
                if (this.foodX < dogpos && this.foodX + foodSizeW > dogpos) {
                    touchesDog = true;
                } else if (this.foodX > dogpos && this.foodX < dogpos + dogSizeW) {
                    touchesDog = true;
                }

                if (this.foodY > canvas.height || touchesDog === true) {
                    //remove food from active foods and stop animation
                    delete activeFoods[this.foodId];
                    clearInterval(this.topInterval); 
                }

                if (touchesDog === true) {
                    console.log("Yummy!")

                    if(this.isBad == true){
                        let instance= createjs.Sound.play("nope")
                        instance.volume = 0.1;
                        lives--; 
                        dogSpeed = dogSpeed -2
                        if (lives ===0){
                            gameOver()
                        }
                    } else {
                        let instance = createjs.Sound.play("yeah")
                        instance.volume = 0.5;
                        score++;
                        if (score ==20){
                            gameWin()
                        }
                    }

                } else if (this.foodY > canvas.height) {
                    console.log("oh no!")
                    console.log('lives is now:');
                    console.log(lives);

                    if(this.isBad == false){
                        lives--; 
                        dogSpeed = dogSpeed -2
                        if (lives ===0){
                            gameOver()
                        }
                    }   
                } 
            }
        }, 10);
    }
    draw(){
        //context.fillStyle = "#f3c";
        //context.fillRect(this.foodX, this.foodY, foodSizeW, foodSizeH);
        context.drawImage(this.image, this.foodX, this.foodY, foodSizeW, foodSizeH);
    }
}

function addFoodInterval() {
    if (gameStatus == "start") {
        addFood();
    }

    setTimeout(
        addFoodInterval,
        foodSpeed
    );
}

//-----functions----//
function startGame(){
    // ctx.drawImage(kitchen, 0, 0 );
    // ctx.drawImage(dog, dogX, dogY );
    //;
    
    
    setInterval(drawScreen, 20);

    setTimeout(
        addFoodInterval,
        foodSpeed
    );

    setInterval(
        () => {
            if (gameStatus === 'start') {
                foodSpeed -= 200;
            }
        },
        5000
    );
}

function gameOver(){
     //alert("Game Over!")
     gameStatus = "over";
     createjs.Sound.stop("background")
     
    let instance = createjs.Sound.play("loser")
    instance.volume = 0.1;
     //createjs.Sound.play("alarm");
}

function gameWin(){
    //alert("Game Over!")
    
    gameStatus = "win";
    createjs.Sound.stop("background")
    let instance = createjs.Sound.play("win")
    instance.volume=0.5;
    //createjs.Sound.play("alarm");
}

//which screen to draw
function drawScreen(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (gameStatus == "splash"){
        drawSplash()
    } else if (gameStatus == "start"){
        drawGame()
    } else if (gameStatus=="over"){
        drawOver()
    } else if (gameStatus=="win"){
        drawWin()
    }
}

//splash screen
function drawSplash(){
    context.drawImage(splashImage, 0, 0, canvas.width, canvas.height);
    context.fillStyle="#000";
    context.fillText('Click to start!', (canvas.width/2), (canvas.height/2) + 200);
    context.fillStyle="#000";
    context.font = '48px arial';
    context.textAlign = "center";
    //context.fillText('Hungie Games', canvas.width/2, canvas.height/2);
    
}

//drawing game
function drawGame(){
    context.textAlign="left";
    context.drawImage(kitchenImage, 0, 0, canvas.width, canvas.height);
    context.fillStyle = "#f00";

    for (let foodId in activeFoods){
       let food = activeFoods[foodId];
       food.draw();
    }

    context.drawImage(bobo, dogpos, canvas.height- 10- dogSizeH, dogSizeW, dogSizeH);

    context.fillStyle="#ffffff";
    context.font = '24px serif';
    context.fillText('Score:' + score, canvas.width-150, 25);

    context.fillStyle="#ffffff";
    context.font = '24px serif';
    context.fillText('Lives:' + lives, 50, 25);
}

//win screen
function drawWin(){
    context.textAlign="center";
    context.drawImage(winning, 0, 0, canvas.width, canvas.height);
    context.fillStyle="#000";
    context.font = '24px serif';
    //context.fillText('Game Over', canvas.width/2, canvas.height/2);
}

//game over - losing
function drawOver(){
    context.textAlign="center";
    context.drawImage(endScreen, 0, 0, canvas.width, canvas.height);
    context.fillStyle="#000";
    context.font = '24px book antiqua';
    context.fillText('Score: ' + score, canvas.width/2, canvas.height-450);
}





//adding food 
function addFood(isBad, foodName){
    nextFoodId++;
    let foodId = nextFoodId.toString(); 
    let randomFoodIndex= Math.floor(Math.random() * allFoods.length);
    let randomFood = allFoods[randomFoodIndex];
    console.log(randomFood);

    let foodX = Math.floor(Math.random() * (canvas.width-dogSizeW)) + 1;

    let food = new Food(foodId, randomFood.isBad, randomFood.name, foodX, randomFood.image);

    activeFoods[foodId] = food;
}


//-----start game----//
startGame();

