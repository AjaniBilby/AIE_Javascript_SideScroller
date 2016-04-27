<<<<<<< HEAD
var GameStartTime = Date.now();
var LoadedFiles = []; //Make LoadedFiles a global variable
var tickEvents = []; //Define list of functions to be called on tick
var c_filesLoading = 0;

var state = {
  current: 1,
  game: 1
};

/**Class Lib**/
  //Vector2 class
  var Vector2 = function (nX, nY){
    this.x = nX;
    this.y = nY;
  };

  Vector2.prototype.Set = function (ix, iy){
    this.x = ix;
    this.y = iy;
  };

  Vector2.prototype.Magnitude = function (){
    var mag = this.x*this.x + this.y*this.y
    mag = Math.sqrt(mag);
    return mag;
  }

  Vector2.prototype.Normalize = function (){ //destructive
    var mag = this.Magnitude();
    this.x /= mag;
    this.y /= mag;
  }

  Vector2.prototype.GetNormal = function (){
    var mag = this.Magnitude();
    var v2 = new Vector2(0,0);

    v2.x = this.x / mag;
    v2.y = this.y / mag;
    return v2;
  }

  Vector2.prototype.Add = function (other){
    this.x += other.x;
    this.y += other.y
  }

  Vector2.prototype.Multiply = function (scalar){
    this.x *= other.x;
    this.y *= other.y;
  }

/**Function Library Start**/

  function clamp(value, min, max){
    if (value < min){
      return min;
    }else if (value > max){
      return max;
    }else{
      return value;
    }
  };

  function GameTime(GameStartTime){
    time = Date.now() - GameStartTime;
      if (time > 60000){
        time = (time / 1000) / 60 + 'mins'
      }else{
        new_time = time / 1000 + 'sec'
        time = Math.floor(new_time);
      };
    return time
  };

  function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
      }
      return "";
  }

  function CreateFile(name, content){
  	textFile = null,
  	data = new Blob([content], {type: 'text/plain'});
  	if (textFile !== null){
  		window.URL.revokeObjectURL(data);
  	};
  	textFile = window.URL.createObjectURL(data);

  	return textFile;
  };

  function LoadJS(file){
    //Load File
    c_filesLoading += 1;
    var loading = true;
    var NewScript =document.createElement('script');
    NewScript.src = file;
    NewScript.type = 'text/javascript';
    NewScript.async = "async";
    NewScript.onload = setTimeout(function() { var loading = false; console.debug("Finnished Loading: " + file); c_filesLoading -= 1; }, 11);

    //Place in HTML document
    document.getElementsByTagName('head')[0].appendChild(NewScript);
  };


  function require(script){
    //Sets defualt state
    var NewFile = false;

    //Check if file is already Loaded
    index = LoadedFiles.indexOf(script, 0);

    //Check if scripts is in list. -1 means it is not in list
    if ( index == "-1" ){

      NewFile = true; //Tell it that it's a new scripts

      //Load File
      c_filesLoading += 1;
      var loading = true;
      var NewScript = document.createElement('script');
      NewScript.src = script;
      NewScript.type = 'text/javascript';
      NewScript.async = "async";
      NewScript.onload = setTimeout(function() { var loading = false; console.debug("Finnished Loading: " + script); c_filesLoading -= 1; }, 11);

      //Place in HTML document
      document.getElementsByTagName('head')[0].appendChild(NewScript);

      //Add File to loaded list
      LoadedFiles.push(script);

      setTimeout(function() { console.debug("Wait for load time") }, 10);
    };

      //Return if it is new
      return NewFile
    };
/**End Function Library**/

require("./scripts/sprite.js");
require("./scripts/howler.js");
require("./scripts/inputs.js");
require("./scripts/levelManager.js");
require("./scripts/display.js");
require("./scripts/objects/player.js");
=======
var GameStartTime = Date.now();
var LoadedFiles = []; //Make LoadedFiles a global variable
var tickEvents = []; //Define list of functions to be called on tick
var c_filesLoading = 0;

var state = {
  current: 1,
  game: 1
};

/**Class Lib**/
  //Vector2 class
  var Vector2 = function (nX, nY){
    this.x = nX;
    this.y = nY;
  };

  Vector2.prototype.Set = function (ix, iy){
    this.x = ix;
    this.y = iy;
  };

  Vector2.prototype.Magnitude = function (){
    var mag = this.x*this.x + this.y*this.y
    mag = Math.sqrt(mag);
    return mag;
  }

  Vector2.prototype.Normalize = function (){ //destructive
    var mag = this.Magnitude();
    this.x /= mag;
    this.y /= mag;
  }

  Vector2.prototype.GetNormal = function (){
    var mag = this.Magnitude();
    var v2 = new Vector2(0,0);

    v2.x = this.x / mag;
    v2.y = this.y / mag;
    return v2;
  }

  Vector2.prototype.Add = function (other){
    this.x += other.x;
    this.y += other.y
  }

  Vector2.prototype.Multiply = function (scalar){
    this.x *= other.x;
    this.y *= other.y;
  }

/**Function Library Start**/

  function clamp(value, min, max){
    if (value < min){
      return min;
    }else if (value > max){
      return max;
    }else{
      return value;
    }
  };

  function GameTime(GameStartTime){
    time = Date.now() - GameStartTime;
      if (time > 60000){
        time = (time / 1000) / 60 + 'mins'
      }else{
        new_time = time / 1000 + 'sec'
        time = Math.floor(new_time);
      };
    return time
  };

  function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
      }
      return "";
  }

  function CreateFile(name, content){
  	textFile = null,
  	data = new Blob([content], {type: 'text/plain'});
  	if (textFile !== null){
  		window.URL.revokeObjectURL(data);
  	};
  	textFile = window.URL.createObjectURL(data);

  	return textFile;
  };

  function LoadJS(file){
    //Load File
    c_filesLoading += 1;
    var loading = true;
    var NewScript =document.createElement('script');
    NewScript.src = file;
    NewScript.type = 'text/javascript';
    NewScript.async = "async";
    NewScript.onload = setTimeout(function() { var loading = false; console.debug("Finnished Loading: " + file); c_filesLoading -= 1; }, 11);

    //Place in HTML document
    document.getElementsByTagName('head')[0].appendChild(NewScript);
  };


  function require(script){
    //Sets defualt state
    var NewFile = false;

    //Check if file is already Loaded
    index = LoadedFiles.indexOf(script, 0);

    //Check if scripts is in list. -1 means it is not in list
    if ( index == "-1" ){

      NewFile = true; //Tell it that it's a new scripts

      //Load File
      c_filesLoading += 1;
      var loading = true;
      var NewScript = document.createElement('script');
      NewScript.src = script;
      NewScript.type = 'text/javascript';
      NewScript.async = "async";
      NewScript.onload = setTimeout(function() { var loading = false; console.debug("Finnished Loading: " + script); c_filesLoading -= 1; }, 11);

      //Place in HTML document
      document.getElementsByTagName('head')[0].appendChild(NewScript);

      //Add File to loaded list
      LoadedFiles.push(script);

      setTimeout(function() { console.debug("Wait for load time") }, 10);
    };

      //Return if it is new
      return NewFile
    };
/**End Function Library**/

require("./scripts/sprite.js");
require("./scripts/howler.js");
require("./scripts/inputs.js");
require("./scripts/levelManager.js");
require("./scripts/display.js");
require("./scripts/objects/player.js");
>>>>>>> origin/master
