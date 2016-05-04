var LEFT = 0;
var RIGHT = 1;
var ANIM_IDLE_RIGHT = 0;
var ANIM_JUMP_RIGHT = 1;
var ANIM_WALK_RIGHT = 2;
var ANIM_IDLE_LEFT = 3;
var ANIM_JUMP_LEFT = 4;
var ANIM_WALK_LEFT = 5;
var ANIM_MAX = 6;

class_Player = function(){
  /**Display**/
  this.sprite = new Sprite("./sprites/ChuckNorrisAnim.png");
  this.sprite.buildAnimation(12, 8, 165, 126, 0.05,[0, 1, 2, 3, 4, 5, 6, 7]);
  this.sprite.buildAnimation(12, 8, 165, 126, 0.05,[8, 9, 10, 11, 12]);
  this.sprite.buildAnimation(12, 8, 165, 126, 0.05,[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);
  this.sprite.buildAnimation(12, 8, 165, 126, 0.05,[52, 53, 54, 55, 56, 57, 58, 59]);
  this.sprite.buildAnimation(12, 8, 165, 126, 0.05,[60, 61, 62, 63, 64]);
  this.sprite.buildAnimation(12, 8, 165, 126, 0.05,[65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]);
  for(var i=0; i<ANIM_MAX; i++){
    this.sprite.setAnimationOffset(i, -55, -50); //i, -55, -87
  }

  //Dimentions
  this.location = new Vector2( 9*TILE, 0*TILE );
  this.rotation = 0;
  this.velocity = new Vector2(0,0);
  this.size = new Vector2(159, 163);
  this.direction = LEFT;
  //Physics
  this.acceleration = 4 * METER;
  this.drag = 1.5;
  this.maxVelocity = new Vector2(METER * 10, METER * 15);
  this.jumpForce = GRAVITY * METER * 6;
  this.lastJump = Date.now();
  this.maxJumpHold = 100;
  //Attributes
  this.health = 100;
  this.maxHealth = 100;
  this.ammo = 999;
  this.maxAmmo = 999;
};

var player = new class_Player();

class_Player.prototype.update = function(deltaTime){

  this.sprite.update(deltaTime);

  var tempVelX = 0; //define temporary Xvelocity for this tick
  var tempVelY = 0; //define temporary Yvelocity for this tick

  //Handle inputs
  if (typeof(this.rotation) == "undefined"){
    this.rotation = 0;
  }
  if ((keyboard.isKeyDown(keyboard.KEY_SPACE) == true)){
    if (!this.falling){
      tempVelY -= this.jumpForce * this.drag * deltaTime;
      this.lastJump = Date.now(); //Reset jump time
      if (this.direction == LEFT){
        if (this.sprite.currentAnimation != ANIM_JUMP_LEFT){
          this.sprite.setAnimation(ANIM_JUMP_LEFT)
        }
      }else{
        if (this.sprite.currentAnimation != ANIM_JUMP_RIGHT){
          this.sprite.setAnimation(ANIM_JUMP_RIGHT)
        }
      }
    }else if ((Date.now() - this.lastJump) <= this.maxJumpHold){
      tempVelY -= (this.jumpForce * this.drag * deltaTime) /5;
    }
  }


  if (keyboard.isKeyDown(keyboard.KEY_D) == true){
    tempVelX += (this.acceleration * this.drag);
    this.direction = RIGHT;
    if (this.sprite.currentAnimation != ANIM_WALK_LEFT){
      this.sprite.setAnimation(ANIM_WALK_LEFT)
    }
  }else if (keyboard.isKeyDown(keyboard.KEY_A) == true){
    tempVelX -= (this.acceleration * this.drag);
    this.direction = LEFT;
    if (this.sprite.currentAnimation != ANIM_WALK_RIGHT){
      this.sprite.setAnimation(ANIM_WALK_RIGHT)
    }
  }else{
    if (this.jumping == false && this.falling == false){
      if (this.direction == LEFT){
        if (this.sprite.currentAnimation != ANIM_IDLE_RIGHT){
          this.sprite.setAnimation(ANIM_IDLE_RIGHT);
        }
      }else{
        if (this.sprite.currentAnimation != ANIM_IDLE_LEFT){
          this.sprite.setAnimation(ANIM_IDLE_LEFT);
        }
      }
    }
  }

  //Handle Physics
  /*Gravity*/
  this.velocity.y += (GRAVITY);
  /*Apply New Forces*/
  this.velocity.x += tempVelX;
  this.velocity.y += tempVelY;
  /*Drag*/
  this.velocity.x /= (this.drag);
  this.velocity.y /= (this.drag);
  /*Apply Speed Clamp*/
  //this.velocity.x = clamp(this.velocity.x, -this.maxVelocity.x, this.maxVelocity.x);
  //this.velocity.y = clamp(this.velocity.y, -this.maxVelocity.y, this.maxVelocity.y);
  /*Set position from velocity*/
  this.location.x += (this.velocity.x * dt);
  this.location.y += (this.velocity.y * dt);


  // we’ll insert code here later
  // collision detection
  // Our collision detection logic is greatly simplified by the fact that the
  // player is a rectangle and is exactly the same size as a single tile.
   // So we know that the player can only ever occupy 1, 2 or 4 cells.

  // This means we can short-circuit and avoid building a general purpose
  // collision detection engine by simply looking at the 1 to 4 cells that
  // the player occupies:
  var tx = pixelToTile(this.location.x);
  var ty = pixelToTile(this.location.y);
  var nx = (this.location.x)%TILE; // true if player overlaps right
  var ny = (this.location.y)%TILE; // true if player overlaps below
  var cell = cellAtTileCoord(LAYER_LIST.Platform, tx, ty);
  var cellright = cellAtTileCoord(LAYER_LIST.Platform, tx + 1, ty);
  var celldown = cellAtTileCoord(LAYER_LIST.Platform, tx, ty + 1);
  var celldiag = cellAtTileCoord(LAYER_LIST.Platform, tx + 1, ty + 1);

  this.falling = true;

  //Vertical Collision
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
    }
    //Horizontal Collision
    if (this.velocity.x > 0){
      if ((cellright && !cell) || (celldiag && !celldown && ny)){
        this.location.x = tileToPixel(tx);
        this.velocity.x = 0;
      }
    }else if (this.velocity.x < 0){
      if ((cell && !cellright) || (celldown && !celldiag && ny)){
        this.location.x = tileToPixel(tx + 1);
        this.velocity.x = 0;
      }
    }
};

class_Player.prototype.draw = function(deltaTime){
  HUD_Update_Layer0();
  this.sprite.draw(context, this.location.x, this.location.y);
  HUD_Update_Layer1();
};

function PlayerTick(dt){
  player.update(dt);
  player.draw(dt);
};

tickEvents.push('PlayerTick');
