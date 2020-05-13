//
// globals
//
let canvas;

let currentPosition;
let partPosition;
let newpart;

//
//  run
// 
window.addEventListener("load", onLoad);

function onLoad() {
    let {main, part, canvas} = bootstrap();
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

    //
    // canvas
    //

    //let canvas = document.createElement("canvas"); //added temp var at top
    canvas = document.createElement("canvas");
    //canvas.style.border = "solid 1px"
    canvas.setAttribute("id", "canvas");
    canvas.classList.add("canvas");

    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

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
    main.appendChild(part);
    document.body.appendChild(main);
    document.body.style.overflow = "hidden"; //index cards don't scroll

    return {main, part, canvas};
}

//
// switch
//

function onMouseDown (evt) {
    console.log(evt);
    handlePartDown(evt);
    /*
    if (evt.target.classList[0] == "part") {
        handlePartDown(evt);
    }
    */
}

//
// handlers
//

function handlePartDown(evt) {
    //default case
    //can put "switches" in here
    currentPosition = {x: evt.clientX, y: evt.clientY}
    partPosition = {x: evt.clientX, y: evt.clientY}
    document.addEventListener("mousemove", handlePartMove, {passive: false, useCapture: false});
    document.addEventListener("mouseup", handlePartUp, {passive: false, useCapture: false});

    newpart = createElement("div",
                            ["part"],
                            null,
                            [["top", `${currentPosition.y}px`],
                             ["left", `${currentPosition.x}px`],
                             ["width", `1px`],
                             ["height", `1px`],
                             ["border", "1px solid"],
                             ["background", "#ffffff"]
                            ]);

}

function handlePartMove (evt) {
    let dx = currentPosition.x - partPosition.x;
    let dy = currentPosition.y - partPosition.y;

    let set = (w, h, l, t) => {
        newpart.style.width = `${w}px`;
        newpart.style.height = `${h}px`;
        newpart.style.left = `${l + partPosition.x}px`;
        newpart.style.top = `${t + partPosition.y}px`;
    }

    if (dx > 1 && dy > 1) set (dx, dy, 0, 0);
    if (dx < 1 && dy > 1) set (-dx, dy, dx, 0);
    if (dx > 1 && dy < 1) set (dx, -dy, 0, dy);
    if (dx < 1 && dy < 1) set (-dx, -dy, dx, dy);

    currentPosition = {x: evt.clientX, y: evt.clientY};
}
function handlePartUp (evt) {
    newpart.addEventListener("mousedown", onMouseDown, {passive: false, useCapture: false}); //funny
    document.removeEventListener("mousemove", handlePartMove);
    document.removeEventListener("mouseup", handlePartUp);
}

//
// utility
//

/**
element : string
classlist: [string]
attributes: [[string, string]]
styles: [[string, string]]
*/

function createElement (element, classlist, attributes, styles) {
    let thing = document.createElement(element);
    classlist ? classlist.forEach (c => thing.classList.add(c)) : null;
    attributes ? attributes.forEach (a => thing.setAttribute(a[0], a[1])) : null;
    styles ? styles.forEach (s => thing.style[s[0]] = s[1]) : null;

    document.body.appendChild(thing);
    return thing;
}
