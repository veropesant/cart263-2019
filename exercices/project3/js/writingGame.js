let $btnPlay;
let text;

let arrLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ", ",", ".", "!", "?", ";"];
let arrNotes = ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F"];

let melody = [];

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
    let noteIndex = arrNotes.indexOf(note);
    if(noteIndex<=6 || noteIndex >26){
      octave = 1;
    }else if(noteIndex>6 && noteIndex<=13){
      octave = 2;
    }else if(noteIndex>13 && noteIndex<=20){
      octave = 3;
    }else if(noteIndex>20 && noteIndex<=26){
      octave = 4;
    }
    console.log(note, octave, "2");
  }
}

////END OF SCRIPT WRITING GAME////
