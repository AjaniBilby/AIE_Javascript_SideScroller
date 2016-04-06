Player.prototype.initalize = function(){
  this.image = document.createElement("img");
  this.image.src = "sprites/hero.png";
};

Player.prototype.update = function(deltaTime){
  var self = this;

  if (typeof(this.rotation) == "undefined"){
    this.rotation = 0;
  }
  if (keyboard.isKeyDown(keyboard.KEY_SPACE) == ture){
    this.rotation -= deltaTime;
  }else{
    this.rotation += deltaTime;
  }
};

Player.prototype.draw = function(deltaTime){
  var self = this;



};

function PlayerTick(dt){
  player.update(dt);
  player.draw(dt);
};
