class_Player = function(){
  this.image = document.createElement("img");
  this.image.src = "sprites/hero.png";
};

var player = new class_Player();

class_Player.prototype.update = function(deltaTime){

  if (typeof(this.rotation) == "undefined"){
    this.rotation = 0;
  }
  if (keyboard.isKeyDown(keyboard.KEY_SPACE) == ture){
    this.rotation -= deltaTime;
  }else{
    this.rotation += deltaTime;
  }
};

class_Player.prototype.draw = function(deltaTime){
  var self = this;
  console.log('player tick');
};

function PlayerTick(dt){
  player.update(dt);
  player.draw(dt);
};
