//Create keyboard object
var Keyboard = function(){

  this.keyListeners = new Array();
  this.keys = new Array();

  //https://developer.mozilla.org/en-US/docs/DOM/KeyboardEvent
  this.KEY_BACKSPACE = 8;
  this.KEY_TAB = 9;
  this.KEY_ENTER = 13;
  this.KEY_SHIFT = 16;
  this.KEY_CTRL = 17;
  this.KEY_ALT = 18;
  this.KEY_BREAK = 19;
  this.KEY_PAUSE = 19;
  this.KEY_CAPSLOCK = 20;
  this.KEY_ESCAPE = 27;
  this.KEY_SPACE = 32;
  this.KEY_PAGEUP = 33;
  this.KEY_PAGEDOWN = 34;
  this.KEY_END = 35;
  this.KEY_HOME = 36;
  this.KEY_LEFT = 37;
  this.KEY_UP = 38;
  this.KEY_RIGHT = 39;
  this.KEY_DOWN = 40;
  this.KEY_INSERT = 45;
  this.KEY_DELETE = 46;
  this.KEY_0 = 48;
  this.KEY_1 = 49;
  this.KEY_2 = 50;
  this.KEY_3 = 51;
  this.KEY_4 = 52;
  this.KEY_5 = 53;
  this.KEY_6 = 54;
  this.KEY_7 = 55;
  this.KEY_8 = 56;
  this.KEY_9 = 57;
  this.KEY_A = 65;
  this.KEY_B = 66;
  this.KEY_C = 67;
  this.KEY_D = 68;
  this.KEY_E = 69;
  this.KEY_F = 70;
  this.KEY_G = 71;
  this.KEY_H = 72;
  this.KEY_I = 73;
  this.KEY_J = 74;
  this.KEY_K = 75;
  this.KEY_L = 76;
  this.KEY_M = 77;
  this.KEY_N = 78;
  this.KEY_P = 80;
  this.KEY_Q = 81;
  this.KEY_R = 82;
  this.KEY_S = 83;
  this.KEY_T = 84;
  this.KEY_U = 85;
  this.KEY_V = 86;
  this.KEY_W = 87;
  this.KEY_X = 88;
  this.KEY_Y = 89;
  this.KEY_Z = 90;
  this.KEY_LEFTWINDOWSKEY = 91;
  this.KEY_RIGHTWINDOWSKEY = 92;
  this.KEY_SELECT = 93;
  this.KEY_NUM0 = 96;
  this.KEY_NUM1 = 97;
  this.KEY_NUM2 = 98;
  this.KEY_NUM3 = 99;
  this.KEY_NUM4 = 100;
  this.KEY_NUM5 = 101;
  this.KEY_NUM6 = 102;
  this.KEY_NUM7 = 103;
  this.KEY_NUM8 = 104;
  this.KEY_NUM9 = 105;
  this.KEY_MULTIPLY = 106;
  this.KEY_ADD = 107;
  this.KEY_SUBTRACT = 109;
  this.KEY_DECIMALPOINT = 110;
  this.KEY_DIVIDE = 111;
  this.KEY_F1 = 112;
  this.KEY_F2 = 113;
  this.KEY_F3 = 114;
  this.KEY_F4 = 115;
  this.KEY_F5 = 116;
  this.KEY_F6 = 117;
  this.KEY_F7 = 118;
  this.KEY_F9 = 120;
  this.KEY_F10 = 121;
  this.KEY_F11 = 122;
  this.KEY_F12 = 123;
  this.KEY_NUMLOCK = 144;
  this.KEY_SCROLLLOCK = 145;
  this.KEY_SEMICOLON = 186;
  this.KEY_EQUAL = 187;
  this.KEY_COMMA = 188;
  this.KEY_DASH = 189;
  this.KEY_PERIOD = 190;
  this.KEY_FORWARDSLASH = 191;
  this.KEY_GRAVEACCENT = 192;
  this.KEY_OPENBRACKET = 219;
  this.KEY_BACKSLASH = 220;
  this.KEY_CLOSEBRACKET = 221;
  this.KEY_SINGLEQUOTE = 222;
};

//Keyboard Functions
Keyboard.prototype.onKeyDown = function(evt){
  this.keys[evt.keyCode] = true;
};
Keyboard.prototype.onKeyUp = function(evt){
  this.keys[evt.keyCode] = false;
};
Keyboard.prototype.isKeyDown = function(keyCode){
  return this.keys[keyCode];
};

var keyboard = new Keyboard();

window.addEventListener('keydown', function(evt){keyboard.onKeyDown(evt); }, false);
window.addEventListener('keyup', function(evt){ keyboard.onKeyUp(evt); }, false);
