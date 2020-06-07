let state = {};

window.addEventListener("load", onLoad);

function onLoad() {
  setupDocument();
  setupCodeMirror();
  setupCanvas();
  setupBrowser();
  setupControls();

  initializeState();

  viewState(); //linked to init
  //setupController(); //called at end of viewState for now
}

function setupDocument() {
  let main = createElement(
    {node: "main",
     attributes: {id: "main"},
     classes: "main"});
  let layout = createElement(
    {node: "div",
     attributes: {id: "layout"},
     classes: "layout",
     styles: {display: "flex", flexDirection: "column",
              width: "100vw", height: "100vh"}}); //needs a flex direction
  let layoutTop = createElement(
    {node: "div",
     attributes: {id: "layoutTop"},
     classes: "layoutTop",
     styles: {display: "flex", width: "100vw", height : "60vh"}}); //flex-direction defaults to row
  let layoutBot = createElement(
    {node: "div",
     attributes: {id: "layoutBot"},
     classes: "layoutBot",
     styles: {display: "flex", width: "100vw", height : "40vh"}}); //flex-direction defaults to row

  // document
  document.body.appendChild(main);
  main.appendChild(layout);
  layout.appendChild(layoutTop);
  layout.appendChild(layoutBot);
}

function setupCodeMirror() {
  let layoutTop = document.getElementById("layoutTop");

  const cm_opts = {
    value: "// hello cm //",
    lineNumbers: true,
    lineWrapping: true,
    indentWithTabs: true,
    indentUnit: 2,
    tabSize: 2,
    mode: "javascript",
  };

  let codeMirror = CodeMirror(layoutTop, cm_opts);
  state.codeMirror = codeMirror;
}

function setupCanvas() {
  let layoutTop = document.getElementById("layoutTop");
  let width = window.innerWidth * 0.5;
  let height = window.innerHeight * 0.6;

  let canvas = createElement({node: "canvas",
                              attributes: {id: "canvas", width, height},
                              classes: "canvas",
                              styles: {border: "1px dashed #282828"}
                             });

  layoutTop.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  state.canvas = canvas;
  state.ctx = ctx;
}

function setupBrowser() {
  let librariesNode = createElement({node: "div",
                                     attributes: {id: "libraries"},
                                     classes: "libraries",
                                     styles: {width: "33vw", border: "1px dashed #282828"}
                                    });
  let blocksNode = createElement({node: "div",
                                  attributes: {id: "blocks"},
                                  classes: "libraries",
                                  styles: {width: "33vw", border: "1px dashed #282828"}
                                 });
  let controlNode = createElement({node: "div",
                                attributes: {id: "control"},
                                classes: "libraries",
                                styles: {width: "33vw", border: "1px dashed #282828"}
                               });

  let layoutBot = document.getElementById("layoutBot");
  layoutBot.appendChild(librariesNode);
  layoutBot.appendChild(blocksNode);
  layoutBot.appendChild(controlNode);
}

function setupControls() {
  /* innerHTML here might be hacky? idk better practice */
  let controlNode = document.getElementById("control");

  let runButton = createElement({node: "button",
                                 attributes: {id: "runButton", innerHTML: "Run"},
                                 classes: "controlButtons",
                                 styles: {width: "100%", height: "60px"}
                                });
  let pauseButton = createElement({node: "button",
                                   attributes: {id: "pauseButton", innerHTML: "Pause"},
                                   classes: "controlButtons",
                                   styles: {width: "100%", height: "60px"}
                                  });
  let resumeButton = createElement({node: "button",
                                    attributes: {id: "resumeButton", innerHTML: "Resume"},
                                    classes: "controlButtons",
                                    styles: {width: "100%", height: "60px"}
                                   });
  let saveButton = createElement({node: "button",
                                  attributes: {id: "saveButton", innerHTML: "Save"},
                                  classes: "controlButtons",
                                  styles: {width: "100%", height: "60px"}
                                 });
  let loadButton = createElement({node: "button",
                                  attributes: {id: "loadButton", innerHTML: "Load"},
                                  classes: "controlButtons",
                                  styles: {width: "100%", height: "60px"}
                                 });

  controlNode.appendChild(runButton);
  controlNode.appendChild(pauseButton);
  controlNode.appendChild(resumeButton);
  controlNode.appendChild(saveButton);
  controlNode.appendChild(loadButton);
}

// currently just view libraries and the first library's blocks
function viewState() {
  let librariesNode = document.getElementById("libraries");
  let blocksNode = document.getElementById("blocks");

  //clear to start
  while (librariesNode.firstChild) {
    librariesNode.removeChild(librariesNode.firstChild);
  }
  while (blocksNode.firstChild) {
    blocksNode.removeChild(blocksNode.firstChild);
  }

  //build Library buttons
  state.libraries.forEach (l => {
    librariesNode.appendChild(createButton(l.name));
  });

  // build current
  let targetLibrary = getLibrary(state.current.library);
  //get blocks from selected library
  targetLibrary.blocks.forEach(b => {
    blocksNode.appendChild(createButton(b.name));
  })

  //set editor to block content
  let targetBlock = getBlock(state.current.library, state.current.block);
  state.codeMirror.setValue(targetBlock.content)

  setupController(); //because we just refreshed the whole menu ui
}

