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

//default hover color
let hoverColor = '#6BB7EB';
//array for the colors
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
let emptyBg = 'rgba(0, 0, 0, 0)'; //when a key has no background color

let timerLength = 20; //for progression bar while playing

//arrays to store the different keys corresponding to different octaves
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
  //hides the home page and display the drawing game
  $('#homePage').css('display', 'none');
  $('#drawingGame').css('display', 'block');

  //get the number of colors
  colorLength = colors.length-1;
  // $colors = $('.colors');

  //add event listener to buttons
  $play = $('#play-button');
  $empty = $('#empty');
  $eraser = $('#eraser');
  //event listener on play button
  $play.on('click', function(){
    //only if the grid is NOT empty, allow to play the music
    if(keysSelected>0){
      playing = true;
      playMusic();
    }
  });
  //event listener on empty button
  $empty.on('click', function(){
    //only allow to empty the grid if the audio clip is not currently playing
    if(!playing){
      confirmEmpty();
    }else{
      //if the clip is indeed playing, display the alert that says you
      //cannot use this function right now
      $("#drawAlert").css("display", "block");
      //remove the alert after 3 seconds
      setTimeout(function(){
        $("#drawAlert").css("display", "none");
      },3000);
    }
  });

  //event listener on the eraser button (it behaves like a color)
  $eraser.on('click', selectColor);

  //according to the number of colors...
  for(let i=0; i<=colorLength;i++){
    //...creates one div per color in the color selector section
    let color = "<div class='colors' id='color"+(i+1)+"'></div>"
    $('#colorSelector').append(color);
    //sets the position and background-color according to the color
    $('#color'+(i+1)).css('left', positionColor+'px');
    $('#color'+(i+1)).css('background-color', colors[i]);
    //event listener on each color
    $('#color'+(i+1)).on('click', selectColor);
    //augment the position for the next color
    positionColor += 50;
  }

  //displaying the grid
  for(let j=0; j<columnNumber; j++){
    //first level of the loop creates the different columns
    $("#keyboard").append("<div class='columns' id='column"+(j+1)+"'></div>");
    //positions them right next to one another
    $("#column"+(j+1)).css('left',positionLeft+'px');
    position=0;

    for(let i=0; i<columnLength;i++){
      //the second level, according to the predetermined variable (30), display the right
      //number of key in each column
      let $key = "<div class='keys' id='"+(idKey+1)+"'></div>";
      $("#column"+(j+1)).append($key);
      //puts a border right only on the keys of the last column
      if(j === columnLength-1){
        $('#'+(idKey+1)).css('border-right', '1px solid black');
      }else{
        $('#'+(idKey+1)).css('border-right', 'none');
      }
      //positions the current key and set the background color to nothing
      $('#'+(idKey+1)).css('top', position+'px');
      $('#'+(idKey+1)).css('background-color', '');
      //adds event listener on each key
      $('#'+(idKey+1)).on('click', selectSquare);
      //augment the position for the next key
      position += 21;
      //augment the id of the key for the next one
      idKey++;
    }
    //augment the position for the next column
    positionLeft += 21;

  }
  //creates the octaves of the grid
  octaves();
}

//function to set the hover onn each key, depending on which color is selected
function setHoverColor(){
  //get all the keys of the grid
  $keys = $('.keys');

  //when one key is hovered, set its border to the current selected color
  $keys.hover(function(){
    $(this).css('border', '2px solid '+hoverColor);
  });
  //then set it back to black when the mouse is out
  $keys.mouseout(function(){
    //if it's the last row, put a border all around..
    if($(this)[0].id >= 871){
      $(this).css('border', '');
      $(this).css('border-right', '1px solid black');
    }else{ //if not, don't put a border-right
      $(this).css('border', '');
      $(this).css('border-right', 'none');
    }


  });

}
//function that sets the current color and plays a note accordingly
function selectColor(){
  //cannot choose a different color when the clip is playing
  if(playing){
    //display the alert that says you can't use this function right now
    $("#drawAlert").css("display", "block");
    setTimeout(function(){
      //removes it after 3 seconds
      $("#drawAlert").css("display", "none");
    },3000);
  }else{
    //if its not playing...
    //check the id of the div clicked and matches it with one of the arrNotes
    //blue is C, red is D, green is E, yellow is F, orange is G, purple is A,
    //black is B and pink is C but one octave higher and the eraser is white
    switch (this.id) {
      //blue
      case 'color1':
      hoverColor=colors[1-1];
      setHoverColor();
      currentInstrument.play('C', 4, 2);
        break;
      //red
      case 'color2':
      hoverColor=colors[2-1];
      setHoverColor();
      currentInstrument.play('D', 4, 2);
        break;
      //green
      case 'color3':
      hoverColor=colors[3-1];
      setHoverColor();
      currentInstrument.play('E', 4, 2);
        break;
      //yellow
      case 'color4':
      hoverColor=colors[4-1];
      setHoverColor();
      currentInstrument.play('F', 4, 2);
        break;
      //orange
      case 'color5':
      hoverColor=colors[5-1];
      setHoverColor();
      currentInstrument.play('G', 4, 2);
        break;
      //purple
      case 'color6':
      hoverColor=colors[6-1];
      setHoverColor();
      currentInstrument.play('A', 4, 2);
        break;
      //black
      case 'color7':
      hoverColor=colors[7-1];
      setHoverColor();
      currentInstrument.play('B', 4, 2);
        break;
      //pink
      case 'color8':
      hoverColor=colors[8-1];
      setHoverColor();
      currentInstrument.play('C', 5, 2);
        break;
      //eraser
      case 'eraser':
      hoverColor='#ffffff';
      setHoverColor();
        break;
    }
  }
}

