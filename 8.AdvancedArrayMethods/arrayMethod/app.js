const colors = ['teal', 'cyan', 'peach', 'purple'];

colors.forEach(function(val){
    console.log(val.toUpperCase());
})


function yell(val, i){
    const caps = val.toUpperCase();
    console.log(`At index ${i}, ${caps}`);
}

colors.forEach(yell);

const prices = [30.99, 19.99, 2.5, 99.0];
let total = 0;
prices.forEach(function(price){
    total += price;
})

console.log(total);


function forEach(arr, callback){
    for(let i = 0; i < arr.length; i++){
        callback(arr[i]);
    }
}

forEach(colors, function(color){
    console.log(color.toUpperCase());
})

// map
const numbers = [21, 37, 64, 99, 142];

const negatives = numbers.map(function(num){
    return num * -1;
});

const doubles = numbers.map(function(num){
    console.log(num * 2);
});

const todos = [
    {
        id      : 1,
        text    : 'walk the dog',
        priority: 'high'
    },
    {
        id      : 2,
        text    : 'walk the chickens',
        priority: 'medium'
    },
    {
        id      : 3,
        text    : 'feed the cats',
        priority: 'low'
    },
    {
        id      : 4,
        text    : 'put out the fire in my garage',
        priority: 'very high'
    }
];

const texts = todos.map(function(todo){
    return todo.text;
});

const links = Array.from(document.querySelectorAll('a'));

const urls = links.map(function(a){
    return a.href;
})


// map 
function myMap(arr, callback){
    const mappedArray = [];
    for(let i = 0; i < arr.length; i++){
        mappedArray.push(callback(arr[i]));
    }
    return mappedArray;
}

const priorityMap = myMap(todos, function(todo){
    return todo.priority;
});

// map and filter
const allCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));

const checked = allCheckboxes.filter(function(box){
    return box.checked;
});

const completedItems = checked.map(function(checkebox){
    return checkebox.parentElement.innerText;
})




