"use strict";

/*****************

The infinite eating of the mouse
Véronique Pesant

This is a little game based on the myth of sisyphus
who was sentenced to push a bolder up a hill indefinitely.
In this game, much like sisyphus, the kitty is sentenced
to eat mouses 'til the end of times.

******************/

//JQuery variables
let $kitty;
let $parent;
let $intro;
let bubbles;
let bites;
let mouses;
let mouseActive;
let bubbleActive;
let biteActive;

//Movement and action variables
let intv;
let isMoving;
let keyboard = {
  ENTER: 13,
  SPACE: 32
}

//Variables for collision detection
let key;
let keyR;
let ev;
let evR;
let xCat;

//References value variables
let distM=200;
let distB=220;
let distBite=180;
let eatActive=false;
let numMouse=5;
let numBubbles=5;
let numBite=5;
let numTimesPlayed=0;


//function to execute certain commands as soon
//as the document is loaded
$(document).ready(function(){
  $intro = $('#intro');
  setTimeout(function(){
    $intro.animate({opacity:'1'});
  },1000);
  $kitty = $('#kitty');
  $parent = $('#parent');
  //sets the start image (not moving) of the kitty
  $kitty.attr('src', 'assets/images/kitty.png');
  xCat = 0;

  //Call the functions to display the different elements
  //on the screen but don't show them yet
  displayBubbles();
  displayBiteText();
  displayMouse();
  setTimeout(function(){
    //Make the mouses appear after 1 sec
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
    //for each mouse, adds a div with a specific id in the predetermined parent div
    $parent.append('<div class="mouse" id="m'+(i+1)+'"><img src="assets/images/mouse6.png"></div>');
    $('#m'+(i+1)).css('left', distM);
    //increase the left position to distance every mouse by 100px
    distM=distM+100;
  }

}
//Creates the bubbles above each mouse, but don't actually displays them yet.
function displayBubbles(){
  for(let i=0; i<numBubbles; i++){
    $parent.append('<div class="bubbles" id="bubble'+(i+1)+'"><img src="assets/images/bubble.png"></div>');
    $('#bubble'+(i+1)).css('left', distB);
    //increase the left position to distance every bubble by 100px
    distB=distB+100;
  }

}
//Creates the bubbles above each mouse, but don't actually displays them yet.
function displayBiteText(){
  for(let i=0; i<numBite; i++){
    $parent.append('<div class="bites" id="bite'+(i+1)+'">YUM YUM</div>');
    $('#bite'+(i+1)).css('left', distBite);
    //increase the left position to distance every bite text by 100px
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
    //if the player ate all the mouses only once...
   case 1:
     $intro.html(firstTime);
     //animation bite text first time
     $intro.fadeIn();
     //after 5 sec, the text disappears and its varibale is empty
     setTimeout(function(){
       $intro.fadeOut();
       firstTime='';
     },5000);
     break;
   case 2:
     $intro.html(secondTime);
     //animation bite text second time
     $intro.fadeIn();
     //after 5 sec, the text disappears and its varibale is empty
     setTimeout(function(){
       $intro.fadeOut();
       secondTime='';
     },5000);
     break;
     case 3:
       $intro.html(thirdTime);
       //animation bite text third time
       $intro.fadeIn();
       //after 5 sec, the text disappears and its varibale is empty
       setTimeout(function(){
         $intro.fadeOut();
         thirdTime='';
       },5000);
       break;
   default:
     console.log('default');
 }
 //If the player ate all the mouses 4 times or more, the text stays the same
 if(numTimesPlayed>=4){
   $intro.html(fourthMoreTime);
   //animation bite text fourth or more time
   $intro.fadeIn();
   //after 5 sec, the text disappears
   setTimeout(function(){
     $intro.fadeOut();
   },5000);
 }
}

//Function to check constantly the keys pressed on the keyboard
//code inspired by code found on stackoverflow
$(function() {
   $(window).keypress(function(e) {
       //stores the event and the key pressed in variables
       ev = e || window.event;
       key = ev.keyCode || ev.which;
       //checks if either of the two keys that we need have been pressed
       switch(key) {
        //this case calls the function to make the kitty walk
        case keyboard.ENTER:
          //allows the kitty to walk
          isMoving=true;
          handleWalk();
          break;
        //this case calls the function to make the kitty eat
        case keyboard.SPACE:
          //if the kitty is allowed to eat, so if he's close enough to a mouse
          if(eatActive){
            eat();
          }
          break;
        default:
          console.log('default');
      }

   });
   //opposite of keyPressed. Handles the events when the keys are released
   $(window).keyup(function(e){
     //stores the event and the key released in variables
     evR = e || window.event;
     keyR = evR.keyCode || evR.which;

     if(keyR==13){
       //makes sure that if the ENTER key is released, the kitty stops walking
       isMoving=false;
       handleWalk();
     }
   });
});
//end of code inspired by code found on stackoverflow

function handleWalk(){
  //Verifies that the kitty is allowed to walk
  if(isMoving==true){
    //if he's not eating...
    if(!eatActive){
      //...and if there's not already an interval set
      if(!intv){
        //animate the kitty every 0.2sec and make him move
        intv = setInterval(walkKitty, 200);
      }
    }

  }
  else{
    //if he's not supposed to be walking, so if he's touching a mouse,
    //or the enter key is released, remove interval that made him walk
    clearInterval(intv);
    //sets interval varibale to null so you can set it to something again eventually
    intv = null;
    //change the image of the kitty for the one where he stands still
    $kitty.attr('src', 'assets/images/kitty.png');
    if(bubbleActive){
      //make the speech bubble of the mouse that the kitty is touching appear
      var idBubbleActif = bubbleActive.id;
      $('#'+idBubbleActif).animate({opacity:'1'});
    }
  }
}


//function to make the kitty walk towards the right when ENTER is pressed
//and to animate the kitty while he walks (switch images)
function walkKitty(){
    //increment the left position of the kitty
    xCat = xCat+5;
    $kitty.animate({left: xCat}, 'fast', 'linear', checkCollisions);

    //switches the image depending on which image was already active
    if($kitty.attr('src')==='assets/images/kitty1.png'){
      $kitty.attr('src','assets/images/kitty2.png');
    }else{
      $kitty.attr('src','assets/images/kitty1.png');
    }


}

//code found online on stackoverflow, but adapted for my situation
function checkCollisions(){
  //create arrays with all the elements of the same classes
  //(for the mouses, bubbles and bite texts)
  mouses = $(".mouse");
  bubbles = $(".bubbles");
  bites = $(".bites");

  //while the cat walks, check if he's colliding with any of the mouses
  for(let i=0; i<=mouses.length-1; i++){
    //finds the positions of the mouses and the cat at the moment
    var pos = getPositions(mouses[i]);
    var pos2 = getPositions(this);
    var horizontalMatch = comparePositions(pos[0], pos2[0]);
    // var verticalMatch = comparePositions(pos[1], pos2[1]);
    var match = horizontalMatch;// && verticalMatch;

    //if they touch..
    if (match) {
      //stops the cat from moving
      isMoving=false;
      //determines which mouse has been touched and the bubble and text associated
      mouseActive = mouses[i];
      bubbleActive = bubbles[i];
      biteActive = bites[i];

      //changes the image of the cat for the hungry one
      $kitty.attr('src','assets/images/kitty-hungry.png');
      //allows the cat to eat
      eatActive=true;

      //calls the walk function again to make him stop moving
      //since we just changed the variable that determines that
      handleWalk();
    }else{

      //if the cat doesn't touch anything, keep walking
      isMoving=true;
    }
  }

}

//function to fetch the position of the objects
//The argument receive either a mouse or the kitty
function getPositions(obj) {
  var $obj = $(obj);
  var pos = $obj.position();
  var width = $obj.width();
  var height = $obj.height();
  //determines the starting and ending point of the object on X, then on Y
  //and sends it back
  return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
}

//compare the positions of the cat and the mouses
function comparePositions(p1, p2) {

  var x1 = p1[0] < p2[0] ? p1 : p2;
  var x2 = p1[0] < p2[0] ? p2 : p1;
  //returns true if they touch, false if they don't
  return x1[1] > x2[0] || x1[0] === x2[0] ? true : false;
}
//end of code found online

//function that handles what the kitty eats
function eat(){
  //activates the chewing sound
  $('#bite').trigger('play');
  //targets the ids of the active mouse and text
  var mouseIdActif = mouseActive.id;
  var biteIdActif = biteActive.id;
  //deletes the mouse that the cat has eaten only
  $('#'+mouseIdActif).remove();
  //makes the text fade in
  $('#'+biteIdActif).animate({opacity:'1'}, 'fast', 'swing');
  //after 1.5 sec, makes the text slowly disappear
  setTimeout(function(){
    $('#'+biteIdActif).remove();
  },1000);
  //removes the bubbles and empties its variable
  bubbleActive.remove();
  bubbleActive=null;
  biteActive=null;
  //when the cat ate all the mouses, reset the game
  if(mouses.length-1==0){
    //used this timeout to prevent the last 'yum yum' to appear
    //at X zero like he used to do, because the position was reset too early
    setTimeout(function(){
      reset();
    },1000);

  }
  //eating animation
  $kitty.attr('src', 'assets/images/kitty-eat.png');
  setTimeout(function(){
    $kitty.attr('src', 'assets/images/kitty.png');
    eatActive=false;
  },500);
}

function reset(){
    numTimesPlayed+=1;
    biteActive=null;
    //resets initial distances of mouses, bubbles, and bite text
    distM=200;
    distB=220;
    distBite=180;
    //after 1000, slide everything back to initial position
    //at the left of the screen
    setTimeout(function(){
      $kitty.animate({left: '0'}, 2000, 'swing');
      //recreates the objects to eventually appear on the screen
      displayMouse();
      displayBubbles();
      displayBiteText();
      displayText();
      //animation to slide in the mouses
      $parent.css('left', '900px');
      $parent.animate({left: '0'}, 2000, 'swing');
      //resets initial position of cat
      xCat=0;
    },500);
}
