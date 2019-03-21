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
  164.81,
  185.00,
  207.65
]
let pattern = [
  'ox',
  'o',
  'o*',
  'ox',
  'ox',
  'x',
  'o',
  '*'
]
let patternIndex=0;
let timer;
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
  createCanvas(710, 400);

  var flanger = new Pizzicato.Effects.Flanger({
      time: 0.45,
      speed: 0.2,
      depth: 0.1,
      feedback: 0.1,
      mix: 0.5
  });
  var stereoPanner = new Pizzicato.Effects.StereoPanner({
    pan: 0.0
  });
  var ringModulator = new Pizzicato.Effects.RingModulator({
    speed: 30,
    distortion: 1,
    mix: 0.3
});



  synth = new Pizzicato.Sound({
    source: 'wave',
  });

  kick = new Pizzicato.Sound('../assets/sounds/kick.wav');

  snare = new Pizzicato.Sound('../assets/sounds/snare.wav');

  hihat = new Pizzicato.Sound('../assets/sounds/hihat.wav');


  synth.addEffect(ringModulator);
  kick.addEffect(stereoPanner);
  snare.addEffect(stereoPanner);
  hihat.addEffect(stereoPanner);

}


// draw()
//
// Description of draw()

function draw() {
  background('magenta');
  textAlign(CENTER);
  textFont('arial');
  fill('#ffffff');
  text("CLICK!\nand sound on.", width/2, height/2);

}

function mousePressed(){
  if(!randFrequency){
    playNote();
    setInterval(playDrums,200);
  }
}

function playNote(){

  randFrequency = random(frequencies);
  if(randFrequency==""){
    synth.stop();
  }else{
    synth.frequency=randFrequency;
    synth.play();
  }

  setTimeout(function(){
    playNote();
  },random(50,250));


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
