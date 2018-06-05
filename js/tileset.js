var tileSelected = [],
    currentTileset = null;

document.addEventListener("DOMContentLoaded", function(event) {
  var tilesetObj = {
    "ctx": document.getElementById("tileset_canvas").getContext("2d"),
    "tileSize": 16,
    "sizeX": 14,
    "sizeY": 32,
    "isClicked": false,
    // "direction": "https://image.ibb.co/i8zOLo/tiles00.png",
    "direction": "https://image.ibb.co/mfewJT/tiles.png",
  };

  // Size
  tilesetObj.ctx.canvas.width = tilesetObj.tileSize*tilesetObj.sizeX;
  tilesetObj.ctx.canvas.height = tilesetObj.tileSize*tilesetObj.sizeY;

  // Listeners
  tilesetObj.ctx.canvas.addEventListener("mouseup", function(event){
    tilesetObj.isClicked = false;
  });

  tilesetObj.ctx.canvas.addEventListener("mousedown", function(event){
    tilesetObj.isClicked = true;
    SelectTile(tilesetObj, event.offsetX, event.offsetY);
  });

  tilesetObj.ctx.canvas.addEventListener("mousemove", function(event){
    if(tilesetObj.isClicked === true){
      SelectTile(tilesetObj, event.offsetX, event.offsetY);
    }
  });

  tilesetObj.ctx.canvas.addEventListener("mouseout", function(event){
    tilesetObj.isClicked = false;
  });

  // (?)
  currentTileset = new Image();
  // Tileset file direction
  currentTileset.src = tilesetObj.direction;

  currentTileset.onload = function() {
    // First draw
    SelectTile(tilesetObj, 0*tilesetObj.tileSize, 0*tilesetObj.tileSize);
  };

});

function SelectTile(tilesetObj, posX, posY){
  if(posX >= tilesetObj.ctx.canvas.width || posY >= tilesetObj.ctx.canvas.height || posX < 0 || posY < 0){
    return;
  }

  var x = Math.trunc(posX/tilesetObj.tileSize);
  var y = Math.trunc(posY/tilesetObj.tileSize);

  if(x === tileSelected[0] && y === tileSelected[1]){
    return;
  }

  // Clear tileset
  tilesetObj.ctx.clearRect(0,0,currentTileset.width,currentTileset.height);

  // Draw tileset
  tilesetObj.ctx.drawImage(currentTileset,0,0,currentTileset.width,currentTileset.height);

  tileSelected[0] = x;
  tileSelected[1] = y;

  // Square
  tilesetObj.ctx.beginPath();
  tilesetObj.ctx.lineWidth = "1.6";
  tilesetObj.ctx.strokeStyle = "red";
  tilesetObj.ctx.rect(x*tilesetObj.tileSize, y*tilesetObj.tileSize, tilesetObj.tileSize, tilesetObj.tileSize);
  tilesetObj.ctx.stroke();

  // Coordinates tileset text
  var tilesetCoordinates = document.getElementById("tileset_coordinates");
  tilesetCoordinates.innerHTML = "Tile: [X: " +  x + ", Y: " +  y + "]";
}
