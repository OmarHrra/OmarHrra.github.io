// Buttons
$(document).ready(function(){
    // Layers
    $("#btn_layer_0").click(function(){
      SetLayer0 ();
    });
    $("#btn_layer_1").click(function(){
      SetLayer1 ();
    });
    $("#btn_layer_2").click(function(){
      SetLayer2 ();
    });
    $("#btn_layer_3").click(function(){
      SetLayer3 ();
    });

    // Tools
    $("#btn_tool_0").click(function(){
      SetTool0();
    });
    $("#btn_tool_1").click(function(){
      SetTool1();
    });
    $("#btn_tool_2").click(function(){
      SetTool2();
    });
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

// Listeners

function LayersListeners(mapObj){
  var btn_layer_0 = document.getElementById("btn_layer_0"),
      btn_layer_1 = document.getElementById("btn_layer_1");
      btn_layer_2 = document.getElementById("btn_layer_2");
      btn_layer_3 = document.getElementById("btn_layer_3");
  btn_layer_0.addEventListener("click", function(event){
    isEditorClicked = false;
    EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
  });
  btn_layer_1.addEventListener("click", function(event){
    isEditorClicked = false;
    EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
  });
  btn_layer_2.addEventListener("click", function(event){
    isEditorClicked = false;
    EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
  });
  btn_layer_3.addEventListener("click", function(event){
    isEditorClicked = false;
    EditorPointer(mapObj, mapObj.currentPosition[0]*mapObj.tileSize, mapObj.currentPosition[1]*mapObj.tileSize);
  });
}

// New map
$("#new_map").click(function(){
  console.log("New map");
});
// Save map
$("#save_json").click(function(){
  console.log("Save map");
});

// Load map
$("#load_json_a").on("click", function() {
  // $("#load_json").trigger("click");
  console.log("Load map");
});
