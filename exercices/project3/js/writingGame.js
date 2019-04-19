//main elements of the page
let $btnPlay;
let text;

//arrays
let arrLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", ",", ".", "!", "?", ";", "-", "'"];
let arrNotes = ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A"];
let melody = [];

//dynamic variables
let noteCounter = 0;
let progressionLength=0;


////////////START OF WRITING GAME SCRIPT////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////

//hides the home page and displays the writing game page
function initiateWritingGame(){
  $('#homePage').css('display', 'none');
  $('#writingGame').css('display', 'block');
  let $inputText = '<textarea rows="4" cols="50" id="text">';
  $('#writingGame').append($inputText);


  $btnPlay = $("#play");
  //event listener on the play button
  $btnPlay.on("click", function(){
    play = true;
    createMelody();
  });

}

//groups the notes that are going to be played
function createMelody(){
  console.log("createMelody");
  let typedText = $("#text").val();
  let textArray = typedText.split('');
  for(let i=0; i<=textArray.length-1;i++){
    let charIndex = arrLetters.indexOf(textArray[i].toUpperCase())+1; //finds the index of the current letter in the arrLetters
    let note = arrNotes[charIndex-1]; // finds the note corresponding to the index of the letter, in the notes array

    //finding the octave depending on the index
    //if its in the second repatition of the notes for example, the octave would be 2
    let octave;
    let noteIndex = charIndex-1; //IMPORTANT the index of the note is the same as the letter
    if(noteIndex<=6 || noteIndex > 26){
      octave = 1;
    }else if(noteIndex>6 && noteIndex<=13){
      octave = 2;
    }else if(noteIndex>13 && noteIndex<=20){
      octave = 3;
    }else if(noteIndex>20 && noteIndex<=26){
      octave = 4;
    }
    let noteToPlay = (note+octave);
    melody.push(noteToPlay);

  }
  playMelody();
}

//plays the melody previously put in an array, by going through that array
function playMelody(){

  if(melody.length > 0){
    //uses the predetermined length of the input text, and the number
    //of characters typed in at the moment to determine the increment of
    //the progression bar
    let lengthIncrement = 300/melody.length;
    $("#text").prop('disabled', true); // the player can't write while the clip is playing
    $('#progression').css('width', progressionLength); //updates the progression bar
    let currentMelody = melody[noteCounter].split('');
    let currentNote= currentMelody[0];
    let currentOctave = parseInt(currentMelody[1]);
    currentInstrument.play(currentNote, currentOctave, 2); //2 is the piano profile, always the same
    noteCounter++;

    //calls the same function again as long as the melody's length is
    //not reached
    setTimeout(function(){
      if(noteCounter < melody.length){
        playMelody();
        progressionLength+=lengthIncrement;//augments the length of the progression bar
      }else{
        //sets everything back to zero
        noteCounter = 0;
        melody=[];
        $("#text").prop('disabled', false);
        lengthIncrement = 0;
        progressionLength = 0;
        $('#progression').css('width', progressionLength);
      }

    },300);
  }else{
    //if nothing is written in the text area, displays the alert that
    //says to write something before playing it.
    $('#alertWrite').css("display", 'block');
    setTimeout(function(){
      $('#alertWrite').css("display", 'none');
    },3000)
  }
}

////END OF SCRIPT WRITING GAME////
