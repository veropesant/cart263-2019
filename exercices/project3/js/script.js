"use strict";

/*****************

Drawing music is now a thing
Véronique Pesant

So the goal of this project is to create a sort of grid canvas
on which the player can create various patterns and then listen
to them. That's right. Listen. Each row is going to represent a
different note, and the different colors are going to represent
the pitch. That might change...but for now it's the idea.

This first exercice though is simply me trying to create a tool
to select the colors and add a sound when clicked.

******************/
//VARIABLES
let hoverColor = 'blue';
let colors = ['blue', 'red', 'green', 'yellow', 'orange'];
let $keys;
let $colors;

$(document).ready(function(){
  console.log('ready');
  $colors = $('.colors');
  $keys = $('.keys');
  let positionColor = 50;
  let position = 50;

  for(let i=0; i<=$colors.length;i++){
    $('#color'+(i+1)).css('left', positionColor+'px');
    $('#color'+(i+1)).css('background-color', colors[i]);
    $('#color'+(i+1)).on('click', selectColor);
    positionColor += 50;
  }

  for(let i=0; i<=$keys.length;i++){
    $('#key'+(i+1)).css('left', position+'px');
    $('#key'+(i+1)).css('background-color', '');
    $('#key'+(i+1)).on('click', selectSquare);
    position += 80;
  }

})

function setHoverColor(){
  console.log(hoverColor);
  $keys.hover(function(){
    $(this).css('background-color', hoverColor);
  });
  $keys.mouseout(function(){
    if(!$(this).hasClass('selected')){
      $(this).css('background-color','');
    }
  });

}

function selectColor(){
  console.log(this);
  switch (this.id) {
    case 'color1':
    hoverColor='blue';
    setHoverColor();
      break;
    case 'color2':
    hoverColor='red';
    setHoverColor();
      break;
    case 'color3':
    hoverColor='green';
    setHoverColor();
      break;
    case 'color4':
    hoverColor='yellow';
    setHoverColor();
      break;
    case 'color5':
    hoverColor='orange';
    setHoverColor();
      break;
  }
}

function selectSquare(){
  let currentId = this.id;
  if(!$(this).hasClass('selected')){
      $(this).addClass('selected');
  }
  $(this).css('background-color', hoverColor);

}
