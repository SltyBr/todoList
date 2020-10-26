'use sctrict';

const  todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    btnAddItem = document.querySelector('#id'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = JSON.parse(localStorage.getItem('items')) || [];


const render = function() { 
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const todoComplete = li.querySelector('.todo-complete');
        const todoRemove = li.querySelector('.todo-remove');

        todoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });
        todoRemove.addEventListener('click', function(){
            li.remove();
            todoData.splice(item, 1);
            render();
        });
    });
    localStorage.setItem('items', JSON.stringify(todoData));
};


todoControl.addEventListener('submit', function(event){

    event.preventDefault();
    if (todoControl.querySelector('.header-input').value == ''){
        return false;
    } else{
        const newTodo = {
        value: headerInput.value,
        completed: false
    };

    todoData.push(newTodo);
    render();
    todoControl.querySelector('.header-input').value = null;}
});

render();


