var s = {};

var A = 0;
var B = 0;
var a = 1.0000; // alpha
var b = 1.0000; //beta
//var delta = PI / 2 * 0;
var delta;
var off = 0.0;
var margin = 20;
var xgo;
var ygo;

var X = (A, alpha, delta) => (x) => (t) => A * sin (alpha * t + delta) + x;
var Y = (B, beta) => (y) => (t) => B * sin (beta * t) + y;

function setup() {
  BACKGROUND = '#fffbf4'; //BACKGROUND = '#fcfaea';
  STROKE = '#282828';
  createCanvas(windowWidth - 0, windowHeight - 0);
  background(BACKGROUND);
  stroke(STROKE);
  noFill();
  //noLoop();
  strokeWeight(1);

  build();
}

function draw() {
  sketch();
}

// once
function build () {
}

// loop
function sketch () {
  background (BACKGROUND);

  A = 80;
  B = 80;
  a += 0.00002;
  b += 0.00001;
  delta = PI / 2 * 0;

  text ("alpha: " + floor (a * 10000) / 10000, 30, 30);
  text ("beta: " + floor (b * 10000) / 10000, 30, 50);

  xgo = X (A, a, delta) (width / 2);
  ygo = Y (B, b) (height / 2);

  for (let t = 0; t < 1000; t += 1.0) {
    //point (xgo(t) + random (-off, off), ygo(t) + random (-off, off));
    point (xgo(t), ygo(t));
  }
}
