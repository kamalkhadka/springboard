const submit = document.querySelector('input[type="submit"]');
const todoList = document.querySelector('#todo-list');

document.addEventListener('DOMContentLoaded', function(){
    if(localStorage.todoList){
        todoList.innerHTML = localStorage.todoList;
    }
});

submit.addEventListener('click', function(evt){
    evt.preventDefault();
    let todo = document.querySelector('input[type="text"]');
    createTodo(todo.value);
    todo.value = '';
})

function createTodo(todoVal){
    if(todoVal !== ''){
        let li =  document.createElement('li');
        li.innerText = todoVal;
        let completeBtn = document.createElement('button');
        completeBtn.textContent = 'Mark Complete';
        completeBtn.classList.add('mark-complete')
        let removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove');
        li.appendChild(completeBtn);
        li.appendChild(removeBtn);
        todoList.appendChild(li);
    }

    localStorage.setItem('todoList', todoList.innerHTML);
}

todoList.addEventListener('click', function(evt){
    const target = evt.target;
    if(target.tagName === 'BUTTON'){
        if(target.classList.contains('mark-complete')){
            target.parentElement.classList.add('complete');
            target.remove();
        }else{
            target.parentElement.remove();
        }
    }

    localStorage.setItem('todoList', todoList.innerHTML);
})