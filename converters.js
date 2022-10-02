"use strict";

function HextoRGB(hex) {
  if (hexVal[0] == "#") {
    hexVal = hexVal.slice(1, hexVal.length);
  }
  let r = 0,
    g = 0,
    b = 0;
  r = "0x" + hexVal[0] + hexVal[1];
  g = "0x" + hexVal[2] + hexVal[3];
  b = "0x" + hexVal[4] + hexVal[5];

  return "rgb(" + +r + ", " + +g + ", " + +b + ")";
}

//fix me, not working correctly: setting hex to rgb values
function RGBtoHex(rgb) {
  rgb = rgb.slice(4, rgb.length - 1);
  let rgbAr = rgb.split(", ");
  let r = Number(rgbAr[0]).toString(16),
    g = Number(rgbAr[1]).toString(16),
    b = Number(rgbAr[2]).toString(16);
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
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
