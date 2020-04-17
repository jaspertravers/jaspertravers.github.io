{ /* FUNCTIONAL */

repeat = n => f => x => {
  if (n > 0)
    return repeat (n - 1) (f) (f (x))
  else
    return x
}

times = n => f =>
  repeat (n) (i => (f(i), i + 1)) (0)

for_ = (cur, cond, next, fbody) => {
  cond (cur) ?
    (fbody(cur), cur = next(cur), for_(cur, cond, next, fbody)) : cur;
}

each = (list, f) => {
  if (list.size == 0) { return; }

  for_ (0, (x) => x < list.size, (x) => (x + 1), (x) => f(list.get(x), x));
}
}

// colors
// https://github.com/morhetz/gruvbox
colors = { //gruvbox
  d1 : {
    "red"     : '#cc241d',
    "green"   : '#98971a',
    "yellow"  : '#d79921',
    "blue"    : '#458588'
  },
  d2 : {
    "red"     : '#fb4934',
    "green"   : '#b8bb26',
    "yellow"  : '#fabd2f',
    "blue"    : '#83a598'
  },
  l1 : {
    "red"     : '#cc241d',
    "green"   : '#98971a',
    "yellow"  : '#d79921',
    "blue"    : '#458588'
  },
  l2 : {
    "red"     : '#9d0006',
    "green"   : '#79740e',
    "yellow"  : '#b57614',
    "blue"    : '#076678'
  }
}

colors_array = [
    '#cc241d',
    '#98971a',
    '#d79921',
    '#458588',
    '#fb4934',
    '#b8bb26',
    '#fabd2f',
    '#83a598',
    '#cc241d',
    '#98971a',
    '#d79921',
    '#458588',
    '#9d0006',
    '#79740e',
    '#b57614',
    '#076678'
]


dline = (x1, y1, x2, y2, step, off) => {

  push();
  translate (x1, y1);

  let dx = x2 - x1;
  let dy = y2 - y1;

  rotate (Math.atan2 (dy, dx));

  hlen = Math.sqrt (Math.pow ((x2 - x1), 2) + Math.pow ((y2 - y1), 2));

  for (i = 0; i < hlen; i += step) {
    point (i, 0 + random (-off, off));
  }

  pop();
}

//dlinep takes points which have .x and .y properties
dlinep = (p1, p2, step, off) => {

  push();
  translate (p1.x, p1.y);

  let dx = p2.x - p1.x;
  let dy = p2.y - p1.y;

  rotate (Math.atan2 (dy, dx));

  hlen = Math.sqrt (Math.pow ((p2.x - p1.x), 2) + Math.pow ((p2.y - p1.y), 2));

  for (i = 0; i < hlen; i += step) {
    //point (i + random (-off, off), 0 + random (-off, off));
    point (i, 0 + random (-off, off));
    //point (i + random (-off, off), 0);
    
  }

  pop();
}

//unit: {w, h, indent}
//grid: {xdim, ydim}
gridgen = (unit, grid) => f => {
  //want a centered grid of units at specified sizes
  xmargin = width  - (unit.w * grid.xdim);
  ymargin = height - (unit.h * grid.ydim);

  push();
  translate (xmargin / 2, ymargin / 2);

  for (x = 0; x < grid.xdim; x++) {
    for (y = 0; y < grid.ydim; y++) {
      push();
      //translate (x * unit.w, y * unit.h);
      //draw a hex every w, but w is offset every other row

      translate  (x * unit.w,
                  y * unit.h);

      f    (0      +  unit.indent *1,
            0      +  unit.indent *1,
            unit.w -  unit.indent *1,
            unit.h -  unit.indent *1);
      pop();
    }
  }

  pop();
}
