function HUD_Update_Layer0(){

  // Create gradient
  var grd=context.createLinearGradient(player.location.x, 0, player.location.x+50, 0);
  grd.addColorStop(1,"rgb(145, 140, 0)");
  grd.addColorStop(0,"rgb(200, 192, 0)");

  // Fill with gradient
  context.fillStyle=grd;
  context.fillRect(player.location.x, player.location.y, 40, 70);
};
