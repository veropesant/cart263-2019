/*****************
Véronique Pesant
Véronique Pesant

This is a template. You must fill in the title,
author, and this description to match your project!

******************/

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() { this.time.events.add(Phaser.Timer.SECOND*2, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['VT323']
    }

};

//variables related to avatar
var dino;
var player;
var playerActive=true;

//variables related to the chicken
var eat=false;
var food;
var chicken;
var textChicken;
var chickenSpeakCount=0;
var deadChicken;
//variables related to the world
var allPlatforms;
var platform;
var smallPlatform;
var vSmallPlatform;
var ground;

//variables related to the enemy (bombs)
var bombs;
var bombActive=true;

//variables related to game setting
var maxScore=50;
var score = 0;
var scoreText;
var gameOverText="";
var gameOverTextDisplay;
var winState;
var instructionText;
var game = new Phaser.Game(config);

//Checks if document is ready to then check if annyang is ready to operate
$(document).ready(function(){
  console.log('ready');
  if (annyang) {
  //defining the commands
    var commands = {
      //when you say Jump you idiot! the dino can jump
      'Jump you idiot': function(){
        jump();
      }
    };
    // Add  commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();
  }
});

//function to load the images before the game starts
function preload ()
{
  this.load.image('sky', 'assets/images/sky.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.image('smallPlatform', 'assets/images/small-platform.png');
  this.load.image('vSmallPlatform', 'assets/images/v-small-platform.png');
  this.load.image('ground', 'assets/images/ground.png');
  this.load.image('bomb', 'assets/images/bomb.png');

  //loading the spritesheets for the animations
  this.load.spritesheet('dino',
      'assets/images/dino5.png',
      { frameWidth: 71, frameHeight: 50 }
  );

  this.load.spritesheet('deadChicken',
      'assets/images/chicken2.png',
      { frameWidth: 29, frameHeight: 30 }
  );

  //  Load the Google WebFont Loader script
  this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}

//create all the elements that compose the world
function create ()
{
  //CREATING BACKGROUND
  this.add.image(400, 300, 'sky');

  //CREATING INSTRUCTION TEXT
  instructionText = this.add.text(16, 50, 'Say DIE to fucking eat your fucking chicken\nand JUMP YOU IDIOT! to make the dino fucking jump!\nThis game is hard as SHIT\nDON\'T TOUCH THE BOMBS', { fontSize: '30px', fill: '#000', fontFamily:'VT323'});
  setTimeout(function(){
    instructionText.destroy();
  },10000);

  //CREATING SCORE TEXT
  scoreText = this.add.text(16, 16, 'SCORE: '+score, { fontSize: '30px', fill: '#fff', fontFamily:'VT323'});

  //CREATING CHICKEN TEXT
  textChicken = this.add.text(-200, -200, 'FUCK OFF!', { fontSize: '18px', fill: '#000', fontFamily:'VT323'});




  //CREATING PLATFORMS
  //creates a group of platforms with basic physics
  platforms = this.physics.add.staticGroup();

  //creates and places all the platforms and the ground
  platforms.create(400, 590, 'ground').setScale(1.08).refreshBody();

  platforms.create(600, 400, 'platform');
  platforms.create(100, 350, 'smallPlatform');
  platforms.create(330, 500, 'smallPlatform');
  platforms.create(600, 270, 'smallPlatform');
  platforms.create(350, 300, 'vSmallPlatform');

  //GAME OVER TEXT DISPLAYED OUTSIDE THE CANVAS FOR NOW
  gameOverTextDisplay = this.add.text(-1000, -1000, 'GAME OVER!', { fontSize: '80px', fill: '#000', fontFamily:'VT323'});

  //CREATING PLAYER
  player = this.physics.add.sprite(100, 450, 'dino');

  //make the player bounce when he touches the ground (once at the beginning)
  player.setBounce(0.2);
  //sets the limits of the world to the player
  player.setCollideWorldBounds(true);

  //CREATNG ALL THE ANIMATIONS, BUT DON'T ACTIVATE THEM RIGHT AWAY
  //activated when the dino eats a chicken
  this.anims.create({
      key: 'eating',
      frames: this.anims.generateFrameNumbers('dino', { start: 5, end: 6 }),
      frameRate: 10,
      repeat: -1

  });
  //activated when a chicken dies
  this.anims.create({
      key: 'die',
      frames: this.anims.generateFrameNumbers('deadChicken', { start: 0, end: 1 }),
      frameRate: 10
  });

  //activated when the dino moves to the left
  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dino', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
  });

  //activated when the dino stads still
  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dino', frame: 2 } ],
      frameRate: 20
  });

  //activated when the dino moves to the right
  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dino', { start: 3, end: 4 }),
      frameRate: 10,
      repeat: -1
  });

  //activated when the dino touches a bomb and dies
  this.anims.create({
      key: 'dinoDie',
      frames: [ { key: 'dino', frame: 7 } ],
      frameRate: 10
  });


  player.anims.play('eating',true);
  //CREATES ALL THE ENEMEY CHICKEN IN A GROUP
  food = this.physics.add.group({
    key: 'deadChicken',
    repeat: 4, //creates 5 chicken
    setXY: { x: 120, y: 0, stepX: 120 } //sets the position of the first chicken to x=120 and the next ones 120 farther every time
  });

  //adds a bounce to each child of the group 'food' when they touch the ground for the first time
  food.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

  });

  //creates a group for the bombs, with basic physics
  bombs = this.physics.add.group();
  //add a collision detector between the bombs and the player and the bombs and the platforms
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player, bombs, hitBomb, null, this);
  createBomb();

  //add a collision detector between the player and the food
  this.physics.add.overlap(player, food, collectFood, null, this);
  //add a collision detector between the platforms and the food
  this.physics.add.collider(food, platforms);
  //add a collision detector between the player and the platforms
  this.physics.add.collider(player, platforms);

}

