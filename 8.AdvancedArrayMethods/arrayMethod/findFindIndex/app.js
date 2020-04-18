const scores = 
[
    0, 0,0, 0, 0, 0, 0, 0, 55, 59, 69,73,73,75,79,83,88,91,93
]

// > 75

scores.find(function(score){
    return score > 75;
})


scores.find(function(score){
    return score !== 0 && score % 2 === 0;
})

