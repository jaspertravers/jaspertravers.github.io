/*
  * File Notes:
  * vim: foldmethod=snytax
  * zm
*/
/*
  * Inspector (parentElement: HTMLElement)
  * Creates the container HTMLElement and attaches it to the page
*/
export class Inspector { //{{{
  constructor({ parentElement }) {
    this.node = document.createElement('div');
    this.node.style.fontFamily = 'monospace';
    parentElement.append(this.node);
  }
  inspect(item) {
    let output = document.createElement('div');
    output.style.padding = '4px';
    output.style.borderBottom = '1px solid lightgray';
    output.style.cursor = 'default';
    output.append(inspect(item));
    this.node.append(output);
  }
} //}}}

/*
  * defaultOptions
  * contains expansion level for objects
  * style: 'flat' | 'expand' | 'condense'
*/
const defaultOptions = { //{{{
  style: 'flat',
  itemLimit: 5, //unused
} //}}}
/*
  * inspect (item: any, opts: defaultOptions)
  * determines the type of JavaScript value to inspect 
  * and routes the object to the correct formatter
*/
function inspect(item, opts = { ...defaultOptions }) { //{{{
  if (isNull(item)) { return formatNull(item) }
  if (isUndefined(item)) { return formatUndefined(item) }
  if (isBoolean(item)) { return formatBoolean(item) }
  if (isNumber(item)) { return formatNumber(item) }
  if (isBigInt(item)) { return formatBigInt(item) }
  if (isString(item)) { return formatString(item) }
  if (isSymbol(item)) { return formatSymbol(item) }

  if (isFunction(item)) { return formatFunction(item, opts) }
  if (isArray(item)) { return formatCollection(item, { ...opts, type: 'array' }) }
  if (isObject(item)) { return formatCollection(item, { ...opts, type: 'object' }) }
} //}}}

