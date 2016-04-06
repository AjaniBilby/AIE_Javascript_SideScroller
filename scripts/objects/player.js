var keyboard = new Keyboard();

class_Player = function(){
  this.location = [0,0];
  this.rotation = 0;
  this.image = document.createElement("img");
  this.image.src = "sprites/hero.png";
};

var player = new class_Player();

class_Player.prototype.update = function(deltaTime){

  if (typeof(this.rotation) == "undefined"){
    this.rotation = 0;
  }
  if (keyboard.isKeyDown(keyboard.KEY_SPACE) == true){
    this.rotation -= deltaTime;
  }else{
    this.rotation += deltaTime;
  }

  console.log(keyboard.isKeyDown(Keyboard.KEY_SPACE))
};

class_Player.prototype.draw = function(deltaTime){
  context.save();
    context.translate(this.location[0], this.location[1]);
    context.rotate(this.rotation);
    context.drawImage(this.image, -this.image.width/2, -this.image.height/2);
  context.restore();
};

function PlayerTick(dt){
  player.update(dt);
  player.draw(dt);
};

tickEvents.push('PlayerTick');
