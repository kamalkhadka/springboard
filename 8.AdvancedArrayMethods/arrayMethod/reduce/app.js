const nums = [20, 30, 50, 12, -2, 45, 99, 19, 22, 85];

let total = 0;

const words = ['hello', 'I', 'love', 'you']

words.reduce(function(accum, nextWord){
    console.log(accum, nextWord);
    return accum + nextWord;
})

const midTermScores = [70, 88, 93, 94, 64, 62, 56];

midTermScores.reduce(function(min, nextScore){
    return nextScore < min ? nextScore : min;
})

