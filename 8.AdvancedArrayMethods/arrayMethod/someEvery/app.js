const words = 
[
    'immunoelectrophoretically',
    'rotavator',
    'tsktsk',
    'pyschophysicotherapeutics',
    'squirrelled',
    'crypt',
    'uncopyrightable',
    'cysts',
    'pseudopseudohypoparathyroidism',
    'unimaginatively'
];

words.some(function(word){
    return word.length > 25;
})

words.some(function(word){
    return word.indexOf('thyroid') !== -1;
})

words.every(function(word){
    return word.length >= 5;
})

function allStrings(arr){
   return arr.every(function(el){
        return typeof el === 'string';
    })
}

const btn = document.querySelector('button');
btn.addEventListener('click', function(e){
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(function(checkbox){
        return checkbox.checked;
    });
    console.log(allChecked);
});