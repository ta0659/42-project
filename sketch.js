var backImage,backgr;
var monkey, player_running;
var ground,ground_img;
var bananaImage,obstacleImage;
var gameover, gameoverImg;
var moving;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  gameoverImg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);

  score=0;
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",player_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameover = createSprite(400,200);
  gameover.addImage(gameoverImg);

  FoodGroup = new Group();
  obstaclesGroup = new Group();

 score=0;
  
}

function draw() { 

  background(0);

  if(gameState===PLAY){
  
  gameover.visible=false;

  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }

  spawnFood();
 spawnObstacles()

   
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);

    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+2;
      monkey.scale += +0.1;
    }

  if(obstaclesGroup.isTouching(monkey)){
    gameState=END;
  }
}

 if(gameState===END){

  gameover.visible=true;

backgr.velocityX=0;
monkey.visible=false;

FoodGroup.destroyEach();
obstaclesGroup.destroyEach();

textSize(30);
fill(255);
text("Game Over!", 300,200)

 }
// score.diaplay();
drawSprites();
 textSize(20);
 fill(255)
 text("Score: "+score,50,50)
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 80 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}