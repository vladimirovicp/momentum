// TodoList

const addTaskBtn = document.getElementById("add-task-btn");
const deskTaskInput = document.getElementById("description-task");
const todosWrapper = document.querySelector('.todos-wrapper');

let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'));
let todoItemElems = [];




let currentlanguage = document.querySelector('.language');


const createTemplate = (task, index) => {
    let curlang = currentlanguage.querySelector('.active').textContent;
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                <button onclick="deleteTask(${index})" class="btn-delete" data-i18="delete">${curlang === 'ru' ? 'Удалить' : 'delete'}</button>
            </div>
        </div>
    `;
}

const filterTasks = () =>{
    const activeTasks = tasks.length && tasks.filter(item => item.completed === false);
    const completedTasks = tasks.length && tasks.filter(item => item.completed ==true);
    tasks = [...activeTasks,...completedTasks];
}

function  Task(description){
    this.description = description;
    this.completed = false;
}

const fillHtmlList = () =>{
    todosWrapper.innerHTML = "";
    if(tasks.length > 0){
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML +=createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
}

fillHtmlList();

const updateLocal = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// function completeTask(index){
//     console.log(index)
//     // tasks[index].completed = !tasks[index].completed;
//     // if(tasks[index].completed){
//     //     todoItemElems[index].classList.add('checked');
//     // } else{
//     //     todoItemElems[index].classList.remove('checked');
//     // }
//     // updateLocal();
//     // fillHtmlList();
//
// }

const completeTask = index =>{
    tasks[index].completed = !tasks[index].completed;

    if(tasks[index].completed){
        todoItemElems[index].classList.add('checked');
    } else{
        todoItemElems[index].classList.remove('checked');
    }
    updateLocal();
    fillHtmlList();
}


addTaskBtn.addEventListener('click', () =>{
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value='';
})


const deleteTask = index =>{
    // console.log(index);

    todoItemElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index,1);
        updateLocal();
        fillHtmlList();
    },500);
}