class_Player = function(){
  //Dimentions
  this.location = new Vector2( 9*TILE, 0*TILE );
  this.rotation = 0;
  this.velocity = new Vector2(0,0);
  //Physics
  this.acceleration = 5;
  this.drag = 2;
  this.maxVelocity = [METER * 10, METER * 15];
  this.jumpForce = METER * 2;
  //Display
  this.width = 159;
  this.height = 163;
  this.offset = new Vector2(-55,-87);
  this.image = document.createElement("img");
  this.image.src = "sprites/hero.png";
};

var player = new class_Player();

class_Player.prototype.update = function(deltaTime){

  //Check collision
    /*Our collision detection logic is greatly simplified by the fact that the
    player is a rectangle and is exactly the same size as a single tile.
    So we know that the player can only ever occupy 1, 2 or 4 cells.
    This means we can short-circuit and avoid building a general purpose
    collision detection
    engine by simply looking at the 1 to 4 cells that the player occupies:
    the player occupies:*/
  var tx = pixelToTile(this.location.x);
  var ty = pixelToTile(this.location.y);
  var nx = (this.location.x)%TILE; // true if player overlaps right
  var ny = (this.location.y)%TILE; // true if player overlaps below
  var cell = cellAtTileCoord(LAYER_LIST.Platform, tx, ty);
  var cellright = cellAtTileCoord(LAYER_LIST.Platform, tx + 1, ty);
  var celldown = cellAtTileCoord(LAYER_LIST.Platform, tx, ty + 1);
  var celldiag = cellAtTileCoord(LAYER_LIST.Platform, tx + 1, ty + 1);

  this.falling = true;

  if (this.velocity.y > 0){
    if ((celldown && !cell) || (celldiag && !cellright && nx)){
      //clamp the y position to avoid falling into platform below
      this.location.y = tileToPixel(ty);
      this.velocity.y = 0;
      this.falling = false;
      this.jumping = false;
      ny = 0;
    }
  }else if (this.velocity.y < 0){
    if ((cell && !celldown) || (cellright && !celldiag && nx)){
      //clamp the y position to avoid jumping into the platform above
      this.location.y = tileToPixel(ty + 1);
      this.velocity.y = 0;
      cell = celldown;
      cellright = celldiag;
      ny = 0;
    }
    if (this.velocity.x > 0){
      if ((cellright && !cell) || (celldiag && !celldown && ny)){
        this.location.x = tileToPixel(tx);
        this.velocity.x = 0;
      }
    }else if (this.velocity < 0){
      if ((cell && !cellright) || (celldown && !celldiag && ny)){
        this.location.x = tileToPixel(tx + 1);
        this.velocity.x = 0;
      }
    }
  }

  //Handle inputs
  if (typeof(this.rotation) == "undefined"){
    this.rotation = 0;
  }
  if ((keyboard.isKeyDown(keyboard.KEY_SPACE) == true) && !this.falling){
    this.velocity.y -= this.jumpForce * this.drag;
    console.log('JUMP!')
  }else{
  }
  if (keyboard.isKeyDown(keyboard.KEY_D) == true){
    this.velocity.x += (this.acceleration * this.drag);
  }else if (keyboard.isKeyDown(keyboard.KEY_A) == true){
    this.velocity.x -= (this.acceleration * this.drag);
  }

  //Handle Physics
  /*Gravity*/
  this.velocity.y += GRAVITY * dt;
  /*Drag*/
  this.velocity.x /= this.drag;
  this.velocity.y /= this.drag;
  /*Set position from velocity*/
  this.location.x += this.velocity.x;
  this.location.y += this.velocity.y;
};

class_Player.prototype.draw = function(deltaTime){
  context.save();
    context.translate(this.location.x, this.location.y);
    context.rotate(this.rotation);
    context.drawImage(this.image, -this.image.width/2, -this.image.height/2);
  context.restore();
};

function PlayerTick(dt){
  player.update(dt);
  player.draw(dt);
};

tickEvents.push('PlayerTick');
