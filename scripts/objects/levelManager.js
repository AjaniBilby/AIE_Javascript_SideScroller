require("./scripts/display.js");
require("./scripts/objects/player.js");

//Load the image to use for the level tileset
var cells = [];
var tileset = document.createElement("img");
tileset.src = "./sprites/tileset.png";
var drawLevel = false;

//Set Level defualts
var LAYER_LIST = {};
var LAYER_COUNT = 3;
var LAYER_OBJECT_BAT = 0;
var MAP = {tw:31, th:15};
var TILE = 70;
var TILESET_TILE = TILE * 1;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;
var TILESET_COUNT_Y = 14;

//Physics
var METER = TILE; // abitrary choice for 1m
var GRAVITY = METER * 6; // very exaggerated gravity (6x)


function LoadLevel(level){
  drawLevel = false;
  var dir = "./levels/" + level + ".js";
  LoadJS(dir);
};

//Load defult level
LoadLevel('level2');

function GenerateLevel(){
  console.log("Generating Level")
  if (typeof(levelData) == undefined){
    setTimeout(function() { GenerateLevel(); }, 11);
    return;
  }
  //Set level size parameters
  LAYER_LIST = {};
  LAYER_COUNT = parseInt(levelData.layers.length);
  TILESET_PADDING = parseInt(levelData.tilesets[0].spacing);
  TILESET_SPACING = parseInt(levelData.tilesets[0].margin);
  MAP.tw = parseInt(levelData.layers[0].width);
  MAP.th = parseInt(levelData.layers[0].height);
  TILE = parseInt(levelData.tileheight);

  //Get layers
  for (var i=0; i<levelData.layers.length; i++){
    LAYER_LIST[levelData.layers[i].name] = i;
    console.log(levelData.layers[i].name + '=' + LAYER_LIST[levelData.layers[i].name]); //Check is set it
  }
  InitalizeMap();
  drawLevel = true;
  player.location.x = levelData.spawn.x;
  player.location.y = levelData.spawn.y;
};

function DrawMap(){
  if (typeof(levelData) == undefined || drawLevel == false){
    return;
  }

  if (debug == true){
    DrawLevelCollisionData(1)
  };

  offset = {
    x: camera.location.x - SCREEN_WIDTH/2,
    y: camera.location.y - SCREEN_HEIGHT/2
  }

  //See if the player is in the end zone
  if (player.location.x > levelData.endZone[0].x && player.location.x < levelData.endZone[1].x){
    if (player.location.y > levelData.endZone[0].y && player.location.y < levelData.endZone[1].y){
      state.current = state.win;
    }
  }
  //See if player has fallen of the map
  if (player.location.y > (levelData.layers[0].height*TILE)){
    state.current = state.death;
  }

  //Draw tiles
  for (var layerIdx=0; layerIdx<LAYER_COUNT; layerIdx++){
    var idx = 0;
    for (var y=0; y<levelData.layers[layerIdx].height; y++){
      for (var x=0; x<levelData.layers[layerIdx].width; x++){
        if (x+TILE/2 > SCREEN_WIDTH || x+TILE/2 < 0 || y+TILE/2 > SCREEN_HEIGHT || y+TILE/2 < 0){
          //if tile is off screen
        }else{
          if (levelData.layers[layerIdx].data[idx] != 0){
            //the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one from the tile id to get the correct tile
            var tileIndex = levelData.layers[layerIdx].data[idx] - 1;
            var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
            var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
            context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, (x*TILE - offset.x), ((y-1)*TILE - offset.y), TILESET_TILE, TILESET_TILE);
          }
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
          cells[layerIdx][y-1][x] = 1;
        }else if (cells[layerIdx][y][x] != 1){
          cells[layerIdx][y][x] = 0;
        }
        idx++;
      }
    }
  }
};

function cellAtPixelCoord(layer, x, y){
  if (x<0 || y<0){
    //Let the player drop of the bottom of the screen (this means death)
    return;
  }else if (y>SCREEN_HEIGHT){
    return;
  }else{
    return cellAtTileCoord(layer, pixelToTile(x), pixelToTile(y));
  }
}

function cellAtTileCoord(layer, tx, ty){
  if (tx<0 || tx>=(MAP.tw*TILE) || ty<0){
    return 1;
  }else if (ty>=MAP.th){
    return 0;
  }else{
    return cells[layer][ty][tx];
  }
};

function tileToPixel(tile){
  return tile * TILE;
};

function pixelToTile(pixel){
  return Math.floor(pixel/TILE);
};



function DrawLevelCollisionData(tileLayer) {
    for (var y = 0; y < levelData.layers[tileLayer].height; y++) {
        for (var x = 0; x < levelData.layers[tileLayer].width; x++) {
            if (cells[tileLayer][y][x] == 1) {
                context.fillStyle = "#F00";
                context.fillRect(TILE * x, TILE * y, TILE, TILE);
            }
        }
    }
}

tickEvents.push('DrawMap');
