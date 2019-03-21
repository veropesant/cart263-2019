"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let frequencies =[
  220.00,
  "",
  246.94,
  138.59,
  146.83,
  "",
  164.81,
  185.00,
  207.65
]
let pattern = [
  'o',
  'o',
  'o',
  'o',
  'o',
  'o',
  'o',
  'o'
]
let patternIndex=0;
let randFrequency;
let synth;
let kick;
let snare;
let hihat;
// preload()
//
// Description of preload

function preload() {

}


// setup()
//
// Description of setup

function setup() {

  synth = new Pizzicato.Sound({
    source: 'wave',
  });

  kick = new Pizzicato.Sound('../assets/sounds/kick.wav');

  snare = new Pizzicato.Sound('../assets/sounds/snare.wav');

  hihat = new Pizzicato.Sound('../assets/sounds/hihat.wav');

}


// draw()
//
// Description of draw()

function draw() {

}

function mousePressed(){
  if(!randFrequency){
    setInterval(playNote,500);
    setInterval(playNote,500);
    setInterval(playDrums,250);
  }
}

function playNote(){
  randFrequency = random(frequencies);
  synth.frequency = randFrequency;
  synth.play();
}

function playDrums(){
  let symbols = pattern[patternIndex];

  if(symbols.indexOf('x') !== -1){
    kick.play();
  }
  if(symbols.indexOf('o') !== -1){
    snare.play();
  }
  if(symbols.indexOf('*') !== -1){
    hihat.play();
  }

  patternIndex++;
  if(patternIndex == pattern.length){
    patternIndex=0;
  }
}
