var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mario, mario_running, mario_collided;
var ground, invisibleGround, groundImage;

var coinGroup, coinImage;
var obstaclesGroup, obstacle1, obstacle2,obstacle3;
var score=0;


var gameOver, restart;


function preload(){
  mario_running = loadAnimation("Capture1.png","Capture3.png","Capture4.png");
  mario_collided = loadAnimation("mariodead.png");
  groundImage = loadImage("backg.jpg");
  
  coinImage = loadImage("coin.png");
  obstacle1 = loadImage("obstacle2.png");
  obstacle2=loadImage("obstacle1.png");
  obstacle3 = loadImage("obstacle3.png");
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup(){
  createCanvas(600,400)
  ground=createSprite(300,100,100,100);
  ground.addImage(groundImage);
  invisibleground=createSprite(100,270,100,10);
  invisibleground.visible=false;
  ground.scale=0.8;
  mario=createSprite(100,210,50,50);
 mario.addAnimation("running", mario_running);
  mario.scale=0.8;
  
obstaclesGroup= new Group ();
  coinGroup=new Group ;
}
function draw(){
  background("blue");
    textSize(20);
  fill(255);
    text("SCORE : "+score,50,380);
  
  if(gameState==PLAY){
    spawnObstacles(); 
    spawncoins();
  if(coinGroup.isTouching(mario)){
    score=score+10;
  }
 mario.collide(invisibleground); 
  if(ground.x<0){
    ground.x=300;
  }
 if(keyDown("space")){
   mario.velocityY=-8
 }
 mario.velocityY=mario.velocityY+0.8;
     ground.velocityX=-6;
    if(obstaclesGroup.isTouching(mario)){
      gameState=END;
    }
  }
  else if(gameState== END){
    ground.velocityX=0;
    obstaclesGroup.setVelocityEach(0,0);
    coinGroup.setVelocityEach(0,0);
    mario.velocityY=0;
    mario.addAnimation("running",mario_collided);
    mario.scale=0.6;
    obstaclesGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);
  }

  drawSprites();
}

function spawnObstacles(){
  if(frameCount%60==0){
  obstacles=createSprite(600,240,10,10);
    obstacles.velocityX=-6;
    var rand=Math.round(random(1,3));
    switch(rand){
      case 1: obstacles.addImage(obstacle1)
       break; 
       case 2: obstacles.addImage(obstacle2)
       break; 
       case 3: obstacles.addImage(obstacle3)
       break; 
    }
    obstaclesGroup.add(obstacles);
    obstacles.lifetime=150;
    obstacles.scale=0.3;
  }
}
function spawncoins(){
  if(frameCount%60==0){
    coin=createSprite(600,140,10,10);
    coin.y=Math.round(random(60,150));
    coin.addImage(coinImage);
    coin.scale=0.1;
    coin.velocityX=-6;
    coin.lifetime=150;
    coinGroup.add(coin);
  }
}