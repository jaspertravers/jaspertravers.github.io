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
*/`
  let name1 = "1: first";
  let code1 = `line(10,10,100,100,ctx);`
  let name2 = "2: clear";
  let code2 = `ctx.fillStyle = '#ffffff';\nctx.fillRect(0, 0, 800, 800);`
  let name3 = "3: line";
  let code3 = `line(10,20,100,110,ctx); //offset line`
  let name4 = "4: button";
  let code4 = `let buttons = document.getElementById("buttons");\nlet clear = document.createElement("button");\nclear.innerHTML = "Clear";\nclear.setAttribute("id", "clearButton");\nclear.addEventListener("click", () => {\n  ctx.fillStyle = "#ffffff";\n  ctx.fillRect(0, 0, 800, 600);\n});\n\nbuttons.appendChild(clear)\n`
ode3 = `line(10,20,100,110,ctx); //offset line`
  let inst0 = {name: name0, code: code0}
  let inst1 = {name: name1, code: code1}
  let inst2 = {name: name2, code: code2}
  let inst3 = {name: name3, code: code3}
  let inst4 = {name: name4, code: code4}

  state.instances.push(initializeInstance(inst0));
  state.instances.push(initializeInstance(inst1));
  state.instances.push(initializeInstance(inst2));
  state.instances.push(initializeInstance(inst3));
  state.instances.push(initializeInstance(inst4));

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
