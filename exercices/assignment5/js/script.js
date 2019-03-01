/*****************

Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!

******************/
let answers;
let NUM_OPTIONS = 5;
let animals = [
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
  $('#click-here').on('click', function(){
    this.remove();
    startGame();
  });
  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    let commands = {
      'I give up': function() {
        $('.guess').remove();
        newRound();
      },
      'Say it again':function(){
        speakAnimal(correctAnimal);
      },
      "I think it's *tag":function(tag){
        console.log("I think it's "+tag);
        if(tag==correctAnimal){
          $('.guess').remove();
          setTimeout(newRound,2000);
        }
        else{
          speakAnimal(correctAnimal);
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

function addButton(label){
  let $guess = $("<div class='guess'></div>");
  $guess.html(label);
  $guess.button();
  $guess.on('click', function(){

    if($guess.html()==correctAnimal){
      $('.guess').remove();
      setTimeout(newRound,2000);
    }else{
      $(this).effect('shake');
      speakAnimal(correctAnimal);
    }
  });
  $('body').append($guess);
}

function newRound(){
  answers = [];
  for(i=0; i <= NUM_OPTIONS; i++){
    let animal = animals[Math.floor(Math.random()*animals.length)];
    addButton(animal);
    answers.push(animal);
  }
  correctAnimal = answers[Math.floor(Math.random()*answers.length)];
  speakAnimal(correctAnimal);
}

function speakAnimal(animal){
  let reverseAnimal = animal.split('').reverse().join('');
  responsiveVoice.speak(reverseAnimal,"UK English Male" , options);

}
