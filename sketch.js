var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;

var jungle, jungleImage;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
 jungleImage = loadImage("jungle.jpg");
 
}


function setup() {
  createCanvas(600, 200);
  
  jungle= createSprite(50,160,20,50);
  jungle.addImage(jungleImage);

  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running", monkey_running);
  
  monkey.scale = 0.1;
 
  
 
  ground = createSprite(300,200,600,20);
   monkey.collide(ground); 
 
  obstaclesGroup = createGroup();
  bananaGroup = createGroup();

  
 monkey.setCollider("circle",0,0,40);
  //trex.debug = true                          
  
  score = 0;
  
}

function draw() {

  
  background("white");
  //displaying score
  text("Score: "+ score, 500,50);

  
  camera.position.y=monkey.y;
  
   if (bananaGroup.isTouching(monkey)){    
  
     score=score+1;
     
     bananaGroup.destroyEach();
     
  }
  
  if(gameState === PLAY){
    
    if(keyDown("space")){
        monkey.velocityY = -12;
  
  }
    
     monkey.collide(ground); 
   
    //jump when the space key is pressed
  }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
  if(keyDown("space")&& monkey.y >= 150) {
        monkey.velocityY = -12;
  }
  
   if (gameState === END) {
    monkey.velocityY = 0;
    obstaclesGroup.setLifetimeEach(-1);
     
   obstaclesGroup.setVelocityXEach(0);
   bananaGroup.setVelocityXEach(0);    
  
  }
   drawSprites();
  if (obstaclesGroup.isTouching(monkey)){    
    monkey.destroy();   
      stroke("yellow");
     textSize(30);
   text ("GAME OVER",200,200)
   gameState=END; 
  }

}


function reset(){
  
  gameState=PLAY;
  
  monkey.changeAnimation("running", monkey_running);
  
  bananaGroup.destroyEach();
   obstaclesGroup.destroyEach();

  score=0;
}


function spawnObstacles(){
 if (frameCount % 140 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -3;
   obstacle.addImage(obstaceImage)
     
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.scale=0.1;
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
   banana.velocityX = -3;
    
     //assign lifetime to the variable
   banana.lifetime = 200;
    
    //adjust the depth
   banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
}