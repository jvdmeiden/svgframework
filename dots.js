// Set a stile attribute to vissible
function show(id) {
  document.getElementById(id).style.visibility = "visible";
}

// Set a stile attribute to collapsed 
function hide(id) {
  document.getElementById(id).style.visibility = "collapse";
}

// Read command line parameters
function init(){
  if (getQueryVariable("distance")){
    document.forms["choice"]["distance"].value = getQueryVariable("distance");
  }
  if (getQueryVariable("diameter")){
    document.forms["choice"]["diameter"].value = getQueryVariable("diameter");
  } 
  if (getQueryVariable("opacity")){
    document.forms["choice"]["opacity"].value = getQueryVariable("opacity");
  } 
  if (getQueryVariable("color")){
    document.forms["choice"]["color"].value = getQueryVariable("color");
  } 
}

// Drap a circle in SVG
function drawDot(object,x,y,r,fill,opacity){
  newDot = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); 
  newDot.setAttribute("cx",x); 
  newDot.setAttribute("cy",y); 
  newDot.setAttribute("r",r); 
  newDot.setAttribute("fill",fill); 
  newDot.setAttribute("fill-opacity",opacity); 
  object.appendChild(newDot);
}

// Dummy function for the form submit
function noAction(inp){
  return false;
}

// Process the data entered in the form and draw the SVG image
function submitChoice(inp){
  var svgObject=document.getElementById("svgpict");
  var d=parseInt(document.forms["choice"]["distance"].value);
  var r=parseInt(document.forms["choice"]["diameter"].value);
  var fill=document.forms["choice"]["color"].value;
  var opacity=document.forms["choice"]["opacity"].value;
  var maxX=window.screen.width*Math.max(1,window.devicePixelRatio);
  var maxY=window.screen.height*Math.max(1,window.devicePixelRatio);
  for (let x = (maxX/2)%d; x < maxX; x += d){
    for (let y = (maxY/2)%d; y < maxY; y += d){
      drawDot(svgObject,x,y,r,fill,opacity);
      y += d;
    }
      x += d;
  }
  return false;
}

// Read the command line to check for a specific variable
function getQueryVariable(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

// Change style attributes to show the menu
function showMenu()
{ 
  hide("button");
  show("menu");
}

// Change style attributes to hide the menu and show a button
function hideMenu()
{ 
  hide("menu");
  show("button");
}
