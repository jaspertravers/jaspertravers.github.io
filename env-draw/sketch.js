var DLINE_STEP = 0.3;
var DLINE_OFFSET = 1.2;
var TEXT_SIZE = 24;

var system;

function setup() {
  BACKGROUND = '#fffbf4';
  STROKE = '#282828';
  //BACKGROUND = '#fcfaea';
  createCanvas(windowWidth - 0, windowHeight - 0);
  //createCanvas(1200, 1200); //dm
  background(BACKGROUND);
  stroke(STROKE);
  noFill();
  noLoop();
  strokeWeight(1);

  build();
}

function draw() {
  background(BACKGROUND);

  sketch();
}

function build () {
  system = new System ();   // global content target
}

function sketch () {
  system.display();
}

class System {
  constructor () {
    this.points = [];         // home of control points
    this.selected = -1;       // selected control point id
  }

  press (x, y) {
    let selected = System.anyContains (x, y, this);
    if (selected === -1) {
      this.points.push (new ControlPoint (createVector (x, y)));
    }
    else {
      this.selected = selected;
    }
  }

  release (x, y) {
    if (this.selected === -1) {
      return;
    }
    else {
      this.points[this.selected].v = createVector (x, y);
      //this.points[this.selected].debug();

      this.selected = -1;
    }
  }

  display () {
    for (let iter = 0; iter < this.points.length; iter++) {
      //this.points[iter].debug();
      
      let localP = this.points[iter];
      let nextP = this.points[(iter + 1) % this.points.length];

      dline (localP.v.x, localP.v.y, nextP.v.x, nextP.v.y,
             DLINE_STEP, DLINE_OFFSET);
    }
  }

  static anyContains (x, y, s) {
    if (s.points.length === 0) {
      return -1;
    }
    for (let iter = 0; iter < s.points.length; iter++) {
      let element = s.points[iter];
      if (element.contains (x, y)) {
        return iter; //could return id instead of new object
      }
    }
    return -1;
  }

}

class ControlPoint {
/**
 * Represents a Control Point
 * @constructor
 * @param {PVector} point - Location of Control Point.
 *
 */
  constructor (vector) {
    this.v = vector;
    this.HANDLE_RANGE = 30;

    this.debug();
  }
  debug () {
    push();
    stroke (255, 0, 0);
    ellipse (this.v.x, this.v.y, 20, 20);
    pop();
  }
  contains (x, y) {
    return (this.v.x - this.HANDLE_RANGE < x &&
            this.v.x + this.HANDLE_RANGE > x &&
            this.v.y - this.HANDLE_RANGE < y &&
            this.v.y + this.HANDLE_RANGE > y);
  }
}

function keyPressed() {
  switch (keyCode) {
    case 8: //Backspace
      break;
    case 65: //'a'
      console.log ("hit a");
      break;
    default:
      console.log ("default: ", keyCode);
    break;
  }
}

function mouseClicked() {
  redraw();
}
function mousePressed() {
  system.press (mouseX, mouseY);
}
function mouseReleased() {
  system.release (mouseX, mouseY);
}

/* beginnings of dm222
 *
  points = [
    {x: 270,
     y: 765},
    {x: 310,
     y: 700},
    {x: 350,
     y: 765}
  ];
 *
 */

