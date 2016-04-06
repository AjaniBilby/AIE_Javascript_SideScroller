//Load the image to use for the level tileset
var tileset = document.createElement("img");
tileset.src = "./sprites/tileset.png"

//Init Level manager
var LAYER_COUNT = 3;
var MAP = {tw:31, th:15};
var TILE = 70;
var TILESET_TILE = TILE * 1;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

function LoadLevel(level){
  var dir = "./levels/" + level + ".js";
  LoadJS(dir);
};

//Load defult level
LoadLevel('level1');

function DrawMap(){
  for (var layerIdx=0; layerIdx<LAYER_COUNT; layerIdx++){
    var idx = 0;
    for (var y=0; y<levelData.layers[layerIdx].height; y++){
      for (var x=0; x<levelData.layers[layerIdx].width; x++){
        if (levelData.layers[layerIdx].data[idx] != 0){
          //the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one from the tile id to get the correct tile
          var tileIndex = levelData.layers[layerIdx].data[idx] - 1;
          var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
          var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
          context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
        }
        idx ++;
      }
    }
  }
};

tickEvents.push('DrawMap');
