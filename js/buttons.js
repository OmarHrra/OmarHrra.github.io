// Tools
function SetTool0 (){
  currentTool = 0;
  $("#btn_tool_0").addClass("active-button");
  $("#btn_tool_1").removeClass("active-button");
  $("#btn_tool_2").removeClass("active-button");
}
function SetTool1 (){
  currentTool = 1;
  $("#btn_tool_0").removeClass("active-button");
  $("#btn_tool_1").addClass("active-button");
  $("#btn_tool_2").removeClass("active-button");
}
function SetTool2 (){
  currentTool = 2;
  $("#btn_tool_0").removeClass("active-button");
  $("#btn_tool_1").removeClass("active-button");
  $("#btn_tool_2").addClass("active-button");
}

$("#btn_tool_0").click(function(){
  SetTool0();
});
$("#btn_tool_1").click(function(){
  SetTool1();
});
$("#btn_tool_2").click(function(){
  SetTool2();
});

// Layers
function SetLayer0 (){
  currentLayer = 0;
  $("#btn_layer_0").addClass("active-button");
  $("#btn_layer_1").removeClass("active-button");
  $("#btn_layer_2").removeClass("active-button");
  $("#btn_layer_3").removeClass("active-button");
}
function SetLayer1 (){
  currentLayer = 1;
  $("#btn_layer_0").removeClass("active-button");
  $("#btn_layer_1").addClass("active-button");
  $("#btn_layer_2").removeClass("active-button");
  $("#btn_layer_3").removeClass("active-button");
}
function SetLayer2 (){
  currentLayer = 2;
  $("#btn_layer_0").removeClass("active-button");
  $("#btn_layer_1").removeClass("active-button");
  $("#btn_layer_2").addClass("active-button");
  $("#btn_layer_3").removeClass("active-button");
}
function SetLayer3 (){
  currentLayer = 3;
  $("#btn_layer_0").removeClass("active-button");
  $("#btn_layer_1").removeClass("active-button");
  $("#btn_layer_2").removeClass("active-button");
  $("#btn_layer_3").addClass("active-button");
}
function SetLayer4 (){
  currentLayer = 4;
  $("#btn_layer_0").removeClass("active-button");
  $("#btn_layer_1").removeClass("active-button");
  $("#btn_layer_2").removeClass("active-button");
  $("#btn_layer_3").removeClass("active-button");
}
function SetLayer5 (){
  currentLayer = 5;
  $("#btn_layer_0").removeClass("active-button");
  $("#btn_layer_1").removeClass("active-button");
  $("#btn_layer_2").removeClass("active-button");
  $("#btn_layer_3").removeClass("active-button");
}

function ChangeLayer(mapObj, i){
  switch (i) {
    case 0:
      SetLayer0 ();
      break;
    case 1:
      SetLayer1 ();
      break;
    case 2:
      SetLayer2 ();
      break;
    case 3:
      SetLayer3 ();
      break;
    case 4:
      SetLayer4 ();
      break;
    case 5:
      SetLayer5 ();
      break;
    default:
      console.log("Error changing layer");
  }
  isEditorClicked = false;
  EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
}

