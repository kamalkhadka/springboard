// maps and sets exercise

// what does the following code return
new Set([1,1,2,2,3,4])

// returns a set of Set(4) {1, 2, 3, 4} i.e. duplicates are removed

// quick question 2
// what does the following code return
// [...new Set("referee")].join("")
// returns a string 'ref'

let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);

// map with two elements with array key {Array(3) -> true, Array(3) - false}

function hasDuplicate(arr){
    return arr.length !== [...new Set(arr)].length;
}

function vowelCount(str){
    const vowelMap = new Map();

    for(let char of str){
        if("aeiou".includes(char)){
            if(vowelMap.has(char)){
                vowelMap.set(char, vowelMap.get(char) + 1);
            }else{
                vowelMap.set(char, 1);
            }
        }
    }

    return vowelMap;
}