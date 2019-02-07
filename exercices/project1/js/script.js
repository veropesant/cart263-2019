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
let intv;
let key;
let isMoving;
let keyR;
let ev;
let evR;
let xCat;
let arrMouse;
let numMouse=5;
let distM=200;

$(document).ready(function(){

  $kitty = $('#kitty');
  $parent = $('#parent');
  $kitty.attr('src', 'assets/images/kitty.png');
  xCat = 0;

  for(let i=0; i<numMouse; i++){
    $parent.append('<div class="mouse" id="m'+(i+1)+'"><img src="assets/images/mouse6.png"></div>');
    $('#m'+(i+1)).css('left', distM);
    distM=distM+100;
  }


});

$(function() {
   $(window).keypress(function(e) {
     //code found on stackoverflow
       ev = e || window.event;
       key = ev.keyCode || ev.which;
       console.log(ev.type);
       switch(key) {
        case 13:
          isMoving=true;
          handleWalk();
          break;
        case 32:
          eat();
          break;
        default:
          console.log('default');
      }

   });

   $(window).keyup(function(e){
     evR = e || window.event;
     keyR = evR.keyCode || evR.which;
     console.log(keyR);
     if(keyR==13){
       isMoving=false;
       handleWalk();
     }
   });
});

function handleWalk(){
  if(isMoving==true){
    if(!intv){
      intv = setInterval(walkKitty, 200);

    }
  }
  else{
    clearInterval(intv);
    intv = null;
    walkKitty();

  }
}

function walkKitty(){
  if(isMoving==true){
    xCat = xCat+5;
  }

  console.log($kitty);
  $kitty.css('left', xCat);
  if(isMoving==true){
    if($kitty.attr('src')==='assets/images/kitty1.png'){
      $kitty.attr('src','assets/images/kitty2.png');
    }else{
      $kitty.attr('src','assets/images/kitty1.png');
    }
  }else{
    $kitty.attr('src', 'assets/images/kitty.png');
  }

}

function eat(){
  $kitty.attr('src', 'assets/images/kitty-eat.png');

  setTimeout(function(){
    $kitty.attr('src', 'assets/images/kitty.png');
  },500);
}
