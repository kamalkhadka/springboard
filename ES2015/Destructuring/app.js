// destructuring objects into variables

const teaOrder = {
  variety: "oolong",
  teaName: "winter sprout",
  origin: "taiwan",
  price: 12.99,
  hasCaffeine: true,
  quantity: 3,
};

const { price, quantity, teaName, ...others } = teaOrder;

// defaults with destructuring
const { brewTemp: temp = 175 } = teaOrder;

// renaming with destructuring
const { teaName: tea } = teaOrder;

function checkout(tea) {
  const { quantity = 1, price } = tea;
  return quantity * price;
}

const order1 = {
  variety: "oolong",
  teaName: "winter sprout",
  origin: "taiwan",
  price: 12.99,
  hasCaffeine: true,
};

// Arrays destructuring occurs with position
const students = [
  { name: "Drake", gpa: 4.6 },
  { name: "Henrietta", gpa: 4.4 },
  { name: "Tung", gpa: 4.0 },
  { name: "Harry", gpa: 3.8 },
  { name: "Ant", gpa: 3.2 },
];

const [topStudent, secondBest, , fourth] = students;
const [first, ...losers] = students;

// destructuring functions : to extract key/value pairs from an object into variables
const order2 = {
  variety: "oolong",
  teaName: "winter sprout",
  origin: "taiwan",
  price: 12.99,
  hasCaffeine: true,
};

function getTotal({ quantity: qty = 1, price }) {
  return qty * price;
}

const longJumpResults = ["Tammy", "Jessica", "Violet"];
const swimMeetResults = ["Japan", "France", "Chile"];

function awardMedals([gold, silver, bronze]) {
  return {
    gold,
    silver,
    bronze
  };
}
