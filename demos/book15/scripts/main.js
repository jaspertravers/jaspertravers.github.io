window.addEventListener("load", onLoad);

function onLoad() {
  let editor = {mainCanvas: "/* main */", x1: "/* x1 */", x2: "/* x2 */", x3: "/* x3 */", y1: "/* y1 */", y2: "/* y2 */", y3: "/* y3 */", current: ""};
  initEditor(editor);
  //start here
  let main = document.createElement("main");
  main.id = "main";
  main.style.width = "100%";
  main.style.height = "98vh"; //fix
  main.style.display = "grid";
  main.style.gridTemplateColumns = "repeat(5, 1fr)";
  main.style.gridTemplateRows = "repeat(5, 1fr)";
  main.style.gridGap = "10px";
  document.body.appendChild(main);

  let CodeMirrorNode = document.createElement("div");
  CodeMirrorNode.style.gridColumn = "1 / 4";
  CodeMirrorNode.style.gridRow = "1 / 4";
  CodeMirrorNode.id = "CodeMirrorNode";
  main.appendChild(CodeMirrorNode);

  const CMOPTS = {
    lineNumbers: true,
    lineWrapping: true,
    indentWithTabs: true,
    indentUnit: 2,
    tabSize: 2,
    mode: "javascript"
  };

  let codemirror = CodeMirror(CodeMirrorNode, CMOPTS);

  let CMBodyNode = document.getElementsByClassName("CodeMirror")[0];
  CMBodyNode.style.height = "100%";
  CMBodyNode.style.width = "100%";
  //CMBodyNode.style.width = "720px";
  CMBodyNode.style.fontSize = "14px";
  CMBodyNode.style.border = "1px dashed #282828";

  //codemirror.setValue(value);

  // execution //

  window.onkeydown = onKeyDown;

  function onKeyDown(evt) {
    if (evt.ctrlKey && evt.key == "Enter") {
      run(codemirror.getValue());
    }
  }

  function run(task) {
    let runner = stopify.stopifyLocally(task);
    runner.g = this; //hmmm
    runner.run(result => result); //ignoring result, irrelevant
  }

  let mainCanvas = document.createElement("canvas");
  mainCanvas.id = "mainCanvas";
  mainCanvas.style.gridColumn = "4 / 6";
  mainCanvas.style.gridRow = "4 / 6";
  mainCanvas.style.width = "100%";
  mainCanvas.style.height = "100%";
  mainCanvas.style.border = "1px dashed #282828";
  mainCanvas.onclick = setEditor;
  main.appendChild(mainCanvas);
  setComputed(mainCanvas);

  let yCanvasContainer = document.createElement("div");
  let xCanvasContainer = document.createElement("div");
  yCanvasContainer.id = "yCanvasContainer";
  xCanvasContainer.id = "xCanvasContainer";

  yCanvasContainer.style.display = "flex";
  yCanvasContainer.style.flexDirection = "column-reverse";
  yCanvasContainer.style.gridColumn = "4 / 6";
  yCanvasContainer.style.gridRow = "1 / 4";
  //yCanvasContainer.style

  xCanvasContainer.style.display = "flex";
  xCanvasContainer.style.flexDirection = "row-reverse";
  xCanvasContainer.style.gridColumn = "1 / 4";
  xCanvasContainer.style.gridRow = "4 / 6";
  //xCanvasContainer.style

  main.appendChild(yCanvasContainer);
  main.appendChild(xCanvasContainer);

  function createCanvas (id, width, height) {
    let el = document.createElement("canvas");
    el.id = id;
    el.style.height = height;
    el.style.width = width;
    el.style.border = "1px dashed #282828";
    el.onclick = setEditor;
    return el;
  }

  let y1 = createCanvas("y1", "100%", "100px");
  y1.style.marginTop = "10px";
  yCanvasContainer.appendChild(y1);
  let y2 = createCanvas("y2", "100%", "100px");
  y2.style.marginTop = "10px";
  yCanvasContainer.appendChild(y2);
  let y3 = createCanvas("y3", "100%", "100px");
  y3.style.marginTop = "10px";
  yCanvasContainer.appendChild(y3);

  let x1 = createCanvas("x1", "100px", "100%");
  x1.style.marginLeft = "10px";
  xCanvasContainer.appendChild(x1);
  let x2 = createCanvas("x2", "100px", "100%");
  x2.style.marginLeft = "10px";
  xCanvasContainer.appendChild(x2);
  let x3 = createCanvas("x3", "100px", "100%");
  x3.style.marginLeft = "10px";
  xCanvasContainer.appendChild(x3);

  setComputed(y1);
  setComputed(y2);
  setComputed(y3);
  setComputed(x1);
  setComputed(x2);
  setComputed(x3);

  function setEditor(evt) {
    editor[editor.current] = codemirror.getValue();
    let id = evt.target.id;
    codemirror.setValue(editor[id]);
    editor.current = id;
  }
  setEditor({target: {id: "mainCanvas"}}); //hack

  function getStyle (element, style) {
    return parseInt(getComputedStyle(element)[style].slice(0, -2));
  }
  function setComputed (element) {
    element.width = getStyle(element, "width");
    element.height = getStyle(element, "height");
  }

}

