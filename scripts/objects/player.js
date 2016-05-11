require("./scripts/objects/bullet.js")

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
  this.jumpForce = GRAVITY * METER * 4;
  this.lastJump = Date.now();
  this.maxJumpHold = 200;
  this.jumpCoolDown = 150;
  this.landTime = Date.now();
  this.isOnGround = false;
  //Attributes
  this.health = 100;
  this.maxHealth = 100;
  this.maxAmmo = 250;
  this.ammo = this.maxAmmo;
  this.fireTimeOutMax = 100;
  this.fireTime = Date.now();
};

var player = new class_Player();

class_Player.prototype.update = function(deltaTime){

  this.sprite.update(deltaTime);

  var tempVelX = 0; //define temporary Xvelocity for this tick
  var tempVelY = 0; //define temporary Yvelocity for this tick

  /**Handle air and jump timers**/
  if (this.falling == false){
    if (this.isOnGround == false){
      console.log("Land")
      this.isOnGround = true;
      this.landTime = Date.now();
    }
  }else{
    this.isOnGround = false
  }



  /**Handle inputs**/
  if (typeof(this.rotation) == "undefined"){
    this.rotation = 0;
  }

  if (keyboard.isKeyDown(keyboard.KEY_Z) == true){
    if (((Date.now() - this.fireTime) >= this.fireTimeOutMax) && this.ammo > 0){
      this.fireTime = Date.now();
      fireSound.play();
      this.ammo -= 1;
      bullets.push(new class_Bullet(this.location.x, this.location.y, 1));
    }
  }

  if ((keyboard.isKeyDown(keyboard.KEY_SPACE) == true)){
    if (!this.falling && this.jumpCoolDown <= (Date.now() - this.landTime)){
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
  var cells = {
    ladder: {
      center: cellAtTileCoord(LAYER_LIST.Ladders, tx, ty),
      right: cellAtTileCoord(LAYER_LIST.Ladders, tx + 1, ty),
      down: cellAtTileCoord(LAYER_LIST.Ladders, tx, ty+1),
      diag: cellAtTileCoord(LAYER_LIST.Ladders, tx + 1, ty + 1)
    },
    platform: {
      cell: cellAtTileCoord(LAYER_LIST.Platform, tx, ty),
      cellright: cellAtTileCoord(LAYER_LIST.Platform, tx + 1, ty),
      celldown: cellAtTileCoord(LAYER_LIST.Platform, tx, ty+1),
      celldiag: cellAtTileCoord(LAYER_LIST.Platform, tx + 1, ty + 1)
    }
  }


  this.falling = true;

  if (cells.ladder.center || (cells.ladder.center && cells.ladder.down)){
    this.velocity.y -= 500;
    console.log("is on ladder")
    return;
  }

  //Vertical Collision
  if (this.velocity.y > 0){
    if ((cells.platform.celldown && !cells.platform.cell) || (cells.platform.celldiag && !cells.platform.cellright && nx)){
      //clamp the y position to avoid falling into platform below
      this.location.y = tileToPixel(ty);
      this.velocity.y = 0;
      this.falling = false;
      this.jumping = false;
      ny = 0;
    }
  }else if (this.velocity.y < 0){
    if ((cells.platform.cell && !cells.platform.celldown) || (cells.platform.cellright && !cells.platform.celldiag && nx)){
      //clamp the y position to avoid jumping into the platform above
      this.location.y = tileToPixel(ty + 1);
      this.velocity.y = 0;
      cells.platform.cell = cells.platform.celldown;
      cells.platform.cellright = cells.platform.celldiag;
      ny = 0;
      }
    }
  //Horizontal Collision
    if (this.velocity.x > 0){
      if ((cells.platform.cellright && !cells.platform.cell) || (cells.platform.celldiag && !cells.platform.celldown && ny)){
        this.location.x = tileToPixel(tx);
        this.velocity.x = 0;
      }
    }else if (this.velocity.x < 0){
      if ((cells.platform.cell && !cells.platform.cellright) || (cells.platform.celldown && !cells.platform.celldiag && ny)){
        this.location.x = tileToPixel(tx + 1);
        this.velocity.x = 0;
      }
    }
};

class_Player.prototype.draw = function(deltaTime){
  camera.location.x = this.location.x;
  camera.location.y = this.location.y;
  HUD_Update_Layer0();
  this.sprite.draw(context, SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
  HUD_Update_Layer1();
};

function PlayerTick(dt){
  player.update(dt);
  player.draw(dt);
};

tickEvents.push('PlayerTick');
