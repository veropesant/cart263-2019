let $btnPlay;
let text;

let arrLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let arrNotes = ["C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "D", "E", "F", "G"];

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
  console.log(arrLetters.length);
  $btnPlay = $("#play");
  $btnPlay.on("click", function(){
    play = true;
    createMelody();
  });

}


function createMelody(){
  console.log("createMelody");
  let typedText = $("#text")val();
}

////END OF SCRIPT WRITING GAME////
