var currentTool = 0,
    currentLayer = 0,
    isShiftPressed = false,
    isEditorClicked = false,
    axis = null,
    offset = [0,0];

window.onload = function() {
  var mapObj = {
    "ctx"             : document.getElementById("editor_canvas").getContext("2d"),
    "canvasSizeX"     : parseInt($("#options_canvas_width").val()),
    "canvasSizeY"     : parseInt($("#options_canvas_height").val()),
    "sizeX"           : parseInt($("#new_map_width").val()),
    "sizeY"           : parseInt($("#new_map_height").val()),
    "tileSize"        : 16,
    "layer"           : [],
    "currentPosition" : [0, 0],
    "lastPosition"    : [0, 0],
    "grid"            : false
  };

  if (mapObj.canvasSizeX >= mapObj.sizeX) {
    mapObj.canvasSizeX = mapObj.sizeX;
    $("#options_canvas_width").val(mapObj.sizeX);
  }
  if (mapObj.canvasSizeY >= mapObj.sizeY) {
    mapObj.canvasSizeY = mapObj.sizeY;
    $("#options_canvas_height").val(mapObj.sizeY);
  }
  mapObj.ctx.canvas.width = mapObj.tileSize*mapObj.canvasSizeX;
  mapObj.ctx.canvas.height = mapObj.tileSize*mapObj.canvasSizeY;

  // Listeners
  document.addEventListener("mouseup", function(event){
    isEditorClicked = false;
    isShiftPressed = false;
    axis = null;
  });

  mapObj.ctx.canvas.addEventListener("mouseup", function(event){
    EditorPointer(mapObj, event.offsetX, event.offsetY);
  });

  mapObj.ctx.canvas.addEventListener("mousedown", function(event){
    isEditorClicked = true;
    Tool(mapObj);
  });

  mapObj.ctx.canvas.addEventListener("mousemove", function(event){
    if(isEditorClicked === true){
      Tool(mapObj);
    }
    EditorPointer(mapObj, event.offsetX, event.offsetY);
  });

  Listeners(mapObj);

  // First draw
  for (var i = 0; i < 6; i++) {
    mapObj.layer[i] = [];
  }
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < mapObj.sizeX; j++) {
      mapObj.layer[i][j] = [];
    }
  }

  for (var i = 0; i < mapObj.sizeX; i++) {
    for (var j = 0; j < mapObj.sizeY; j++) {
      // mapObj.layer[0][i][j] = Math.floor(Math.random() * 13) + "," + Math.floor(Math.random() * 31); // Layer 0
      mapObj.layer[0][i][j] = tileSelected[0] + "," + tileSelected[1]; // Layer 0
      mapObj.layer[1][i][j] = "-1,-1"; // Layer 1
      mapObj.layer[2][i][j] = "-1,-1"; // Layer 2
      mapObj.layer[3][i][j] = "-1,-1"; // Layer 3
      mapObj.layer[4][i][j] = "0"; // Movement permissions
      mapObj.layer[5][i][j] = "0"; // Events
    }
  }
  DrawEditor(mapObj);
};

