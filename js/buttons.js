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
  $("#btn_layer_0").click(function(event){
    SetLayer0 ();
    isEditorClicked = false;
    EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
  });
  $("#btn_layer_1").click(function(event){
    SetLayer1 ();
    isEditorClicked = false;
    EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
  });
  $("#btn_layer_2").click(function(event){
    SetLayer2 ();
    isEditorClicked = false;
    EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
  });
  $("#btn_layer_3").click(function(event){
    SetLayer3 ();
    isEditorClicked = false;
    EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
  });

  // New map
  $("#new_map").click(function(){
    console.log("New map");
  });

  // Load map
  $("#load_json_a").on("click", function() {
    // $("#load_json").trigger("click");
    console.log("Load map");
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
    for ( i = 0; i < 4; i++) {
      var layer = "";
      for ( j = 0; j < mapObj.sizeX; j++) {
        for ( k = 0; k < mapObj.sizeY; k++) {
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

function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
