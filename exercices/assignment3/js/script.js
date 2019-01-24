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
let score;
$(document).ready(setInterval(function(){ update(); $('span').on('click', spanClicked); $('.secret').on('mouseenter',reveal); }, 3000));

function preload(){

}


// setup()
//
// Description of setup

function setup(){

}


// draw()
//
// Description of draw()

function draw() {
  score = $('.found').length;
  $('#score').html('Secret words found: '+score);
  if(score>=4){
    endScreen();
  }

}

function update(){

  let $spans  = $('span');
  $spans.each(updateSpan);
}
function updateSpan(){
  let randNum = Math.random();
  if(randNum < 0.1){
    $(this).removeClass('redacted');
    $(this).addClass('revealed');
  }
  
}

function spanClicked(){
  $(this).addClass('redacted');
  $(this).removeClass('revealed');
}

function reveal(){
  $(this).removeClass('secret');
  $(this).addClass('found');
}

function endScreen(){
    setTimeout(function(){
      $('div').css('display', 'none');
      $('#endGame').css('display', 'block');
    }, 3000);

}
