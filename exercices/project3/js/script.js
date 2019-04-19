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



let $homePage; //home page before the game starts
let $drawGamePage;
let $writingGamePage;

//instruments
let $instrumentsDraw;
let $instrumentsWrite;
let piano;
let acoustic;
let organ;
let edm;
let currentInstrumentId;
let currentInstrument;

//which game is being played
let write = false;
let draw = false;


$(document).ready(function(){

  console.log('ready');
  $homePage = $('#homePage').css('display', 'block');
  $drawGamePage = $('#drawingGame').css('display', 'none');
  $writingGamePage = $('#writingGame').css('display', 'none');
  initiateInstruments();
  $('#btnDraw').on('click', function(){
    initiateDrawGame();
  });
  $('#btnWrite').on('click', function(){
    initiateWritingGame();
  });
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

  //Code and library found online
  Synth instanceof AudioSynth;
  Synth.setVolume(0.01); //volume is way too loud and creates noise at 100% volume
  var testInstance = new AudioSynth;
  testInstance instanceof AudioSynth;

  testInstance === Synth;

  piano = Synth.createInstrument('piano');
  acoustic = Synth.createInstrument('acoustic');
  organ = Synth.createInstrument('organ');
  edm = Synth.createInstrument('edm');
  //end of code found online

  //sets the default instrument to piano
  currentInstrument = piano;

})

function confirmBack(){
  let youSure = confirm('If you go back to the menu your art will be lost...');
  if(youSure == true){
    location.reload();
  }
}

function initiateInstruments(){
  //eventListener on instrument buttons


  $instrumentsDraw = $('#instrumentChoiceDraw .instruments');

  $instrumentsWrite = $('#instrumentChoiceWrite .instruments');


  for(let i=0; i<=$instrumentsDraw.length-1; i++){
    let currentId = $instrumentsDraw[i].id;
    $('#'+currentId).on('click', setInstrument);
  }

  for(let i=0; i<=$instrumentsWrite.length-1; i++){
    let currentId = $instrumentsWrite[i].id;
    $('#'+currentId).on('click', setInstrument);
  }

}
function setInstrument(){
  for(let i=0; i<=$instrumentsWrite.length-1; i++){
    $($instrumentsWrite[i]).css('background-color', 'black');
  }
  for(let i=0; i<=$instrumentsDraw.length-1; i++){
    $($instrumentsDraw[i]).css('background-color', 'black');
  }
  currentInstrumentId = $(this)[0].id;
  $(this).css('background-color', 'red');
  if(currentInstrumentId.includes('piano')){
    currentInstrument=piano;
  }else if(currentInstrumentId.includes('acoustic')){
    currentInstrument=acoustic;
  }else if(currentInstrumentId.includes('organ')){
    currentInstrument=organ;
  }else if(currentInstrumentId.includes('edm')){
    currentInstrument=edm;
  }
}
