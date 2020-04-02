const p = document.querySelector('p')
p.addEventListener('click', function(e){
    console.log(e.type)
});

p.addEventListener('mousedown', function(e){
    console.log(e.type);
});

p.addEventListener('mouseup', function(e){
    console.log(e.type);
});