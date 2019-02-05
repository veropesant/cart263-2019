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

$(document).ready(function(){

  $kitty = $('#kitty');

  intv = setInterval(walkKitty, 100);

});

function walkKitty(){

  if($kitty.attr('src')==='assets/images/kitty1.png'){
    $kitty.attr('src')='assets/images/kitty2.png';
  }else{
    $kitty.attr('src')='assets/images/kitty1.png';
  }
}
