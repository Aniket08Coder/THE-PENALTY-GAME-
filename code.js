var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["257d7c79-6231-4e4e-af95-addb1d649580","f62312e0-f3c9-4c12-9824-87e599a3304f","73be827c-158c-4c6a-88f7-7b3fb453afcb"],"propsByKey":{"257d7c79-6231-4e4e-af95-addb1d649580":{"name":"soccer_bw_1","sourceUrl":"assets/api/v1/animation-library/gamelab/KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG/category_sports/soccer_bw.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/KAKckB.0WJDP55kNGzIZIfW5wf7Rk5mG/category_sports/soccer_bw.png"},"f62312e0-f3c9-4c12-9824-87e599a3304f":{"name":"thePlayer","sourceUrl":null,"frameSize":{"x":252,"y":422},"frameCount":1,"looping":true,"frameDelay":12,"version":"K86wOn26kQYW07uEUl2SX0iInvK1RkUt","categories":["people"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":252,"y":422},"rootRelativePath":"assets/f62312e0-f3c9-4c12-9824-87e599a3304f.png"},"73be827c-158c-4c6a-88f7-7b3fb453afcb":{"name":"goalKeeper","sourceUrl":null,"frameSize":{"x":480,"y":847},"frameCount":1,"looping":true,"frameDelay":12,"version":"9J.YlvdTPFE2dsydE_vMrGeVU.dEwEqa","categories":["robots"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":480,"y":847},"rootRelativePath":"assets/73be827c-158c-4c6a-88f7-7b3fb453afcb.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

// the goal and the colour
var thegoal = createSprite(350,200,10,200);
var theGoal = createSprite(330,300,50,10);
theGoal.shapeColor= "black";
var theGoal1 = createSprite(330,100,50,10);
theGoal1.shapeColor= "black";
thegoal.shapeColor= "black";
// the page borders
var border1 = createSprite(380,200,10,400); 
border1.shapeColor="yellow";
var border2 = createSprite(20,200,10,400);
border2.shapeColor="yellow";
var border3 = createSprite(200,20,400,10);
border3.shapeColor="yellow";
var border4 = createSprite(200,380,400,10);
border4.shapeColor="yellow";
// the player 
var thePlayer = createSprite(100,200,30,30);
thePlayer.setAnimation("thePlayer");
thePlayer.scale=0.15;
// the goalKeeper
var goalKeeper = createSprite(300,200,30,30);
goalKeeper.setAnimation("goalKeeper");
goalKeeper.scale=0.08;
goalKeeper.velocityY=10;
// the ball 
var theBall =createSprite(150,200,20,20);
theBall.setAnimation("soccer_bw_1");
theBall.scale=0.05;
// the varibles
var lifes = 10 ;
var score = 0 ;
// the game state
var gameState = "start";
function draw() {
  // background
background("lightgreen");
// the score board
text("Score=",50,50);
text(score, 100,50);
text("LIFES=",250,50);
text(lifes, 300,50);
// the counditions
if (theBall.isTouching(thegoal)||theBall.isTouching(theGoal)||theBall.isTouching(theGoal1)) {
playSound("https://audio.code.org/winpoint1.mp3", false);
}
if (theBall.isTouching(goalKeeper)) {
  playSound("https://audio.code.org/failure1.mp3", false);
  
}
if (keyDown("LEFT_ARROW")) {
thePlayer.x=thePlayer.x-5 ; 
}
if (keyDown("RIGHT_ARROW")) {
thePlayer.x=thePlayer.x+5 ; 
}
if (keyDown("UP_ARROW")) {
thePlayer.y=thePlayer.y-5 ; 
}
if (keyDown("DOWN_ARROW")) {
thePlayer.y=thePlayer.y+5 ; 
}
if (thePlayer.isTouching(theBall)&&keyDown("K")) {
shootBall();
gameState="play";
}
if(theBall.isTouching(thegoal)||theBall.isTouching(theGoal)||theBall.isTouching(theGoal1)){
 resetBall(); 
 gameState = "reset";
}
if(theBall.isTouching(goalKeeper)){
  minusPoints();
  gameState = "reset";
}
 if (score === 10 ){
    gameState = "over";
    text("Congrats!You Won!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  if (lifes=== 0 ){
    gameState = "over";
    text("YOU LOST😫!!TRY AGAIN",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    score = 0;
    lifes = 10;
}

// the bounce Off fuctions
thePlayer.bounceOff(border1);
thePlayer.bounceOff(border2);
thePlayer.bounceOff(border3);
thePlayer.bounceOff(border4);
thePlayer.bounceOff(thegoal);
goalKeeper.bounceOff(theGoal);
goalKeeper.bounceOff(theGoal1);
theBall.bounceOff(thegoal);
theBall.bounceOff(theGoal);
theBall.bounceOff(theGoal1);
theBall.bounceOff(goalKeeper);

drawSprites();
}
// the fucntions
function shootBall() {
theBall.velocityX=20;
theBall.velocityY=10;
}
function resetBall() {
theBall.x = 150;
theBall.y=200;
theBall.velocityX=0;
theBall.velocityY=0;
score = score+1;
}
function minusPoints() {
theBall.x = 150;
theBall.y=200;
theBall.velocityX=0;
theBall.velocityY=0;
lifes = lifes-1;  
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
