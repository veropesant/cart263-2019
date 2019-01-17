"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

let avatar;
let food;

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
  food = new Food(random(0,width),random(0,height), 20, 60, 5, 5);
}


// draw()
//
// Description of draw()

function draw() {
  background('black');
  if(avatar.active){
    avatar.display();
    avatar.update();
    if (avatar.collide(food)) {
      avatar.eat(food);
    }
    food.display();
  }

}
