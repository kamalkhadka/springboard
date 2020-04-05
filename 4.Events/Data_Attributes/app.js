const ul = document.querySelector('#cars');

ul.addEventListener('click', function(e){
    console.log(e.target.getAttribute("data-year"));
    console.log(e.target.dataset);
    console.log(e.target.dataset.year);
})