//function to calculate distance between chicken and dino
//this function was found on stackOverflow
function distance(x1, y1, x2, y2) {

        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);

}

//function called every frame
function update ()
{

  //allows to check keyboard events
  cursors = this.input.keyboard.createCursorKeys();



  //when arrow left is pressed
  if (cursors.left.isDown)
  {
    //verifies that player is active before animating
    if(playerActive){
      player.setVelocityX(-60);

      player.anims.play('left', true);
    }

  }
  //when arrow right is pressed
  else if (cursors.right.isDown)
  {
    //verifies that player is active before animating
    if(playerActive){
      player.setVelocityX(60);
      player.anims.play('right', true);
    }

  }
  //verifies that player is active before animating and that eating is allwed
  else if(!eat && playerActive)
  {
      player.setVelocityX(0);

      player.anims.play('turn');
  }
  //when arrow up is pressed and that the player is touching the ground (avoid infinite jump)
  if (cursors.up.isDown && player.body.touching.down)
  {
    //verifies that player is active before animating
    if(playerActive){
      //player jump
      player.setVelocityY(-300);
    }

  }
  //to go through each child of the group
  food.children.iterate(function (child) {
      //checks if the dinosaur is close but not touching yet
      if(distance(this.player.x, this.player.y, child.x, child.y) <= 100 && child.body.enable){
        //displays the text that says 'FUCK OFF' next to the current chicken
        textChicken.x = child.x+child.width/2;
        textChicken.y = child.y-child.height/2;
        //check if the chicken already talked, if not make it talk
        if(!responsiveVoice.isPlaying() && chickenSpeakCount < 1) {
          chickenSpeakCount = chickenSpeakCount +1;
          responsiveVoice.speak("FUCK OFF, you monster!", "US English Female", {pitch: 2}, {rate: 50});
        }
        //if the dinosaur goes away, hide the 'FUCK OFF' text
      }else if(distance(this.player.x, this.player.y, child.x, child.y) > 101 && distance(this.player.x, this.player.y, child.x, child.y)<125){
        textChicken.x = 1000;
        textChicken.y = 1000;
        //resets the variable to 0 to allow chicken to talk again next time
        chickenSpeakCount=0;
      }

  });



}


function createBomb(){
//creates the bombs every 10 seconds if the last bomb created
//isn't on the canvas anymore and if the player is active (so not dead, or didn't win yet)
//I ended up using only one bomb tho so not really useful
  setInterval(function(){
    if(bombActive && playerActive)
    {
      bombActive=false;
      var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      var bomb = bombs.create(x, 16, 'bomb');
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

  }, 10000);

}

//makes the 'Stand still' animation stops, so that the eating animation can be played
function allowEat(){
  eat=true;
}
//function to handle score and game win
function collectFood (player, food)
{
    //adds a new voice command on the word 'die' to eat the chicken
    var commands = {'Die': function () {
      //makes the 'Stand still' animation stops, so that the eating animation can be played
      eat = true;
      //deactivate eat after 0.25sec
      setTimeout(function(){
        eat=false;
      },250);

      //resets speak to allow to speak again
      chickenSpeakCount=0;
      player.anims.play("eating",true);

      //aniamtion for the death of the chicken
      food.play("die", true);
      //makes the body undetectable for the player so that interactions don't work anymore
      food.disableBody();

      //increment score
      score += 10;
      //if the player reaches the max score, game over they win.
      if(score >= maxScore){
        winState = true;
        gameOver(winState);

      }
      //displays the right score
      scoreText.setText('SCORE: ' + score);
      textChicken.x = 1000;

      //dino speaks after he kills
      responsiveVoice.speak("Die, fucking chicken!", "US English Male", {pitch: 2}, {rate: 50});
      //remove the command 'Die' to add it again when the next chicken is overlaping
      annyang.removeCommands('Die');
    }};

    //actually adds the new 'Die' command
    annyang.addCommands(commands);


}

//called when the player gets hit by a bomb
function hitBomb(player, bomb){
  //the bomb is removed from the game
  bomb.destroy();
  //player can't move anymore
  playerActive=false;
  winState=false;
  gameOver(winState);
}

function gameOver(state){
  //deactivate everything that could allow the player to keep playing
  bombActive = true;
  eat=false;
  playerActive=false;
  gameOverTextDisplay.x=config.width/3;
  gameOverTextDisplay.y=config.height/3;

  //plays right animation depending on the value received
  if(!winState){
    player.anims.play("dinoDie",true);
  }else{
    player.anims.play("turn",true);
  }
}

//makes the player jump when the right voice command is said
function jump(){
  //checks if player is touching the ground before jumping
  if (player.body.touching.down)
  {
      player.setVelocityY(-300);
  }
}
