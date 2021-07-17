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

var canvas = document.getElementById( 'canvas' ),
    c = canvas.getContext( '2d' ),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight;

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

const colors = [
  "#FF3F8E", "#04C2C9", "#2E55C1"
]

addEventListener('mousemove', event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})

addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
})

function randomIntfromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 2;  
  this.velocity = 0.0005;
  //this.distanceFromCenter = randomIntfromRange(100,900);
  this.distanceFromCenter = {
    x: randomIntfromRange(100, 900),
    y: randomIntfromRange(100, 900)
  };
  
  
  this.update = () => {
    this.radians += this.velocity;
    this.x = x + Math.cos(this.radians) * this.distanceFromCenter.x;
    this.y = y + Math.sin(this.radians) * this.distanceFromCenter.y;
    this.draw();
  };

  this.draw = () => {
    c.shadowColor = 'white';
    c.shadowBlur = 2;
    c.beginPath();
    
    if(Math.abs(mouse.x-this.x) < 30 && Math.abs(mouse.y-this.y) < 30) {
      c.arc(this.x, this.y, this.radius + 1, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
    }
    else {
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
    }
    
    c.fill();
    c.closePath();
  };
}

let particles;
function init() {
  particles = [];

  for (let i=0;i<120;i++) {
    const radius = (Math.random()) + 1;
    particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, randomColor(colors)));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height);
  c.fillStyle = '#252934';
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update();
  });  
}


init();
animate();