function DrawEditor(mapObj){
  // Clear map
  mapObj.ctx.clearRect(0, 0, mapObj.ctx.canvas.width, mapObj.ctx.canvas.height);

  if (currentLayer <= 3) {
    // Draw layer 0
    for (var i = 0; i < mapObj.canvasSizeX; i++) {
      for (var j = 0; j < mapObj.canvasSizeY; j++) {
        var posXY = mapObj.layer[0][i+offset[0]][j+offset[1]].split(",");
        mapObj.ctx.drawImage(currentTileset, posXY[0]*mapObj.tileSize, posXY[1]*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize, i*mapObj.tileSize, j*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize);
      }
    }
    // Draw layer 1
    if (currentLayer === 0) {
      mapObj.ctx.globalAlpha = 0.5;
    }
    if (currentLayer === 1){
      mapObj.ctx.globalAlpha = 0.5;
      mapObj.ctx.fillStyle = "#000000";
      mapObj.ctx.fillRect(0, 0, mapObj.ctx.canvas.width, mapObj.ctx.canvas.height);
      mapObj.ctx.globalAlpha = 1;
    }
    for (var i = 0; i < mapObj.canvasSizeX; i++) {
      for (var j = 0; j < mapObj.canvasSizeY; j++) {
        var posXY = mapObj.layer[1][i+offset[0]][j+offset[1]].split(",");
        mapObj.ctx.drawImage(currentTileset, posXY[0]*mapObj.tileSize, posXY[1]*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize, i*mapObj.tileSize, j*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize);
      }
    }
    // Draw layer 2
    if (currentLayer === 1) {
      mapObj.ctx.globalAlpha = 0.5;
    }
    if(currentLayer === 2){
      mapObj.ctx.globalAlpha = 0.5;
      mapObj.ctx.fillStyle = "#000000";
      mapObj.ctx.fillRect(0, 0, mapObj.ctx.canvas.width, mapObj.ctx.canvas.height);
      mapObj.ctx.globalAlpha = 1;
    }
    for (var i = 0; i < mapObj.canvasSizeX; i++) {
      for (var j = 0; j < mapObj.canvasSizeY; j++) {
        var posXY = mapObj.layer[2][i+offset[0]][j+offset[1]].split(",");
        mapObj.ctx.drawImage(currentTileset, posXY[0]*mapObj.tileSize, posXY[1]*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize, i*mapObj.tileSize, j*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize);
      }
    }
    // Draw layer 3
    if (currentLayer === 2) {
      mapObj.ctx.globalAlpha = 0.5;
    }
    if(currentLayer === 3){
      mapObj.ctx.globalAlpha = 0.5;
      mapObj.ctx.fillStyle = "#000000";
      mapObj.ctx.fillRect(0, 0, mapObj.ctx.canvas.width, mapObj.ctx.canvas.height);
      mapObj.ctx.globalAlpha = 1;
    }
    for (var i = 0; i < mapObj.canvasSizeX; i++) {
      for (var j = 0; j < mapObj.canvasSizeY; j++) {
        var posXY = mapObj.layer[3][i+offset[0]][j+offset[1]].split(",");
        mapObj.ctx.drawImage(currentTileset, posXY[0]*mapObj.tileSize, posXY[1]*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize, i*mapObj.tileSize, j*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize);
      }
    }
  }else {
    // Draw all layers
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < mapObj.canvasSizeX; j++) {
        for (var k = 0; k < mapObj.canvasSizeY; k++) {
          var posXY = mapObj.layer[i][j+offset[0]][k+offset[1]].split(",");
          mapObj.ctx.drawImage(currentTileset, posXY[0]*mapObj.tileSize, posXY[1]*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize, j*mapObj.tileSize, k*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize);
        }
      }
    }
    if (currentLayer === 4) {
      // Draw movement permissions
    }else {
      // Draw events
    }
  }

  mapObj.ctx.globalAlpha = 1;
  if (mapObj.grid) {
    Grid(mapObj);
  }
}

function Tool(mapObj){
  switch (currentTool) {
    case 0:
      Pencil(mapObj);
      break;
    case 1:
      Bucket(mapObj);
      break;
    case 2:
      Erase(mapObj);
      break;
    default:
      console.log("Error.");
  }
}

function Pencil(mapObj){
  if (currentLayer <= 3) {
    mapObj.layer[currentLayer][mapObj.currentPosition[0]+offset[0]][mapObj.currentPosition[1]+offset[1]] = tileSelected[0] + "," + tileSelected[1];
  }
}

function Bucket(mapObj){
  if (currentLayer <= 3) {
    var previousTile = mapObj.layer[currentLayer][mapObj.currentPosition[0]+offset[0]][mapObj.currentPosition[1]+offset[1]];
    if(previousTile === tileSelected[0] + "," + tileSelected[1]){
      return;
    }
    BucketRecursive(mapObj, mapObj.currentPosition[0]+offset[0], mapObj.currentPosition[1]+offset[1], previousTile);
  }
}

