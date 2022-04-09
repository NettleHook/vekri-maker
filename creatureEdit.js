"use strict";
//FIXME: color randomizers maybe only reload color so we're not making server/sql requests
let creature = {
  body: "hsl(0, 100%, 100%)",
  paw: "hsl(0, 100%, 0%",
  belly: 1,
  fur: { len: 0, type: "straight" },
  tail: { shape: 1, color: "none" },
  face: { shape: 1, color: "hsl(0, 100%, 100%)" },
  ear: { shape: 1, color: "hsl(0, 100%, 100%)" },
  horn: { shape: 1, color: "hsl(0, 100%, 100%)" },
  gem: { shape: 1, color: "hsl(0, 100%, 0%)" },
  //gen eye shape and sclera color
  eyes1: { shape: 1, color: "hsl(0, 100%, 0%)" },
  //lashes and iris color
  eyes2: { shape: 0, color: "hsl(0, 100%, 0%)" },
  pupil: { shape: 1, color: "hsl(0, 100%, 0%)" },
  mouth: { shape: 1, color: "hsl(0, 100%, 0%)" },
  acc1: { shape: 1, color: "hsl(0, 100%, 0%)" },
  acc2: { shape: 1, color: "hsl(0, 100%, 0%)" },
  name: "",
  notes: "",
};
const all = [
  "body",
  "paw",
  "belly",
  "fur",
  "tail",
  "face",
  "ear",
  "horn",
  "gem",
  "eyes1",
  "eyes2",
  "pupil",
  "mouth",
  "acc1",
  "acc2",
  "name",
];
const mults = [
  "fur",
  "tail",
  "face",
  "ear",
  "horn",
  "gem",
  "eyes1",
  "eyes2",
  "pupil",
  "mouth",
  "acc1",
  "acc2",
];
const furs = ["straight", "curly", "pattern"];
const user = ["name", "notes"];
const pattern = /[^\w\-]+/;
const error = document.getElementById("error");
let more = false;
let cretDisplay = document.getElementById("creature");
function reloadCreature(feat) {
  if (more) {
    console.log("doubling eyes");
    creature.eyes1.shape = 2 * creature.eyes1.shape;
  } else if (creature.eyes1.shape % 2 == 0) {
    creature.eyes1.shape = creature.eyes1.shape / 2;
  }
  console.log(creature);
  $.post(
    "./reloadCreature.php",
    {
      texture: creature.fur.type,
      length: creature.fur.len,
      belly: creature.belly,
      tail: creature.tail.shape,
      face: creature.face.shape,
      ear: creature.ear.shape,
      horn: creature.horn.shape,
      gem: creature.gem.shape,
      changed: feat,
    },
    function (data) {
      document.getElementById("creature").innerHTML = data;
      document.getElementById("body").style.fill = creature.body;
      document.getElementById("face").style.fill = creature.face.color;
      document.getElementById("belly").style.fill = creature.face.color;
      document.getElementById("gem").style.fill = creature.gem.color;
      //document.getElementById("horn").style.fill = creature.horn.color;
      document.getElementById("earAccent").style.fill = creature.ear.color;
      document.getElementById("tailAccent").style.fill = creature.tail.color;
      document.getElementById("paw").style.fill = creature.paw;
    }
  );
}
function loadet(index) {
  let dets = document.getElementsByClassName("det");
  for (let i = 0; i < 3; i++) {
    dets[i].style.zIndex = "2";
    if (i == index) {
      dets[i].style.zIndex = "3";
    }
  }
}
function setParam(param, val) {
  if (mults.indexOf(param) !== -1) {
    for (const property in creature[param]) {
      if (typeof creature[param][`${property}`] == typeof val) {
        creature[param][`${property}`] = val;
      }
    }
  } else if (user.indexOf(param) !== -1) {
    //need to validate user input before accepting
    if (!pattern.test(val)) {
      creature[param] = val;
      error.innerHTML = "";
    } else {
      error.innerHTML =
        "Please only enter letters, digits, hyphens, and sentence-ending puntuation marks.";
    }
  } else {
    creature[param] = val;
  }
}
function alterParam(param, val) {
  setParam(param, val);
  //update display
  reloadCreature(param);
}
//fixme: disable the -/+ buttons accordingly?
function changeEyeNum(ch) {
  let curr = creature.eyes1.shape;
  if (ch == "+" && curr % 2 == 1) {
    more = true;
    document.getElementById("2eye").disabled = false;
    document.getElementById("4eye").disabled = true;
    reloadCreature("eyes1");
  } else if (ch == "-" && curr % 2 == 0) {
    more = false;
    document.getElementById("2eye").disabled = true;
    document.getElementById("4eye").disabled = false;
    reloadCreature("eyes1");
  }
}
function randColor() {
  //we want to preference the 25-75% lightness range and the 25-100% saturation range
  //reduce to 4 and weight equiv more heavily (ie 2,3 for lightness, 2-4 for saturation weighed more heavily
  //to lazily simulate, lightness chooses from 0, 1, 2, 3, 4, 5,  where 0 is <25%, 5 is >75%, and the others mean to pick a number in the range
  // for saturation: 0, 1, 2, 3, 4, 5, 6, where 0 again means < 25%
  let lightness = Math.floor(Math.random() * 6);
  if (lightness == 0) {
    lightness = Math.floor(Math.random() * 26);
  } else if (lightness == 5) {
    lightness = Math.floor(Math.random() * 26) + 75;
  } else {
    lightness = Math.floor(Math.random() * 51) + 25;
  }
  let saturation =
    Math.floor(Math.random() * 7) == 0
      ? Math.floor(Math.random() * 26)
      : Math.floor(Math.random() * 75) + 26;
  let hue = Math.floor(Math.random() * 361);
  return "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
}
function Randomize() {
  let x = 0;
  for (let i = 0; i < all.length - 1; i++) {
    if (i > 1) {
      setParam(all[i], Math.floor(Math.random() * 4) + 1);
    }
    if (i != 2 && i != 3) {
      setParam(all[i], randColor());
    }
    if (i == 3) {
      setParam(all[i], furs[Math.floor(Math.random() * 3)]);
      setParam(all[i], Math.floor(Math.random() * 2));
    }
  }
  //update display
  reloadCreature("all");
}
function RandomizeOnlyColors() {
  for (let i = 0; i < all.length - 1; i++) {
    if (i != 2 && i != 3) {
      setParam(all[i], randColor());
    }
  }
  //update display
  reloadCreature("all");
}
function RandomizeOnlyFeatures() {
  for (let i = 2; i < all.length - 1; i++) {
    if (i == 3) {
      setParam(all[i], furs[Math.floor(Math.random() * 3)]);
      setParam(all[i], Math.floor(Math.random() * 2));
    } else {
      setParam(all[i], Math.floor(Math.random() * 4) + 1);
    }
  }
  //update display
  reloadCreature("all");
}
function RandomizePaletteColors() {
  let colors = JSON.parse(sessionStorage.getItem("palette"));
  for (let i = 0; i < all.length - 1; i++) {
    if (i != 2 && i != 3) {
      setParam(all[i], colors[Math.floor(Math.random() * 5)]);
    }
  }
  //update display
  reloadCreature("all");
}
reloadCreature("all");
