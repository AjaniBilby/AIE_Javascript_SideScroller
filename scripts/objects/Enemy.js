Enemy = function(x, y){
  this.sprite = new Sprite("./sprites/bat.png");
  this.sprite.builtAnimation(2, 1, 88, 94, 0.3, [0,1]);
  this.sprite.setAnimation(0, -35, -40);

  this.location = new Vector2(x,y);
  this.velocity = new Vector2(0,0);

  this.moveRight = true;
  this.pause = 0;
  this.maxVelocity = METER * 5;
  this.acceleration = this.maxVelocity * 2;
}

Enemy.prototype.update = function(dt){
  this.sprite.update(dt);

  if(this.pause > 0){
    this.pause -= dt;
  }else{
    var ddx = 0;

    var tx = pixelToTile(this.location.x);
    var ty = pixelToTile(this.location.y);
    var nx = (this.location.x)%TILE;
    var ny = (this.location.y)%TILE;
    var cell = cellAtTileCoord(LAYER_LIST.Platform, tx, ty);
    var cellright = cellAtTileCoord(LAYER_LIST.Platform, tx+1, ty);
    var celldown = cellAtTileCoord(LAYER_LIST.Platform, tx, ty+1);
    var celldiag = cellAtTileCoord(LAYER_LIST.Platform, tx+1, ty+1);

    if (this.moveRight){
      if (celldiag && !cellright){
        ddx += this.acceleration;
      }else{
        this.velocity.x = 0;
        this.moveRight = false;
        this.pause = 0.5;
      }
    }
    if (!this.moveRight){
      if (celldown && !cell){
        ddx -= this.acceleration;
      }else{
        this.velocity.x = 0;
        this.moveRight = true;
        this.pause = 0.5;
      }
    }

    this.location.x = Math.floor(this.location.x + (dt * this.velocity.x));
    this.location.y = Math.floor(this.location.y + (dt * this.velocity.y));
    this.velocity.x = bound(this.velocity.x + (dt * ddx), -this.maxVelocity, this.maxVelocity);
  }
}
