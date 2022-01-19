
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

var dog;

var edge , trex_collid;

function preload(){
  trex_running = loadAnimation("Alex3.png");
  trex_collided = loadAnimation("Alex1.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  //jumpSound = loadSound("jump.mp3");
 // dieSound = loadSound("die.mp3");
 // checkPointSound = loadSound("checkPoint.mp3");
dog =loadImage("dog1.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  var message = "This is a message";
 console.log(message)

 //ground = createSprite(200,180,400,20);
 ground = createSprite(displayWidth-0,displayHeight-600,400,20);
 ground.addImage("ground",groundImage);
 ground.x = ground.width /2;
// console.log(ground.x);
// console.log(ground.y);
 

  trex = createSprite(displayWidth-1200,displayHeight-700,100,100);
  trex.addAnimation("running", trex_running);
 console.log(trex.x);
 console.log(trex.y);
  trex_collid = createSprite(trex.x,trex.y,100,100);
  trex_collid.scale=0.4
  trex_collid.addAnimation("collided", trex_collided);

  trex.scale = 0.2;
 
https://atharva-bhosale.github.io/Infinite-Pig-run/
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,displayHeight-590,800,10);
  invisibleGround.visible = false;
  
  edge=createSprite(0,-50,2000,10);

  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();


  
  trex.setCollider("rectangle",0,-50,300,300);
  trex.debug = false;
  
  score = 0;
  
}

function draw() {
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  trex_collid.visible=false;
  trex.bounceOff(edge);
  
  if(gameState === PLAY){
    text("Tap On Screen To Jump",40,30)

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
      // checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    for(var i = 0 ; i < touches.length ; i++ && trex.y >= 100){
      trex.velocityY = -12;
    }
   // if(keyDown("space")&& trex.y >= 100) {
        
       // jumpSound.play();
    //}
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY = -12;
      //  jumpSound.play();
        gameState = END;
       // dieSound.play()
      
    }
  }
   else if (gameState === END) {
    fill("red")
     textSize(20)
    text("Tap To Continue",220,140)
      gameOver.visible = true;
      restart.visible = false;
      trex_collid.visible=true;
     //change the trex animation
      trex.changeAnimation("collided", trex_collided);
    trex_collid.x=trex.x
    trex_collid.y=trex.y
    trex.visible=false;
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0); 
     
 
    
      for(var i = 0 ; i < touches.length ; i++){
        
        reset();
      }
    
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  



  drawSprites();
}

function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
  trex.visible=true
obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();
trex.changeAnimation("running", trex_running);
score=0;
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,displayHeight-1020,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;       
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.6;
    obstacle.lifetime = 300;
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,displayHeight-800,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

