//Load the image to use for the level tileset
var cells = [];
var tileset = document.createElement("img");
tileset.src = "./sprites/tileset.png";

//Init Level manager
var LAYER_LIST = [];
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

function GenerateLevel(){
  //Get layers
  for (var i=0; i<levelData.length; i++){
    LAYER_LIST[i] = levelData.layers[i].name;
  }

  InitalizeMap();
};

//Load defult level
LoadLevel('level1');

function DrawMap(){
  //Run colision update first
  cellAtPixelCoord();
  cellAtTileCoord();
  pixelToTile();
  bound();

  //Draw tiles
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

function InitalizeMap(){
  for (var layerIdx=0; layerIdx < LAYER_COUNT; layerIdx++){ //initalize the collision map
    cells[layerIdx] = [];
    var idx = 0;
    for (var y=0; y<levelData.layers[layerIdx].height; y++){
      cells[layerIdx][y] = [];
      for (var x=0; x<levelData.layers[layerIdx].width; x++){
        if (levelData.layers[layerIdx].data[idx] != 0){
          //for each tile we find in layer data, we need to create 4 collisions (because our collision squares are 35x35 but the tile in the level are 70x70)
          cells[layerIdx][y][x] = 1;
          cells[layerIdx][y-1][x] = 1;
          cells[layerIdx][y-1][x+1] = 1;
          cells[layerIdx][y][x+1] = 1;
        }else if (cells[layerIdx][y][x] != 1){
          cells[layerIdx][y][x] = 0;
        }
        idx++;
      }
    }
  }
};

function cellAtPixelCoord(layer, x, y){
  if (x<0 || x>SCREEN_WIDTH || y<0){
    //Let the player drop of the bottom of the screen (this means death)
    return;
  }else if (y>SCREEN_HEIGHT){
    return;
  }else{
    return cellAtTileCoord(layer, pixelToTile(x), pixelToTile(y));
  }
}

function cellAtTileCoord(layer, tx, ty){
  if (tx<0 || tx>=MAP.tw || ty<0){
    return 1;
  }else if (ty>=MAP.th){
    return 0;
  }else{
    console.log(layer)
    return cells[layer][ty][tx];
  }
};

function titleToPixel(tile){
  return tile * TILE;
};

function pixelToTile(pixel){
  return Math.floor(pixel/TILE);
};

function bound(value, min, max){
  if (value < min){
    return min;
  }else if (value > max){
    return max;
  }else{
    return value;
  }
};

tickEvents.push('DrawMap');
