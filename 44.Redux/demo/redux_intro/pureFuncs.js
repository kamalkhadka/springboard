function addToArrImpure(arr, val) {
  arr.push(val);
  return arr;
}

function addToArrPure(arr, val) {
  return [...arr, val];
}

function addToObjImpure(obj, val, key) {
  obj[key] = val;
  return obj;
}

function addToObjPure(obj, val, key) {
  return { ...obj, [key]: val };
}
