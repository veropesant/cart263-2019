"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let avatar;
let food=[];

// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {
  createCanvas(500,500);
  avatar = new Avatar(0,0,50,0.5);
  for(let i=0; i<5; i++){
    food.push(new Food(random(0,width),random(0,height), 20, 60, 5, 5));
  }

}


// draw()
//
// Description of draw()

function draw() {
  background('black');
  push();
  fill(255);
  text('Score: ' + avatar.score, 20, 20);
  pop();
  if(avatar.active){
    avatar.display();
    avatar.update();
    for(let i=0; i<food.length;i++){
      food[i].display();
      food[i].update();
      if(food[i].active){
        food[i].changeVelocity();
      }
      if (avatar.collide(food[i])){
        avatar.eat(food[i]);
      }
    }
  }

}
