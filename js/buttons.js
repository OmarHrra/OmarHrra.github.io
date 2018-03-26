//Tools
$(document).ready(function(){
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