//function that select a key by giving it a background-color corresponding
//the current hover color
function selectSquare(){
  //if the clip is playing, display the alert that says you can't use this
  //function at the moment
  if(playing){
    $("#drawAlert").css("display", "block");
    setTimeout(function(){
      $("#drawAlert").css("display", "none");
    },3000);
  }else{
    //id of the selected key
    currentId = this.id;
    let currentBg = $(this).css('background-color')
    if(!$(this).hasClass('selected')){
        $(this).addClass('selected');
    }
    //if the current color coresponds to white (the eraser)
    //set the background to empty. We don't want it to be white.
    if(hoverColor == '#ffffff' && currentBg != emptyBg){
      $(this).css('background-color', emptyBg);
      //adjust the number of keys selected at the moment
      if(keysSelected>0){
        keysSelected -=1;
      }
    }else if(hoverColor!='#ffffff'){
      $(this).css('background-color', hoverColor);
      keysSelected+=1;
    }

    playNote(hoverColor, 4);
  }

}
//plays the right note according to the instrument currently selected,
//the note (the note being the color) received and the octave received
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

//function that goes through each key of each columns and plays them
//the keys of a same column play all at the same time
function playMusic(){
  //don't play if there are currently no keys selected(colored)
  if(keysSelected>0 && playing==true){

    let arrayKey = $('#column'+activeColumn).children();
    //progression bar of the clip
    $('#timer').css('width', timerLength + 'px');

    for(let i=1; i<=arrayKey.length; i++){
      let currentOctave;
      let colorNotconverted = $("#"+arrayKey[i-1].id).css('background-color');
      let colorId = $("#"+arrayKey[i-1].id)[0].id;
      let keyColor = rgb2hex($("#"+arrayKey[i-1].id).css('background-color'));

      //using indexOf() to determine in which octave array the current color
      //being played is in and send it to the functions that plays the notes
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
        //sends the current color and current octave
        playNote(keyColor.toUpperCase(), currentOctave);
      }
    }
    //calls the same function after 0.3 second, as long as we
    //haven't reached the total number of column (30)
    setTimeout(function(){
      if(activeColumn<=columnNumber){
        activeColumn+=1;
        timerLength+=20;
        playMusic();
      }else{
        playing = false;
        activeColumn=1;
        timerLength=0;
        //reset the progression bar length to zero
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

//function that makes an alert pop up to make sure the player really wants
//to empty the whole grid
function confirmEmpty(){
  if(keysSelected>0){
    let confirmation = confirm('Do you really want to erase your drawing?');
    if( confirmation == true){
      emptyGrid();
    }
  }
}

//function that actually empties the grid byt going through all the
//columns and setting each key's background to empty.
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


//function that separates the different keys of the grid (using the slice function
//on the children of each column) in 6 different arrays, each corresponding
//to a different octave.
function octaves(){

  //first group of 5 keys of each column
  for(let i=0; i<= columnNumber; i++){
     let currentChildren = $('#column'+i).children().slice(0,5);
     for(let j=0; j <= currentChildren.length-1; j++){
       octave1.push(currentChildren[j].id);
     }

  }
  //second group of 5 keys of each column
  for(let i=0; i<= columnNumber; i++){
     let currentChildren = $('#column'+i).children().slice(5,10);
     for(let j=0; j <= currentChildren.length-1; j++){

       octave2.push(currentChildren[j].id);

     }

  }
  //third group of 5 keys of each column
  for(let i=0; i<= columnNumber; i++){
     let currentChildren = $('#column'+i).children().slice(10,15);
     for(let j=0; j <= currentChildren.length-1; j++){
       octave3.push(currentChildren[j].id);
     }
  }
  //fourth group of 5 keys of each column
  for(let i=0; i<= columnNumber; i++){
     let currentChildren = $('#column'+i).children().slice(15,20);
     for(let j=0; j <= currentChildren.length-1; j++){
       octave4.push(currentChildren[j].id);
     }
  }
  //fifth group of 5 keys of each column
  for(let i=0; i<= columnNumber; i++){
     let currentChildren = $('#column'+i).children().slice(20,25);
     for(let j=0; j <= currentChildren.length-1; j++){
       octave5.push(currentChildren[j].id);
     }
  }
  //sixth group of 5 keys of each column
  for(let i=0; i<= columnNumber; i++){
     let currentChildren = $('#column'+i).children().slice(25,30);
     for(let j=0; j <= currentChildren.length-1; j++){
       octave6.push(currentChildren[j].id);
     }
  }
}

////END OF SCRIPT DRAWING GAME////
