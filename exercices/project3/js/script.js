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
let colors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple', 'black','pink'];
let hihat;
let kick;
let snare;
let sound;
let $keys;
let $colors;
let piano;

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

  Synth instanceof AudioSynth; // true

  var testInstance = new AudioSynth;
  testInstance instanceof AudioSynth; // true

  testInstance === Synth; // true

  piano = Synth.createInstrument('piano');


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
    hoverColor=colors[1-1];
    setHoverColor();
    piano.play('C', 4, 2);
      break;
    case 'color2':
    hoverColor=colors[2-1];
    setHoverColor();
    piano.play('D', 4, 2);
      break;
    case 'color3':
    hoverColor=colors[3-1];
    setHoverColor();
    piano.play('E', 4, 2);
      break;
    case 'color4':
    hoverColor=colors[4-1];
    setHoverColor();
    piano.play('F', 4, 2);
      break;
    case 'color5':
    hoverColor=colors[5-1];
    setHoverColor();
    piano.play('G', 4, 2);
      break;
    case 'color6':
    hoverColor=colors[6-1];
    setHoverColor();
    piano.play('A', 4, 2);
      break;
    case 'color7':
    hoverColor=colors[7-1];
    setHoverColor();
    piano.play('B', 4, 2);
      break;
    case 'color8':
    hoverColor=colors[8-1];
    setHoverColor();
    piano.play('C', 5, 2);
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
    piano.play('C', 4, 2);
      break;
    case 'red':
    piano.play('D', 4, 2);
      break;
    case 'green':
    piano.play('E', 4, 2);
      break;
    case 'yellow':
    piano.play('F', 4, 2);
      break;
    case 'orange':
    piano.play('G', 4, 2);
      break;
    case 'purple':
    piano.play('A', 4, 2);
      break;
    case 'black':
    piano.play('B', 4, 2);
      break;
    case 'pink':
    piano.play('C', 5, 2);
      break;
  }

}
