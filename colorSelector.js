"use strict";
//FIXME: Randomizers need to change the sample color square
//maybe just have sample color load fromm current body color and the changees reflect in the sliders
//sliders need to be relatively sized
//hex value loader no longer working
let savedColors = ["", "", "", "", "", ""];
const hue = document.getElementById("hue");
const sat = document.getElementById("sat");
const light = document.getElementById("light");
const sample = document.getElementById("sample");
let eventOriginator = document.getElementById("exitButton");
let param = "";
function Exit() {
  document.getElementById("ColorPickerOverlay").style.display = "none";
}
function LoadSaved() {
  let colorSquares = document.getElementsByClassName("savedColors");
  //savedColors = JSON.parse(sessionStorage.getItem('palette'));
  for (let i = 0; i < 6; i++) {
    colorSquares[i].style.backgroundColor = savedColors[i];
  }
}
function ColorPopup(attr) {
  document.getElementById("ColorPickerOverlay").style.display = "block";
  savedColors = JSON.parse(sessionStorage.getItem("palette"));
  console.log(savedColors);
  LoadSaved();
  if (sample.style.backgroundColor == "") {
    sample.style.backgroundColor = "hsl(0, 50%, 50%)";
  }
  eventOriginator = event.target;
  param = attr;
}
function OverwritePopUp() {
  document.getElementById("overwriteOverlay").style.display = "block";
}
function UpdateSat(hueVal, satVal) {
  sat.value = satVal;
  let hueVar = document.getElementById("satDiv");
  hueVar.style.setProperty("--hue", hueVal);
}
function Apply() {
  let color = sample.style.backgroundColor;
  eventOriginator.style.backgroundColor = color;
  alterParam(param, color);
  document.getElementById("ColorPickerOverlay").style.display = "none";
}
function SetHex() {
  let hexVal = document.getElementById("hexInput").value;
  let pattern = /[#]?[A-Fa-f0-9]{6}/;
  if (pattern.test(hexVal)) {
    if (hexVal[0] == "#") {
      hexVal = hexVal.slice(1, hexVal.length);
    }
    sample.style.backgroundColor = "#" + hexVal;
    document.getElementById("hexVal").innerHTML = "#" + hexVal;
    //this conversion code from
    let r = 0,
      g = 0,
      b = 0;
    r = "0x" + hexVal[0] + hexVal[1];
    g = "0x" + hexVal[2] + hexVal[3];
    b = "0x" + hexVal[4] + hexVal[5];

    let hslVals = RGBtoHSL("rgb(" + +r + ", " + +g + ", " + +b + ")");
    sample.style.backgroundColor =
      "hsl(" + hslVals[0] + ", " + hslVals[1] + "%, " + hslVals[2] + "%)";
    hue.value = hslVals[0];
    console.log(hslVals[0]);
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
//conversion code obtained from
function toHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}
function HSLtoHex(hsl) {
  let h = hsl[0],
    s = hsl[1] / 100,
    l = hsl[2] / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  return toHex(r, g, b);
}
function RGBtoHSL(rgb) {
  rgb = rgb.slice(4, rgb.length - 1);
  let rgbAr = rgb.split(", ");
  let r = Number(rgbAr[0]) / 255,
    g = Number(rgbAr[1]) / 255,
    b = Number(rgbAr[2]) / 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let delta = max - min;
  let h = 0,
    l = (max + min) / 2,
    s = delta == 0 ? 0 : Math.round((delta / (1 - Math.abs(2 * l - 1))) * 100);
  if (delta == 0) {
    h = 0;
  } else if (max == r) {
    h = Math.round(60 * (((g - b) / delta) % 6));
  } else if (max == g) {
    h = Math.round(60 * ((b - r) / delta + 2));
  } else {
    h = Math.round(60 * ((r - g) / delta + 4));
  }
  if (h < 0) {
    h = 360 + h;
  }
  return [h, s, Math.round(l * 100)];
}
function UpdateColor() {
  let color =
    "hsl(" + hue.value + ", " + sat.value + "%, " + light.value + "%)";
  sample.style.backgroundColor = color;
  UpdateSat(hue.value, sat.value);
  document.getElementById("hexVal").innerHTML = HSLtoHex([
    hue.value,
    sat.value,
    light.value,
  ]);
}
//saved in the array as rgb(x, y, z) so needs to be converted to hsl(a, b, c) for porper display
function LoadColor(index) {
  sample.style.backgroundColor = savedColors[index - 1];
  let hslVals = RGBtoHSL(savedColors[index - 1]);
  hue.value = hslVals[0];
  UpdateSat(hslVals[0], hslVals[1]);
  light.value = hslVals[2];
  document.getElementById("hexVal").innerHTML = HSLtoHex(hslVals);
}
function CloseOverwrite() {
  document.getElementById("overwriteOverlay").style.display = "none";
}
function Overwrite(index) {
  let newColor = sample.style.backgroundColor;
  document.getElementsByClassName("savedColors")[
    index - 1
  ].style.backgroundColor = newColor;
  savedColors[index - 1] = newColor;
  sessionStorage.setItem("palette", JSON.stringify(savedColors));
  CloseOverwrite();
}
