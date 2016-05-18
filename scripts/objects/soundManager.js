require("./scripts/howler.js");

var fireSound = new Howl({
  urls: ["./sounds/fireEffect.ogg"],
  loop: false,
  buffer: true,
  volume: 0.5
});

var backgroundMusic = {
  state: "start",
  start: {volume: 0.25, sound: new Howl({urls: ["./sounds/Music/Intro.ogg"], loop: true, buffer: true, volume: 0.25, onend: function(){SongSectFin()}})},
  main: {volume: 1, sound: new Howl({urls: ["./sounds/Music/Main.ogg"], loop: true, buffer: true, volume: 1, onend: function(){SongSectFin()}})},
  end: {volume: 1, sound: new Howl({urls: ["./sounds/Music/End.ogg"], loop: false, buffer: true, volume: 1, onend: function(){SongSectFin()}})}
}

function SongSectFin(){
  //Stop other songs that might be playing
  switch (backgroundMusic.state){
    case "start":
      backgroundMusic["end"].sound.stop();
      backgroundMusic["main"].sound.stop();
      break;
    case "main":
      backgroundMusic["end"].sound.stop();
      backgroundMusic["start"].sound.stop();
      break;
    case "end":
      backgroundMusic["main"].sound.stop();
      backgroundMusic["start"].sound.stop();
      break;
    defualt:
      console.error("Music Error: Cannot find state ("+backgroundMusic.state+")");
  }
};

function TransitionSong(aim){
  backgroundMusic[backgroundMusic.state].sound.fade(backgroundMusic[backgroundMusic.state].volume, 0, 1000);
  backgroundMusic[aim].sound.play().fade(0, backgroundMusic[aim].volume, 1000);
  backgroundMusic.state = aim;
}
TransitionSong("start");
