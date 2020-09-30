**Hungie Games**
*Description*
Are you hungie? It's snack time for Obi the dog and he is very hungie! As the foods fall down, you have to catch the good foods (peanut butter, cucumber and pumpkin) and avoid the bad (chocolate). The game ends when 3 good foods pass by you or when you catch chocolate.

Obi needs lots of snacks and the more he eats the faster you need to feed him! After every 5 foods, the speed will increase. You win the game after you reach 25 treats caught!

**MVP (DOM - CANVAS)**

one dog that will move horizontally
foods will fall randomly from the top of the screen -foods include: pumpkin, cucumber, peanut butter
letting 3 good foods pass by the dog will result in losing the game
increasing speed of food falling every 5 foods dropped
Win the game after catching 25 foods

**Backlog**

Adding bad foods that will make you lose the game immediately -bad food: chocolate
Data structure
Classes and methods definition.

**index.js**

buildSplashScreen(){}

buildGameScreen(){}

buildGameOverScreen(){}

game (){}

peanutButterLoop(){}

cucumberLoop(){}

pumpkinLoop(){}

chocolateLoop(){}

checkCollisions(){}

clearCanvas(){}

drawCanvas(){}

GameOver(){}

dog.js

dog() {this.x; this.y; this.direction; this.size}

draw() {}

move() {}

peanut butter.js

peanutButter(){this.x; this.y; this.direction; this.size}

draw(){}

move(){}

cucumber.js

cucumber(){this.x; this.y; this.direction; this.size}

draw(){}

move(){}

pumpkin.js

pumpkin(){this.x; this.y; this.direction; this.size}

draw(){}

move(){}

chocoate.js

chocolate(){this.x; this.y; this.direction; this.size}

draw(){}

move(){}

States & Transitions
Definition of the different states and their transition (transition functions)

splashScreen

gameScreen

gameoverScreen

winScreen

Task

main - buildDom

main - buildSplashScreen

main - addEventListener

main - buildGameScreen

main - buildGameOverScreen

game - startLoop

game - buildCanvas

game - updateCanvas

game - drawCanvas

cucumber - draw

cucumber - move

pumpkin - draw

pumpkin- move

peanut butter - draw

peanut butter- move

chocolate- draw

chocolate- move

game - addFood

dog - draw

dog - move

game - checkCollision

game - GameOver

game - addEventListener

**Links**
*Trello*
https://trello.com/b/SkBi1kyn/project-1-hungie-games

*Git*
https://kmstamey.github.io/project-number-1/

*Slides*
https://docs.google.com/presentation/d/12VG6pLm0QCxZ-7aoaFV8UdkOGENZbcyY54SNcFZt5oY/edit?usp=sharing