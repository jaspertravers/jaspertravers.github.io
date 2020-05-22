const $__C = stopify.compiler;
var $__T = stopify;
var $__R = $__T.newRTS("lazy");
var $S = stopify.init($__R);
var handleNew, $top;
if ($__R.mode) handleNew = { box: undefined };
if ($__R.mode) $top = { box: undefined };
if ($__R.mode)
  handleNew.box = function fun0(constr, ...args) {
    var target = null;
    var $frame = null;
    $__R.remainingStack--;
    if (!$__R.mode) {
      $frame = $__R.stack.pop();
      target = $frame.index;
      [result0, obj0, app1, app0] = $frame.locals;
    }
    function captureLocals(frame) {
      frame.locals = [result0, obj0, app1, app0];
    }
    var restoreNextFrame = () => {
      return fun0.call(this, constr, ...args);
    };
    var app0, app1, obj0, result0;
    if ($__R.mode) app0 = $__C.knownBuiltIns.includes(constr);
    if (($__R.mode && app0) || (!$__R.mode && target === 1)) {
      if ($__R.mode) {
        app1 = new constr(...args);
        $__R.remainingStack++;
      }
      return app1;
    }
    if ($__R.mode) obj0 = Object.create(constr.prototype);
    try {
      if ($__R.mode) {
        result0 = constr.apply(obj0, args);
      } else if (target === 3) result0 = $__R.stack[$__R.stack.length - 1].f();
    } catch (exn0) {
      if (exn0 instanceof $__T.Capture) {
        exn0.stack.push({
          kind: "rest",
          f: restoreNextFrame,
          index: 3,
          this: this,
        });
        captureLocals(exn0.stack[exn0.stack.length - 1]);
      } else {
        $__R.pushTrace(": in handleNew");
      }
      throw exn0;
    }
    if ($__R.mode) $__R.remainingStack++;
    return typeof result0 === "object" ? result0 : obj0;
    $__R.remainingStack++;
  };
if ($__R.mode)
  $top.box = function fun1() {
    var target = null;
    var $frame = null;
    $__R.remainingStack--;
    if (!$__R.mode) {
      $frame = $__R.stack.pop();
      target = $frame.index;
      [app2] = $frame.locals;
    }
    function captureLocals(frame) {
      frame.locals = [app2];
    }
    var restoreNextFrame = () => {
      return fun1.call(this);
    };
    var app2;
    try {
      if ($__R.mode) {
        app2 = $S.g.line.call(void 0, 10, 10, 100, 100, $S.g.ctx);
      } else if (target === 4) app2 = $__R.stack[$__R.stack.length - 1].f();
    } catch (exn1) {
      if (exn1 instanceof $__T.Capture) {
        exn1.stack.push({
          kind: "rest",
          f: restoreNextFrame,
          index: 4,
          this: this,
        });
        captureLocals(exn1.stack[exn1.stack.length - 1]);
      } else {
        $__R.pushTrace("Line 1");
      }
      throw exn1;
    }
    $__R.remainingStack++;
  };
const onDone = function onDone(result) {
  $S.onEnd(result);
};
$__R.runtime($top.box, onDone);

/*
///////////////////////////////////////////////////////////////////////////////
*/
const $__C = stopify.compiler;
var $__T = stopify;
var $__R = $__T.newRTS("lazy");
var $S = stopify.init($__R);
var handleNew, $top;
if ($__R.mode) handleNew = { box: undefined };
if ($__R.mode) $top = { box: undefined };
if ($__R.mode)
  handleNew.box = function fun0(constr, ...args) {
    var target = null;
    var $frame = null;
    $__R.remainingStack--;
    if (!$__R.mode) {
      $frame = $__R.stack.pop();
      target = $frame.index;
      [result0, obj0, app1, app0] = $frame.locals;
    }
    function captureLocals(frame) {
      frame.locals = [result0, obj0, app1, app0];
    }
    var restoreNextFrame = () => {
      return fun0.call(this, constr, ...args);
    };
    var app0, app1, obj0, result0;
    if ($__R.mode) app0 = $__C.knownBuiltIns.includes(constr);
    if (($__R.mode && app0) || (!$__R.mode && target === 1)) {
      if ($__R.mode) {
        app1 = new constr(...args);
        $__R.remainingStack++;
      }
      return app1;
    }
    if ($__R.mode) obj0 = Object.create(constr.prototype);
    try {
      if ($__R.mode) {
        result0 = constr.apply(obj0, args);
      } else if (target === 3) result0 = $__R.stack[$__R.stack.length - 1].f();
    } catch (exn0) {
      if (exn0 instanceof $__T.Capture) {
        exn0.stack.push({
          kind: "rest",
          f: restoreNextFrame,
          index: 3,
          this: this,
        });
        captureLocals(exn0.stack[exn0.stack.length - 1]);
      } else {
        $__R.pushTrace(": in handleNew");
      }
      throw exn0;
    }
    if ($__R.mode) $__R.remainingStack++;
    return typeof result0 === "object" ? result0 : obj0;
    $__R.remainingStack++;
  };
