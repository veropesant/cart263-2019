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
let intv;
let key;
let isMoving;
let keyR;
let ev;
let evR;
let xCat;

$(document).ready(function(){

  $kitty = $('#kitty');
  $kitty.attr('src', 'assets/images/kitty.png');
  xCat = 0;


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
          console.log('eat');
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
