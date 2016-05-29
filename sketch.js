
   var stepSize;
   var diameter;
   var fillVal;
   var col;

   var center;

   var count;
   var agents = [];

   //var agentTest;


function setup() {

   createCanvas (windowWidth,windowHeight);
   background (245,245,245);

   center = createVector (width / 2, height / 2);

   frameRate (240); /* change this to make it faster */
   /* 60, 120, 240, 480, 960, 1920 */

   stepSize = 4; /* distance between centers of circles */
   diameter = 6; /* diameter of circles */
   /* stepSize: 4, diameter: 4, fillVal: 255, count: 20 */
   /* stepSize: 4, diameter: 6, fillVal: 40, count: 200 */

   fillVal = 40; /* alpha */
   col = 200; /* initial rgb values */

   count = 200; /* number of agents */

   noStroke();
   //stroke (0, 100);

   /* fills 'arraylist' */
   for (var i = 0; i < count; i++) {
      //agents.push (new Agent(center.x, center.y));
      agents.push (new Agent(Math.floor(random (200, width - 200)) , Math.floor(random (200, height - 200))));
   }
   /* one agent test */

   //agentTest = new Agent (center.x, center.y);
   
}

function draw() {

  for (var j = 0; j < count; j++) {
   agents[j].step();
  }

  //agentTest.step();

}

function Agent (x, y) {
   var posX = x;
   var posY = y;

   var red = Math.floor (random (0, 255));
   var green = Math.floor (random (0, 255));
   var blue = Math.floor (random (0, 255));

   var incMax = 3;

   var NORTH = 0;
   var NORTHEAST = 1;
   var EAST = 2;
   var SOUTHEAST = 3;
   var SOUTH = 4;
   var SOUTHWEST = 5;
   var WEST = 6;
   var NORTHWEST = 7;

   this.display = function () {

      fill (red % 255,
            green % 255,
            blue % 255, fillVal);

      ellipse (posX + stepSize / 2, posY + stepSize / 2, 
               diameter, diameter);
   }

   this.step = function () {

      var direction = 0;
      direction = Math.floor(random (0, 8));

      if (direction == NORTH) {
         posY -= stepSize;
      }
      else if (direction == NORTHEAST) {
         posX += stepSize;
         posY -= stepSize;
      }
      else if (direction == EAST) {
         posX += stepSize;
      }
      else if (direction == SOUTHEAST) {
         posX += stepSize;
         posY += stepSize;
      }
      else if (direction == SOUTH) {
         posY += stepSize;
      }
      else if (direction == SOUTHWEST) {
         posX -= stepSize;
         posY += stepSize;
      }
      else if (direction == WEST) {
         posX -= stepSize;
      }
      else if (direction == NORTHWEST) {
         posX -= stepSize;
         posY -= stepSize;
      }

      if (posX > width) {
         posX = 0;
      }
      if (posX < 0) {
         posX = width;
      }
      if (posY > height) {
         posY = 0;
      }
      if (posY < 0) {
         posY = height;
      }

      red += random (-incMax, incMax);
      green += random (-incMax, incMax);
      blue += random (-incMax, incMax);

      this.display();


   }

}
