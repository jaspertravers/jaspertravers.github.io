
let main, canvas, board, sidebar;
let path;

let currentPosition;

//(id, value, topography)
function createBlock(value, position, size) {
    const block = document.createElement("div");
    block.setAttribute("id", value);
    block.classList.add("block");
    block.style.top = `${position.top}px`;
    block.style.left = `${position.left}px`;
    block.style.width = `${size.width}px`;
    block.style.height = `${size.height}px`;

    //block.style.background = `#ffffff`;
    block.style.background = `#fffbf4`;
    block.style.border = `1px dashed #282828`;

    const textbox = document.createElement("textarea");
    textbox.setAttribute("id", `${value}-text`);
    textbox.innerHTML = "edit me";
    textbox.style.width = "95%";
    textbox.style.height = "50%";

    //textbox.contentEditable = "true";

    block.appendChild(textbox);

    return block;
}


function onMouseDown(event) {
    let key = event.target;

    if (event.target === board) {

    }
}

function onMouseMove(event) {
   
}

function blockMouseDown(event) {
    //console.log(event); //debug

    currentPosition = {x: event.clientX, y: event.clientY}

    event.target.addEventListener("mousemove", blockMouseMove, { passive: false, useCapture: false });
    event.target.addEventListener("mouseup", blockMouseUp, { passive: false, useCapture: false });
}

function blockMouseMove(event) {
    let target = event.target;

    target.style.top = `${target.offsetTop - (currentPosition.y - event.clientY)}px`;
    target.style.left = `${target.offsetLeft - (currentPosition.x - event.clientX)}px`;

    currentPosition = {x: event.clientX, y: event.clientY}
}

function blockMouseUp(event) {
    //console.log(event);

    currentPosition = null;

    handleUndoTree(event);

    event.target.removeEventListener("mousemove", blockMouseMove);
    event.target.removeEventListener("mouseup", blockMouseUp);
}

function handleUndoTree(event) {
    //remove "px" from string and convert to int
    let x = parseInt(event.target.style.top.slice(0, -2), 10);
    let y = parseInt(event.target.style.left.slice(0, -2), 10);

    let undoTreeElement = document.createElement("div");
    undoTreeElement.setAttribute("class", "undo-tree-element");
    undoTreeElement.setAttribute("data-x", x);
    undoTreeElement.setAttribute("data-y", y);
    undoTreeElement.style.width = "100%";
    undoTreeElement.style.position = "relative";
    undoTreeElement.innerHTML = `(${x} ${y})`;

    undoTreeElement.addEventListener("mouseup", (evt) => {
        //let target = document.getElementById("value")
        //target.style.top = event.target.
        let update = document.getElementById("value");
        update.style.top = evt.target.dataset.x + "px";
        update.style.left = evt.target.dataset.y + "px";
    });

    sidebar.appendChild(undoTreeElement);
}

function debugMove (event) {
    //console.log(event);
    // 100 ~= 162
    console.log(`client: (${event.clientX}, ${event.clientY})`);
    console.log(`movement: (${event.movementX}, ${event.movementY})`);
    console.log(`offset: (${event.offsetX}, ${event.offsetY})`);
    console.log(`page: (${event.pageX}, ${event.pageY})`);
    console.log(`screen: (${event.screenX}, ${event.screenY})`);
}


function onLoad() {
    // main
    main = document.createElement("main");
    main.setAttribute("id", "main");

    //canvas
    canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");

    //board
    board = document.createElement("section"); //needs to be renamed
    board.setAttribute("id", "board");

    board.addEventListener("mousedown", onMouseDown, { passive: false, useCapture: false });
    //board.addEventListener("mousemove", onMouseMove, { passive: false, useCapture: false }); // no

    //sidebar
    sidebar = document.createElement("div");
    sidebar.setAttribute("id", "sidebar");
    sidebar.style.top = `0px`;
    sidebar.style.left = `0px`;
    sidebar.style.width = `200px`;
    sidebar.style.height = `100%`;
    sidebar.style.background = `#fffbf4`;
    //sidebar.style.border = `1px dashed #282828`;

    //sidebar undotree elements



    //
    // run
    //
   
    //what does this order matter? gotta learn the nuances of appendChild and inheritance
    main.appendChild(canvas);
    main.appendChild(board);
    board.appendChild(sidebar);
    document.body.appendChild(main);

    createBackground(); //create canvas

    let top = 100; let left = 250;
    let width = 300; let height = 200;
    let block = createBlock ("value", {top, left}, {width, height});


    block.addEventListener("mousedown", blockMouseDown, { passive: false, useCapture: false });

    board.appendChild(block);
}

window.addEventListener("load", onLoad);
//window.addEventListener("mousemove", debugMove); //debug, works


function createBackground() {

    const MARGIN = 24;
    const GRID_STEP = 12;
    const width = window.innerWidth - MARGIN - 1;
    const height = window.innerHeight - MARGIN + 1;

    board.style.top = `${MARGIN / 2}px`;
    board.style.left = `${MARGIN / 2}px`;
    board.style.width = `${width}px`;
    board.style.height = `${height}px`;

    canvas.setAttribute("width", width)
    canvas.setAttribute("height", height);

    canvas.style.top = `${MARGIN / 2}px`;
    canvas.style.left = `${MARGIN / 2}px`;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const context = canvas.getContext("2d");

    for (let x = 0; x < width; x += GRID_STEP) {
        for (let y = 0; y < height; y += GRID_STEP) {
            context.fillStyle = "#282828";
            context.fillRect (x, y, 1, 1);
        }
    }
}
