"use strict";

/*****************

Drawing music is now a thing
Véronique Pesant

So the goal of this project is to create a sort of grid canvas
on which the player can create various patterns and then listen
to them. That's right. Listen. Each row is going to represent a
different note, and the different colors are going to represent
the pitch. That might change...but for now it's the idea.

This first exercice though is simply me trying to create a tool
to select the colors and add a sound when clicked.

******************/
//VARIABLES
// Time for one note
const NOTE_TEMPO = 500;
// Time for one beat
const DRUM_TEMPO = 250;
// Attack time for a note (in seconds)
const ATTACK = 0.1;
// Release time for a note (in seconds)
const RELEASE = 0.1;

let hoverColor = 'blue';
let colors = ['blue', 'red', 'green', 'yellow', 'orange'];
let hihat;
let kick;
let snare;
let sound;
let $keys;
let $colors;

$(document).ready(function(){
  console.log('ready');
  $colors = $('.colors');
  $keys = $('.keys');
  let positionColor = 50;
  let position = 50;

  for(let i=0; i<=$colors.length;i++){
    $('#color'+(i+1)).css('left', positionColor+'px');
    $('#color'+(i+1)).css('background-color', colors[i]);
    $('#color'+(i+1)).on('click', selectColor);
    positionColor += 50;
  }

  for(let i=0; i<=$keys.length;i++){
    $('#key'+(i+1)).css('left', position+'px');
    $('#key'+(i+1)).css('background-color', '');
    $('#key'+(i+1)).on('click', selectSquare);
    position += 80;
  }


  kick = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/kick.wav'
    }
  });

  snare = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/snare.wav'
    }
  });

  hihat = new Pizzicato.Sound({
    source: 'file',
    options: {
      path: 'assets/sounds/hihat.wav'
    }
  });

})

function setHoverColor(){
  console.log(hoverColor);
  $keys.hover(function(){
    $(this).css('border', '2px solid '+hoverColor);
    console.log($(this).css('background'));
  });
  $keys.mouseout(function(){

    $(this).css('border', '');

  });

}

function selectColor(){
  console.log(this);
  switch (this.id) {
    case 'color1':
    hoverColor='blue';
    setHoverColor();
    kick.play();
      break;
    case 'color2':
    hoverColor='red';
    setHoverColor();
    hihat.play();
      break;
    case 'color3':
    hoverColor='green';
    setHoverColor();
    snare.play();
      break;
  }
}

function selectSquare(){
  let currentId = this.id;
  if(!$(this).hasClass('selected')){
      $(this).addClass('selected');
  }
  $(this).css('background-color', hoverColor);
  switch (hoverColor) {
    case 'blue':
    kick.play();
      break;
    case 'red':
    hihat.play();
      break;
    case 'green':
    snare.play();
      break;
  }

}
