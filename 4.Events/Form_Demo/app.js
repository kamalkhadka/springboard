const form = document.querySelector("#monkeyForm");

form.addEventListener('submit', function(event){
    event.preventDefault();
    console.log("YOU SUBMITTED THE FORM");
});