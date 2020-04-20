// rest operator
function sum(...nums) {
  return nums.reduce((sum, n) => sum + n);
}

const sumAll = (...values) => {
  if (!values.length) return undefined;
  return values.reduce((sum, n) => sum + n);
};

function makeFamily(parent1, parent2, ...kids) {
  return {
    parents: [parent1, parent2],
    children: kids.length ? kids : 0,
  };
}

const filterByType = (type, ...vals) =>
  vals.filter((val) => typeof val === type);

// spread operator
const nums = [4, 5, 88, 123, 0.92, 34];

const palette = ['lavender berry', 'sunflower yellow', 'orchid orange'];

const paletteCopy = ['sky blue', ...palette, 'grass green']


