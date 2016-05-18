require("./scripts/display.js");
require("./scripts/sprite.js");

var bullets = []

class_Bullet = function(x, y, dir){
  this.sprite = new Sprite("./sprites/bullet.png");
  this.sprite.buildAnimation(1, 1, 32, 32, -1, [0]);
  this.sprite.setAnimationOffset(0, 0, 0);
  this.sprite.setLoop(0, false);


  this.location = new Vector2(x,y);

  this.speed = METER * 20;
  this.direction = dir;
}

class_Bullet.prototype.update = function(dt){
  this.location.x += this.speed * this.direction * dt;
}

class_Bullet.prototype.draw = function(){
  this.sprite.draw(context, this.location.x-camera.location.x, this.location.y-camera.location.y)
}

function BulletTick(dt){
  for (var i=0; i<parseInt(bullets.length); i++){
    bullets[i].update(dt)
    bullets[i].draw();
  }
}

bullets.push(new class_Bullet(0, 0, 1));

tickEvents.push('BulletTick');
