// when a ___ event occurs on ___ element, do this ___
// click, on a button, alert

function makeBody(color){
    document.body.style.backgroundColor = color;
}

const btn = document.querySelector('#teal');
btn.onclick = function(){
    makeBody('teal');
};

const violetBtn = document.querySelector('#violet');
violetBtn.addEventListener('click', function(){
    makeBody('violet');
});

const h1 = document.querySelector('h1');

violetBtn.addEventListener('click', function(){
    h1.style.color = 'cyan';
});