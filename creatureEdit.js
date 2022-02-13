"use strict";
//FIXME: add belly color?
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
  name: "",
  notes:""
};
const all=["body", "paw", "belly", "fur", "tail", "face", "ear", "horn", "gem", "name"];
const mults = ["fur", "tail", "face", "ear", "horn", "gem"];
const furs = ["straight", "curly", "sleek"];
const user = ["name", "notes"];
const pattern = /[^\w\-]+/;
const error = document.getElementById("error");
let cretDisplay = document.getElementById("creature");
function reloadAttribute(attr, accent){
  let feat = document.getElementsByClassName(attr);
  for(let i = 0; i< feat.length; i++){
    feat[i].style.display = "none";
  }
  feat[creature[attr]['shape'] - 1].style.display = "inline";
  if(accent == "none"){
    feat[creature[attr]['shape'] - 1].style.fill = creature[attr]['color'];
  } else{
    feat[creature[attr]['shape'] - 1].style.fill = creature['body'];
    if(creature[attr]['color']!= "none"){
      let acct = document.getElementsByClassName(accent);
      acct[creature[attr]['shape'] - 1].style.fill = creature[attr]['color'];
    }
  }
}
function reloadCreature() {
  reloadAttribute("gem", "none");
  reloadAttribute("horn", "none");
  reloadAttribute("ear", "earAccent");
  reloadAttribute("tail", "tailAccent");
  let bellies=document.getElementsByClassName("belly");
  for(let i=0; i<bellies.length; i++){
    bellies[i].style.display="none";
  
  }
  bellies[creature.belly-1].style.display="inline";
  bellies[creature.belly-1].style.fill=creature.face.color;
  document.getElementById("body").style.fill = creature.body;
  document.getElementById("face").style.fill = creature.face.color;
  document.getElementById("paw").style.fill = creature.paw;
}
function loadet(index) {
  let dets = document.getElementsByClassName("det");
  for (let i = 0; i < 3; i++) {
    dets[i].style.zIndex ="2";
    if (i == index) {
      dets[i].style.zIndex = "3";
    }
  }
}
function alterParam(param, val) {
  if (mults.indexOf(param) !== -1) {
    for (const property in creature[param]) {
      if (typeof creature[param][`${property}`] == typeof val) {
        creature[param][`${property}`] = val;
      }
    }
  } else if(user.indexOf(param)!==-1){
    //need to validate user input before accepting
    if(!pattern.test(val)){
      creature[param] = val;
      error.innerHTML = "";
    }else{
      error.innerHTML = "Please only enter letters, digits, hyphens, and sentence-ending puntuation marks."
    }
  }else {
    creature[param] = val;
  }
  //update display
  reloadCreature();
}
function randColor(){
  //we want to preference the 25-75% lightness range and the 25-100% saturation range
  //reduce to 4 and weight equiv more heavily (ie 2,3 for lightness, 2-4 for saturation weighed more heavily
  //to lazily simulate, lightness chooses from 0, 1, 2, 3, 4, 5,  where 0 is <25%, 5 is >75%, and the others mean to pick a number in the range
  // for saturation: 0, 1, 2, 3, 4, 5, 6, where 0 again means < 25%
  let lightness = Math.floor(Math.random()*6);
  if(lightness == 0){
    lightness = Math.floor(Math.random()*26);
  }else if(lightness==5){
    lightness= Math.floor(Math.random()*26)+75;
  }else{
    lightness= Math.floor(Math.random()*51)+25;
  }
  let saturation = Math.floor(Math.random()*7)==0? Math.floor(Math.random()*26):(Math.floor(Math.random()*75)+26);
  let hue= Math.floor(Math.random()*361);
  return "hsl(" + hue +", " + saturation + "%, "+lightness + "%)";
}
function Randomize(){
  let x=0;
  for(let i=0; i< all.length-1; i++){
    if(i>1){
      alterParam(all[i], Math.floor(Math.random()*4)+1);
    }
    if(i!=2 && i!=3){
      alterParam(all[i], randColor());
    }
    if(i==3){
      alterParam(all[i], furs[Math.floor(Math.random()*3)]);
    }
  }
}
function RandomizeOnlyColors(){
  for(let i=0; i< all.length-1; i++){
   if(i!=2 && i!=3){
     alterParam(all[i], randColor());
   }
  }
}
function RandomizeOnlyFeatures(){
  for(let i=2; i< all.length-1; i++){
    alterParam(all[i], Math.floor(Math.random()*4)+1);
    if(i==3){
      alterParam(all[i], furs[Math.floor(Math.random()*3)]);
    }
  }
}
function RandomizeFromPalette(colors){
 for(let i=0; i< all.length-1; i++){
   if(i!=2 && i!=3){
     alterParam(all[i], colors(Math.floor(Math.random()*5)));
   }
  }
}
reloadCreature();

