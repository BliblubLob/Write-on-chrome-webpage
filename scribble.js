
var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
                       
var elem = document.createElement('canvas');
elem.width = document.body.clientWidth; //document.width is obsolete
elem.height = height; //document.height is obsolete


html.style.position = 'relative'

//not necessary
html.style.minHeight = '100%'
body.style.height = '100%'

body.append(elem)
elem.style.position = 'absolute'
elem.style.top = '0'
elem.style.zIndex = '2221111111'
// elem.style.backgroundColor = 'blue'
elem.style.pointerEvents = 'none'

var marker = "rgb(0,0,0)";
var markerWidth = 1;

var lastEvent;
var mouseDown = false;

var context = elem.getContext('2d');

body.addEventListener('mousedown',function(e){
    lastEvent = e;
    mouseDown = true;
    console.log(lastEvent)})

body.addEventListener('mousemove',function(e){
    if(mouseDown){
      context.beginPath();
      
      context.moveTo(lastEvent.pageX,lastEvent.pageY);
      context.lineTo(e.pageX,e.pageY);
      context.lineWidth=markerWidth;
      context.strokeStyle = marker;
      context.lineCap='round';
      context.stroke();
      lastEvent = e;
    }
  })

body.addEventListener('mouseup',function(){
    mouseDown = false; 
  })

var clear = function(){
  context.clearRect(0,0,575,300);
};

