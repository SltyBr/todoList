'use sctrict';

const  todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    btnAddItem = document.querySelector('#id'),
    todoCompleted = document.querySelector('.todo-completed');

let todoData = JSON.parse(localStorage.getItem('items')) ||  [];


const render = function() { 
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item, index, array){
        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
        '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
        '</div>';


        const isComplete =  function(){
            (item.completed) ? todoCompleted.append(li) : todoList.append(li);};
            isComplete(); // добавляем элемент в список в зависимости от значения completed

        
        const todoComplete = li.querySelector('.todo-complete'),
            todoRemove = li.querySelector('.todo-remove');

        todoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            render();
        });
        todoRemove.addEventListener('click', function(){
            li.remove(); //удаляем элемент из вёрстки
            delete array[index];    // удаляем элемент из массива
            todoData = array.filter(element => element !== null); // пропускаем todoData через фильтр, убираем всё что осталось после delete
            render();
        });
    });

    localStorage.setItem('items', JSON.stringify(todoData));
};


todoControl.addEventListener('submit', function(event){

    event.preventDefault();
    if (headerInput.value === ''){
        return false;
    } else{
        const newTodo = {
        value: headerInput.value,
        completed: false
    };

    todoData.push(newTodo);
    render();
    headerInput.value = null;}
});

render();
