var bullets = []

class_Bullet = function(x, y, dir){
  this.sprite = document.createElement("img");

  this.location = new Vector2(x,y);

  this.speed = METER * 1;
  this.direction = dir;
}

class_Bullet.prototype.update = function(dt){
  this.location += this.speed * this.direction;
}

class_Bullet.prototype.draw = function(){
  context.save();
  context.translate(this.location.x, this.location.y);
  context.drawImage(this.sprite, -this.sprite.width/2, -this.sprite.height/2);
  context.restore();
}

function BulletTick(dt){
  for (var i=0; i<parseInt(bullets.length); i++){
    bullets[i].update(dt)
    bullets[i].draw();
  }
}

bullets.push(new class_Bullet(0, 0, 1));

tickEvents.push('BulletTick');
