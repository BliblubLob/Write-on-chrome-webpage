
const body = document.body
const html = document.documentElement;

//set up html and body
html.style.position = 'relative'
html.style.minHeight = '100%'
body.style.height = '100%'

// ______________________________Declare Functions ________________________________________
const initCanvas = function(html, body){
    //get height of entire page
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight );

    //create canvas element
    const canvas = document.createElement('canvas');

    //set canvas to size of page
    canvas.width = document.body.clientWidth;
    canvas.height = height;

    //set up canvas element
    body.append(canvas)
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.zIndex = '2221111111'
    canvas.style.pointerEvents = 'none'
    return canvas
}


//initialise canvas
const canvas = initCanvas(html, body)
const context = canvas.getContext('2d');

var marker = "rgb(0,0,0)";
var markerWidth = 1;

var lastEvent;
var mouseDown = false;
var active = false

//send message between popperjs and scribblejs
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.color){
        context.strokeStyle = request.color
    }
    if(request.width){
        context.lineWidth = parseInt(request.width) * 0.5;
    }
    sendResponse({ status: "done" });
  });


const keys = {}
const clear = function(){
      context.clearRect(0,0,canvas.width,canvas.height);
    };

document.addEventListener('keydown',function (e) {
    if (e.key == 'd'||event.key == 'D'){
        //when drawing, block mouse events
        canvas.style.pointerEvents = 'auto'
        active = true
        if (keys.control){
            clear()
        }
        keys.d = true
    }
    else if(e.key == 'Control'){
            if (keys.d){
                clear()
            }
            keys.control = true
    
        }
});

document.addEventListener('keyup',function (e) {
    if (e.key == 'd'||e.key == 'D'){
        //set unable to draw when d not pressed
        //set to pass throught when not drawing
        canvas.style.pointerEvents = 'none'
        active = false
        keys.d = false
    }
    if(e.key == 'Control'){
        keys.control = false
    }
});

body.addEventListener('mousedown',function(e){
    lastEvent = e;
    if (active){
        mouseDown = true
    }
    else{
        mouseDown = false
    }
    })

body.addEventListener('mousemove',function(e){
    if(mouseDown){
        if (context){
            context.beginPath();
            context.moveTo(lastEvent.pageX,lastEvent.pageY);
            context.lineTo(e.pageX,e.pageY);
            context.lineCap='round';
            context.stroke();
        }

        lastEvent = e;
    }
  })

body.addEventListener('mouseup',function(){
    mouseDown = false; 
  })

