let $btnPlay;
let text;

let arrLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", ",", ".", "!", "?", ";", "-", "'"];
let arrNotes = ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A"];

let melody = [];
let noteCounter = 0;

////////////START OF WRITING GAME SCRIPT////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////
/////////////////////////////////////////////////////

function initiateWritingGame(){
  $('#homePage').css('display', 'none');
  $('#writingGame').css('display', 'block');
  let $inputText = '<textarea rows="4" cols="50" id="text">';
  $('#writingGame').append($inputText);


  $btnPlay = $("#play");
  $btnPlay.on("click", function(){
    play = true;
    createMelody();
  });

}


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
  console.log(melody);
  playMelody();
}

function playMelody(){
  $("#text").prop('disabled', true); // the player can't write while the clip is playing
  if(melody.length > 0){
    let currentMelody = melody[noteCounter].split('');
    let currentNote= currentMelody[0];
    let currentOctave = parseInt(currentMelody[1]);
    console.log(currentMelody);
    piano.play(currentNote, currentOctave, 2);
    noteCounter++;

    setTimeout(function(){
      if(noteCounter < melody.length){
        playMelody();
      }else{
        noteCounter = 0;
        melody=[];
        $("#text").prop('disabled', false);
      }

    },300);
  }else{
    $('#alertWrite').css("display", 'block');
    setTimeout(function(){
      $('#alertWrite').css("display", 'none');
    },3000)
  }
}

////END OF SCRIPT WRITING GAME////
