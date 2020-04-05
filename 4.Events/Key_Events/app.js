// document.addEventListener('keydown', function(event){
//     console.log(event.key)
// })

document.querySelector('input').addEventListener('keypress', function(e){
    console.log('Key Down: ', e.key);
})