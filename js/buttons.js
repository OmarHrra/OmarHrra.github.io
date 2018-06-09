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

// Listeners
function Listeners(mapObj){
  var keyB = 66, // B, b = Paint Bucket
        keyP = 80, // P, p = Pencil
        keyE = 69, // E, e = Eraser
        key1 = 49, // 1 = Layer0
        key2 = 50, // 2 = Layer1
        key3 = 51, // 3 = Layer2
        key4 = 52, // 4 = Layer3
        keyShift = 16 // Shift;

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
        // console.log("Layer0");
      }
      if(event.keyCode === key2){
        ChangeLayer(mapObj, 1);
        // console.log("Layer1");
      }
      if(event.keyCode === key3){
        ChangeLayer(mapObj, 2);
        // console.log("Layer2");
      }
      if(event.keyCode === key4){
        ChangeLayer(mapObj, 3);
        // console.log("Layer3");
      }
      if(event.altKey){
        // SelectTile(tilesetObj, 0, 0);
      }
      if(event.shiftKey){
        isShiftPressed = true;
        mapObj.lastPosition[0] = mapObj.currentPosition[0];
        mapObj.lastPosition[1] = mapObj.currentPosition[1];
      }
      console.log(event.keyCode);
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

  // New map
  $("#new_map").click(function(){
    console.log("New map");
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
      mapObj.ctx.canvas.width = mapObj.tileSize*mapObj.sizeX;
      mapObj.ctx.canvas.height = mapObj.tileSize*mapObj.sizeY;

      // Draw
      mapObj.layer = [];

      for (var i = 0; i < 4; i++) {
        mapObj.layer[i] = [];
      }
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < mapObj.sizeX; j++) {
          mapObj.layer[i][j] = [];
        }
      }

      for (var i = 0; i < 4; i++) {
        var layer = mapLoaded.layer[i].split(" ");
        for (var j = 0; j < mapObj.sizeX; j++) {
          for (var k = 0; k < mapObj.sizeY; k++) {
            mapObj.layer[i][j][k] = layer[((j*mapObj.sizeY))+k];
          }
        }
      }
      console.log(mapObj.layer);
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
                ""
              ],
      "permissions": ""
    };
    var canvas = document.getElementById("editor_canvas");
    saveMapObj.name = "new_map";
    saveMapObj.sizeX = "" + mapObj.sizeX;
    saveMapObj.sizeY = "" + mapObj.sizeY;
    for (var i = 0; i < 4; i++) {
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
    download(jsonString, saveMapObj.name + ".json", 'text/json');
  });

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
    default:
      console.log("Error changing layer");
  }
  isEditorClicked = false;
  EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
}

function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
