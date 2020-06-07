let state = {};
state.instances = []; // for instance and history

window.addEventListener("load", onLoad);

function onLoad() {
  let { main, layout } = bootstrap();
}

function bootstrap() {
  let main = document.createElement("main");
  main.setAttribute("id", "main");
  main.classList.add("main");

  let layout = document.createElement("div");
  layout.setAttribute("id", "layout");
  layout.classList.add("layout");
  layout.style.display = "grid";
  layout.style.gridTemplateColumns = "auto auto auto";

  document.body.appendChild(main);
  main.appendChild(layout);
  document.body.style.overflow = "hidden"; //index cards don't scroll

  let history = document.createElement("div");
  history.setAttribute("id", "history");
  history.classList.add("history");
  history.style.border = "1px dashed #282828";
  history.style.width = "100px";
  history.style.height = "600px";
  history.style.display = "flex";
  history.style.flexDirection = "column";

  layout.appendChild(history);

  /* codemirror */

  const cm_opts = {
    value: "/* remember ctx!! */",
    lineNumbers: true,
    gutter: true, //what is this?
    lineWrapping: true,
    indentWithTabs: true,
    indentUnit: 2,
    tabSize: 2,
    //value: '',
    mode: "javascript",
  };

  state.codeMirror = CodeMirror(layout, cm_opts);

  /* canvas */
  let canvas = document.createElement("canvas");
  canvas.setAttribute("id", "canvas");
  canvas.style.border = "1px dashed #282828";
  canvas.width = 800;
  canvas.height = 800;
  layout.appendChild(canvas);

  state.canvas = canvas;

  /* stopify */

  let buttons = document.createElement("div");
  buttons.setAttribute("id", "buttons");

  let runButton = document.createElement("button");
  runButton.setAttribute("id", "runButton");
  runButton.innerHTML = "Build/Run";
  let pauseButton = document.createElement("button");
  pauseButton.setAttribute("id", "pauseButton");
  pauseButton.innerHTML = "Pause";
  let resumeButton = document.createElement("button");
  resumeButton.setAttribute("id", "resumeButton");
  resumeButton.innerHTML = "Resume";
  let instanceButton = document.createElement("button");
  instanceButton.setAttribute("id", "instanceButton");
  instanceButton.innerHTML = "Instance";
  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("id", "deleteButton");
  deleteButton.innerHTML = "Delete";
  let saveButton = document.createElement("button");
  saveButton.setAttribute("id", "saveButton");
  saveButton.innerHTML = "Save";
  let loadButton = document.createElement("button");
  loadButton.setAttribute("id", "loadButton");
  loadButton.innerHTML = "Load";

  runButton.addEventListener("click", build);
  pauseButton.addEventListener("click", pause);
  resumeButton.addEventListener("click", resume);
  instanceButton.addEventListener("click", instance);
  deleteButton.addEventListener("click", deleteInstance);
  saveButton.addEventListener("click", save);
  loadButton.addEventListener("click", load);

  buttons.appendChild(runButton);
  buttons.appendChild(pauseButton);
  buttons.appendChild(resumeButton);
  buttons.appendChild(instanceButton);
  buttons.appendChild(deleteButton);
  buttons.appendChild(saveButton);
  buttons.appendChild(loadButton);

  layout.appendChild(document.createElement("div")); // fixme hole

  //none of this is working, learn css grid and how codemirror builds itself

  //let cmnode = document.getElementsByClassName("CodeMirror")[0];
  //console.log(cmnode);
  //cmnode.appendChild(buttons);
  layout.appendChild(buttons);

  window.addEventListener("keypress", onKeyPress);

  //javascript

  let name0 = "0: instructions";
  let code0 = 
`line(10, 10, 100, 100, ctx);
/*
Ctrl-Enter to run(Build/Run Button),
Pause to pause ongoing execution,
Resume to resume paused execution,
Instance creates a tab,
Delete deletes current tab,
Save saves all tabs to localstorage,
Load loads all tabs from local storage,
If you accidentally deleted, Load will restore one mistaken deleted tab.

Hit Build/Run to see the line above painted to the canvas

check out tab "4: button" for self-hosting ideas
check out tab "5: Lissajous" for more than just one line
*/`
  let name1 = "1: first";
  let code1 = `line(10,20,100,110,ctx);`
  let name2 = "2: clear";
  let code2 = `ctx.fillStyle = '#ffffff';\nctx.fillRect(0, 0, 800, 800);`
  let name4 = "4: button";
  let code4 = `let buttons = document.getElementById("buttons");
let clear = document.createElement("button");
clear.innerHTML = "Clear";
clear.setAttribute("id", "clearButton");
clear.addEventListener("click", () => {
  let stored = ctx.fillStyle; //push
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 800, 600);
  ctx.fillStyle = stored; //pop
});

buttons.appendChild(clear)`
  let name5 = "5: Lissajous";
  let code5 = `/* Lissajous figures */

/* non-integer values for the X and Y frequency yield interesting results 

	 try commenting/uncommenting lines 9-12 or writing your own.
	 ctrl-enter to run, or the button below for "Build/Run"
	 <--- if you run the cell in tab 4, over there <---
	 	you will get a clear button besides load, that clears the canvas
*/

ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, 800, 800); //clears canvas, comment out to overlay

ctx.fillStyle = "#000000";

liss(1, 1.0005, 0, 100, 2500);
//liss(2, 3, 0, 100, 1000);
//liss(2, 3.0001, 0, 100, 1000);
//liss(2.0001, 3.0001, 0, 100, 1000);

function liss (freqX, freqY, phi, scale, points) {
	let xv = (angle, freqX, phi, scale) => 
	Math.sin(angle * freqX + (phi * Math.PI / 180)) * scale;
	let yv = (angle, freqY, scale) => Math.sin(angle * freqY) * scale;
	
	let x, y;
	for (let i = 0; i < points; i += 1) {
		x = xv (i, freqX, phi, scale) + canvas.width / 2;
		y = yv (i, freqY, scale) + canvas.height / 2;
		point(x, y, ctx);
	}
}`

  let name6 = "6: Control";
  let code6 = `/* controlling while true 
  hit run, then hit pause. Page is still live */
while(1) {
  point(Math.random() * 600, Math.random() * 600, ctx);
}`;

  let name7 = "7: Liss2"
  let code7 = `/* alternate Lissajous implementation */
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, 800, 800);


ctx.fillStyle = "#000000";

liss(150.1, 450.15, 0, 100, 1000);
//liss(7, 3, 0, 100, 1000);
//liss(2, 3, 0, 100, 1000);

function liss (freqX, freqY, phi, scale, points) {
	let xv = (angle, freqX, phi, scale) => 
	Math.sin(angle * freqX + (phi * Math.PI / 180)) * scale;
	let yv = (angle, freqY, scale) => Math.sin(angle * freqY) * scale;
	
	let x, y;
	for (let i = 0; i < Math.PI * 2; i += (Math.PI / points)) {
		x = xv (i, freqX, phi, scale) + canvas.width / 2;
		y = yv (i, freqY, scale) + canvas.height / 2;
		point(x, y, ctx);
	}
}`
  let inst0 = {name: name0, code: code0};
  let inst1 = {name: name1, code: code1};
  let inst2 = {name: name2, code: code2};
  let inst4 = {name: name4, code: code4};
  let inst5 = {name: name5, code: code5};
  let inst6 = {name: name6, code: code6};
  let inst7 = {name: name7, code: code7};

  state.instances.push(initializeInstance(inst0));
  state.instances.push(initializeInstance(inst1));
  state.instances.push(initializeInstance(inst2));
  state.instances.push(initializeInstance(inst4));
  state.instances.push(initializeInstance(inst5));
  state.instances.push(initializeInstance(inst6));
  state.instances.push(initializeInstance(inst7));

  engine(state);

  return { main, layout };
}

