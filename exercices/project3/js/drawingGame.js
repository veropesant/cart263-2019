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
let sound;
let $keys;
let $colors;
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

//arrays to store the different octaves
let octave1 = [];
let octave2 = [];
let octave3 = [];
let octave4 = [];
let octave5 = [];
let octave6 = [];


////////////START OF DRAWING GAME SCRIPT////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////

function initiateDrawGame(){

  $('#homePage').css('display', 'none');
  $('#drawingGame').css('display', 'block');


  colorLength = colors.length-1;
  // $colors = $('.colors');

  //add event listener to buttons
  $play = $('#play-button');
  $empty = $('#empty');
  $eraser = $('#eraser');
  $play.on('click', function(){
    if(keysSelected>0){
      playing = true;
      playMusic();
    }
  });
  $empty.on('click', function(){
    if(!playing){
      confirmEmpty();
    }else{
      $("#drawAlert").css("display", "block");
      setTimeout(function(){
        $("#drawAlert").css("display", "none");
      },3000);
    }
  });
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
  //creates the octaves of the grid
  octaves();
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
  if(playing){
    $("#drawAlert").css("display", "block");
    setTimeout(function(){
      $("#drawAlert").css("display", "none");
    },3000);
  }else{
    switch (this.id) {
      case 'color1':
      hoverColor=colors[1-1];
      setHoverColor();
      currentInstrument.play('C', 4, 2);
        break;
      case 'color2':
      hoverColor=colors[2-1];
      setHoverColor();
      currentInstrument.play('D', 4, 2);
        break;
      case 'color3':
      hoverColor=colors[3-1];
      setHoverColor();
      currentInstrument.play('E', 4, 2);
        break;
      case 'color4':
      hoverColor=colors[4-1];
      setHoverColor();
      currentInstrument.play('F', 4, 2);
        break;
      case 'color5':
      hoverColor=colors[5-1];
      setHoverColor();
      currentInstrument.play('G', 4, 2);
        break;
      case 'color6':
      hoverColor=colors[6-1];
      setHoverColor();
      currentInstrument.play('A', 4, 2);
        break;
      case 'color7':
      hoverColor=colors[7-1];
      setHoverColor();
      currentInstrument.play('B', 4, 2);
        break;
      case 'color8':
      hoverColor=colors[8-1];
      setHoverColor();
      currentInstrument.play('C', 5, 2);
        break;
      case 'eraser':
      hoverColor='#ffffff';
      setHoverColor();
        break;
    }
  }
}

function selectSquare(){
  if(playing){
    $("#drawAlert").css("display", "block");
    setTimeout(function(){
      $("#drawAlert").css("display", "none");
    },3000);
  }else{
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

    // playNote(hoverColor, 4);
  }

}

function playNote(colorToPlay, octave){
  switch (colorToPlay) {
    case blue:
    currentInstrument.play('C', octave, 2);
      break;
    case red:
    currentInstrument.play('D', octave, 2);
      break;
    case green:
    currentInstrument.play('E', octave, 2);
      break;
    case yellow:
    currentInstrument.play('F', octave, 2);
      break;
    case orange:
    currentInstrument.play('G', octave, 2);
      break;
    case purple:
    currentInstrument.play('A', octave, 2);
      break;
    case black:
    currentInstrument.play('B', octave, 2);
      break;
    case pink:
    currentInstrument.play('C', octave+1, 2);
      break;
  }
}

function playMusic(){

  if(keysSelected>0 && playing==true){

    let arrayKey = $('#column'+activeColumn).children();

    $('#timer').css('width', timerLength + 'px');

    for(let i=1; i<=arrayKey.length; i++){
      let currentOctave;
      let colorNotconverted = $("#"+arrayKey[i-1].id).css('background-color');
      let colorId = $("#"+arrayKey[i-1].id)[0].id;

      let keyColor = rgb2hex($("#"+arrayKey[i-1].id).css('background-color'));
      if(colorNotconverted != "rgba(0, 0, 0, 0)"){
        if(octave1.indexOf(colorId) != -1){
          currentOctave = 1;
        }else if(octave2.indexOf(colorId) != -1){
          currentOctave = 2;
        }else if(octave3.indexOf(colorId) != -1){
          currentOctave = 3;
        }else if(octave4.indexOf(colorId) != -1){
          currentOctave = 4;
        }else if(octave5.indexOf(colorId) != -1){
          currentOctave = 5;
        }else if(octave6.indexOf(colorId) != -1){
          currentOctave = 6;
        }

        playNote(keyColor.toUpperCase(), currentOctave);
      }
    }

    setTimeout(function(){
      if(activeColumn<=columnNumber){
        activeColumn+=1;
        timerLength+=20;
        playMusic();
      }else{
        playing = false;
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
    for(let i=1; i<=arrayKey.length; i++){
      let colorNotconverted = $("#"+arrayKey[i-1].id).css('background-color');
      if(colorNotconverted != "rgba(0, 0, 0, 0)"){
        $("#"+arrayKey[i-1].id).css('background-color', '');
      }

    }
    currentColumn+=1;
  }
}


function undo(){
  $('#'+currentId).css('background', 'rgba(0,0,0,0)');
}

function octaves(){
  for(let i=0; i<= columnNumber; i++){
     let currentChildren = $('#column'+i).children().slice(0,5);
     for(let j=0; j <= currentChildren.length-1; j++){
       octave1.push(currentChildren[j].id);
     }

  }
  for(let i=0; i<= columnNumber; i++){
     let currentChildren = $('#column'+i).children().slice(5,10);
     for(let j=0; j <= currentChildren.length-1; j++){

       octave2.push(currentChildren[j].id);

     }

  }
  for(let i=0; i<= columnNumber; i++){
     let currentChildren = $('#column'+i).children().slice(10,15);
     for(let j=0; j <= currentChildren.length-1; j++){
       octave3.push(currentChildren[j].id);
     }
  }
  for(let i=0; i<= columnNumber; i++){
     let currentChildren = $('#column'+i).children().slice(15,20);
     for(let j=0; j <= currentChildren.length-1; j++){
       octave4.push(currentChildren[j].id);
     }
  }
  for(let i=0; i<= columnNumber; i++){
     let currentChildren = $('#column'+i).children().slice(20,25);
     for(let j=0; j <= currentChildren.length-1; j++){
       octave5.push(currentChildren[j].id);
     }
  }
  for(let i=0; i<= columnNumber; i++){
     let currentChildren = $('#column'+i).children().slice(25,30);
     for(let j=0; j <= currentChildren.length-1; j++){
       octave6.push(currentChildren[j].id);
     }
  }
}

////END OF SCRIPT DRAWING GAME////
