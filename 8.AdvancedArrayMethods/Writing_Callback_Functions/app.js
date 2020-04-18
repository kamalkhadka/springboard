function holler(){
    console.log("Shout");
}

const whisper = function(){
    console.log("psst!");
}

function add(x, y){
    return x + y;
}

function subtract(x, y){
    return x - y;
}

function multiply(x,y){
    return x * y;
}

function divide(x, y){
    return x / y;
}

function doMath(a, b, mathFunc){
    return mathFunc(a, b);
}

doMath(3, 4, function(a, b){
    console.log(a ** b);
})