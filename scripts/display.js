var dt = 1.0;
var lastTime;

require("./scripts/display.js");

console.debug("Running Main Script...");

//Camera
var camera = {
  location: new Vector2(0, 0)
}

/**Tick**/
function run() {
    //Handel Delta
    var now = Date.now();
    dt = (now - lastTime) / 1000.0;
    lastTime = now;

    if (c_filesLoading > 0){
      //Draw Loading
      context.fillStyle = "rgb(209, 209, 209)"
      context.font = "38px Arial";
      var txt = "Loading... ";
      context.fillText(txt, (15), (SCREEN_HEIGHT - 40));

      //To stop the game from running while loading
      return;
    };

   switch (state.current){
    case state.start:
      SplashRun();
      break;
    case state.game:
      //Fill Background
      context.fillStyle = "rgba(0, 100, 255, 1)";
      context.fillRect(0, 0, canvas.width, canvas.height);
      GameRun();
      break;
    case state.win:
      WinState();
      break;
    case state.death:
      DeathRun();
      break;
    default:
      console.error("Game Error: Cannot find state ("+state.current+")");
   };
};

function GameRun(){
  //Play sound
  if (backgroundMusic.state != "main"){
    TransitionSong("main");
  }

  //Run game tickEvents
  for (i=0; i<tickEvents.length; i++){
    window[tickEvents[i]](dt);
  }
};

function SplashRun(){
  //Play sound
  if (backgroundMusic.state != "start"){
    TransitionSong("start");
  }

  //Draw Background
  context.fillStyle = "rgb(0, 0, 0)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  //Draw Title
  context.fillStyle = "rgb(209, 209, 209)"
  context.font = "38px Arial";
  var txt = "Welcome to Side Scrolling Shooter"
  context.fillText(txt, (SCREEN_WIDTH / 2 - context.measureText(txt).width / 2), (SCREEN_HEIGHT /2 - 150));

  //Draw Author
  context.fillStyle = "rgb(247, 245, 40)"
  context.font = "14px Arial";
  var txt = 'By: Ajani James Bilby'
  context.fillText(txt, (SCREEN_WIDTH / 2 - context.measureText(txt).width / 2), (SCREEN_HEIGHT /2 - 100));

  //Draw COntrols
  context.fillStyle = "rgb(255, 255, 255)"
  context.font = "18px Arial";
  var txt = 'Controls'
  context.fillText(txt, (SCREEN_WIDTH / 2 - context.measureText(txt).width / 2), (SCREEN_HEIGHT /2 - 5));
  context.fillStyle = "rgb(255, 255, 255)"
  context.font = "14px Arial";
  var txt = 'Movement: / W / S / A / D /'
  context.fillText(txt, (SCREEN_WIDTH / 2 - context.measureText(txt).width / 2), (SCREEN_HEIGHT /2 + 15));
  context.fillStyle = "rgb(255, 255, 255)"
  context.font = "14px Arial";
  var txt = 'Shoot: Space'
  context.fillText(txt, (SCREEN_WIDTH / 2 - context.measureText(txt).width / 2), (SCREEN_HEIGHT /2 + 30));
  context.fillStyle = "rgb(255, 255, 255)"
  context.font = "14px Arial";
  var txt = 'To change health: Q/E (debug)'
  context.fillText(txt, (SCREEN_WIDTH / 2 - context.measureText(txt).width / 2), (SCREEN_HEIGHT /2 + 45));

  //Draw Press Start Text
  context.fillStyle = "rgb(255, 255, 255)"
  context.font = "14px Arial";
  var txt = 'Press Any Key To Start'
  context.fillText(txt, (SCREEN_WIDTH / 2 - context.measureText(txt).width / 2), (SCREEN_HEIGHT /2 + 80));

  //Draw music Text
  context.fillStyle = "rgb(255, 255, 255)"
  context.font = "14px Arial";
  var txt = 'Music: Sim Gretina - Moist Mechas'
  context.fillText(txt, (18), (SCREEN_HEIGHT - 18));

  if (keyboard.keysDown > 0){
    state.current = state.game;
    console.log("any key")
  }
};

function DeathRun(){
  //Play sound
  if (backgroundMusic.state != "end"){
    TransitionSong("end");
  }

  //Draw Death Message
  context.fillStyle = "rgb(209, 209, 209)"
  context.font = "38px Arial";
  var txt = 'You dun broke'
  context.fillText(txt, (SCREEN_WIDTH / 2 - context.measureText(txt).width / 2), (SCREEN_HEIGHT /2 - 150));

  //Draw Restart
  context.fillStyle = "rgb(255, 255, 255)"
  context.font = "14px Arial";
  var txt = 'Press R to Restart'
  context.fillText(txt, (SCREEN_WIDTH / 2 - context.measureText(txt).width / 2), (SCREEN_HEIGHT /2 + 110));

  //If R is pressed reset
  if ((keyboard.isKeyDown(keyboard.KEY_R) == true) || (keyboard.isKeyDown(keyboard.KEY_SPACE) == true)){
    state.current = state.game
    reset();
  }
};

function WinState(){
  //Draw Death Message
  context.fillStyle = "rgb(209, 209, 209)"
  context.font = "38px Arial";
  var txt = 'You won'
  context.fillText(txt, (SCREEN_WIDTH / 2 - context.measureText(txt).width / 2), (SCREEN_HEIGHT /2 - 150));

  //Draw Restart
  context.fillStyle = "rgb(255, 255, 255)"
  context.font = "14px Arial";
  var txt = 'Press Space to goto main menu'
  context.fillText(txt, (SCREEN_WIDTH / 2 - context.measureText(txt).width / 2), (SCREEN_HEIGHT /2 + 110));

  //If Space is pressed reset
  if (keyboard.isKeyDown(keyboard.KEY_SPACE) == true){
    state.current = state.start;
    reset();
  }
}

function reset(){
  player = new class_Player();
  GenerateLevel();
}

/**On Window Resize**/
function EventResize() {
    SCREEN_WIDTH = window.innerWidth - 0;
    SCREEN_HEIGHT = window.innerHeight - 3.5;
    canvas.height = SCREEN_HEIGHT;
    canvas.width = SCREEN_WIDTH;
};
window.addEventListener("resize", function () { EventResize(); }, false);
EventResize();

//-------------------- Don't modify anything below here
// This code will set up the framework so that the 'run' function is
// called 60 times per second. We have some options to fall back on
// in case the browser doesn't support our preferred method.
(function () {
    var onEachFrame;
    if (window.requestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.requestAnimationFrame(_cb); }
            _cb();
        };
    } else if (window.mozRequestAnimationFrame) {
        onEachFrame = function (cb) {
            var _cb = function () { cb(); window.mozRequestAnimationFrame(_cb); }
            _cb();
        };
    } else {
        onEachFrame = function (cb) {
            setInterval(cb, 1000 / MAXFRAMECOUNT);
        }
    }
    window.onEachFrame = onEachFrame;
})();
window.onEachFrame(run);
