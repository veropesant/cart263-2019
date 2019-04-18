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

//color codes
let blue = '#6BB7EB';
let red = '#FF5F4D';
let green = '#57D068';
let yellow = '#FFF275';
let orange = '#FF8D2F';
let purple = '#C651C7';
let black= '#000000';
let pink= '#FFA5FD';

let activeColumn=1;

let hoverColor = '#6BB7EB';
let colors = [blue, red, green, yellow, orange, purple, black, pink];
let hihat;
let kick;
let snare;
let sound;
let $keys;
let $colors;
let piano;
let $play;
let $empty;
let $eraser;
let columnLength = 30;
let columnNumber = 30;
let colorLength;
let positionColor = 170;
let position = 20;
let positionLeft= 20;
let idKey = 0;
let playing = false;

let currentId // of the key
let keysSelected = 0; //number of colored keys
let emptyBg = 'rgba(0, 0, 0, 0)';

let timerLength = 20; //for progression bar while playing

let $homePage; //home page before the game starts
let $drawGamePage;
let $writingGamePage;


$(document).ready(function(){

  console.log('ready');
  $homePage = $('#homePage').css('display', 'block');
  $drawGamePage = $('#drawingGame').css('display', 'none');
  $writingGamePage = $('#writingGame').css('display', 'none');
  $('#btnDraw').on('click', initiateDrawGame);
  $('#btnWrite').on('click', initiateWritingGame);
  $('.backToMenu').on('click', confirmBack);

  // kick = new Pizzicato.Sound({
  //   source: 'file',
  //   options: {
  //     path: 'assets/sounds/kick.wav'
  //   }
  // });
  //
  // snare = new Pizzicato.Sound({
  //   source: 'file',
  //   options: {
  //     path: 'assets/sounds/snare.wav'
  //   }
  // });
  //
  // hihat = new Pizzicato.Sound({
  //   source: 'file',
  //   options: {
  //     path: 'assets/sounds/hihat.wav'
  //   }
  // });

  Synth instanceof AudioSynth;
  Synth.setVolume(0.1); //volume is way too loud and creates noise at 100% volume
  var testInstance = new AudioSynth;
  testInstance instanceof AudioSynth;

  testInstance === Synth;

  piano = Synth.createInstrument('piano');


})

function confirmBack(){
  let youSure = confirm('If you go back to the menu your art will be lost...');
  if(youSure == true){
    location.reload();
  }
}
