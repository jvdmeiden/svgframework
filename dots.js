// Counter for 'layers'
let count = 0;
let mouseDown = 0;
let lastX = 0;
let lastY = 0;
let touch = 0;

// Set a stile attribute to vissible
function show(id) {
  document.getElementById(id).style.visibility = "visible";
}

// Set a stile attribute to collapsed 
function hide(id) {
  document.getElementById(id).style.visibility = "collapse";
}

// Initialize, read command line parameters
function init(){
  var svgObject=document.getElementById("svgpict");
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
  if(window.matchMedia("(pointer: coarse)").matches) {
    touch = 1;
  }
  if ( touch == 0 ){
    svgObject.addEventListener("mouseup", (e) => {
      mouseDown = 0;
    }) 
    svgObject.addEventListener("mousedown", (e) => {
      mouseDown = 1;
      lastX = e.offsetX;
      lastY = e.offsetY;
    }) 
    svgObject.addEventListener("mousemove", (e) => {
      if (mouseDown == 1){
        moveDots(count,e.offsetX-lastX,e.offsetY-lastY);  
        lastX = e.offsetX;
        lastY = e.offsetY;
      } 
    }) 
  } else {

   svgObject.addEventListener("touchstart", (e) => {
     e.preventDefault();
     const touch = e.changedTouches;
     lastX = touch[0].pageX;
     lastY = touch[0].pageY;
   })

   svgObject.addEventListener("touchmove", (e) => {
     e.preventDefault();
     touch = e.changedTouches;
     moveDots(count,touch[0].pageX-lastX,touch[0].pageY-lastY);  
     lastX = touch[0].pageX;
     lastY = touch[0].pageY;
    
//     for (let i = 0; i < touch.length; i++) {
//       idx = ongoingTouchIndexById(touch[i].identifier);
//       if (idx >= 0) {
//
//      log(`continuing touch ${idx}`);
//      ctx.beginPath();
//      log(
//        `ctx.moveTo( ${ongoingTouches[idx].pageX}, ${ongoingTouches[idx].pageY} );`,
//      );
//      ctx.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY);
//      log(`ctx.lineTo( ${touches[i].pageX}, ${touches[i].pageY} );`);
//      ctx.lineTo(touches[i].pageX, touches[i].pageY);
//      ctx.lineWidth = 4;
//      ctx.strokeStyle = color;
//      ctx.stroke();
//
//      ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
//    } else {
//      log("can't figure out which touch to continue");
//    }
//  }
//      } 
      })


  }
}

// Reset image
function resetImage(){
  var svgObject=document.getElementById("svgpict");
  while (svgObject.firstChild) {
    svgObject.removeChild(svgObject.firstChild);
  }
  count = 0;
}

// Draw a circle in SVG
function drawDot(object,x,y,r,fill,opacity){
  newDot = document.createElementNS("http://www.w3.org/2000/svg", 'circle'); 
  newDot.setAttribute("class","l" + count); 
  newDot.setAttribute("cx",x); 
  newDot.setAttribute("cy",y); 
  newDot.setAttribute("r",r); 
  newDot.setAttribute("fill",fill); 
  newDot.setAttribute("fill-opacity",opacity); 
  object.appendChild(newDot);
}

// Move dots
function moveDots(layer,cx,cy){
  var layerDots = document.getElementsByClassName('l'+layer);
  for (var i = 0; i < layerDots.length; ++i) {
    x = parseInt(layerDots[i].getAttribute("cx"));
    y = parseInt(layerDots[i].getAttribute("cy"));
    layerDots[i].setAttribute("cx",x + cx);
    layerDots[i].setAttribute("cy",y + cy);
  }
}

// Process the data entered in the form and draw the SVG image
function submitChoice(inp){
  count = count + 1;
  drawDots(0,0);
  return false;
}

function drawDots(xOffset,yOffset){
  var svgObject=document.getElementById("svgpict");
  var d=parseInt(document.forms["choice"]["distance"].value);
  var r=parseInt(document.forms["choice"]["diameter"].value);
  var fill=document.forms["choice"]["color"].value;
  var opacity=document.forms["choice"]["opacity"].value;
  var maxX=window.screen.width*Math.max(1,window.devicePixelRatio);
  var maxY=window.screen.height*Math.max(1,window.devicePixelRatio);
  for (let x = xOffset%d; x < maxX; x += d){
    for (let y = yOffset%d; y < maxY; y += d){
      drawDot(svgObject,x,y,r,fill,opacity);
      y += d;
    }
      x += d;
  }
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
