
var spacing = 10;
var x = 0;
var y = 0;
var lineLen = 12;

function setup() {
  createCanvas (window.innerWidth, window.innerHeight);
  //createCanvas (640, 640);
  background (0);
  stroke (255);
}

function draw() {

  if (random(1) > 0.5) {
    line (x,
      y,
      x + lineLen,
      y + lineLen);
  }
  else {
    line (x,
      y + lineLen,
      x + lineLen,
      y);
  }

  x += spacing;

  if (x > width) {
    x = 0;
    y += spacing;
  }
}
