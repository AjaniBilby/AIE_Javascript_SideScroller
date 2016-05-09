function HUD_Update_Layer0(){
  //Set dimentions
  if (player.direction == LEFT){
    offset = 30;
  }else{
    offset = -20;
  }
  HUDlocation = new Vector2(SCREEN_WIDTH/2 + offset, SCREEN_HEIGHT/2);
  TankDimentions = new Vector2(40, 70);

  //Get percent of ammo avaliable
  fillPercent = player.ammo / player.maxAmmo;
  if (fillPercent > 1){
    fillPercent = 1;
  }else if (fillPercent < 0){
    fillPercent = 0;
  }

  //Distort the tank to match the percent filled
  HUDlocation.y += TankDimentions.y - (TankDimentions.y * fillPercent);
  TankDimentions.y *= fillPercent

  // Create gradient
  var grd=context.createLinearGradient(HUDlocation.x, 0, HUDlocation.x+TankDimentions.x, 0);
  grd.addColorStop(1,"rgb(223, 215, 0)");
  grd.addColorStop(0,"rgb(115, 110, 2)");

  // Fill with gradient
  context.fillStyle=grd;
  context.fillRect(HUDlocation.x, HUDlocation.y-10, TankDimentions.x, TankDimentions.y);
};



function HUD_Update_Layer1(){
  HUDlocation = new Vector2(player.location.x, player.location.y);

  //Get percent of health avaliable
  fillPercent = ((player.maxHealth-player.health) / player.maxHealth)
  if (fillPercent > 1){
    fillPercent = 1;
  }else if (fillPercent < 0.3){
    fillPercent = 0;
  }

  // Create gradient
  var grd=context.createRadialGradient(SCREEN_WIDTH/2, SCREEN_HEIGHT/2, 10, SCREEN_WIDTH/2, SCREEN_HEIGHT/2, SCREEN_WIDTH);
  grd.addColorStop(1,"rgba(255, 0, 0, "+ fillPercent +")");
  grd.addColorStop(0,"rgba(255, 0, 0, 0)");

  // Fill with gradient
  context.fillStyle = grd;
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
};
