var shootTimer = 0;
var KeysDown = [];

/**Input Handler**/
function InputHandeler(dt) {

    //console.log(KeysDown)
};

/**Take RAW input**/
function onKeyDown(event) { KeysDown[event.keyCode] = true };
function onKeyUp(event) { KeysDown[event.keyCode] = false };

/**Add Event Listenter**/
window.addEventListener('keydown', function (evt) { onKeyDown(evt); }, false);
window.addEventListener('keyup', function (evt) { onKeyUp(evt); }, false);
