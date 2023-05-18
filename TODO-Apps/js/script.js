document.addEventListener("scroll", function(){
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY >0);
});

const todos = [];
const RENDER_EVENT = 'render-todo';

function generateId() {
    return +new Date();
}

function generateTodoObject(id, task, timeStamp, isCompleted) {
    return {
        id,
        task,
        timeStamp,
        isCompleted
    }
}

function addTodo() {
    const textTodo = document.getElementById('title').value;
    const timeStamp = document.getElementById('date').value;

    const generatedID = generateId();
    const todoObject = generateTodoObject(generatedID, textTodo, timeStamp, false);
    todos.push(todoObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTodoIndex(todoId) {
    for (const index in todos) {
        if (todos[index].id === todoId) {
            return index;
        }
    }
    return -1;
}

function removeTaskFromCompleted(todoId) {
    const todoTarget = findTodoIndex(todoId);

    if (todoTarget === -1) return;

    todos.splice(todoTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function undoTaskFromCompleted(todoId) {
    const todoTarget = findTodo(todoId);

    if (todoTarget == null) return;

    todoTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeTodo(todoObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;

    const textTimeStamp = document.createElement('p');
    textTimeStamp.innerText = todoObject.timeStamp;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimeStamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.id}`);

    if (todoObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.classList.add('undo-button');
     
        undoButton.addEventListener('click', function () {
          undoTaskFromCompleted(todoObject.id);
        });
     
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-button');
     
        trashButton.addEventListener('click', function () {
          removeTaskFromCompleted(todoObject.id);
        });
     
        container.append(undoButton, trashButton);
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('check-button');
        
        checkButton.addEventListener('click', function () {
            addTaskToCompleted(todoObject.id);
        });

        container.append(checkButton);
    }

    return container;
}

function addTaskToCompleted (todoId) {
    const todoTarget = findTodo(todoId);
   
    if (todoTarget == null) return;
   
    todoTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTodo(todoId) {
    for (const todoItem of todos) {
      if (todoItem.id === todoId) {
        return todoItem;
      }
    }
    return null;
}

document.addEventListener(RENDER_EVENT, function () {
    //console.log(todos);
    const uncompleteTODOList = document.getElementById('todos');
    uncompleteTODOList.innerHTML = '';

    const completedTODOList = document.getElementById('completed-todos');
    completedTODOList.innerHTML = '';

    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        if (!todoItem.isCompleted) {
            uncompleteTODOList.append(todoElement);
        } else {
            completedTODOList.append(todoElement);
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addTodo();
    });
});