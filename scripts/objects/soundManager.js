var fireSound = new Howl({
  urls: ["./sounds/fireEffect.ogg"],
  loop: false,
  buffer: true,
  volume: 1
});

var backgroundMusic = {
  state: "start-up",
  start: new Howl({urls: ["./sounds/Music/Intro.ogg"], loop: false, buffer: true, volume: 0.75, onend: function(){songSectFin()}}),
  main: new Howl({urls: ["./sounds/Music/Main.ogg"], loop: false, buffer: true, volume: 0.75, onend: function(){songSectFin()}}),
  end: new Howl({urls: ["./sounds/Music/End.ogg"], loop: false, buffer: true, volume: 0.75, onend: function(){songSectFin()}})
}

function songSectFin(){
  console.log(backgroundMusic.state)
  //Play sond by state
  switch (backgroundMusic.state){
    case "start-up":
      backgroundMusic.start.play();
      break;
    case "main":
      console.log("playing Main")
      backgroundMusic.main.play();
      break;
    case "end":
      backgroundMusic.end.play();
      break;
    defualt:
      console.log("Errors")
  }
  console.log("YUS!")
};

backgroundMusic.start.play();
