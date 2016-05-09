var fireSound = new Howl({
  urls: ["./sounds/fireEffect.ogg"],
  loop: false,
  buffer: true,
  volume: 1
});

var backgroundMusic = {
  state: "start-up",
  sound: new Howl({urls: ["./sounds/Music/Intro.ogg"], loop: false, buffer: true, volume: 0.75, onend: function(){songSectFin()}})
}

function songSectFin(){
  switch (backgroundMusic.state){
    case "start-up":
      backgroundMusic.sound.urls = ["./sounds/Music/Intro.ogg"];
      backgroundMusic.sound.play();
      break;
    case "Main":
      console.log("playing Main")
      backgroundMusic.sound.urls = ["./sounds/Music/Main.ogg"];
      backgroundMusic.sound.play();
      break;
    case "End":
      backgroundMusic.sound.urls = ["./sounds/Music/End.ogg"];
      backgroundMusic.sound.play();
      break;
    defualt:
      console.log("Errors")
  }
  console.log("YUS!")
};

backgroundMusic.sound.play();
