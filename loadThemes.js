//will want to load a theme from the sql database
//Want both option to choose random saved theme and let user pick theme
//
//For now, load desert theme
$(document).ready(function(){
  let colors = ["#e48944", "#d76950", "#ecaa04", "#afc95e", "#cd93b6", "ffffff"];
  $("body").css({"background-image":"url('supportingFiles/desertbg.svg')", "background-repeat":"no-repeat", "background-size":"cover"});
  $(":root").css({"--c1":colors[0], "--c2":colors[1], "--c3":colors[2], "--c4":colors[3], "--c5":colors[4], "--c6":colors[5]});
  sessionStorage.setItem('palette', JSON.stringify(colors));
});
