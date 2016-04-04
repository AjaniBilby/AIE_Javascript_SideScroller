require("./levels/level1.js");

//Load the image to use for the level tileset
var tileset = document.createElement("img");
tileset.src = "./sprites/titleset.png"
currentLevel = 'level1';

function drawMap(){
  for (var layerIdx=0; layerIdx<LAYER_COUNT; layerIdx++){
    var idx = 0;
    for (var y=0; y<[currentLevel].layers[layerIdx].height; y++){
      for (var x=0; x<[currentLevel].layers[layerIdx].width; x++){
        if ([currentLevel].layers[layerIdx].data[idx] != 0){
          //the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one from the tile id to get the correct tile
          var tileIndex = [currentLevel].layers[layerIdx].data[idx] - 1;
          var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
          var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
          context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
        }
        idx ++;
      }
    }
  }
};

tickEvents.push('drawMap');