function setupController() {
  // make things work //
  // ALL event listeners here, none on the dom node creation I think //

  // click on library:
  let librariesNode = document.getElementById("libraries");
  let blocksNode = document.getElementById("blocks");
  let controlNode = document.getElementById("control");

  let libraryEntries = librariesNode.children;
  Object.keys(libraryEntries).forEach(
    k => libraryEntries[k].addEventListener("click", libraryControllerEvent));

  let blockEntries = blocksNode.children;
  Object.keys(blockEntries).forEach(
    k => blockEntries[k].addEventListener("click", blockControllerEvent));

  let controlEntries = controlNode.children;
  Object.keys(controlEntries).forEach(
    k => controlEntries[k].addEventListener("click", controlControllerEvent));
}

function libraryControllerEvent(evt) {
  let library = evt.srcElement.innerHTML; //there is undoubtedly a better way to do this
  let libraryObject = getLibrary(library);
  let block = libraryObject.blocks[0].name;
  saveState();
  state.current = {library, block};
  viewState();
 }

function blockControllerEvent(evt) {
  let library = state.current.library;
  let libraryObject = getLibrary(library);
  let block = evt.srcElement.innerHTML; //there is undoubtedly a better way to do this
  saveState();
  state.current = {library, block};
  viewState();
}

function controlControllerEvent(evt) {
  let target = evt.srcElement.innerHTML; //there is undoubtedly a better way to do this
  if (target == "Run") {
    stopifyRun();
  }
  if (target == "Pause") {
    stopifyPause();
  }
  if (target == "Resume") {
    stopifyResume();
  }
  if (target == "Save") {}
  if (target == "Load") {}
}

function stopifyRun() {
  saveState();
  const reducer = (accumulator, currentValue) => accumulator + "\n\n" + currentValue.content;
  let task = getLibrary(state.current.library).blocks.reduce(reducer, "");
  console.log(task);
  let runner = stopify.stopifyLocally(task);
  runner.g = {
    window,
    document,
    console,
    Math,
    ctx: state.ctx,
    canvas: state.canvas
  }
  state.runner = runner;
  state.runner.run((result => console.log(result)));
}

function stopifyPause() {
  state.runner.pause(() => console.log("paused"));
}

function stopifyResume() {
  state.runner.resume();
}

/*
 * Initializes site for
 * 1. first time
 * 2. localstorage return
 *
 * reads from state; maybe to self host it will *execute* from state?
 *
 * can I use that idea of "engine" again? Can I make it more modular rather than monolithic?
 * if modular, that would let re-coding individual modules of the site and updating them in real time
 *
 * don't forget the potential stopify hack idea:
 *   modify a runner's code during pause to resume a modified execution (flesh out why...)
 */
function initializeState() {
  state.library = {};
  firstInit();
}

function saveState() {
  let target = getBlock(state.current.library, state.current.block);
  target.content = state.codeMirror.getValue();
}

function firstInit() {
  state.current = {library: "first", block: "fst blk"};
  state.libraries = [
    {
      name: "first",
      blocks: [
        {
          name: "fst blk",
          content: `function line (x1, y1, x2, y2, ctx) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
}

let x1 = 10;
let y1 = 10;
let x2 = 100;
let y2 = 100;`
        },
        {
          name: "snd blk",
          content: "line(x1, y1, x2, y2, ctx);"
        }
      ]
    },
    {
      name: "second",
      blocks: [
        {
          name: "init blk",
          content: `function point(x, y, ctx) {
  ctx.beginPath();
  ctx.rect(x, y, 1, 1);
  ctx.fill();
}

let y = 40;`
        },
        {
          name: "use blk",
          content: "for (let x = 10; x < 110; x += 2) {\n\tpoint(x, y, ctx)\n}"
        }
      ]
    }
  ]
}

// not written yet
function save() {
  state.instances[state.current].code = state.codeMirror.getValue();
  let saveInstances = [...state.instances];
  saveInstances.forEach ((e) => delete e.runner)
  localStorage.instances = JSON.stringify(saveInstances);
}

// not written yet
function load() {
  let loadLibraries = JSON.parse(localStorage.libraries);
  state.libraries = [...loadLibraries];
  viewState({library: "first"})
}

//
//  utility //
//

function createElement ({node = "div", attributes = {}, classes = "", styles = {}}) {
  let element = document.createElement(node);
  Object.keys(attributes).forEach(a => element[a] = attributes[a]);
  classes.split(" ").forEach(c => element.classList.add(c));
  Object.keys(styles).forEach(s => element.style[s] = styles[s]);

  return element;
}

// createStateButton is a better name
function createButton (name)  {
  let element = createElement({node: "button",
                               attributes: {innerHTML: name},
                               classes: "libraryButton",
                               styles: {width: "100%", height: "40px"}
                              });

  element.dataset.name = name;
  return element;
}

function getLibrary(library) {
  let ret;
  state.libraries.forEach(l => {
    if (l.name == library) {
      ret = l;
    }
  })
  return ret;
}

// would read state.current and return the dom objects for {library, block}
function getViewState() {

}

function getBlock(library, block) {
  let target = getLibrary(library);

  target.blocks.forEach(b => {
    if (b.name == block) {
      ret = b;
    }
  })
  return ret;
}



// model //
//  view //
// controller //
