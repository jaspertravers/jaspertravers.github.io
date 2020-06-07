window.addEventListener("load", onLoad);

function onLoad() {
  value =
`/* this is this */

//allows re-running
if (main) {
  if (codemirror) {
    value = codemirror.getValue();
  }
	document.body.removeChild(main);
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

codemirror.setValue(value); //this content is the initialvalue

// execution, aka "the only hook" //

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
`; //end of init string template

  let runner = stopify.stopifyLocally(value);
  runner.g = this; //hmmm
  runner.value = value; //odd requirement, but works
  runner.run(result => console.log(result)); //can go back to ignoring this probably
}
