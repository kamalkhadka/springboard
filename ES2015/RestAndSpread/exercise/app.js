function filterOutFunction(...nums) {
  return nums.filter((num) => num % 2 === 0);
}

function findMin(...nums){
    return nums.reduce((min, num) => min < num ? min : num)
}

function mergeObjects(obj1, obj2){
    return {...obj1, ...obj2};
}

function doubleAndReturnArgs(arr, ...nums){
    return [...arr, ...nums.map((num) => num * 2)]
}


function removeRandom(items){
    const index =  Math.floor(Math.random() * items.length);
    return [...items.slice(0, index), ...items.slice(index + 1)];
}

function extend(array1, array2){
    return [...array1, ...array2];
}

function addKeyVal(obj, key, val){
    let newObj = {...obj};
    newObj[key] = val;
    return newObj;
}

function removeKey(obj, key){
    let newObj = {...obj};
    delete newObj[key];
    return newObj;
}

function combine(obj1, obj2){
    return {...obj1, ...obj2};
}

function update(obj, key, val){
    let newObj = {...obj};
    newObj[key] = val;
    return newObj;
}



