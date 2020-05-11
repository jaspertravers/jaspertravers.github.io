//
// includes
//




//
//  globals
//

const STEP = 24;
const pts = []; //test

const state = {};

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
    part.style.width = `${width}px`;
    part.style.height = `${height}px`;

    let controller = document.createElement("div");
    controller.classList.add("controller");
    controller.style.top = `0px`;
    controller.style.left = `0px`;
    controller.style.width = `${width - 1}px`;
    controller.style.height = `${STEP + 1}px`;
    controller.style.background = "#ffffff"
    controller.style.borderBottom = "1px dotted #282828";

    let controllerState = document.createElement("div");
    controllerState.classList.add("controllerState");
    // controllerState.style.top = `0px`;
    // controllerState.style.left = `0px`;
    controllerState.style.width = "100%";
    controllerState.style.height = "100%";
    controllerState.style.display = "flex";

    let labels = ["Part", "Draw"];
    let elements = [];

    labels.forEach ((e, i) => {
        elements[i] = document.createElement("button");
        elements[i].style.width = "100px";
        elements[i].style.verticalAlign = "middle";
        elements[i].style.textAligh = "center";
        elements[i].style.height = "100%";
        elements[i].innerHTML = labels[i];
        controllerState.appendChild(elements[i])
    });

    let currentState = document.createElement("div");

    controllerState.appendChild(currentState);
    controller.appendChild(controllerState);

    let canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.classList.add("canvas");

    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    const context = canvas.getContext("2d");

    context.fillStyle = "#E5E5E5";
    context.fillRect(0, 0, canvas.width, canvas.height);

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
    part.appendChild(controller);
    main.appendChild(part);
    document.body.appendChild(main);
    document.body.style.overflow = "hidden"; //index cards don't scroll

    return {main, part};
}

function onMouseDown (evt) {
    console.log(evt);
    //
    //  switch
    //
    if (state.mouseState === "part") {
        handlePartDown(evt);
    }
    if (evt.target.classList[0] == "canvas" && state.mouseState === "canvas") {
        handleCanvasDown(evt);
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
    pts.push(constrain(evt));
    pts.target = evt.target;
    document.addEventListener ("mousemove", handleCanvasMove);
    document.addEventListener ("mouseup", handleCanvasUp);
}
function handleCanvasMove(evt) {
    pts.push(constrain(evt));
    canvasRender(pts, pts.target);
}
function handleCanvasUp (evt) {
    pts.push(null);
    canvasRender(pts, evt.target);
    document.removeEventListener ("mousemove", handleCanvasMove);
    document.removeEventListener ("mouseup", handleCanvasUp);
}

function canvasRender (pts, target) {
    const ctx = target.getContext("2d");
    ctx.strokeStyle = "#282828";
    for (let index = 1; index < pts.length - 1; index++) {
        if (pts[index - 1] == null) continue;
        if (pts[index] == null) continue;
        let p1 = pts[index - 1];
        let p2 = pts[index];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
}