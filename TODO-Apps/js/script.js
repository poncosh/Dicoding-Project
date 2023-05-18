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

document.addEventListener(RENDER_EVENT, function () {
    console.log(todos);
});

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addTodo();
    });
});