/*****************

Title of Project
Véronique Pesant

First assignment: The circle eater

******************/

const AVATAR_SHRINK_AMOUNT = 0.25;
const AVATAR_GROW_AMOUNT = 10;
const DONUTS_MAX_SPEED = 10;
let avatar = {
  x:0,
  y:0,
  currentSize:60,
  maxSize:60,
  isAlive:true,
  color:'#565CFF',
  score:0
};

let donuts = {
  x:0,
  y:0,
  size:70,
  vx:5,
  vy:5,
  velChange:true,
  color:'#FFC60D'
};

let text = {
  x:0,
  y:0,
  size:20,
  color:'blue',
  content:''
};
// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {
 createCanvas(700, 500);
 positionFood();
 noCursor();

}


// draw()
//
// Description of draw()

function draw() {
  background('black');
  textAlign(CENTER);
  avatar.x = mouseX;
  avatar.y = mouseY;

  if(avatar.isAlive==true){

    ellipseMode(CENTER);
    handleCollision();
    updateAvatar();
    displayAvatar();
    displayDonuts();
    updateDonuts();
    if(donuts.velChange==true){
      changeVelocity();
    }
  }else{
    console.log('congrats! You ate '+ avatar.score+' donuts');
  }





}
function updateAvatar(){

  if(avatar.currentSize > 0){
      avatar.currentSize -= AVATAR_SHRINK_AMOUNT;
  }else{
    text.content = "You lost.";
    avatar.isAlive=false;
  }
  avatar.currentSize=constrain(avatar.currentSize, 0, avatar.maxSize);


}

function updateDonuts(){
  if(donuts.x+donuts.size/2 < 0 || donuts.x+donuts.size/2 > width){
    donuts.vx = -donuts.vx;
  }
  if(donuts.y+donuts.size/2 < 0 || donuts.y+donuts.size/2 > height){
    donuts.vy = -donuts.vy;
  }
  donuts.x+=donuts.vx;
  donuts.y+=donuts.vy;
}

function changeVelocity(){
  console.log('change: vx - '+ donuts.vx+' vy - '+donuts.vy);
  donuts.velChange=false;
  setTimeout(function(){
    donuts.vx=random(-DONUTS_MAX_SPEED, DONUTS_MAX_SPEED);
    donuts.vy=random(-DONUTS_MAX_SPEED, DONUTS_MAX_SPEED);
    donuts.velChange=true;
  }, 3000);
}

function displayAvatar(){
  push();
  fill(avatar.color);
  ellipse(avatar.x, avatar.y, avatar.currentSize, avatar.currentSize);
  pop();
}

function displayDonuts(){
  push();
  fill(donuts.color);
  ellipse(donuts.x, donuts.y, donuts.size, donuts.size);
  pop();
}

function handleCollision(){
  let d = dist(avatar.x, avatar.y, donuts.x, donuts.y);

  if(d<avatar.currentSize/2 + donuts.size/2){
    avatar.currentSize=constrain(avatar.currentSize+AVATAR_GROW_AMOUNT, 0, avatar.maxSize);

    avatar.score+=1;
    console.log(avatar.score);
    donuts.x = random(0, width);
    donuts.y = random(0, height);
  }
}

// positionFood()
//
// Set the food's position properties to random numbers within the canvas dimensions
function positionFood() {
  donuts.x = random(0,width);
  donuts.y = random(0,height);
}