/*
  * format<Value> (item: any)
  * the collection of functions which format the JavaScript value
*/
//{{{format primitives
function formatNull(item) {
  let output = document.createElement('span');
  output.style.color = 'gray';
  output.textContent = `${item}`;
  return output;
}
function formatUndefined(item) {
  let output = document.createElement('span');
  output.style.color = 'gray';
  output.textContent = `${item}`;
  return output;
}
function formatBoolean(item) {
  let output = document.createElement('span');
  output.style.color = 'darkblue';
  output.textContent = `${item}`;
  return output;
}
function formatNumber(item) {
  let output = document.createElement('span');
  output.style.color = 'darkblue';
  output.textContent = `${item}`;
  return output;
}
function formatBigInt(item) {
  let output = document.createElement('span');
  output.style.color = 'green';
  output.textContent = `${item}n`;
  return output;
}
function formatString(item) {
  let output = document.createElement('span');
  output.style.color = 'red';
  output.textContent = `'${item}'`;
  return output;
}
function formatSymbol(item) {
  let output = document.createElement('span');
  output.style.color = 'red';
  output.textContent = `${item.toString()}`;
  return output;
}
function formatIndex(item) {
  let output = document.createElement('span');
  output.style.color = 'purple';
  output.textContent = `${item}`;
  return output;
}
function formatKey(item) {
  let output = document.createElement('span');
  output.style.color = 'purple';
  output.textContent = `${item}`;
  return output;
}
function formatBackground(item) {
  let output = document.createElement('span');
  output.style.color = 'gray';
  output.textContent = `${item}`;
  return output;
}
//}}}
/*
  * formatCollection (item: any, opts: defaultOptions)
  * formats arrays and objects
  * attaches interaction handlers to expand and collapse objects
  * recurses
*/
//{{{format objects
function formatCollection(item, opts) { //{{{
  let { type } = opts;
  let leftDelimiter, rightDelimiter;
  if (opts.type === 'array') {
    leftDelimiter = '[';
    rightDelimiter = ']';
  }
  else if (opts.type === 'object') {
    leftDelimiter = '{';
    rightDelimiter = '}';
  }

  // if (opts.type === 'object') return;
  let output = document.createElement('span');
  output.style.color = 'black';

  /*
  */
  //{{{ interaction
  let leftArrow = document.createTextNode('▶ ');
  let downArrow = document.createTextNode('▼ ');
  let expandedContent;
  function attachInteraction(node) {
    let handleToggle = handleExpand;
    node.onclick = event => {
      event.preventDefault();
      event.stopPropagation();
      handleToggle();
      handleToggle = handleToggle === handleExpand ? handleCollapse : handleExpand;
    }
  }

  function handleExpand() {
    output.replaceChild(downArrow, leftArrow);
    expandedContent = formatCollection(item, { ...opts, arrayLengthInfo: true, style: 'expand' });
    output.parentElement.append(expandedContent);
  }
  function handleCollapse() {
    output.replaceChild(leftArrow, downArrow);
    output.parentElement.removeChild(expandedContent);
  }
  //}}}
  //get data in correct style
  function getNodes(style) {
    let nodes = [];
    if (type === 'array') {
      for (let element of item) {
        let node = inspect(element, { ...opts, style });
        nodes.push(node);
      }
    }
    else if (type === 'object') {
      for (let [key, value] of Object.entries(item)) {
        let node = [formatKey(key), ': ', inspect(value, { ...opts, style })];
        nodes.push(node);
      }
    }
    return nodes;
  }

  //style data for (flat expand condensed)
  if (opts.style === 'flat') {
    let nodes = getNodes('condensed');
    nodes = nodes.flatMap(n => [n, ', ']);
    nodes = nodes.flat(); //for object key value pairs
    nodes.pop(); //remove last ', '
    nodes.unshift(leftDelimiter);
    nodes.push(rightDelimiter);
    if (type === 'array') nodes.unshift(`(${item.length}) `);
    nodes.unshift(leftArrow);
    attachInteraction(output);
    output.append(...nodes);
  }
  else if (opts.style === 'expand') {
    let nodes = getNodes('flat');
    let label = document.createElement('div');
    let list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.paddingLeft = '24px';
    nodes.forEach((node, idx) => {
      let li = document.createElement('li');
      if (type === 'array') li.append(formatIndex(idx), ': ', node)
      if (type === 'object') li.append(...node)
      list.append(li);
    })
    // format array length
    if (type === 'array') list.append(formatArrayLength(nodes));
    list.append(formatPrototype(item, { ...opts, style: 'flat' }));

    label.append(list);
    output.append(label);
  }
  else if (opts.style === 'condensed') {
    if (type === 'array') output.append(`Array(${item.length})`);
    if (type === 'object') output.append('{...}');
  }

  return output;
} //}}}
/*
  * format<Helpers> (item: any)
  * adds pieces of formatting to objects
  *
*/
function formatArrayLength(item) { //{{{
  let li = document.createElement('li');
  li.append(formatIndex('length'), ': ', formatNumber(item.length))
  return li;
} //}}}
function formatPrototype(item) { //{{{
  let li = document.createElement('li');
  li.append(formatBackground('[[Prototype]]'), ': ', Object.prototype.toString.call(item).slice(7).slice(0, -1));
  return li;
} //}}}
//}}}

/*
  * is<Type> (item: any)
  * a function for each JavaScript type. 
  * returns true if the type matches
*/
//{{{isType functions
function isNull(item) { return item === null }
function isUndefined(item) { return item === undefined }
function isBoolean(item) { return typeof item === 'boolean' }
function isNumber(item) { return typeof item === 'number' }
function isBigInt(item) { return typeof item === 'bigint' }
function isString(item) { return typeof item === 'string' }
function isSymbol(item) { return typeof item === 'symbol' }
function isFunction(item) { return typeof item === 'function' }
function isArray(item) { return Array.isArray(item) }
// function isMap(item) { return item.toString() === '[object Map]' }
// function isWeakMap(item) { return item.toString() === '[object WeakMap]' }
// function isSet(item) { return item.toString() === '[object Set]' }
// function isWeakSet(item) { return item.toString() === '[object WeakSet]' }
function isObject(item) { return item.toString() === '[object Object]' }
// function isElement(item) { return item instanceof Element }

// additional checks
// function isArray(item) { return Object.prototype.toString.call(item) === '[object Array]' }
// function isMap(item) { return Object.prototype.toString.call(item) === '[object Map]' }
// function isWeakMap(item) { return Object.prototype.toString.call(item) === '[object WeakMap]' }
// function isSet(item) { return Object.prototype.toString.call(item) === '[object Set]' }
// function isWeakSet(item) { return Object.prototype.toString.call(item) === '[object WeakSet]' }
// function isObject(item) { return Object.prototype.toString.call(item) === '[object Object]' }
// function isObject(item) { return === '[object Object]' }
// function isElement(item) { return item instanceof Element }
//}}}
