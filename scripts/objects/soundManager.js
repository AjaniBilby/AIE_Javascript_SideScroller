var fireSound = new Howl({
  urls: ["./sounds/fireEffect.ogg"],
  loop: false,
  buffer: true,
  volume: 1
});

var backgroundMusic = new Howl({
  urls: ["./sounds/fireEffect.ogg"],
  loop: false,
  buffer: true,
  volume: 0.75,
  onend: function(){songSectFin()}
})

function songSectFin(){
  console.log("YUS!")
};

backgroundMusic.play();
