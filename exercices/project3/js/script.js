"use strict";

/*****************
FINAL
Drawing music is now a thing
Véronique Pesant

So the goal of this project is to create a sort of grid canvas
on which the player can create various patterns and then listen
to them. That's right. Listen. Each color is going to represent a
different note, and the different rows are going to represent
the octave.
In this final version of the project, there is two versions of the
game the player can choose from. The second game is similar to the first,
but instead of drawing, the player can use the text area to write any
text they want and then listen to it. In that version, each letter and
punctuation is a note, and depending on where they are in the alphabet
the octave increases.

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
let $drawGamePage; //page for the drawing game
let $writingGamePage; //page for the writing game

//instruments
let $instrumentsDraw;
let $instrumentsWrite;
let piano;
let acoustic;
let organ;
let edm;
let currentInstrumentId;
let currentInstrument;



//when the document is loaded
$(document).ready(function(){
  //display the home page and hides the two games
  $homePage = $('#homePage').css('display', 'block');
  $drawGamePage = $('#drawingGame').css('display', 'none');
  $writingGamePage = $('#writingGame').css('display', 'none');

  //create the instrument choice bar in both games
  initiateInstruments();

  //if the player chooses to draw, the function to initiate it is called and vice versa
  $('#btnDraw').on('click', function(){
    initiateDrawGame();
  });
  $('#btnWrite').on('click', function(){
    initiateWritingGame();
  });

  //creates a event listener on the menu button and calls a function
  //that confirms the intention of the player
  $('.backToMenu').on('click', confirmBack);


  //Code and library found online to crete sounds and play instruments
  Synth instanceof AudioSynth;
  Synth.setVolume(0.2); //volume is way too loud and creates noise at 100% volume
  var testInstance = new AudioSynth;
  testInstance instanceof AudioSynth;

  testInstance === Synth;
  Synth.setSampleRate(10000);
  piano = Synth.createInstrument('piano'); //creates the piano to use later
  acoustic = Synth.createInstrument('acoustic');// " " acoustic
  organ = Synth.createInstrument('organ');// " " organ
  edm = Synth.createInstrument('edm');// " " edm
  //end of code found online

  //sets the default instrument to piano
  currentInstrument = piano;

})

//this is the function to confirm the intention of going back to the home
//because progress will be lost if you do
function confirmBack(){
  let youSure = confirm('If you go back to the menu your art will be lost...');
  //if the user is sure, reload the page (bringing you back to the menu)
  if(youSure == true){
    location.reload();
  }
}

function initiateInstruments(){
  //eventListener on instrument buttons

  //creates 2 different sets of instruments depending in the page
  $instrumentsDraw = $('#instrumentChoiceDraw .instruments');
  $instrumentsWrite = $('#instrumentChoiceWrite .instruments');

  //adds event listeners on all the instruments and calls
  //a function to set the instrument when one of them is clicked
  for(let i=0; i<=$instrumentsDraw.length-1; i++){
    let currentId = $instrumentsDraw[i].id;
    $('#'+currentId).on('click', setInstrument);
  }

  for(let i=0; i<=$instrumentsWrite.length-1; i++){
    let currentId = $instrumentsWrite[i].id;
    $('#'+currentId).on('click', setInstrument);
  }

}

//sets the currentInstrument variable to the one that was clicked
function setInstrument(){
  //sets all the instruments to black in both pages...
  for(let i=0; i<=$instrumentsWrite.length-1; i++){
    $($instrumentsWrite[i]).css('background-color', 'black');
  }
  for(let i=0; i<=$instrumentsDraw.length-1; i++){
    $($instrumentsDraw[i]).css('background-color', 'black');
  }
  currentInstrumentId = $(this)[0].id;

  //...then sets the selected one to red
  $(this).css('background-color', 'red');

  //and finally set the current instrument variable
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
