/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

const AVATAR_SHRINK_AMOUNT = 0.25;
const AVATAR_GROW_AMOUNT = 5;
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
  tx:0,
  ty:o,
  size:70,
  vx:0,
  vy:0,
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
 donuts.x = random(0, width);
 donuts.y = random(0, height);
 donuts.tx = random(0,1000);
 donuts.ty = random(0,1000);
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
  donuts.x=noise()
}
function displayAvatar(){
  push();
  fill(avatar.color);
  ellipse(avatar.x, avatar.y, avatar.currentSize, avatar.currentSize);
  pop();
}

function displayDonuts(){

  donuts.x = width * noise(donuts.tx);
  donuts.y = width * noise(donuts.ty);

  donuts.tx+= 0.01;
  donuts.ty+= 0.01;

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
