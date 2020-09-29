let canvas = document.querySelector('canvas');
canvas.style.border = '1px solid black';

let context= canvas.getContext("2d");

// set of variables------
let gameStatus= "splash";
let dogpos = 250;
let dogSizeW= 75;
let dogSizeH= 75;
let nextFoodId = 0;
let activeFoods= {};
let foodSizeW= 25;
let foodSizeH= 25;
let score = 0;
let lives = 3;
let isGameOver= false;

const allFoods= [
    {name:"cucumber", isBad: false, image: "images/cucumber.png"},
    {name:"pumpkin", isBad: false, image: "images/pumpkin.jpeg"},
    {name:"peanut-butter", isBad: false, image: "images/peanut-butter.png"},
    {name:"chocolate", isBad: true, image: "images/chocolate.png"}
]
// images------//




//---------Event Listeners-------------//

document.addEventListener("keydown", (e)=> {
    if (e.keyCode ==37){
        dogpos -=20
    } else if (e.keyCode == 39){
        dogpos +=20
    }

    if (dogpos < 0) {
        dogpos = 0;
    } else if (dogpos > canvas.width -dogSizeW){
        dogpos = canvas.width- dogSizeW;
    }
});

let button= document.getElementById("btn-start");

button.addEventListener("click", (e)=> {
    gameStatus = "start";
    score = 0;
    lives = 3;
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


                if (this.foodX >dogpos && this.foodX < dogpos + dogSizeW){
                    console.log("Yummy!")

                    if(this.isBad == true){
                        lives--; 
                        if (lives ===0){
                            gameOver()
                        }
                    } else {
                        score++;
                    }
                    
                } else {
                    console.log("oh no!")

                    if(this.isBad == false){
                    lives--; 
                    if (lives ===0){
                        gameOver()
                    }}
                
                    
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


//----------animations----------//





//------score------//




//-----functions----//
function startGame(){
    // ctx.drawImage(kitchen, 0, 0 );
    // ctx.drawImage(dog, dogX, dogY );

    

    setInterval(drawScreen, 20);

    setInterval(() => {
    if (gameStatus == "start"){
        addFood();
         }   
    }, 2000);
}

function gameOver(){
     alert("Game Over!")
     gameStatus = "over";
}

function drawScreen(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (gameStatus == "splash"){
        drawSplash()
    } else if (gameStatus == "start"){
        drawGame()
    } else if (gameStatus=="over"){
        drawOver()
    }
}

function drawSplash(){
    context.fillStyle="#000";
    context.font = '24px serif';
    context.fillText('Im a splash', canvas.width-150, 50);
}

function drawGame(){
    context.fillStyle = "#f00";
    context.fillRect(dogpos, canvas.height- 10- dogSizeH, dogSizeW, dogSizeH);
    for (let foodId in activeFoods){
       let food = activeFoods[foodId];
       food.draw();
    }
    context.fillStyle="#000";
    context.font = '24px serif';
    context.fillText('Score:' + score, canvas.width-150, 50);

    context.fillStyle="#000";
    context.font = '24px serif';
    context.fillText('Lives:' + lives, 30, 50);
}

function drawOver(){
    context.fillStyle="#000";
    context.font = '24px serif';
    context.fillText('Im dead', canvas.width-150, 50);
}
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

//------splash screen--//




//------start the game----//


//------game over screen-----//



//------collision-----//


//-----start game----//
startGame();

//window.addEventListener("load", splash)