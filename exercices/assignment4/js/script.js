/*****************

Véronique Pesant

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let $mouth;
let $fly;
let interval;

$(document).ready(function(){
  console.log('Ready!');
  $mouth = $('#mouth');
  $fly = $('#fly');

  $('.dragable').draggable();
  $mouth.droppable({
    drop: function(event, ui){
      ui.draggable.fadeOut();
      interval = setInterval(mouthChew,10);
      setTimeout(function(){
        clearInterval(interval);
        ui.draggable.css('position', 'absolute');
        ui.draggable.css('top', '30%');
        ui.draggable.css('left', '30%');
        ui.draggable.fadeIn();
      }, 2000);
    }
  });
});

function mouthChew(){

    if($mouth.attr('src')=="assets/images/mouth-open.png"){
      $mouth.attr('src', 'assets/images/mouth-closed.png');
    }else{
      $mouth.attr('src', 'assets/images/mouth-open.png');
    }

}
