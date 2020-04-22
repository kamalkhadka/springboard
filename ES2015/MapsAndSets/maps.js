// data structures are formats for efficiently collecting or storing data

// map can have anything for key unline object
const myMap = new Map();
myMap.set(7, "seven");
myMap.set("7", "seven string");

// try in console
myMap.get(7);
myMap.get("7");

const empty = [];
myMap.set(empty, "empty array");

myMap.set(true, "TRUEE");

// function as key
const add = (x, y) => x + y;
const mul = (x, y) => x * y;

const funcCalls = new Map();
funcCalls.set(add, 1);
funcCalls.set(mul, 9);

funcCalls.get(add);

// pass in array to create map [[k, v], [k, v]]
const bandData = [
  [3, "3 Doors Down"],
  ["three", "Three Dog Night"],
  ["nine", "The Four Seasons"],
  [41, "Sum 41"],
];

const bandMap = new Map(bandData);

bandMap.set(182, "Blink-182").set("twenty", "Matchbox Twenty");

// iterating with Maps ; insertion order maintained
bandMap.forEach((val, key) => console.log(val));

for (let [key, val] of bandMap) {
  console.log(key, "=", val);
}
