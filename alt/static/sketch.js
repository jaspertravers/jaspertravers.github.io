var s = {};

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
  translate (width / 2, height / 2);  
  let X = (A, alpha, delta) => (t) => A * sin (alpha * t + delta);
  let Y = (B, beta) => (t) => B * sin (beta * t);

  let A = 60;
  let B = 60;
  let alpha = 4.0;
  let beta = 2.0;
  let delta = HALF_PI;
  let off = 20;

  let xgo = X (A, alpha + floor (random (-off, off)), delta);
  let ygo = Y (B, beta + floor (random (-off, off)));

  for (let t = 0; t < 1000; t += 1) {
    point (xgo(t), ygo(t));
  }
}

/*
 * x = A sin (alpha * t + delta)
 * y = B sin (beta  * t))
 * t varries
 *
 */

