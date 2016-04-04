var dt = 1.0;
var lastTime;

require("./scripts/display.js");

console.debug("Running Main Script...");

/**Tick**/
function run() {
    //Handel Delta
    var now = Date.now();
    dt = (now - lastTime) / 1000.0;
    lastTime = now;

    InputHandeler(dt);

    if (c_filesLoading > 0){
      //Draw Loading
      context.fillStyle = "rgb(209, 209, 209)"
      context.font = "38px Arial";
      var txt = "Loading... ";
      context.fillText(txt, (15), (SCREEN_HEIGHT - 40));

      //To stop the game from running while loading
      return;
    };

    for (i=0; i<tickEvents.length; i++){
      window[tickEvents[i]](dt);
    }
};

function GameRun(){
  //Fill Background
  context.fillStyle = "rgba(0, 0, 0, 1)";
  context.fillRect(0, 0, canvas.width, canvas.height);
};

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
