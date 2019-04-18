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

////////////START OF DRAWING GAME SCRIPT////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////

function initiateDrawGame(){
  $homePage = $('#homePage').css('display', 'none');
  $drawGamePage = $('#drawingGame').css('display', 'block');


  colorLength = colors.length-1;
  // $colors = $('.colors');

  //add event listener to buttons
  $play = $('#play-button');
  $empty = $('#empty');
  $eraser = $('#eraser');
  $play.on('click', playMusic);
  $empty.on('click', confirmEmpty);
  $eraser.on('click', selectColor);

  for(let i=0; i<=colorLength;i++){
    let color = "<div class='colors' id='color"+(i+1)+"'></div>"
    $('#colorSelector').append(color);
    $('#color'+(i+1)).css('left', positionColor+'px');
    $('#color'+(i+1)).css('background-color', colors[i]);
    $('#color'+(i+1)).on('click', selectColor);
    positionColor += 50;
  }

  for(let j=0; j<columnNumber; j++){
    $("#keyboard").append("<div class='columns' id='column"+(j+1)+"'></div>");
    $("#column"+(j+1)).css('left',positionLeft+'px');
    position=0;

    for(let i=0; i<columnLength;i++){
      let $key = "<div class='keys' id='"+(idKey+1)+"'></div>";
      $("#column"+(j+1)).append($key);
      if(j === columnLength-1){
        $('#'+(idKey+1)).css('border-right', '1px solid black');
      }else{
        $('#'+(idKey+1)).css('border-right', 'none');
      }

      $('#'+(idKey+1)).css('top', position+'px');
      $('#'+(idKey+1)).css('background-color', '');
      $('#'+(idKey+1)).on('click', selectSquare);
      position += 21;
      idKey++;
    }

    positionLeft += 21;

  }
}

function setHoverColor(){
  $keys = $('.keys');
  $keys.hover(function(){
    $(this).css('border', '2px solid '+hoverColor);
  });
  $keys.mouseout(function(){
    if($(this)[0].id >= 871){
      $(this).css('border', '');
      $(this).css('border-right', '1px solid black');
    }else{

      $(this).css('border', '');
      $(this).css('border-right', 'none');
    }


  });

}

function selectColor(){
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
    case 'eraser':
    hoverColor='#ffffff';
    setHoverColor();
      break;
  }
}

function selectSquare(){
  currentId = this.id;
  let currentBg = $(this).css('background-color')
  if(!$(this).hasClass('selected')){
      $(this).addClass('selected');
  }
  if(hoverColor == '#ffffff' && currentBg != emptyBg){
    $(this).css('background-color', emptyBg);
    if(keysSelected>0){
      keysSelected -=1;
    }
  }else if(hoverColor!='#ffffff'){
    $(this).css('background-color', hoverColor);
    keysSelected+=1;
  }

  playNote(hoverColor);

}

function playNote(colorToPlay){
  switch (colorToPlay) {
    case blue:
    piano.play('C', 4, 2);
      break;
    case red:
    piano.play('D', 4, 2);
      break;
    case green:
    piano.play('E', 4, 2);
      break;
    case yellow:
    piano.play('F', 4, 2);
      break;
    case orange:
    piano.play('G', 4, 2);
      break;
    case purple:
    piano.play('A', 4, 2);
      break;
    case black:
    piano.play('B', 4, 2);
      break;
    case pink:
    piano.play('C', 5, 2);
      break;
  }
}

function playMusic(){

  if(keysSelected>0){
    console.log('play')
    let arrayKey = $('#column'+activeColumn).children();

    $('#timer').css('width', timerLength + 'px');

    for(let i=1; i<=arrayKey.length-1; i++){
      let colorNotconverted = $("#"+arrayKey[i-1].id).css('background-color');
      let keyColor = rgb2hex($("#"+arrayKey[i-1].id).css('background-color'));
      if(colorNotconverted != "rgba(0, 0, 0, 0)"){
        playNote(keyColor.toUpperCase());
      }
    }
    setTimeout(function(){
      if(activeColumn<=columnNumber){
        activeColumn+=1;
        timerLength+=20;
        playMusic();
      }else{
        activeColumn=1;
        timerLength=0;
        $('#timer').css('width', timerLength + 'px');

      }
    },300)
  }
}

//This function was a code found online to convert rgb() values in hex values
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}
//end of code found online


function confirmEmpty(){
  if(keysSelected>0){
    let confirmation = confirm('Do you really want to erase your drawing?');
    if( confirmation == true){
      emptyGrid();
    }
  }
}

function emptyGrid(){
  let currentColumn=1;
  keysSelected=0;
  for(let j=0; j<=columnNumber-1; j++){
    let arrayKey = $('#column'+currentColumn).children();
    for(let i=1; i<=arrayKey.length-1; i++){
      let colorNotconverted = $("#"+arrayKey[i-1].id).css('background-color');
      if(colorNotconverted != "rgba(0, 0, 0, 0)"){
        $("#"+arrayKey[i-1].id).css('background-color', '');
      }

    }
    currentColumn+=1;
  }
}


function undo(){
  console.log(currentId)
  $('#'+currentId).css('background', 'rgba(0,0,0,0)');
}

////END OF SCRIPT DRAWING GAME////


////////////START OF WRITING GAME SCRIPT////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////

function initiateWritingGame(){
  $homePage = $('#homePage').css('display', 'none');
  $writingGamePage = $('#writingGame').css('display', 'block');
}

////END OF SCRIPT WRITING GAME////
