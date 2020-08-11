const ExpressError = require("./expressErrors");
const e = require("express");

function mean(nums) {
  const sum = nums.reduce((prev, next) => prev + next);
  return sum / nums.length;
}

function mode(nums) {
  let freqMap = new Map();
  
  for(let num of nums){
    if(freqMap.get(num)){
      freqMap.set(num, freqMap.get(num) + 1);
    }else{
      freqMap.set(num, 1);
    }
  }

  let mode = 'none';
  let max = 0;
  for (const [key, value] of  freqMap.entries()) {
    if(value > max){
      max = value;
      if(max > 1){
        mode = key;
      }
    }
  }

  return mode;
}

function median(nums) {
  nums.sort();
  let n = nums.length / 2;
  if (n % 2 === 0) {
    console.log((nums[n] + nums[n -1]) / 2);
    return (nums[n - 1] + nums[n]) / 2;
  } else {
    return nums[Math.floor(n)];
  }
}

function validateNums(nums) {
  for (let i = 0; i < nums.length; i++) {
    if (isNaN(nums[i])) {
      throw new ExpressError(`${nums[i]} is not a number`, 404);
    }
  }
  return nums.map( num => Number(num));
}

module.exports = {
  mean,
  mode,
  median,
  validateNums,
};
