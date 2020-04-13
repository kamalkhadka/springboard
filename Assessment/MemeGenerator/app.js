const form = document.querySelector('#form');
form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    createMeme();
    form.reset();
})


const memeContainer = document.querySelector('#memeContainer');

function createMeme() {
    let div = document.createElement('div');
   
    let topText = document.createElement('p');

    topText.innerText = document.querySelector('#textTop').value;
    if (topText.innerText !== '') {
        topText.classList.add('top-text');
        topText.classList.add('text');
        div.appendChild(topText);
    }

    let img = document.createElement('img');

    img.src =  document.querySelector('#imageLoc').value;
    div.appendChild(img);

    let bottomText = document.createElement('p');
    bottomText.innerText = document.querySelector('#textBelow').value;
    if (bottomText.innerText !== '') {
        bottomText.classList.add('bottom-text');
        bottomText.classList.add('text');
        div.appendChild(bottomText);
    }

    memeContainer.appendChild(div);
}