class_Player = function(){
  this.location = [0,400];
  this.rotation = 0;
  this.velocity = [0,0];
  this.acceleration = 1;
  this.drag = 5;
  this.image = document.createElement("img");
  this.image.src = "sprites/hero.png";
};

var player = new class_Player();

class_Player.prototype.update = function(deltaTime){

  //Handle inputs
  if (typeof(this.rotation) == "undefined"){
    this.rotation = 0;
  }
  if (keyboard.isKeyDown(keyboard.KEY_SPACE) == true){
    this.rotation -= deltaTime;
  }else{
    this.rotation += deltaTime;
  }
  if (keyboard.isKeyDown(keyboard.KEY_D) == true){
    this.velocity[0] += (this.acceleration * this.drag);
  }else if (keyboard.isKeyDown(keyboard.KEY_A) == true){
    this.velocity[0] -= (this.acceleration * this.drag);
  }

  //Handle Physics
  this.velocity[0] /= this.drag;
  this.velocity[1] /= this.drag;
  this.location[0] += this.velocity[0];
  this.location[1] += this.velocity[1];
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
