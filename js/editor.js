var currentTool = 0;

window.onload = function() {
  var mapObj = {
    "ctx": document.getElementById("editor_canvas").getContext("2d"),
    "sizeX": 20,
    "sizeY": 20,
    "tileSize": 16,
    "layer0": [],
    "layer1": [],
    "layer2": [],
    "layer3": [],
    "currentPosition": [null, null],
    "lastPosition": [null, null]
  };
  var isEditorClicked = false

  // Size
  mapObj.ctx.canvas.width = mapObj.tileSize*mapObj.sizeX;
  mapObj.ctx.canvas.height = mapObj.tileSize*mapObj.sizeY;

  // Listeners
  mapObj.ctx.canvas.addEventListener("mouseup", function(event){
    isEditorClicked = false;
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

  // First draw
  for (var i = 0; i < mapObj.sizeY; i++) {
    mapObj.layer0[i] = [];
    mapObj.layer1[i] = [];
    mapObj.layer2[i] = [];
    mapObj.layer3[i] = [];
  }
  for (var i = 0; i < mapObj.sizeX; i++) {
    for (var j = 0; j < mapObj.sizeY; j++) {
      mapObj.layer0[i][j] = tileSelected[0] + "," + tileSelected[1];
      mapObj.layer1[i][j] = null;
      mapObj.layer2[i][j] = null;
      mapObj.layer3[i][j] = null;
    }
  }
  DrawEditor(mapObj);
};


function DrawEditor(mapObj){
  // Clear map
  mapObj.ctx.clearRect(0, 0, mapObj.ctx.canvas.width, mapObj.ctx.canvas.height);

  // Draw layer 0
  for (var i = 0; i < mapObj.sizeX; i++) {
    for (var j = 0; j < mapObj.sizeY; j++) {
      var posXY = mapObj.layer0[i][j].split(",");
      mapObj.ctx.drawImage(currentTileset, posXY[0]*mapObj.tileSize, posXY[1]*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize, i*mapObj.tileSize, j*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize);
    }
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
  mapObj.layer0[mapObj.currentPosition[0]][mapObj.currentPosition[1]] = tileSelected[0] + "," + tileSelected[1];
}

function Bucket(mapObj){
  var previousTile = mapObj.layer0[mapObj.currentPosition[0]][mapObj.currentPosition[1]];
  if(previousTile === tileSelected[0] + "," + tileSelected[1]){
    return;
  }
  BucketRecursive(mapObj, mapObj.currentPosition[0], mapObj.currentPosition[1], previousTile);
}

function BucketRecursive(mapObj, x, y, previousTile){
  if(x >= mapObj.sizeX || y >= mapObj.sizeY || x < 0 || y < 0){
    return;
  }
  if(mapObj.layer0[x][y] != previousTile){
    return;
  }
  mapObj.layer0[x][y] = tileSelected[0] + "," + tileSelected[1];
  setTimeout(BucketRecursive(mapObj, x, y-1, previousTile), 10);
  setTimeout(BucketRecursive(mapObj, x, y+1, previousTile), 10);
  setTimeout(BucketRecursive(mapObj, x+1, y, previousTile), 10);
  setTimeout(BucketRecursive(mapObj, x-1, y, previousTile), 10);
}

function Erase(mapObj){
  mapObj.layer0[mapObj.currentPosition[0]][mapObj.currentPosition[1]] = "Null";
}

function EditorPointer(mapObj, posX, posY){
  if(posX >= mapObj.ctx.canvas.width || posY >= mapObj.ctx.canvas.height || posX < 0 || posY < 0){
    return;
  }

  mapObj.currentPosition[0] = Math.trunc(posX/mapObj.tileSize);
  mapObj.currentPosition[1] = Math.trunc(posY/mapObj.tileSize);

  // if(mapObj.currentPosition[0] === mapObj.lastPosition[0] && mapObj.currentPosition[1] === mapObj.lastPosition[1]){
  //   return;
  // }else{
  //   mapObj.lastPosition[0] = mapObj.currentPosition[0];
  //   mapObj.lastPosition[1] = mapObj.currentPosition[1];
  // }

  DrawEditor(mapObj);

  //Square
  mapObj.ctx.beginPath();
  mapObj.ctx.lineWidth = "1.25";
  mapObj.ctx.strokeStyle = "red";
  mapObj.ctx.rect(mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize, mapObj.tileSize, mapObj.tileSize);
  mapObj.ctx.stroke();

  // Coordinates text
  var mapCoordinates = document.getElementById("editor_coordinates");
  mapCoordinates.innerHTML =  "[X: " + mapObj.currentPosition[0] + ", Y: " + mapObj.currentPosition[1] + "] = " + mapObj.layer0[mapObj.currentPosition[0]][mapObj.currentPosition[1]];
}
