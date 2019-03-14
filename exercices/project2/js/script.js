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
var dino;
var eat=false;
var player;
var allPlatforms;
var food;
var chicken;
var platform;
var smallPlatform;
var vSmallPlatform;
var ground;
var score = 0;
var scoreText;
var textChicken;
var chickenSpeakCount=0;
var game = new Phaser.Game(config);

$(document).ready(function(){
  console.log('ready');
  if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      //when you say fuck, the dino can jump
      'Damn': function(){
        jump();
      },
      'Pain': function(){
        jump();
      },
      'Dumb': function(){
        jump();
      },
      'You suck': function(){
        jump();
      }
    };

    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
  }
});

function preload ()
{
  this.load.image('sky', 'assets/images/sky.png');
  this.load.image('platform', 'assets/images/platform.png');
  this.load.image('smallPlatform', 'assets/images/small-platform.png');
  this.load.image('vSmallPlatform', 'assets/images/v-small-platform.png');
  this.load.image('ground', 'assets/images/ground.png');
  this.load.image('chicken', 'assets/images/chicken.png');
  this.load.spritesheet('dino',
      'assets/images/dino3.png',
      { frameWidth: 72, frameHeight: 50 }
  );
  //  Load the Google WebFont Loader script
  this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
}

function create ()
{
  //BACKGROUND
  this.add.image(400, 300, 'sky');

  //SCORE
  scoreText = this.add.text(16, 16, 'SCORE: 0', { fontSize: '30px', fill: '#fff', fontFamily:'VT323'});

  //CHICKEN TEXT
  textChicken = this.add.text(-200, -200, 'FUCK OFF!', { fontSize: '18px', fill: '#000', fontFamily:'VT323'});


  //PLATFORMS
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 590, 'ground').setScale(1.08).refreshBody();

  platforms.create(600, 400, 'platform');
  platforms.create(290, 100, 'smallPlatform');
  platforms.create(60, 250, 'smallPlatform');
  platforms.create(330, 500, 'smallPlatform');
  platforms.create(600, 170, 'smallPlatform');
  platforms.create(760, 250, 'vSmallPlatform');
  platforms.create(350, 300, 'vSmallPlatform');



  //PLAYER
  player = this.physics.add.sprite(100, 450, 'dino');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);


  this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dino', { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'dino', frame: 2 } ],
      frameRate: 20
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dino', { start: 3, end: 4 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'eat',
      frames: this.anims.generateFrameNumbers('dino', { start: 5, end: 6 }),
      frameRate: 2,
      repeat: -1
  });

  //CHICKEN
  food = this.physics.add.group({
    key: 'chicken',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  food.children.iterate(function (child) {

      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));


  });
  this.physics.add.overlap(player, food, collectFood, null, this);
  this.physics.add.collider(food, platforms);
  this.physics.add.collider(player, platforms);

}

//function to calculate distance between chicken and dino
function distance(x1, y1, x2, y2) {

        var dx = x1 - x2;
        var dy = y1 - y2;

        return Math.sqrt(dx * dx + dy * dy);

}

function update ()
{
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown)
  {
      player.setVelocityX(-60);

      player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
      player.setVelocityX(60);

      player.anims.play('right', true);
  }
  else
  {
      player.setVelocityX(0);

      player.anims.play('turn');
  }

  if(eat==true){
    player.anims.play('eat');
  }

  if (cursors.up.isDown && player.body.touching.down)
  {
      player.setVelocityY(-330);
  }

  food.children.iterate(function (child) {

      if(distance(this.player.x, this.player.y, child.x, child.y) <= 100){
        textChicken.x = child.x+child.width/2;
        textChicken.y = child.y-child.height/2;
        if(!responsiveVoice.isPlaying() && chickenSpeakCount < 1) {
          chickenSpeakCount = chickenSpeakCount +1;
          responsiveVoice.speak("FUCK OFF, you monster!", "US English Female", {pitch: 2}, {rate: 50});
        }
      }

  });



}

function allowEat(){
  eat=true;
}
function collectFood (player, food)
{
    //food.disableBody(true, true);
    var commands = {'Die': allowEat};
    annyang.addCommands(commands);

    if(eat){
      eat=false;
      player.anims.play('eat');
      chickenSpeakCount=0;
      food.destroy();
      score += 10;
      scoreText.setText('SCORE: ' + score);
      textChicken.x = -200;
      responsiveVoice.speak("Die, fucking chicken!", "US English Male", {pitch: 2}, {rate: 50});
    }

}

function jump(){

  if (player.body.touching.down)
  {
      player.setVelocityY(-300);
  }
}
