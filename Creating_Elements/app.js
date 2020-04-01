const newTodo = document.createElement('li');
const boldText = document.createElement('b');

boldText.textContent = "DON'T FORGET TO LOCK THE COOP!";

newTodo.classList.add('todo');
newTodo.append(boldText);

const ul = document.querySelector('ul');
ul.append(newTodo);
