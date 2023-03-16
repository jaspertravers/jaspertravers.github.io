import { Inspector } from './Inspector.js';

let obj = { a: 1 };
obj.obj = obj;

let tests = [
  null,
  undefined,
  true,
  123,
  987n,
  'abc',
  Symbol(),
  // function sum(a,b) {return a + b},
  // function long(a,b,c) {
  //   a *= 4;
  //   return a + b * c;
  // },
  // [1,2,3],
  // {a: 1, b: false, c: null, d: 'abc'},

  //arrays
  [1, 2, 3],
  [null, undefined, true, 123, 987n, 'abc', Symbol()],
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  ['one', false, true, null, undefined, 2.24e200, 2975627364524863n,],
  [null, undefined, true, 123, 987n, 'abc', [1, 'two', false]],
  ['a', 'b', ['c'], [3, 5, 7], [[23, '56']]],
  [[1, 2, 3], [4, 5, 6]],
  [[[1, 2, 3], [4, 5, 6]], 5],
  [['a', 'b', ['c'], [3, 5, 7], [[23, '56']]]],
  [['a', 'b', ['c'], [3, 5, 7], { a: 2, b: 5 }, [[23, '56']]]],
  [['abc', 21], 56, '98', [true, [true, false]]],
  //objects
  { a: 1, b: false, c: null, d: 'abc' },
  { a: 1, b: false, c: null, d: 'abc', e: { a: 234, b: false, d: { cee: 23 } } },
  { akey: 'astring', bkey: { ckey: [{ dkey: false, ekey: true, nkey: null }, { another: 'key' }], lastkey: 432 } },
  obj,
];

let inspector = new Inspector({ parentElement: root });

for (let test of tests) {
  inspector.inspect(test);
  console.log(test)
}

/*
[x] null
[x] undefined
[x] boolean
[x] number
[x] bigint
[x] string
[x] symbol

// [ ] function
[x] array
[ ] Map
// [ ] WeakMap
// [ ] Set
// [ ] WeakSet
[ ] Class
[x] Object

[ ] 

// [ ] HTML Element

Prototypes
Data Properties
Accessor Properties

---
Dates
Typed Arrays
Keyed Collections
---

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

https://code.fitness/post/2016/01/javascript-enumerate-methods.html
*/
