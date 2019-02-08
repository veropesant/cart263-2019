"use strict";

/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

// preload()
//
// Description of preload
let $kitty;
let $parent;
let $intro;
let bubbles;
let bites;
let intv;
let key;
let isMoving;
let keyR;
let keyboard = {
  ENTER: 13,
  SPACE: 32
}
let ev;
let evR;
let xCat;
let arrMouse;
let numMouse=5;
let numBubbles=5;
let numBite=5;
let distM=200;
let distB=220;
let distBite=180;
let eatActive=false;
let mouses;
let mouseActive;
let bubbleActive;
let biteActive;
let numTimesPlayed=0;



$(document).ready(function(){
  $intro = $('#intro');
  setTimeout(function(){
    $intro.animate({opacity:'1'});
  },1000);
  $kitty = $('#kitty');
  $parent = $('#parent');
  displayBubbles();
  displayBiteText();

  //sets the start image (not moving) of the kitty
  $kitty.attr('src', 'assets/images/kitty.png');
  xCat = 0;
  //display the mouses but don't show them
  displayMouse();
  setTimeout(function(){
    //bring in the mouses after 1 sec
    $parent.animate({left:'0px'},2000, 'swing');
  },1000);

  //make the explanations dissapear after 5 seconds
  setTimeout(function(){
    $intro.fadeOut();
  },8000);



});
//DISPLAY FUNCTIONS
//Displaying the mouse at a certain distance from each other
function displayMouse(){
  for(let i=0; i<numMouse; i++){
    $parent.append('<div class="mouse" id="m'+(i+1)+'"><img src="assets/images/mouse6.png"></div>');
    $('#m'+(i+1)).css('left', distM);
    distM=distM+100;
  }

}
//Displaying the bubbles above each mouse
function displayBubbles(){
  for(let i=0; i<numBubbles; i++){
    $parent.append('<div class="bubbles" id="bubble'+(i+1)+'"><img src="assets/images/bubble.png"></div>');
    $('#bubble'+(i+1)).css('left', distB);
    distB=distB+100;
  }

}
//Displaying the bite text next to each mouse
function displayBiteText(){
  for(let i=0; i<numBite; i++){
    $parent.append('<div class="bites" id="bite'+(i+1)+'">YUM YUM</div>');
    $('#bite'+(i+1)).css('left', distBite);
    distBite=distBite+100;
  }

}
//Function to display text depending on the number of times the level
//has been completed
function displayText(){
  var firstTime = 'You thought it was over huh? Think again kitty...EAT!';
  var secondTime = 'No, no! Eat again! You\'re not done!';
  var thirdTime = 'Nope! Not done yet. Eat!';
  var fourthMoreTime = 'EAT! EAT! EAT!';
  switch(numTimesPlayed) {
   case 1:
     $intro.html(firstTime);
     $intro.fadeIn();
     setTimeout(function(){
       $intro.fadeOut();
       firstTime='';
     },5000);
     break;
   case 2:
     $intro.html(secondTime);
     $intro.fadeIn();
     setTimeout(function(){
       $intro.fadeOut();
       secondTime='';
     },5000);
     break;
     case 3:
       $intro.html(thirdTime);
       $intro.fadeIn();
       setTimeout(function(){
         $intro.fadeOut();
         thirdTime='';
       },5000);
       break;
   default:
     console.log('default');
 }
 if(numTimesPlayed>=4){
   $intro.html(fourthMoreTime);
   $intro.fadeIn();
   setTimeout(function(){
     $intro.fadeOut();
   },5000);
 }
}

//Function to check constantly the keys pressed on the keyboard
$(function() {
   $(window).keypress(function(e) {
     //code found on stackoverflow
       ev = e || window.event;
       key = ev.keyCode || ev.which;
       switch(key) {
        case keyboard.ENTER:
          isMoving=true;
          handleWalk();
          break;
        case keyboard.SPACE:
          if(eatActive){
            eat();
          }
          break;
        default:
          console.log('default');
      }

   });

   $(window).keyup(function(e){
     evR = e || window.event;
     keyR = evR.keyCode || evR.which;

     if(keyR==13){
       isMoving=false;
       handleWalk();
     }
   });
});

function handleWalk(){
  if(isMoving==true){
    if(!eatActive){
      if(!intv){
        intv = setInterval(walkKitty, 200);
      }
    }

  }
  else{
    clearInterval(intv);
    intv = null;
    $kitty.attr('src', 'assets/images/kitty.png');
    if(bubbleActive){
      var idBubbleActif = bubbleActive.id;
      $('#'+idBubbleActif).animate({opacity:'1'});
    }
  }
}


//function to make the kitty walk towards the right when ENTER is pressed
//and to animate the kitty while he walks
function walkKitty(){

    xCat = xCat+5;
    $kitty.animate({left: xCat}, 'fast', 'linear', checkCollisions);
    if($kitty.attr('src')==='assets/images/kitty1.png'){
      $kitty.attr('src','assets/images/kitty2.png');
    }else{
      $kitty.attr('src','assets/images/kitty1.png');
    }


}

//code found online on stackoverflow, but adapted for my situation
function checkCollisions(){
  mouses = $(".mouse");
  bubbles = $(".bubbles");
  bites = $(".bites");
  for(let i=0; i<=mouses.length-1; i++){
    var pos = getPositions(mouses[i]);
    var pos2 = getPositions(this);
    var horizontalMatch = comparePositions(pos[0], pos2[0]);
    // var verticalMatch = comparePositions(pos[1], pos2[1]);
    var match = horizontalMatch;// && verticalMatch;
    if (match) {
      isMoving=false;
      mouseActive = mouses[i];
      bubbleActive = bubbles[i];
      biteActive = bites[i];
      $kitty.attr('src','assets/images/kitty-hungry.png');
      eatActive=true;
      handleWalk();
    }else{
      isMoving=true;
    }
  }

}

function getPositions(obj) {

  var $obj = $(obj);
  var pos = $obj.position();
  var width = $obj.width();
  var height = $obj.height();
  return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
}

function comparePositions(p1, p2) {

  var x1 = p1[0] < p2[0] ? p1 : p2;
  var x2 = p1[0] < p2[0] ? p2 : p1;
  return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
}
//end of code found online


function eat(){
  $('#bite').trigger('play');
  var mouseIdActif = mouseActive.id;
  var biteIdActif = biteActive.id;
  $('#'+mouseIdActif).remove();
  $('#'+biteIdActif).animate({opacity:'1'}, 'fast', 'swing');
  setTimeout(function(){
    $('#'+biteIdActif).remove();
  },1500);
  bubbleActive.remove();
  bubbleActive=null;
  if(mouses.length-1==0){
      numTimesPlayed+=1;
      biteActive=null;
      distM=200;
      distB=220;
      distBite=180;
    setTimeout(function(){
      $kitty.animate({left: '0'}, 2000, 'swing');
      displayMouse();
      displayBubbles();
      displayBiteText();
      displayText();
      $parent.css('left', '900px');
      $parent.animate({left: '0'}, 2000, 'swing');
      xCat=0;
    },1000);
  }
  $kitty.attr('src', 'assets/images/kitty-eat.png');

  setTimeout(function(){
    $kitty.attr('src', 'assets/images/kitty.png');
    eatActive=false;
  },500);
}
