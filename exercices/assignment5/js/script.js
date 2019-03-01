/*****************
Assignment 5
Véronique Pesant

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let answers;
let correctAnswers=0;
let NUM_OPTIONS = 5;
let animals = [ // array of all the possible animals to use in the game
      "aardvark",
      "alligator",
      "alpaca",
      "antelope",
      "ape",
      "armadillo",
      "baboon",
      "badger",
      "bat",
      "bear",
      "beaver",
      "bison",
      "boar",
      "buffalo",
      "bull",
      "camel",
      "canary",
      "capybara",
      "cat",
      "chameleon",
      "cheetah",
      "chimpanzee",
      "chinchilla",
      "chipmunk",
      "cougar",
      "cow",
      "coyote",
      "crocodile",
      "crow",
      "deer",
      "dingo",
      "dog",
      "donkey",
      "dromedary",
      "elephant",
      "elk",
      "ewe",
      "ferret",
      "finch",
      "fish",
      "fox",
      "frog",
      "gazelle",
      "gila monster",
      "giraffe",
      "gnu",
      "goat",
      "gopher",
      "gorilla",
      "grizzly bear",
      "ground hog",
      "guinea pig",
      "hamster",
      "hedgehog",
      "hippopotamus",
      "hog",
      "horse",
      "hyena",
      "ibex",
      "iguana",
      "impala",
      "jackal",
      "jaguar",
      "kangaroo",
      "koala",
      "lamb",
      "lemur",
      "leopard",
      "lion",
      "lizard",
      "llama",
      "lynx",
      "mandrill",
      "marmoset",
      "mink",
      "mole",
      "mongoose",
      "monkey",
      "moose",
      "mountain goat",
      "mouse",
      "mule",
      "muskrat",
      "mustang",
      "mynah bird",
      "newt",
      "ocelot",
      "opossum",
      "orangutan",
      "oryx",
      "otter",
      "ox",
      "panda",
      "panther",
      "parakeet",
      "parrot",
      "pig",
      "platypus",
      "polar bear",
      "porcupine",
      "porpoise",
      "prairie dog",
      "puma",
      "rabbit",
      "raccoon",
      "ram",
      "rat",
      "reindeer",
      "reptile",
      "rhinoceros",
      "salamander",
      "seal",
      "sheep",
      "shrew",
      "silver fox",
      "skunk",
      "sloth",
      "snake",
      "squirrel",
      "tapir",
      "tiger",
      "toad",
      "turtle",
      "walrus",
      "warthog",
      "weasel",
      "whale",
      "wildcat",
      "wolf",
      "wolverine",
      "wombat",
      "woodchuck",
      "yak",
      "zebra"
    ];

let correctAnimal;
let options={
  rate:Math.random(),
  pitch:Math.random()
};

$(document).ready(function(){
  $('#score').html("THE WORD TO GUESS IS PRONOUNCED BACKWARDS<br><br>Click on the right answer or say I THINK IT'S followed by your guess<br>Say SAY IT AGAIN to repeat the word to guess<br>Say I GIVE UP if you can't find the word");
  $('#click-here').on('click', function(){
    this.remove();
    displayScore();
    startGame();
  });
  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    let commands = {
      'I give up': function() {
        //sets the number of correct answers to 0
        correctAnswers=0;
        displayScore();
        //finds the index of the animal in the array since it's the same id in the html
        let idAnimal = answers.indexOf(correctAnimal);
        $('#'+idAnimal).effect('shake');
        //after 2 secs, new round, to let time for the shake effect
        setTimeout(function(){
          $('.guess').remove();
          newRound();
        },2000);

      },
      'Say it again':function(){
        speakAnimal(correctAnimal);
      },
      "I think it's *tag":function(tag){
        console.log("I think it's "+tag);
        if(tag==correctAnimal){
          $('.guess').remove();
          setTimeout(newRound,2000);
          //adds 1 to the current score
          correctAnswers+=1;
          displayScore();

        }
        else{
          speakAnimal(correctAnimal);
          //sets the number of correct answers to 0
          correctAnswers=0;
          displayScore();

        }
      }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }
});

function startGame(){
  console.log('hey!');
  newRound();
}

//creates a new button in the html for each possible answer
function addButton(label, id){
  let $guess = $("<div class='guess' id='"+id+"'></div>");
  $guess.html(label);
  $guess.button();
  $guess.on('click', function(){
    //checks the clicked guesses
    if($guess.html()==correctAnimal){
      //adds 1 to the current score
      correctAnswers+=1;
      displayScore();
      $('.guess').remove();
      setTimeout(newRound,2000);
    }else{
      $(this).effect('shake');
      speakAnimal(correctAnimal);
      //sets the number of correct answers to 0
      correctAnswers=0;
      displayScore();

    }
  });
  //adds the buttons to the body
  $('body').append($guess);
}
//function that picks 6 new animals to display as possible answers
function newRound(){
  answers = [];
  for(i=0; i <= NUM_OPTIONS; i++){
    //random animal in the complete array of animals
    let animal = animals[Math.floor(Math.random()*animals.length)];
    //calls the function to create a new button with the random animal
    addButton(animal, i);
    answers.push(animal);
  }
  //selects the correct animal randomly in the array of answers and calls the function to speak it
  correctAnimal = answers[Math.floor(Math.random()*answers.length)];
  speakAnimal(correctAnimal);
}

//voice says the animal to find, backwards
function speakAnimal(animal){
  let reverseAnimal = animal.split('').reverse().join('');
  responsiveVoice.speak(reverseAnimal,"UK English Male" , options);

}
//displays the current score
function displayScore(){
  $('#score').html('You guessed '+correctAnswers+' animals right!');
}
