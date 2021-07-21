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
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;

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