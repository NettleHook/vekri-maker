//will want to load a theme from the sql database
//Want both option to choose random saved theme and let user pick theme
//
//For now, load desert theme
//convert colors to rgb before storing in 'palette'
//maybe really rework converters from colorSelector.js

//for now
function HextoRGB(hexVal) {
  let r = 0,
    g = 0,
    b = 0;
  r = "0x" + hexVal[1] + hexVal[2];
  g = "0x" + hexVal[3] + hexVal[4];
  b = "0x" + hexVal[5] + hexVal[6];
  return "rgb(" + +r + ", " + +g + ", " + +b + ")";
}

$(document).ready(function () {
  let colors = [
    "#e48944",
    "#d76950",
    "#ecaa04",
    "#afc95e",
    "#cd93b6",
    "#ffffff",
  ];
  console.log(colors);
  for (let i = 0; i < 6; i++) {
    colors[i] = HextoRGB(colors[i]);
  }
  console.log(colors);
  $("body").css({
    "background-image": "url('supportingFiles/desertbg.svg')",
    "background-repeat": "no-repeat",
    "background-size": "cover",
  });
  $(":root").css({
    "--c1": colors[0],
    "--c2": colors[1],
    "--c3": colors[2],
    "--c4": colors[3],
    "--c5": colors[4],
    "--c6": colors[5],
  });
  sessionStorage.setItem("palette", JSON.stringify(colors));
});
