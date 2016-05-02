var fillPercent = 1;

function HUD_Update_Layer0(){

  if (player.direction == LEFT){
    offset = 30;
  }else{
    offset = -20;
  }
  HUDlocation = new Vector2(player.location.x+offset, player.location.y);
  TankDimentions = new Vector2(40, 70);

  HUDlocation.y += TankDimentions.y - (TankDimentions.y * fillPercent);
  TankDimentions.y *= fillPercent

  // Create gradient
  var grd=context.createLinearGradient(HUDlocation.x, 0, HUDlocation.x+50, 0);
  grd.addColorStop(1,"rgb(145, 140, 0)");
  grd.addColorStop(0,"rgb(200, 192, 0)");

  // Fill with gradient
  context.fillStyle=grd;
  context.fillRect(HUDlocation.x, HUDlocation.y-10, TankDimentions.x, TankDimentions.y);
};
