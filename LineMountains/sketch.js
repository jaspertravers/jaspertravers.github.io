var nodes = [];
var step = 1;
var jump = 3;
var source;
var winWidth;
var winHeight;

function setup() {

  winWidth = windowWidth - 0;
  winHeight = windowHeight - 0;
  createCanvas(winWidth, winHeight);
  background(255);

  stroke(0);

  source = new Node (winWidth, winHeight / 2.0);

}

function draw() {
  background (255);
  //rect (0,0,winWidth - 2, winHeight - 2);

  nodes.push(new Node (source.x, source.y));

  source.move();

  for (var i = 0; i < nodes.length - 5; i++) {

    nodes[i].display (nodes[i + 5]);
    nodes[i].decrement (step);

    if (nodes[i].x < 0) {
      nodes.shift(); //remove from front of array
    }
  }
}

function Node(x, y) {
    this.x = x;
    this.y = y;

  this.display = function(pair) {
    line (this.x, this.y, pair.x, pair.y);
  };

  this.decrement = function(step) {
    this.x -= step;
  };

  this.move = function() { //only for source node
    var change = random([-1,0,1]);
    change *= jump;
    this.y += change;

    if (this.y > winHeight) {
      this.y = winHeight - jump;
    }
    if (this.y < 0) {
      this.y = 0 + jump;
    }
  };
}
