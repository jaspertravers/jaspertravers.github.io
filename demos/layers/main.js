//
// globals
//
let currentPosition;
let vpblockMove = false;
let canvas;
let vpblock;

let dragged = false;
//
//  run
// 
window.addEventListener("load", onLoad);

function onLoad() {
    let {main, part} = bootstrap();


}

function bootstrap () {
    //
    // main
    //
    let main = document.createElement("main");
    main.setAttribute("id", "main");
    main.classList.add("main");

    //
    // part
    //
    let part = document.createElement("div");
    part.setAttribute("id", "default");
    part.classList.add("part");

    part.addEventListener("mousedown", onMouseDown, {passive: false, useCapture: false});

    const width = window.innerWidth - 1;
    const height = window.innerHeight + 1;

    part.style.top = `0px`;
    part.style.left = `0px`;
    part.style.width = `800px`;
    part.style.height = `800px`;

    //
    // viewport block
    //

    //let vpblock = document.createElement("div"); //added temp var at top
    vpblock = document.createElement("div");
    vpblock.classList.add("vpblock");

  vpblock.addEventListener("click", (e) => {
    if (!dragged) {
      //console.log(e); //first click doesnt work, all rest do
      vpblockMove = !vpblockMove
      vpblock.style.border = vpblockMove ? "black dashed 1px" : "red solid 1px";
    }
  });

    vpblock.style.top = "200px";
    vpblock.style.left = "100px";
    vpblock.style.width = "200px";
    vpblock.style.height = "200px";
    vpblock.style.background = "#ffffff";
    vpblock.style.border = "dashed 1px";

    //
    // canvas
    //

    //let canvas = document.createElement("canvas"); //added temp var at top
    canvas = document.createElement("canvas");
    canvas.style.border = "solid 1px"
    canvas.setAttribute("id", "canvas");
    canvas.classList.add("canvas");

    canvas.setAttribute("width", 800);
    canvas.setAttribute("height", 800);

    const context = canvas.getContext("2d");

    context.fillStyle = "#E5E5E5";
    context.fillRect(0, 0, canvas.width, canvas.height);

  let STEP = 24;
    for (let x = STEP; x < width - STEP + 2; x += STEP) { //this magic 2 is slightly confusing
        for (let y = STEP; y < height - STEP; y += STEP) {
            context.fillStyle = "#282828";
            context.fillRect (x, y, 1, 1);
        }
    }

    //
    // bootstrap
    //
    part.appendChild(canvas);
    part.appendChild(vpblock);
    main.appendChild(part);
    document.body.appendChild(main);
    document.body.style.overflow = "hidden"; //index cards don't scroll

    return {main, part};
}

function onMouseDown (evt) {
    //console.log(evt);
    //
    //  switch
    //
    if (evt.target.classList[0] == "canvas") {
        handleCanvasDown(evt);
    }
    if (evt.target.classList[0] == "vpblock") {
        handlevpblockDown(evt);
    }
}

//
// parts
//

function handlePartDown (evt) {
    let mouse = constrain(evt);

}

//
// specifics
//
// canvas
//

function grid (value) {
    return value % STEP < (STEP / 2) ? value - value % STEP : value + (STEP - (value % STEP));
}
function constrain (evt) {
    let x = evt.clientX;
    let y = evt.clientY;
    //bounds
    let top = evt.target.offsetTop + STEP;
    let left = evt.target.offsetLeft + STEP;
    let width = evt.target.offsetWidth - STEP;
    let height = evt.target.offsetHeight - STEP;
    x = x < left ? left : x > width ? width : x;
    y = y < top ? top : y > height ? height : y;
    x = grid(x);
    y = grid(y);

    return {x, y};
}
function handleCanvasDown(evt) {
    currentPosition = {x: evt.clientX, y: evt.clientY}

    document.addEventListener ("mousemove", handleCanvasMove);
    document.addEventListener ("mouseup", handleCanvasUp);
}
function handleCanvasMove(evt) {
    let target = evt.target;
    //console.log(target);

    canvas.style.top = `${canvas.offsetTop - (currentPosition.y - event.clientY)}px`;
    canvas.style.left = `${canvas.offsetLeft - (currentPosition.x - event.clientX)}px`;

  if(vpblockMove) {
    vpblock.style.top = `${vpblock.offsetTop - (currentPosition.y - event.clientY)}px`;
    vpblock.style.left = `${vpblock.offsetLeft - (currentPosition.x - event.clientX)}px`;
  }

    currentPosition = {x: event.clientX, y: event.clientY}

}
function handleCanvasUp (evt) {
    document.removeEventListener ("mousemove", handleCanvasMove);
    document.removeEventListener ("mouseup", handleCanvasUp);
}

// vpblock handles

function handlevpblockDown(evt) {
  currentPosition = {x: evt.clientX, y: evt.clientY}
  dragged = false;

  document.addEventListener ("mousemove", handlevpblockMove);
  document.addEventListener ("mouseup", handlevpblockUp);
}

function handlevpblockMove(evt) {
  dragged = true;
  vpblock.style.top = `${vpblock.offsetTop - (currentPosition.y - event.clientY)}px`;
  vpblock.style.left = `${vpblock.offsetLeft - (currentPosition.x - event.clientX)}px`;

  currentPosition = {x: event.clientX, y: event.clientY}
}
function handlevpblockUp(evt) {
  document.removeEventListener ("mousemove", handlevpblockMove);
  document.removeEventListener ("mouseup", handlevpblockUp);
}
