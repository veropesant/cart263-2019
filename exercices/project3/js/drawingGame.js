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

    playNote(hoverColor);
  }

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

  if(keysSelected>0 && playing==true){
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
