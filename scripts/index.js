var GameStartTime = Date.now();
var LoadedFiles = []; //Make LoadedFiles a global variable
var tickEvents = []; //Define list of functions to be called on tick
var c_filesLoading = 0;
var state = {
  current: 1,
  game: 1
};


/**Function Library Start**/
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

var LoadedFiles = []; //Make LoadedFiles a global variable

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
    var NewScript =document.createElement('script');
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


require("./scripts/inputs.js");
require("./scripts/howler.js");
require("./scripts/levelManager.js");
require("./scripts/display.js");
require("./scripts/objects/player.js");
