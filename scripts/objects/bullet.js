var bullets = []

class_Bullet = function(x, y, dir){
  this.sprite = new Sprite("./sprites/bullet.png");

  this.location = new Vector2(x,y);

  this.speed = METER * 10;
  this.direction = dir;
}

class_Bullet.prototype.update = function(dt){
  this.location += this.speed * this.direction;
}

class_Bullet.prototype.draw = function(){
  this.sprite.draw(context, SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
}

function BulletTick(dt){
  console.log(bullets.length)
  /*for (i=0; i<bullets.length; i++){
    //bullets[i].update(dt)
    //bullets[i].draw();
  }*/
}

bullets.push(new class_Bullet(0, 0, 1));

tickEvents.push('BulletTick');
