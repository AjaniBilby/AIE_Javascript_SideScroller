Player.prototype.update = function(deltaTime){
  if (typeof(this.rotation) == "undefined"){
    this.rotation = 0;
  }
  if (keyboard.isKeyDown(keyboard.KEY_SPACE) == ture){
    this.rotation -= deltaTime;
  }else{
    this.rotation += deltaTime;
  }
};
