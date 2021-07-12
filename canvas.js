/*
var space;

function floatySpace() {
  var colors = [
    "#FF3F8E", "#04C2C9", "#2E55C1"
  ];


  space = new CanvasSpace("canvas", "#252934" ).display();
  var form = new Form( space );

  // Elements
  var pts = [];
  var center = space.size.$divide(1.8);
  var angle = -(window.innerWidth * 0.5);
  var count = window.innerWidth * 0.05;
  if (count > 150) count = 150;
  var line = new Line(0, angle).to(space.size.x, 0);
  var mouse = center.clone();

  var r = Math.min(space.size.x, space.size.y) * 1;
  for (var i=0; i<count; i++) {
    var p = new Vector( Math.random()*r-Math.random()*r, Math.random()*r-Math.random()*r );
    p.moveBy( center ).rotate2D( i*Math.PI/count, center);
    p.brightness = 0.1
    pts.push( p );
  }

  // Canvas
  space.add({
    animate: function(time, fps, context) {

      for (var i=0; i<pts.length; i++) {
        // rotate the points slowly
        var pt = pts[i];

        pt.rotate2D( Const.one_degree / 20, center);
        form.stroke( false ).fill( colors[i % 3] ).point(pt, 1);

        // get line from pt to the mouse line
        var ln = new Line( pt ).to( line.getPerpendicularFromPoint(pt));

        // opacity of line derived from distance to the line
        var opacity = Math.min( 0.8, 1 - Math.abs( line.getDistanceFromPoint(pt)) / r);
        var distFromMouse = Math.abs(ln.getDistanceFromPoint(mouse))

        if (distFromMouse < 50) {
          if (pts[i].brightness < 0.3) pts[i].brightness += 0.015
        } else {
          if (pts[i].brightness > 0.1) pts[i].brightness -= 0.01
        }

        var color = "rgba(255,255,255," + pts[i].brightness +")"
        form.stroke(color).fill( true ).line(ln);
      }
    },

    onMouseAction: function(type, x, y, evt) {
      if (type=="move") {
        mouse.set(x,y);
      }
    },

    onTouchAction: function(type, x, y, evt) {
      this.onMouseAction(type, x, y);
    }
  });

  space.bindMouse();
  space.play();
}

floatySpace();

$(window).resize(function(){
  space.removeAll();
  $('canvas').remove();
  floatySpace();
});
*/

/* draw diagonal line in 2d
var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.moveTo(0,0);
ctx.lineTo(c.width,c.height);
ctx.stroke();
*/

/* get value of x width of window
function myFunction(x) {
    if (x.matches) { // If media query matches
      document.getElementById("canvas").style.backgroundColor="yellow";
    } else {
        document.getElementById("canvas").style.backgroundColor="pink";
    }
  }
  
  var x = window.matchMedia("(max-width: 900px)")
  myFunction(x) // Call listener function at run time
  x.addListener(myFunction) // Attach listener function on state changes
  */


//var c = document.getElementById("canvas");
//var ctx = c.getContext("webgl");

/* webgl learning code
function main() {
    const canvas = document.getElementById("canvas");
    // Initialize the GL context
    const gl = canvas.getContext("webgl");
  
    // Only continue if WebGL is available and working
    if (gl === null) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }
  
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  
  window.onload = main;
  */


var canvas = document.getElementById( 'canvas' );
var context = canvas.getContext( '2d' );

var time = 0,
    velocity = 0.1,
    velocityTarget = 0.1,
    width,
    height,
    lastX,
    lastY;

var MAX_OFFSET = 400;
var SPACING = 4;
var POINTS = MAX_OFFSET / SPACING;
var PEAK = MAX_OFFSET * 0.25;
var POINTS_PER_LAP = 6;
var SHADOW_STRENGTH = 6;

setup();

function setup() {

  resize();
  step();
  
  window.addEventListener( 'resize', resize );
  window.addEventListener( 'mousedown', onMouseDown );
  document.addEventListener( 'touchstart', onTouchStart );
  
}

function resize() {

  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;


}

function step() {
  
  time += velocity;
  velocity += ( velocityTarget - velocity ) * 0.3;
  
  clear();
  render();
  
  requestAnimationFrame( step );
  
}

function clear() {
  
  context.clearRect( 0, 0, width, height );

}

function render() {
  
  var x, y,
      cx = width/2,
      cy = height/2;

  context.globalCompositeOperation = 'lighter';
  context.strokeStyle = '#fff';
  context.shadowColor = '#fff';
  context.lineWidth = 2;
  context.beginPath();

  for( var i = POINTS; i > 0; i -- ) {
    
    var value = i * SPACING + ( time % SPACING );
    
    var ax = Math.sin( value/POINTS_PER_LAP ) * Math.PI,
        ay = Math.cos( value/POINTS_PER_LAP ) * Math.PI;

    x = ax * value,
    y = ay * value * 0.35;
    
    var o = 1 - ( Math.min( value, PEAK ) / PEAK );
    
    y -= Math.pow( o, 2 ) * 200;
    y += 200 * value / MAX_OFFSET;
    y += x / cx * width * 0.1;
    
    context.globalAlpha = 1 - ( value / MAX_OFFSET );
    context.shadowBlur = SHADOW_STRENGTH * o;
  
    context.lineTo( cx + x, cy + y );
    context.stroke();
 
    context.beginPath();
    context.moveTo( cx + x, cy + y );
    
  }

  context.lineTo( cx, cy - 200 );
  context.lineTo( cx, 0 );
  context.stroke();
  
}

function onMouseDown( event ) {
  
  lastX = event.clientX;
  lastY = event.clientY;
  
  document.addEventListener( 'mousemove', onMouseMove );
  document.addEventListener( 'mouseup', onMouseUp );
  
}

function onMouseMove( event ) {
  
  var vx = ( event.clientX - lastX ) / 100;
  var vy = ( event.clientY - lastY ) / 100;
  
  if( event.clientY < height/2 ) vx *= -1;
  if( event.clientX > width/2 ) vy *= -1;
  
  velocityTarget = vx + vy;
  
  lastX = event.clientX;
  lastY = event.clientY;
  
}

function onMouseUp( event ) {
  
  document.removeEventListener( 'mousemove', onMouseMove );
  document.removeEventListener( 'mouseup', onMouseUp );
  
}

function onTouchStart( event ) {
  
  event.preventDefault();
  
  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;
  
  document.addEventListener( 'touchmove', onTouchMove );
  document.addEventListener( 'touchend', onTouchEnd );
  
}

function onTouchMove( event ) {
  
  var vx = ( event.touches[0].clientX - lastX ) / 100;
  var vy = ( event.touches[0].clientY - lastY ) / 100;
  
  if( event.touches[0].clientY < height/2 ) vx *= -1;
  if( event.touches[0].clientX > width/2 ) vy *= -1;
  
  velocityTarget = vx + vy;
  
  lastX = event.touches[0].clientX;
  lastY = event.touches[0].clientY;
  
}

function onTouchEnd( event ) {
  
  document.removeEventListener( 'touchmove', onTouchMove );
  document.removeEventListener( 'touchend', onTouchEnd );
  
}



