// function wait3Seconds(){
//     return new Promise((resolve, reject) => {
//         setTimeout(reject, 3000);
//     })
// }

// wait3Seconds().then(() => console.log("ALL DONE"))
// .catch(() => console.log("Error"));

// console.log("Still waiting");

const h1 = document.querySelector('h1');

function changeColor(el, color){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            el.style.color = color;
            resolve()
        }, 1000);
    })
}

changeColor(h1, 'red')
    .then(() => {changeColor(h1, 'orange')})
    .then(() => {changeColor(h1, 'yellow')})
    .then(() => {changeColor(h1, 'green')})
    .then(() => {changeColor(h1, 'blue')})
    .then(() => {changeColor(h1, 'indigo')})
    .then(() => {changeColor(h1, 'violet')});