if ($__R.mode)
  $top.box = function fun1() {
    var target = null;
    var $frame = null;
    $__R.remainingStack--;
    if (!$__R.mode) {
      $frame = $__R.stack.pop();
      target = $frame.index;
      [app2] = $frame.locals;
    }
    function captureLocals(frame) {
      frame.locals = [app2];
    }
    var restoreNextFrame = () => {
      return fun1.call(this);
    };
    var app2;
    if ($__R.mode) $S.g.ctx.fillStyle = "#ffffff";
    try {
      if ($__R.mode) {
        app2 = $S.g.ctx.fillRect(0, 0, 800, 800);
      } else if (target === 4) app2 = $__R.stack[$__R.stack.length - 1].f();
    } catch (exn1) {
      if (exn1 instanceof $__T.Capture) {
        exn1.stack.push({
          kind: "rest",
          f: restoreNextFrame,
          index: 4,
          this: this,
        });
        captureLocals(exn1.stack[exn1.stack.length - 1]);
      } else {
        $__R.pushTrace("Line 2");
      }
      throw exn1;
    }
    $__R.remainingStack++;
  };
const onDone = function onDone(result) {
  $S.onEnd(result);
};
$__R.runtime($top.box, onDone);

/*
///////////////////////////////////////////////////////////////////////////////
*/
const $__C = stopify.compiler;
var $__T = stopify;
var $__R = $__T.newRTS("lazy");
var $S = stopify.init($__R);
var handleNew, $top;
if ($__R.mode) handleNew = { box: undefined };
if ($__R.mode) $top = { box: undefined };
if ($__R.mode)
  handleNew.box = function fun0(constr, ...args) {
    var target = null;
    var $frame = null;
    $__R.remainingStack--;
    if (!$__R.mode) {
      $frame = $__R.stack.pop();
      target = $frame.index;
      [result0, obj0, app1, app0] = $frame.locals;
    }
    function captureLocals(frame) {
      frame.locals = [result0, obj0, app1, app0];
    }
    var restoreNextFrame = () => {
      return fun0.call(this, constr, ...args);
    };
    var app0, app1, obj0, result0;
    if ($__R.mode) app0 = $__C.knownBuiltIns.includes(constr);
    if (($__R.mode && app0) || (!$__R.mode && target === 1)) {
      if ($__R.mode) {
        app1 = new constr(...args);
        $__R.remainingStack++;
      }
      return app1;
    }
    if ($__R.mode) obj0 = Object.create(constr.prototype);
    try {
      if ($__R.mode) {
        result0 = constr.apply(obj0, args);
      } else if (target === 3) result0 = $__R.stack[$__R.stack.length - 1].f();
    } catch (exn0) {
      if (exn0 instanceof $__T.Capture) {
        exn0.stack.push({
          kind: "rest",
          f: restoreNextFrame,
          index: 3,
          this: this,
        });
        captureLocals(exn0.stack[exn0.stack.length - 1]);
      } else {
        $__R.pushTrace(": in handleNew");
      }
      throw exn0;
    }
    if ($__R.mode) $__R.remainingStack++;
    return typeof result0 === "object" ? result0 : obj0;
    $__R.remainingStack++;
  };
if ($__R.mode)
  $top.box = function fun1() {
    var target = null;
    var $frame = null;
    $__R.remainingStack--;
    if (!$__R.mode) {
      $frame = $__R.stack.pop();
      target = $frame.index;
      [app2] = $frame.locals;
    }
    function captureLocals(frame) {
      frame.locals = [app2];
    }
    var restoreNextFrame = () => {
      return fun1.call(this);
    };
    var app2;
    try {
      if ($__R.mode) {
        app2 = $S.g.line.call(void 0, 10, 20, 100, 110, $S.g.ctx);
      } else if (target === 4) app2 = $__R.stack[$__R.stack.length - 1].f();
    } catch (exn1) {
      if (exn1 instanceof $__T.Capture) {
        exn1.stack.push({
          kind: "rest",
          f: restoreNextFrame,
          index: 4,
          this: this,
        });
        captureLocals(exn1.stack[exn1.stack.length - 1]);
      } else {
        $__R.pushTrace("Line 1");
      }
      throw exn1;
    }
    $__R.remainingStack++;
  };
const onDone = function onDone(result) {
  $S.onEnd(result);
};
$__R.runtime($top.box, onDone);