/* engine */
function engine(state) {
  //start at 0
  state.codeMirror.setValue(state.instances[0].code);
  state.current = 0;
  // clear history element state
  let element = document.getElementById("history");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  state.current = 0; //the first instance in instances
  state.instances.forEach ((e,i) => {
    let button = document.createElement("button");
    button.innerHTML = e.name;
    button.addEventListener("click", function() {
      //save current before updating
      state.instances[state.current].code = state.codeMirror.getValue();
      //todo: sets codemirror
      // sets this instance...
      state.codeMirror.setValue(state.instances[i].code);
      state.current = i;
    });
    let history = document.getElementById("history");
    history.appendChild(button);
  })
}

function initializeInstance({name, code}) {
  let instance = {name, code};
  //instance.name = "first";
  //instance.code = `line(10, 10, 100, 100, ctx)`
  //instance.runner = stopify.stopifyLocally(instance.code); //this might not make sense
  //instance.globals = ;
  return instance;
}

function onKeyPress(evt) {
  // on ctrl-enter run build
  if (evt.ctrlKey && evt.key == "Enter") build();
}

/*
 * save to localstorage
 */
function save() {
  state.instances[state.current].code = state.codeMirror.getValue();
  let saveInstances = [...state.instances];
  saveInstances.forEach ((e) => delete e.runner)
  localStorage.instances = JSON.stringify(saveInstances);
}

function load() {
  let loadInstances = JSON.parse(localStorage.instances);
  state.instances = [...loadInstances];
  engine(state);
}
/* stopify */

//
//  BUTTON
//
function build() {
  // set task variable
  let instance = state.instances[state.current];
  instance.code = state.codeMirror.getValue();
  let runner = stopify.stopifyLocally(instance.code);

  /* canvas */
  const ctx = state.canvas.getContext("2d");

  runner.g = {
    window,
    //runner,
    main,
    layout,
    document,
    ctx,
    console,
    line,
    point,
    sleep,
    Math,
    canvas: state.canvas,
  };
  if (instance.runner) delete instance.runner;
  instance.runner = runner;
  console.log(runner);
  run();
}

function run() {
  //runner.run((result) => console.log(result));
  let target = state.instances[state.current];
  target.runner.run((result) => console.log(result));
}

function pause() {
  //runner.pause(() => console.log("pause"));
  state.instances[state.current].runner.pause(() => console.log("paused"));
}

function resume() {
  //runner.resume(); //no callback it looks like
  state.instances[state.current].runner.resume();
}

function instance() {
  state.instances.push(initializeInstance({name: state.instances.length + 1, code: ""}));
  engine(state);
}

function deleteInstance() {
  save(); //undo just means hit load now
  state.instances.splice(state.current, 1);
  engine(state); //somehow or another this jumps us to state.instances[0]
}

/* canvas/runner utility */

function point(x, y, ctx) {
  ctx.beginPath();
  ctx.rect(x, y, 1, 1);
  ctx.fill();
  //ctx.stroke();
  //ctx.fillRect(x, y, 1, 1);
}

function line(x1, y1, x2, y2, ctx) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function sleep(duration, runner) {
  runner.pauseImmediate(() => {
    window.setTimeout(
      () => runner.continueImmediate({ type: "normal", value: undefined }),
      duration
    );
  });
}
