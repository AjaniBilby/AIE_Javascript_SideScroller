function HUD_Update_Layer0(){

  if (player.direction == LEFT){
    offset = 30;
  }else{
    offset = -20;
  }
  location = new Vector2(player.location.x+offset, player.location.y);

  // Create gradient
  var grd=context.createLinearGradient(location.x, 0, location.x+50, 0);
  grd.addColorStop(1,"rgb(145, 140, 0)");
  grd.addColorStop(0,"rgb(200, 192, 0)");

  // Fill with gradient
  context.fillStyle=grd;
  context.fillRect(location.x, location.y, 40, 70);
};