function initEditor(editor) {
  editor.mainCanvas = `/* main */
let points = 1000;
let scale = 100;
let xscale = y1.width / 4;
let yscale = x1.width;

let ctx = mainCanvas.getContext("2d");
ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);

function point (x, y) {
	ctx.beginPath();
	ctx.rect(x, y, 1, 1);
	ctx.fill();
}

//display
let x, y;
for (let index = 0; index < Math.PI * 2; index += (Math.PI / points)) {
	x = xValue(index, xscale) + mainCanvas.width / 2;
	y = yValue(index, yscale) + mainCanvas.height / 2;
	point(x, y);
}

console.log("hi");


/*
depends upon
xValue : (freqX, phi, scale) => (angle) => Math.sin(angle * freqX + (phi * Math.PI / 180)) * scale;
yValue : (freqY, scale) => (angle) => Math.sin(angle * freqY) * scale;
*/`;
  editor.x1 = `/* x1 */
let frequency = 1;
let points = 1000;
let scale = 40;
let phi = 0;

let x1ctx = x1.getContext("2d");

x1ctx.clearRect(0, 0, x1.width, x1.height);

function x1point (x, y) {
	x1ctx.beginPath();
	x1ctx.rect(x, y, 1, 1);
	x1ctx.fill();
}

//xValue : (freqX, phi, scale) => (angle) => Math.sin(angle * freqX + (phi * Math.PI / 180)) * scale;

let mkxValue = (freqX, phi) => (angle, scale) => Math.sin(angle * freqX + (phi * Math.PI / 180)) * scale

//state setup: export
let xValue = mkxValue(frequency, phi);

//display
for (let i = 0; i < Math.PI * 2; i += (Math.PI / points)) {
	x1point(xValue(i, scale) + x1.width / 2,
					x1.height / 2 * i / Math.PI / 2 + x1.height / 4);
}
`;
  editor.x2 = `/* x2 */
let frequency = 2;
let points = 1000;
let scale = 40;
let phi = 0;

let x2ctx = x2.getContext("2d");

x2ctx.clearRect(0, 0, x2.width, x2.height);

function x2point (x, y) {
	x2ctx.beginPath();
	x2ctx.rect(x, y, 1, 1);
	x2ctx.fill();
}

//xValue : (freqX, phi, scale) => (angle) => Math.sin(angle * freqX + (phi * Math.PI / 180)) * scale;

let mkxValue = (freqX, phi) => (angle, scale) => Math.sin(angle * freqX + (phi * Math.PI / 180)) * scale

//state setup: export
let xValue = mkxValue(frequency, phi);

//display
for (let i = 0; i < Math.PI * 2; i += (Math.PI / points)) {
	x2point(xValue(i, scale) + x2.width / 2,
					x2.height / 2 * i / Math.PI / 2 + x2.height / 4);
}
`;
  editor.x3 = `/* x3 */
let frequency = 3;
let points = 1000;
let scale = 40;
let phi = 0;

let x3ctx = x3.getContext("2d");

x3ctx.clearRect(0, 0, x3.width, x3.height);

function x3point (x, y) {
	x3ctx.beginPath();
	x3ctx.rect(x, y, 1, 1);
	x3ctx.fill();
}

//xValue : (freqX, phi, scale) => (angle) => Math.sin(angle * freqX + (phi * Math.PI / 180)) * scale;

let mkxValue = (freqX, phi) => (angle, scale) => Math.sin(angle * freqX + (phi * Math.PI / 180)) * scale

//state setup: export
let xValue = mkxValue(frequency, phi);

//display
for (let i = 0; i < Math.PI * 2; i += (Math.PI / points)) {
	x3point(xValue(i, scale) + x3.width / 2,
					x3.height / 2 * i / Math.PI / 2 + x3.height / 4);
}
`;
  editor.y1 = `/* y1 */
let frequency = 1;
let points = 1000;
let scale = 40;

let y1ctx = y1.getContext("2d");

y1ctx.clearRect(0, 0, y1.width, y1.height);

function y1point (x, y) {
	y1ctx.beginPath();
	y1ctx.rect(x, y, 1, 1);
	y1ctx.fill();
}

//yValue : (freqY) => (angle, scale) => Math.sin(angle * freqY) * scale;

let mkyValue = (freqY) => (angle, scale) => Math.sin(angle * freqY) * scale

//state setup: export
let yValue = mkyValue(frequency);

//display
for (let i = 0; i < Math.PI * 2; i += (Math.PI / points)) {

	y1point(y1.width / 2 * i / Math.PI / 2 + y1.width / 4,
					yValue(i, scale) + y1.height / 2);

}`;
  editor.y2 = `/* y2 */
let frequency = 2;
let points = 1000;
let scale = 40;

let y2ctx = y2.getContext("2d");

y2ctx.clearRect(0, 0, y2.width, y2.height);

function y2point (x, y) {
	y2ctx.beginPath();
	y2ctx.rect(x, y, 1, 1);
	y2ctx.fill();
}

//yValue : (freqY) => (angle, scale) => Math.sin(angle * freqY) * scale;

let mkyValue = (freqY) => (angle, scale) => Math.sin(angle * freqY) * scale

//state setup: export
let yValue = mkyValue(frequency);

//display
for (let i = 0; i < Math.PI * 2; i += (Math.PI / points)) {

	y2point(y2.width / 2 * i / Math.PI / 2 + y2.width / 4,
					yValue(i, scale) + y2.height / 2);

}`;
  editor.y3 = `/* y3 */
let frequency = 3;
let points = 1000;
let scale = 40;

let y3ctx = y3.getContext("2d");

y3ctx.clearRect(0, 0, y3.width, y3.height);

function y3point (x, y) {
	y3ctx.beginPath();
	y3ctx.rect(x, y, 1, 1);
	y3ctx.fill();
}

//yValue : (freqY) => (angle, scale) => Math.sin(angle * freqY) * scale;

let mkyValue = (freqY) => (angle, scale) => Math.sin(angle * freqY) * scale

//state setup: export
let yValue = mkyValue(frequency);

//display
for (let i = 0; i < Math.PI * 2; i += (Math.PI / points)) {

	y3point(y3.width / 2 * i / Math.PI / 2 + y3.width / 4,
					yValue(i, scale) + y3.height / 2);

}`;
}


/*
 *function liss (freqX, freqY, phi, scale, points) {
	let xv = (angle, freqX, phi, scale) =>
	Math.sin(angle * freqX + (phi * Math.PI / 180)) * scale;
	let yv = (angle, freqY, scale) => Math.sin(angle * freqY) * scale;

	let x, y;
	for (let i = 0; i < Math.PI * 2; i += (Math.PI / points)) {
		x = xv (i, freqX, phi, scale) + canvas.width / 2;
		y = yv (i, freqY, scale) + canvas.height / 2;
		point(x, y, ctx);
	}
}

/*
0 -> TwoPI incrementing by step
for two functions, resulting in x and y points to be drawn
*/