function BucketRecursive(mapObj, x, y, previousTile){
  if(x >= mapObj.sizeX || y >= mapObj.sizeY || x < 0 || y < 0){
    return;
  }
  if(mapObj.layer[currentLayer][x][y] != previousTile){
    return;
  }
  mapObj.layer[currentLayer][x][y] = tileSelected[0] + "," + tileSelected[1];
  setTimeout(BucketRecursive(mapObj, x, y-1, previousTile), 10);
  setTimeout(BucketRecursive(mapObj, x, y+1, previousTile), 10);
  setTimeout(BucketRecursive(mapObj, x+1, y, previousTile), 10);
  setTimeout(BucketRecursive(mapObj, x-1, y, previousTile), 10);
}

function Erase(mapObj){
  if (currentLayer <= 3) {
    mapObj.layer[currentLayer][mapObj.currentPosition[0]+offset[0]][mapObj.currentPosition[1]+offset[1]] = "-1,-1";
  }
}

function EditorPointer(mapObj, posX, posY){
  if(posX >= mapObj.ctx.canvas.width || posY >= mapObj.ctx.canvas.height || posX < 0 || posY < 0){
    return;
  }

  mapObj.currentPosition[0] = Math.trunc(posX/mapObj.tileSize);
  mapObj.currentPosition[1] = Math.trunc(posY/mapObj.tileSize);

  if(isShiftPressed == true && axis == null && isEditorClicked == true){
    if(mapObj.currentPosition[0] != mapObj.lastPosition[0] || mapObj.currentPosition[1] != mapObj.lastPosition[1]){
      if (mapObj.currentPosition[0] != mapObj.lastPosition[0]) {
        axis = "Horizontal";
      }
      if (mapObj.currentPosition[1] != mapObj.lastPosition[1]) {
        axis = "Vertical";
      }
    }else {

    }
  }

  if(axis != null){
    if(axis == "Horizontal"){
      mapObj.currentPosition[1] = mapObj.lastPosition[1];
    }else {
      mapObj.currentPosition[0] = mapObj.lastPosition[0];
    }
  }

  DrawEditor(mapObj);

  //Square
  mapObj.ctx.beginPath();
  mapObj.ctx.lineWidth = "1.3";
  mapObj.ctx.strokeStyle = "red";
  mapObj.ctx.rect(mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize);
  mapObj.ctx.stroke();



  // Coordinates text
  var mapCoordinates = document.getElementById("editor_coordinates");
  if (currentLayer <= 3) {
    mapCoordinates.innerHTML =  "[X: " + (mapObj.currentPosition[0]+offset[0]) + ", Y: " + (mapObj.currentPosition[1]+offset[1]) + "] = " + mapObj.layer[currentLayer][mapObj.currentPosition[0]+offset[0]][mapObj.currentPosition[1]+offset[1]];
  }else {
    mapCoordinates.innerHTML =  "[X: " + (mapObj.currentPosition[0]+offset[0]) + ", Y: " + (mapObj.currentPosition[1]+offset[1]) + "]";
  }
}

function Grid(mapObj){
  mapObj.ctx.lineWidth = "1.0";
  mapObj.ctx.strokeStyle = $("#hexcolor").val();
  for (var i = 1; i < mapObj.canvasSizeX; i++) {
      mapObj.ctx.beginPath();
      mapObj.ctx.moveTo(i*mapObj.tileSize,0);
      mapObj.ctx.lineTo(i*mapObj.tileSize,mapObj.canvasSizeY*mapObj.tileSize);
      mapObj.ctx.stroke();

      mapObj.ctx.beginPath();
      mapObj.ctx.moveTo(0,i*mapObj.tileSize);
      mapObj.ctx.lineTo(mapObj.canvasSizeX*mapObj.tileSize,i*mapObj.tileSize);
      mapObj.ctx.stroke();
  }
}
