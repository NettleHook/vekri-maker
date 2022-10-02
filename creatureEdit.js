"use strict";
//FIXME: color randomizers maybe only reload color so we're not making server/sql requests
let creature = {
  body: "hsl(0, 100%, 100%)",
  faceAccent: "hsl(0, 0%, 0%)",
  paw: "hsl(0, 0%, 50%)",
  belly: 1,
  fur: { len: 0, type: "straight" },
  tail: { shape: 1, color: "none" },
  face: { shape: 1, color: "hsl(0, 0%, 50%)" },
  ear: { shape: 1, color: "hsl(0, 0%, 50%)" },
  horn: { shape: 1, color: "hsl(0, 0%, 50%)" },
  gem: { shape: 1, color: "hsl(0, 100%, 100%)" },
  //gen eye shape and sclera color
  eyes1: { shape: 1, color: "hsl(0, 100%, 100%)" },
  //lashes and iris color
  eyes2: { shape: 0, color: "hsl(0, 0%, 50%)" },
  pupil: { shape: 1, color: "hsl(0, 100%, 0%)" },
  mouth: { shape: 1, color: "hsl(0, 100%, 0%)" },
  acc1: { shape: 1, color: "hsl(0, 100%, 0%)" },
  acc2: { shape: 1, color: "hsl(0, 100%, 0%)" },
  name: "",
  notes: "",
};
const all = [
  "body", //color-only, index = 0
  "faceAccent", //color-only, index = 1
  "paw", //color-only, index = 2
  "belly", //shape-only: 0-5, index = 3
  "fur", //shape: 0-1, type = array ref, index = 4
  "tail", //shape: 1-5, add chance for none, index = 5
  "face", //shape: 1-5, add chance for none, index = 6
  "ear", //shape: 1-5, add chance for none, index = 7
  "horn", //shape: 1-5, index = 8
  "gem", //shape: 1-5, index = 9
  "eyes1", //shape: 1,3,5,7 (for now), index = 10
  "eyes2", //shape: 0-1, index = 11
  "pupil", //shape: 1,3,5,7,9 (for now), index = 12
  "mouth", //shape: 1-8, index = 13
  "acc1", //shape: 1-5, index = 14
  "acc2", //shape: 1-5, index = 15
  "name",
  "notes",
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
const face = ["faceAccent", "eyes", "all", "eyes1", "eyes2", "pupil", "mouth"];
const eyes = [1, 2, 3, 6, 5, 10, 7, 14, 9, 18];
const furs = ["straight", "curly", "pattern"];
const user = ["name", "notes"];
const pattern = /[^\w\-]+/;
const error = document.getElementById("error");
let more = false;
let cretDisplay = document.getElementById("creature");
function reloadCreature(feat) {
  more = false;
  if (more) {
    creature.eyes1.shape = 2 * creature.eyes1.shape;
    creature.pupil.shape = 2 * creature.pupil.shape;
  } else if (creature.eyes1.shape % 2 == 0) {
    creature.eyes1.shape = creature.eyes1.shape / 2;
    creature.pupil.shape = creature.pupil.shape / 2;
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
      eye1: creature.eyes1.shape,
      pupil: creature.pupil.shape,
      mouth: creature.mouth.shape,
      changed: feat,
    },
    function (data) {
      document.getElementById("creature").innerHTML = data;
      document.getElementById("body").style.fill = creature.body;
      document.getElementById("face").style.fill = creature.face.color;
      document.getElementById("belly").style.fill = creature.face.color;
      document.getElementById("gem").style.fill = creature.gem.color;
      if (creature.eyes1.shape % 7 != 0) {
        console.log("eye shape: " + creature.eyes1.shape);
        document.getElementById("sclera").style.fill = creature.eyes1.color;
        document.getElementById("iris").style.fill = creature.eyes2.color;
        document.getElementById("pupil").style.fill = creature.pupil.color;
      }
      //consider changing order lol
      if (creature.mouth.shape > 4 && creature.mouth.shape != 7) {
        document.getElementById("mouthAccent").style.fill =
          creature.mouth.color;
      }
      document.getElementById("horn").style.fill = creature.horn.color;
      document.getElementById("earAccent").style.fill = creature.ear.color;
      document.getElementById("tailAccent").style.fill = creature.tail.color;
      document.getElementById("paw").style.fill = creature.paw;
      if (face.indexOf(feat) !== -1) {
        let faceDets = document.getElementsByClassName("faceAccent");
        for (let i = 0; i < faceDets.length; i++) {
          faceDets[i].style.fill = creature.faceAccent;
        }
      }
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
function changeEyeNum(ch) {
  let curr = creature.eyes1.shape;
  if (ch == "+" && curr % 2 == 1) {
    more = true;
    document.getElementById("2eye").disabled = false;
    document.getElementById("4eye").disabled = true;
    reloadCreature("eyes");
  } else if (ch == "-" && curr % 2 == 0) {
    more = false;
    document.getElementById("2eye").disabled = true;
    document.getElementById("4eye").disabled = false;
    reloadCreature("eyes");
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
  for (let i = 0; i < all.length - 2; i++) {
    if (i > 2) {
      setParam(all[i], Math.floor(Math.random() * 5) + 1);
    }
    if (i != 3 && i != 4) {
      setParam(all[i], randColor());
    }
    //furs
    if (i == 4) {
      //for now only doing first two furs and length
      setParam(all[i], furs[Math.floor(Math.random() * 2)]);
      setParam(all[i], Math.floor(Math.random() * 1));
    }
    if (i == 6) {
      setParam(all[i], Math.floor(Math.random() * 2) + 1);
    }
    //eyes
    if (i == 10) {
      //for now, only allow 1, 3, 5, 7. IN the future, 1, 2, 3, 5, 6, 7, 10, 14
      x = Math.floor(Math.random() * 4);
      setParam(all[i], 2 * x + 1);
    }
    //lashes
    if (i == 11) {
      setParam(all[i], Math.floor(Math.random() * 2));
    }
    //pupils
    if (i == 12) {
      x = Math.floor(Math.random() * 5);
      //if creature.eyes1.shape is even, only allow 2, 6, 10, 14, 18
      if (creature.eyes1.shape % 2 == 0) {
        setParam(all[i], eyes[2 * x + 1]);
      }
      //else, only allow 1, 3, 5, 7, 9
      else {
        setParam(all[i], eyes[2 * x]);
      }
    }
    //mouth
    if (i == 13) {
      setParam(all[i], Math.floor(Math.random() * 8) + 1);
    }
  }
  //update display
  reloadCreature("all");
  UpdatePopupOpener();
}
function RandomizeOnlyColors() {
  for (let i = 0; i < all.length - 2; i++) {
    if (i != 3 && i != 4) {
      setParam(all[i], randColor());
    }
  }
  //update display
  reloadCreature("all");
  UpdatePopupOpener();
}
function RandomizeOnlyFeatures() {
  let x = 0;
  for (let i = 3; i < all.length - 2; i++) {
    setParam(all[i], Math.floor(Math.random() * 5) + 1);
    //furs
    if (i == 4) {
      //for now only doing first two furs and first length
      setParam(all[i], furs[Math.floor(Math.random() * 2)]);
      setParam(all[i], Math.floor(Math.random() * 1));
    }
    if (i == 6) {
      setParam(all[i], Math.floor(Math.random() * 2) + 1);
    }
    //eyes
    if (i == 10) {
      //for now, only allow 1, 3, 5, 7. IN the future, 1, 2, 3, 5, 6, 7, 10, 14
      x = Math.floor(Math.random() * 4);
      setParam(all[i], 2 * x + 1);
    }
    //lashes
    if (i == 11) {
      setParam(all[i], Math.floor(Math.random() * 2));
    }
    //pupils
    if (i == 12) {
      x = Math.floor(Math.random() * 5);
      //if creature.eyes1.shape is even, only allow 2, 6, 10, 14, 18
      if (creature.eyes1.shape % 2 == 0) {
        setParam(all[i], eyes[2 * x + 1]);
      }
      //else, only allow 1, 3, 5, 7, 9
      else {
        setParam(all[i], eyes[2 * x]);
      }
    }
    //mouth
    if (i == 13) {
      setParam(all[i], Math.floor(Math.random() * 8) + 1);
    }
  }
  //update display
  reloadCreature("all");
}
function RandomizePaletteColors() {
  let colors = JSON.parse(sessionStorage.getItem("palette"));
  for (let i = 0; i < all.length - 2; i++) {
    if (i != 3 && i != 4) {
      setParam(all[i], colors[Math.floor(Math.random() * 5)]);
    }
  }
  //update display
  reloadCreature("all");
  UpdatePopupOpener();
}
reloadCreature("all");

function UpdatePopupOpener() {
  document.getElementById("bodypop").style.backgroundColor = creature.body;
  document.getElementById("pawpop").style.backgroundColor = creature.paw;
  document.getElementById("tailAccentpop").style.backgroundColor =
    creature.tail.color;
  document.getElementById("facepop").style.backgroundColor =
    creature.face.color;
    document.getElementById("hornpop").style.backgroundColor =
    creature.horn.color;
  document.getElementById("earAccentpop").style.backgroundColor =
    creature.ear.color;
  document.getElementById("faceAccentpop").style.backgroundColor =
    creature.faceAccent;
  document.getElementById("gempop").style.backgroundColor = creature.gem.color;
  document.getElementById("irispop").style.backgroundColor =
    creature.eyes2.color;
  document.getElementById("sclerapop").style.backgroundColor =
    creature.eyes1.color;
  document.getElementById("pupilpop").style.backgroundColor =
    creature.pupil.color;
  document.getElementById("mouthpop").style.backgroundColor =
    creature.mouth.color;
  document.getElementById("acc1pop").style.backgroundColor =
    creature.acc1.color;
  document.getElementById("acc2pop").style.backgroundColor =
    creature.acc2.color;
}

function download(){
console.log("Downloading rn");
  $.post("./downloadCreature.php",{
    name: creature.name,
    desc:creature.notes,
  },
  function(){
  console.log("File has been downloaded");
  
  });
}
