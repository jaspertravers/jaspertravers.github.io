
var spacing = 10;
var x = 0;
var y = 0;

function setup() {
  createCanvas (window.innerWidth, window.innerHeight);
  background (0);
  stroke (255);
}

function draw() {

  if (random(1) > 0.5) {
    line (x, y, x + spacing, y + spacing);
  }
  else {
    line (x, y + spacing, x + spacing, y);
  }

  x += spacing;

  if (x > width) {
    x = 0;
    y += spacing;
  }
}
