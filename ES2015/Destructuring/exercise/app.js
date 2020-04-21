// object destructuring 1
let facts = { numPlanets: 8, yearNeptuneDiscovered: 1846 };
// let { numPlanets, yearNeptuneDiscovered } = facts;

// console.log(numPlanets); // 8
// console.log(yearNeptuneDiscovered); // 1846

// object destructuring 2
let planetFacts = {
  numPlanets: 8,
  yearNeptuneDiscovered: 1846,
  yearMarsDiscovered: 1659,
};

let { numPlanets, ...discoveredYears } = planetFacts;

console.log(discoveredYears); // { yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}

// object destructuring 3
function getUserData({ firstName, favoriteColor = "green" }) {
  return `Your name is ${firstName} and you like ${favoriteColor}`;
}

getUserData({ firstname: "Alejandro", favoriteColor: "purple" }); // Your name is Alejandro and you like purple
getUserData({ firstName: "Melissa" }); // Your name is Melissa and you like green
getUserData({}); // Your name is undefined and you like green

// array destructuring 1
let [first, second, third] = ["Maya", "Marisa", "Chi"];
console.log(first); // Maya
console.log(second); // Marisa
console.log(third); // Chi

// array destructing 2
let [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
  "Raindrops on roses",
  "whiskers on kittens",
  "Bright copper kettles",
  "warm woolen mittens",
  "Brown paper packages tied up with strings",
];

console.log(raindrops); // Raindrops on roses
console.log(whiskers); // whiskers on kittens
console.log(aFewOfMyFavoriteThings); // ["Bright copper kettles", "warm woolen mittens", "Brown paper tied up with stirngs"]


// array destructing 3
let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]]

console.log(numbers); // [10, 30, 20]

// ES2015 refactoring

// ES2015 Object Destructuring
var obj = {
    numbers: {
        a: 1, 
        b: 2
    }
};

var { numbers: { a } } = obj;
var { numbers: { b } } = obj;

// ES2015 One-Line Array Swap and Destructuring
var arr = [1, 2];
[arr[0], arr[1]] = [arr[1], arr[0]]

function raceResults([first, second, third, ...rest]){
    return {
        first, 
        second,
        third,
        rest
    }
}