/*

Condiments
Véronique Pesant

*/

let vowels = "aeiou";

$(document).ready(function() {

  // The first thing we need to do is load the data we're going
  // to use to get random words.
  //
  // For that we use jQuery's .getJSON() function, which we give
  // the location of the file, and a function to call when the data
  // is available...
  $.getJSON('data/data.json', gotData);
});

//ADDED THE RELOAD FUNCTION ON CLICK OF THE PAGE
$(document).on('click', function(){
  location.reload();
})

// gotData (data)
//
// This function gets called by getJSON when the data has been loaded.
// The data itself will be in the 'data' argument as a JavaScript object.
function gotData(data) {


  // Get a random condiment from the condiments array in the JSON
  let condiment = getRandomElement(data.condiments, 'condiments');
  // Assume it's singular
  let verb = 'is';
  // Check if the last latter of the condiment is an 's'
  if (condiment.charAt(condiment.length - 1) === 's') {
    // If so, assume it's plural (this is a flawed assumption)
    verb = 'are';
  }

  // Now the cat
  //Used toLowerCase so that the condition can be met later
  let cat = getRandomElement(data.cats, 'cats').toLowerCase();

  // Same again for room
  let currentRoom = getRandomElement(data.rooms, 'rooms');
  let room;
  //ADDED CODE TO CHECK THE FIRST LETTER OF THE ROOM
  for(let i=0; i<=vowels.length; i++){
    if(vowels.charAt(i)==currentRoom.charAt(0)){
      room = 'an '+currentRoom;
      break;
    }else{
      room = 'a '+currentRoom;
    }
  }

  // Same again for color
  //Used toLowerCase so that the condition can be met later
  let currentColor = getRandomElement(data.colors, 'colors').toLowerCase();
  let color;
  //ADDED CODE TO CHECK THE FIRST LETTER OF THE COLOR
  for(let i=0; i<=vowels.length; i++){
    if(vowels.charAt(i)==currentColor.charAt(0)){
      color = 'an '+currentColor;
      break;
    }else{
      color= 'a '+currentColor;
    }
  }

  // Now we can construct our description with a template string
  // We have the basic structure of a sentence and we substitute in the
  // values we've just calculated
  let description = `${condiment} ${verb} like ${color} colored ${cat} in ${room}.`;

  // Finally, we add it to the page and hey presto!
  $('body').append(description)
}

// getRandomElement ()
//
// Returns a random element from the array provided
function getRandomElement(array, type) {
  //ADDED A PIECE OF CODE TO CHECK WHAT WE ARE USING' BECAUSE
  //COLORS NEED A SPECIFICATION MORE
  if(type=='colors'){
    return array[Math.floor(Math.random() * array.length)].color;
  }else{
    return array[Math.floor(Math.random() * array.length)];
  }

}
