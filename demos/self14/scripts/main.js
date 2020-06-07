window.addEventListener("load", onLoad);

function onLoad() {
  initvalue =
`/* this is this */

//allows re-running
if (main) {
	document.body.removeChild(main);
  try {
    window.removeEventListener("keydown", onKeyDown); //here
    console.log("removed listener, check elements tab > listeners");
  } catch (e) {
    console.log(e)
  }
}

//start here
let main = document.createElement("main");
main.id = "main";
document.body.appendChild(main);

let cmNode = document.createElement("div");
cmNode.id = "cmNode";
main.appendChild(cmNode);

const cm_opts = {
  lineNumbers: true,
  lineWrapping: true,
  indentWithTabs: true,
  indentUnit: 2,
  tabSize: 2,
  mode: "javascript",
};

let codemirror = CodeMirror(cmNode, cm_opts);

let output = document.createElement("div");
output.id = "output";
main.appendChild(output);

codemirror.setValue(initvalue); //this content is the initialvalue

// execution, aka "the only hook" //

window.addEventListener("keydown", onKeyDown);

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
`; //end of init string template

  let runner = stopify.stopifyLocally(initvalue);
  runner.g = this; //hmmm
  runner.initvalue = initvalue;
  runner.run(result => console.log(result));
}
