var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var SurvivalTime
var monkeyI;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  monkeyI = loadImage("sprite_1.png")
  SurvivalTime = 0
  
}



function setup() {
  createCanvas(600,300);
  
  monkey = createSprite(80,180,20,50);
  monkey.addAnimation("movimg", monkey_running);
  
  monkey.scale = 0.1;
 
    
  ground = createSprite(200,230,600,20);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  
    obstacleGroup = createGroup();
    bananaGroup = createGroup();
 
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 monkey.debug = true
  
}


function draw() {
  background(180);
   
    if(gameState === PLAY){
    if (ground.x > 0){
      ground.x = ground.width/2;
    }
    
    monkey.collide(ground);
  
  SurvivalTime = SurvivalTime + Math.round(getFrameRate()/60);
  
     if(keyDown("space")&& monkey.y >= 180) {
        monkey.velocityY = -13;
     }
  
     monkey.velocityY = monkey.velocityY + 0.6
      
      spawnbanana();
      spawnobstacle();
      
        if(monkey.isTouching(obstacleGroup)){
        gameState = END;
        }
        if(monkey.isTouching(bananaGroup)){
        bananaGroup.destroyEach();
        }  
  
    }
  
     else if (gameState === END) {
     
     
      ground.velocityX = 0;
      monkey.velocityX = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);  
       
       
   }
  
  
  drawSprites();
  fill("black");
  textSize(15);
  text("SurvivalTime: "+ SurvivalTime, 240,70);
      
}


function spawnbanana() {
  //write code here to spawn the bananas
  if (frameCount % 150 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    bananaGroup.add(banana);
  
  }
}



function spawnobstacle() {
  //write code here to spawn the bananas
  if (frameCount % 200 === 0) {
    var obstacle = createSprite(600,120,40,10);
    obstacle.y = Math.round(random(200,200));
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    obstacleGroup.add(obstacle);
  
  }
}
