"use strict";
let savedColors = ["", "", "", "", "", ""];
const hue = document.getElementById("hue");
const sat = document.getElementById("sat");
const light = document.getElementById("light");
const sample = document.getElementById("sample");
const hexInput = document.getElementById("hexInput");
let eventOriginator = document.getElementById("exitButton");
let param = "";
function Exit() {
  document.getElementById("ColorPickerOverlay").style.display = "none";
}
function LoadSaved() {
  let colorSquares = document.getElementsByClassName("savedColors");
  for (let i = 0; i < 6; i++) {
    colorSquares[i].style.backgroundColor = savedColors[i];
  }
  console.log(savedColors);
}
//popup color selector
function ColorPopup(attr) {
  eventOriginator = event.target;
  param = attr;
  document.getElementById("ColorPickerOverlay").style.display = "block";
  savedColors = JSON.parse(sessionStorage.getItem("palette"));
  let color = eventOriginator.style.backgroundColor;
  LoadSaved();
  sample.style.backgroundColor = color;
  console.log(color);
  let hsl = RGBtoHSL(color);
  hue.value = hsl[0];
  UpdateSat(hsl[0], hsl[1]);
  light.value = hsl[2];
  document.getElementById("hexVal").innerHTML = RGBtoHex(color);
}
//popup for saving to palette
function OverwritePopUp() {
  document.getElementById("overwriteOverlay").style.display = "block";
}
//updates saturation Val display
function UpdateSat(hueVal, satVal) {
  sat.value = satVal;
  let hueVar = document.getElementById("satDiv");
  hueVar.style.setProperty("--hue", hueVal);
}
//applies chosen color to paramter being colored
function Apply() {
  let color = sample.style.backgroundColor;
  eventOriginator.style.backgroundColor = color;
  alterParam(param, color);
  document.getElementById("ColorPickerOverlay").style.display = "none";
}
function SetHex() {
  let hexVal = hexInput.value;
  let pattern = /[#]?[A-Fa-f0-9]{6}/;
  if (pattern.test(hexVal)) {
    if (hexVal[0] == "#") {
      hexVal = hexVal.slice(1, hexVal.length);
    }
    sample.style.backgroundColor = "#" + hexVal;
    document.getElementById("hexVal").innerHTML = "#" + hexVal;
    let rgbVal = HextoRGB(hexVal);
    let hslVals = RGBtoHSL(rgbVal);
    sample.style.backgroundColor = rgbVal;
    hue.value = hslVals[0];
    UpdateSat(hslVals[0], hslVals[1]);
    light.value = hslVals[2];
    document.getElementById("hexVal").innerHTML = "#" + hexVal;
    document.getElementById("hexInput").value = "";
  }
}
//splits "hsl(x, y%, z%)" into a len 3 array containing x, y, z
function HSLParser(hsl) {
  let hslSlice = hsl.slice(4, hsl.length - 1);
  let vals = hslSlice.split(", ");
  return [
    Number(vals[0]),
    Number(vals[1].slice(0, vals[1].length - 1)),
    Number(vals[2].slice(0, vals[2].length - 1)),
  ];
}

//update color displayed in the sample
function UpdateColor() {
  let color =
    "hsl(" + hue.value + ", " + sat.value + "%, " + light.value + "%)";
  sample.style.backgroundColor = color;
  UpdateSat(hue.value, sat.value);
  console.log(sample.style.backgroundColor);
  document.getElementById("hexVal").innerHTML = RGBtoHex(
    sample.style.backgroundColor
  );
}

//load color from color palette
function LoadColor(index) {
  sample.style.backgroundColor = savedColors[index - 1];
  let hslVals = RGBtoHSL(savedColors[index - 1]);
  hue.value = hslVals[0];
  UpdateSat(hslVals[0], hslVals[1]);
  light.value = hslVals[2];
  document.getElementById("hexVal").innerHTML = RGBtoHex(
    savedColors[index - 1]
  );
}

function CloseOverwrite() {
  document.getElementById("overwriteOverlay").style.display = "none";
}
//save color to color palette
function Overwrite(index) {
  let newColor = sample.style.backgroundColor;
  document.getElementsByClassName("savedColors")[
    index - 1
  ].style.backgroundColor = newColor;
  savedColors[index - 1] = newColor;
  sessionStorage.setItem("palette", JSON.stringify(savedColors));
  CloseOverwrite();
}
