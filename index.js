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

let foodSpeed = 5000;
let foodInterval= null;

const allFoods= [
    {name:"cucumber", isBad: false, image: "images/cucumber5.png"},
    {name:"pumpkin", isBad: false, image: "images/pumpkin3.png"},
    {name:"peanut-butter", isBad: false, image: "images/peanut-butter.png"},
    {name:"chocolate", isBad: true, image: "images/chocolate3.png"}
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

 createjs.Sound.registerSound("sounds/winning.mp3", "win");

 createjs.Sound.registerSound("sounds/losing.mp3", "loser");

 createjs.Sound.registerSound("sounds/yeah.mp3", "yeah");

 createjs.Sound.registerSound("sounds/nope.mp3", "nope");
//---------Event Listeners-------------//

document.addEventListener("keydown", (e)=> {
    if (e.keyCode ==37){
        dogpos -=40
    } else if (e.keyCode == 39){
        dogpos +=40
    }

    if (dogpos < 0) {
        dogpos = 0;
    } else if (dogpos > canvas.width -dogSizeW){
        dogpos = canvas.width- dogSizeW;
    }
});



canvas.addEventListener("click", (e)=> {
    createjs.Sound.play("background");
    gameStatus = "start";
    score = 0;
    lives = 3;
    foodSpeed = 5000;
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
            this.foodY += 1;

            if (this.foodY > canvas.height - 50) {
                //remove food from active foods and stop animation
                delete activeFoods[this.foodId];
                clearInterval(this.topInterval); 

                let touchesDog = false;
                if (this.foodX < dogpos && this.foodX + foodSizeW > dogpos) {
                    touchesDog = true;
                } else if (this.foodX > dogpos && this.foodX < dogpos + dogSizeW) {
                    touchesDog = true;
                }

                if (touchesDog === true) {
                    console.log("Yummy!")


                    if(this.isBad == true){
                       createjs.Sound.play("nope")
                        lives--; 
                        if (lives ===0){
                            gameOver()
                        }
                    } else {
                        createjs.Sound.play("yeah")
                        score++;
                        if (score ==10){
                            gameWin()
                        }
                    }
                    
                } else {
                    console.log("oh no!")

                    if(this.isBad == false){
                        lives--; 
                        if (lives ===0){
                            gameOver()
                        }
                    }   
                } 
            }
        }, 5);
    }
    draw(){
        //context.fillStyle = "#f3c";
        //context.fillRect(this.foodX, this.foodY, foodSizeW, foodSizeH);
        context.drawImage(this.image, this.foodX, this.foodY, foodSizeW, foodSizeH);
    }
}



//-----functions----//
function startGame(){
    // ctx.drawImage(kitchen, 0, 0 );
    // ctx.drawImage(dog, dogX, dogY );
    //;
    
    
    setInterval(drawScreen, 20);

    
    foodInterval = setInterval(() => {
        if (gameStatus == "start"){
            addFood();
            }   
        }, 
        foodSpeed
    );

    setInterval(() => {
        if (gameStatus === 'start') {

            clearInterval(clearInterval);

            foodSpeed -= 200;

            foodInterval = setInterval(() => {
                if (gameStatus == "start"){
                    addFood();
                }

            }, foodSpeed);
        }
    },
        5000
    );
}

function gameOver(){
     //alert("Game Over!")
     gameStatus = "over";
     createjs.Sound.stop("background")
     
    createjs.Sound.play("loser")
     //createjs.Sound.play("alarm");
}

function gameWin(){
    //alert("Game Over!")
    gameStatus = "win";
    createjs.Sound.stop("background")
    createjs.Sound.play("win")
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
    context.drawImage(bobo, dogpos, canvas.height- 10- dogSizeH, dogSizeW, dogSizeH);

    for (let foodId in activeFoods){
       let food = activeFoods[foodId];
       food.draw();
    }
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
    context.font = '24px serif';
    //context.fillText('Game Over', canvas.width/2, canvas.height/2);
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