// Listeners
function Listeners(mapObj){
  var keyB = 66, // B, b = Paint Bucket
      keyP = 80, // P, p = Pencil
      keyE = 69, // E, e = Eraser
      key1 = 49, // 1 = Layer0
      key2 = 50, // 2 = Layer1
      key3 = 51, // 3 = Layer2
      key4 = 52, // 4 = Layer3
      key5 = 53, // 5 = Movement permissions
      key6 = 54, // 6 = Events
      keyShift      = 16, // Shift
      keyArrowLeft  = 37, // Arroy Left
      keyArrowUp    = 38, // Arrow Up
      keyArrowRight = 39, // Arroy Right
      keyArrowDown  = 40; // Arrow Down

  $(document).on("keydown", function(event){
    if(event.keyCode == keyP){
      SetTool0();
      // console.log("Pencil");
    }
    if(event.keyCode === keyB){
      SetTool1();
      // console.log("Paint Bucket");
    }
    if(event.keyCode === keyE){
      SetTool2();
      // console.log("Eraser");
    }
    if(event.keyCode === key1){
      ChangeLayer(mapObj, 0);
      console.log("Layer0");
    }
    if(event.keyCode === key2){
      ChangeLayer(mapObj, 1);
      console.log("Layer1");
    }
    if(event.keyCode === key3){
      ChangeLayer(mapObj, 2);
      console.log("Layer2");
    }
    if(event.keyCode === key4){
      ChangeLayer(mapObj, 3);
      console.log("Layer3");
    }
    if(event.keyCode === key5){
      ChangeLayer(mapObj, 4);
      console.log("Movement permissions");
    }
    if(event.keyCode === key6){
      ChangeLayer(mapObj, 5);
      console.log("Events");
    }
    if(event.altKey){
      // SelectTile(tilesetObj, 0, 0);
    }
    if(event.shiftKey){
      isShiftPressed = true;
      mapObj.lastPosition[0] = mapObj.currentPosition[0];
      mapObj.lastPosition[1] = mapObj.currentPosition[1];
    }
    // Arrows
    if(event.keyCode === keyArrowLeft){
      offset[0] -= 1;
      if(offset[0] < 0){
        offset[0] = 0;
      }
      EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
      // console.log("Arrow Left");
    }
    if(event.keyCode === keyArrowUp){
      offset[1] -= 1;
      if(offset[1] < 0){
        offset[1] = 0;
      }
      EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
      // console.log("Arrow Up");
    }
    if(event.keyCode === keyArrowRight){
      offset[0] += 1;
      if(offset[0] > mapObj.sizeX - mapObj.canvasSizeX){
        offset[0] = mapObj.sizeX - mapObj.canvasSizeX;
      }
      EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
      // console.log("Arrow Right");
    }
    if(event.keyCode === keyArrowDown){
      offset[1] += 1;
      if(offset[1] > mapObj.sizeY - mapObj.canvasSizeY){
        offset[1] = mapObj.sizeY - mapObj.canvasSizeY;
      }
      EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
      // console.log("Arrow Down");
    }

    console.log(event.keyCode);
  });

  $(document).on("keyup", function(event){
    isShiftPressed = false;
    axis = null;
  });

  // New map
  $("#new_map").click(function(){
    // Size
    mapObj.sizeX = parseInt($("#new_map_width").val());
    mapObj.sizeY = parseInt($("#new_map_height").val());

    if (mapObj.sizeX >= 150) {
      mapObj.sizeX = 150;
      $("#new_map_width").val("150");
    }
    if (mapObj.sizeY >= 150) {
      mapObj.sizeY = 150;
      $("#new_map_height").val("150");
    }
    if (mapObj.sizeX <= 2) {
      mapObj.sizeX = 2;
      $("#new_map_width").val("2");
    }
    if (mapObj.sizeY <= 2) {
      mapObj.sizeY = 2;
      $("#new_map_height").val("2");
    }

    if (mapObj.sizeX >= mapObj.canvasSizeX) {
      mapObj.canvasSizeX = parseInt($("#options_canvas_width").val());
    }
    if (mapObj.sizeY >= mapObj.canvasSizeY) {
      mapObj.canvasSizeY = parseInt($("#options_canvas_height").val());
    }

    if (mapObj.canvasSizeX >= mapObj.sizeX) {
      mapObj.canvasSizeX = mapObj.sizeX;
    }
    if (mapObj.canvasSizeY >= mapObj.sizeY) {
      mapObj.canvasSizeY = mapObj.sizeY;
    }

    mapObj.ctx.canvas.width = mapObj.tileSize*mapObj.canvasSizeX;
    mapObj.ctx.canvas.height = mapObj.tileSize*mapObj.canvasSizeY;

    // Draw
    mapObj.layer = [];

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
    offset[0] = 0;
    offset[1] = 0;
    DrawEditor(mapObj);
    EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
  });

  // Load map
  $("#load_json_a").on("click", function() {
    $("#load_json").trigger("click");
  });
  $("#load_json").on("change", function() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(progressEvent){
      var mapLoaded = JSON.parse(this.result);
      // Size
      mapObj.sizeX = mapLoaded.sizeX;
      mapObj.sizeY = mapLoaded.sizeY;

      if (mapObj.sizeX >= mapObj.canvasSizeX) {
        mapObj.canvasSizeX = parseInt($("#options_canvas_width").val());
      }
      if (mapObj.sizeY >= mapObj.canvasSizeY) {
        mapObj.canvasSizeY = parseInt($("#options_canvas_height").val());
      }

      if (mapObj.canvasSizeX >= mapObj.sizeX) {
        mapObj.canvasSizeX = mapObj.sizeX;
      }
      if (mapObj.canvasSizeY >= mapObj.sizeY) {
        mapObj.canvasSizeY = mapObj.sizeY;
      }

      mapObj.ctx.canvas.width = mapObj.tileSize*mapObj.canvasSizeX;
      mapObj.ctx.canvas.height = mapObj.tileSize*mapObj.canvasSizeY;

      // Draw
      mapObj.layer = [];

      for (var i = 0; i < 6; i++) {
        mapObj.layer[i] = [];
      }
      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < mapObj.sizeX; j++) {
          mapObj.layer[i][j] = [];
        }
      }

      for (var i = 0; i < 6; i++) {
        var layer = mapLoaded.layer[i].split(" ");
        for (var j = 0; j < mapObj.sizeX; j++) {
          for (var k = 0; k < mapObj.sizeY; k++) {
            mapObj.layer[i][j][k] = layer[((j*mapObj.sizeY))+k];
          }
        }
      }
      console.log(mapObj.layer);
      offset[0] = 0;
      offset[1] = 0;
      DrawEditor(mapObj);
      EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
    };
    reader.readAsText(file);
    this.value = null;
  });

  // Save map
  $("#save_json").click(function(){
    var saveMapObj = {
      "name": "",
      "sizeX": "",
      "sizeY": "",
      "layer": [
                "",
                "",
                "",
                "",
                "",
                ""
              ]
    };
    var canvas = document.getElementById("editor_canvas");
    saveMapObj.name = $("#new_map_name").val();
    if (saveMapObj.name === "") {
      saveMapObj.name = "new_map";
    }
    saveMapObj.sizeX = "" + mapObj.sizeX;
    saveMapObj.sizeY = "" + mapObj.sizeY;
    for (var i = 0; i < 6; i++) {
      var layer = "";
      for (var j = 0; j < mapObj.sizeX; j++) {
        for (var k = 0; k < mapObj.sizeY; k++) {
          layer += mapObj.layer[i][j][k] + " ";
        }
      }
      layer = layer.slice(0, -1);
      saveMapObj.layer[i] = layer;
    }

    var jsonString = JSON.stringify(saveMapObj);
    var a = document.createElement("a");
    var file = new Blob([jsonString], {'text/json': 'text/json'});
    a.href = URL.createObjectURL(file);
    a.download = saveMapObj.name + ".json";
    a.click();

  });

  $("#options_save_changes").click(function(){
    // Size
    mapObj.canvasSizeX = parseInt($("#options_canvas_width").val());
    mapObj.canvasSizeY = parseInt($("#options_canvas_height").val());

    if (mapObj.canvasSizeX >= 50) {
      mapObj.canvasSizeX = 50;
      $("#options_canvas_width").val("50");
    }
    if (mapObj.canvasSizeY >= 32) {
      mapObj.canvasSizeY = 32;
      $("#options_canvas_height").val("32");
    }
    if (mapObj.canvasSizeX <= 10) {
      mapObj.canvasSizeX = 10;
      $("#options_canvas_width").val("10");
    }
    if (mapObj.canvasSizeY <= 10) {
      mapObj.canvasSizeY = 10;
      $("#options_canvas_height").val("10");
    }

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

    offset[0] = 0;
    offset[1] = 0;
    DrawEditor(mapObj);
    EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
  });

  $("#btn_layer_0").click(function(event){
    ChangeLayer(mapObj, 0);
  });
  $("#btn_layer_1").click(function(event){
    ChangeLayer(mapObj, 1);
  });
  $("#btn_layer_2").click(function(event){
    ChangeLayer(mapObj, 2);
  });
  $("#btn_layer_3").click(function(event){
    ChangeLayer(mapObj, 3);
  });
  // $("#btn_layer_4").click(function(event){
  //   ChangeLayer(mapObj, 4);
  // });
  // $("#btn_layer_5").click(function(event){
  //   ChangeLayer(mapObj, 5);
  // });

  $("#colorpicker").on("change", function() {
  	$("#hexcolor").val(this.value);
    DrawEditor(mapObj);
    EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
  });
  $("#hexcolor").on("change", function() {
    $("#colorpicker").val(this.value);
    DrawEditor(mapObj);
    EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
  });

  $("#show_grid").change(function() {
    if(this.checked) {
      mapObj.grid = true;
    }else {
      mapObj.grid = false;
    }
  });

}
