
const TASKS = {"tasks" : [{
    "status": "box-done",
    "id": 1,
    "title": "convallis eget eleifend luctus ultricies",
    "description": "Distributed national function",
    "priority": "medium",
    "task_load_days": 160,
    "task_load_hours": 0,
    "task_load_minutes": 17
  }, {
    "status": "box-done",
    "id": 2,
    "title": "tincidunt lacus at velit vivamus vel",
    "description": "Compatible transitional secured line",
    "priority": "low",
    "task_load_days": 90,
    "task_load_hours": 23,
    "task_load_minutes": 44
  }, {
    "status": "box-in-progress",
    "id": 3,
    "title": "blandit mi in porttitor",
    "description": "Phased secondary project",
    "priority": "high",
    "task_load_days": 100,
    "task_load_hours": 10,
    "task_load_minutes": 38
  }, {
    "status": "box-paused",
    "id": 4,
    "title": "turpis enim blandit mi",
    "description": "Balanced mission-critical contingency",
    "priority": "low",
    "task_load_days": 236,
    "task_load_hours": 9,
    "task_load_minutes": 16
  }, {
    "status": "box-in-progress",
    "id": 5,
    "title": "lacus morbi sem mauris",
    "description": "Cross-group contextually-based product",
    "priority": "low",
    "task_load_days": 88,
    "task_load_hours": 13,
    "task_load_minutes": 2
  }, {
    "status": "box-in-progress",
    "id": 6,
    "title": "erat curabitur gravida nisi at",
    "description": "User-centric fault-tolerant adapter",
    "priority": "medium",
    "task_load_days": 209,
    "task_load_hours": 2,
    "task_load_minutes": 43
  }, {
    "status": "box-todo",
    "id": 7,
    "title": "auctor gravida sem praesent id massa",
    "description": "Networked bifurcated portal",
    "priority": "low",
    "task_load_days": 20,
    "task_load_hours": 16,
    "task_load_minutes": 34
  }, {
    "status": "box-todo",
    "id": 8,
    "title": "iaculis congue vivamus metus arcu adipiscing",
    "description": "Reduced web-enabled hierarchy",
    "priority": "high",
    "task_load_days": 356,
    "task_load_hours": 5,
    "task_load_minutes": 54
  }, {
    "status": "box-in-progress",
    "id": 9,
    "title": "consequat ut nulla sed accumsan felis",
    "description": "Switchable context-sensitive knowledge base",
    "priority": "low",
    "task_load_days": 86,
    "task_load_hours": 20,
    "task_load_minutes": 9
  }, {
    "status": "box-done",
    "id": 10,
    "title": "phasellus sit amet",
    "description": "Balanced methodical strategy",
    "priority": "low",
    "task_load_days": 303,
    "task_load_hours": 6,
    "task_load_minutes": 22
  }, {
    "status": "box-done",
    "id": 11,
    "title": "vestibulum velit id pretium iaculis diam",
    "description": "Secured bifurcated service-desk",
    "priority": "low",
    "task_load_days": 9,
    "task_load_hours": 13,
    "task_load_minutes": 53
  }, {
    "status": "box-paused",
    "id": 12,
    "title": "interdum eu tincidunt in leo maecenas",
    "description": "Focused object-oriented encryption",
    "priority": "low",
    "task_load_days": 91,
    "task_load_hours": 8,
    "task_load_minutes": 53
  }]
};
const TODO = "box-todo";
const IN_PROGRESS = "box-in-progress";
const PAUSED = "box-paused";
const DONE = "box-done";

// handle the dragstart

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
    e.dataTransfer.effectAllowed = "move";
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

/* drop targets */
const boxes = document.querySelectorAll('.box');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    if (e.target.classList.contains('box')) {
        e.target.classList.add('drag-over');
    }
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.target.classList.remove('drag-over');
    if (e.target.classList.contains('box')) {
        // get the draggable element
        const id = e.dataTransfer.getData('text');
        const draggable = document.getElementById(id);

        // Get source array to pop the task out of it
        let sourceListOfTasks = draggable.closest(".box");
        sourceListOfTasks.removeChild(draggable);

        // display the draggable element
        draggable.classList.remove('hide');

        // Get task in array
        let taskToDrag = getTaskById(id, sourceListOfTasks.id);
        console.log(taskToDrag);

        switch (sourceListOfTasks.id) {
            case TODO:
                tasks_todo = tasks_todo.filter((task) => task.getId().toString() !== id);
                console.log(tasks_todo);
                break;
            case IN_PROGRESS:
                tasks_in_progress = tasks_in_progress.filter((task) => task.getId().toString() !== id);
                break;
            case PAUSED:
                tasks_paused = tasks_paused.filter((task) => task.getId().toString() !== id);
                break;
            case DONE:
                tasks_done = tasks_done.filter((task) => task.getId().toString() !== id);
                break;
            default:
        }

        // We add the dragged element to its new list
        switch (e.target.id) {
            case TODO:
                addTaskToBox(TODO, taskToDrag);
                tasks_todo.push(taskToDrag);
                break;
            case IN_PROGRESS:
                addTaskToBox(IN_PROGRESS, taskToDrag);
                tasks_in_progress.push(taskToDrag);
                break;
            case PAUSED:
                addTaskToBox(PAUSED, taskToDrag);
                tasks_paused.push(taskToDrag);
                break;
            case DONE:
                addTaskToBox(DONE, taskToDrag);
                tasks_done.push(taskToDrag);
                break;
            default:
        }
    }
}

function uniqueID() {
    return Math.floor(Math.random() * Date.now())
}

class Task {
    constructor(title, description, priority, load) {
        this._id = uniqueID();
        this._title = title;
        this._description = description;
        this._priority = priority;
        this._load = {days: load.days, hours:load.hours, minutes: load.minutes};
    }

    getId() {
        return this._id;
    }

    getTitle() {
        return this._title;
    }

    getDescription() {
        return this._description;
    }

    getPriority() {
        return this._priority;
    }

    getLoad() {
        return this._load;
    }

    loadToString() {
        let s = (this._load.days ? this._load.days + 'd ' : '' )
        + (this._load.hours ? this._load.hours + 'h ' : '' )
        + (this._load.minutes ? this._load.minutes + 'm' : '');
        return s;
    }
}

var tasks_todo = [];
var tasks_in_progress = [];
var tasks_paused = [];
var tasks_done = [];


const creationTaskForm = document.getElementById('creationTaskForm');
creationTaskForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent page refresh

    console.log(event.target);
    
    // create new FormData object with the form element
    const formData = new FormData(creationTaskForm);
    
    // get inputs by their name attribute
    const title = formData.get('task-title');
    const description = formData.get('task-description');
    const priority = formData.get('task-priority');
    const loadDays = formData.get('task-load-days');
    const loadHours = formData.get('task-load-hours');
    const loadMinutes = formData.get('task-load-minutes');
    
    let newTask = new Task(title, description, priority, {days:loadDays, hours:loadHours, minutes:loadMinutes});
    
    tasks_todo.push(newTask);
    addTaskToBox(TODO, newTask);

    // clear form
    creationTaskForm.reset();
    return false;

});

const editTaskForm = document.getElementById('editTaskForm');
editTaskForm.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent page refresh

    let id = editTaskForm.getAttribute('task');
    let boxId = editTaskForm.getAttribute('task-status');
    
    // create new FormData object with the form element
    const formData = new FormData(editTaskForm);
    
    // get inputs by their name attribute
    const title = formData.get('edit-task-title');
    const description = formData.get('edit-task-description');
    const priority = formData.get('edit-task-priority');
    const loadDays = formData.get('edit-task-load-days');
    const loadHours = formData.get('edit-task-load-hours');
    const loadMinutes = formData.get('edit-task-load-minutes');

    let newTask = new Task(title, description, priority, {days:loadDays, hours:loadHours, minutes:loadMinutes});
    
    let index;
    switch (boxId) {
        case TODO:
            index = tasks_todo.findIndex((task) => { return task.getId().toString() === id});
            tasks_todo[index] = newTask;
            console.table(tasks_todo);
            break;
        case IN_PROGRESS:
            index = tasks_in_progress.findIndex((task) => { return task.getId().toString() === id});
            tasks_in_progress[index] = newTask;
            console.table(tasks_in_progress);
            break;
        case PAUSED:
            index = tasks_paused.findIndex((task) => { return task.getId().toString() === id});
            tasks_paused[index] = newTask;
            console.table(tasks_paused);
            break;
        case DONE:
            index = tasks_done.findIndex((task) => { return task.getId().toString() === id});
            tasks_done[index] = newTask;
            console.table(tasks_done);
            break;
        default:
    }
    

    document.getElementById(boxId).removeChild(document.getElementById(id));
    addTaskToBox(boxId, newTask);

    // clear form
    editTaskForm.reset();
    return false;

});

function getTaskById (id, boxId) {
    let task;
    switch (boxId) {
        case TODO:
            task = tasks_todo.filter((task) => task.getId().toString() === id)[0];
            break;
        case IN_PROGRESS:
            task = tasks_in_progress.filter((task) => task.getId().toString() === id)[0];
            break;
        case PAUSED:
            task = tasks_paused.filter((task) => task.getId().toString() === id)[0];
            break;
        case DONE:
            task = tasks_done.filter((task) => task.getId().toString() === id)[0];
            break;
        default:
    }

    return task;
}


function addTaskToBox(id, task) {
    let box = document.getElementById(id);
    let taskHTML = document.createElement("div");
    taskHTML.id = task.getId();
    taskHTML.className = "item" 
    taskHTML.draggable = true;
    let element = `
        <div class="card border-0 shadow bg-light mx-auto mb-3" style="max-width: 18rem;">
            <div class="fs-6 fw-bold card-header border-0 bg-light d-flex justify-content-between">
                ${task.getTitle()}
                <button type="button" class="ms-2 bg-light border-0"><i class="d-flex align-items-center text-secondary fas fa-times" id="close-${task.getId()}"></i></button>
            </div>
            <div class="card-body pt-0">
                <div class="d-flex">
                    <h5 class="card-title fs-6 mb-0 me-2">Priority</h5> 
                    ${priorityToHtml(task.getPriority())}
                </div>
                <p class="card-text my-2">${task.getDescription()}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <button class="bg-light border-0" type="button" data-bs-toggle="modal" data-bs-target="#editTaksModal"><i class="d-flex align-items-center text-secondary fas fa-edit" id="edit-${task.getId()}"></i></button>
                    <span class="float-end badge px-2 py-1 text-white rounded-pill bg-primary">${task.loadToString()}</span>
                </div>
            </div>
        </div>
    `;

    taskHTML.innerHTML = element;

    // attach the dragstart event handler
    taskHTML.addEventListener('dragstart', dragStart);

    box.appendChild(taskHTML);

    let closeBtn = document.getElementById('close-'+task.getId());
    closeBtn.addEventListener("click", function () {
        let task = this.closest('.item');
        let box = this.closest('.box');

        switch (box.id) {
            case TODO:
                tasks_todo = tasks_todo.filter((t) => t.getId().toString() !== task.id);
                console.log(tasks_todo);
                break;
            case IN_PROGRESS:
                tasks_in_progress = tasks_in_progress.filter((t) => t.getId().toString() !== task.id);
                break;
            case PAUSED:
                tasks_paused = tasks_paused.filter((t) => t.getId().toString() !== task.id);
                break;
            case DONE:
                tasks_done = tasks_done.filter((t) => t.getId().toString() !== task.id);
                break;
            default:
        }
        box.removeChild(task);
    });

    let editBtn = document.getElementById('edit-'+task.getId());
    editBtn.addEventListener("click", function () {
        let taskId = editBtn.closest('.item').id;
        let boxId = editBtn.closest('.box').id;
        let task = getTaskById(taskId, boxId);
        let editTaskForm = document.getElementById('editTaskForm');
        editTaskForm.setAttribute('task', taskId);
        editTaskForm.setAttribute('task-status', boxId);

        editTaskForm['edit-task-title'].value = task.getTitle();
        editTaskForm['edit-task-description'].value = task.getDescription();
        editTaskForm['edit-task-priority'].value = task.getPriority();
        editTaskForm['edit-task-load-days'].value = task.getLoad().days;
        editTaskForm['edit-task-load-hours'].value = task.getLoad().hours;
        editTaskForm['edit-task-load-minutes'].value = task.getLoad().minutes;        

    });
}

function priorityToHtml(priority) {
    let element = document.createElement("i"); 
    switch (priority) {
        case "high":
            element.classList.add("d-flex", "align-self-end", "fas", "fa-chevron-up", "color-red-600");
            break;
        case "medium":
            element.classList.add("d-flex", "align-self-end", "fas", "fa-equals", "color-orange-600");
            break;
        case "low":
            element.classList.add("d-flex", "align-self-end", "fas", "fa-chevron-down", "color-blue-600");
            break;
        default:

    }
    return element.outerHTML;
}

function loadMocks() {
    console.log(TASKS);
    TASKS.tasks.forEach((task) => {
        let newTask = new Task(task.title, task.description, task.priority, {days: task.task_load_days, hours:task.task_load_hours, minutes:task.task_load_minutes});
        switch (task.status) {
            case TODO:
                addTaskToBox(TODO, newTask);
                tasks_todo.push(newTask);
                break;
            case IN_PROGRESS:
                addTaskToBox(IN_PROGRESS, newTask);
                tasks_in_progress.push(newTask);
                break;
            case PAUSED:
                addTaskToBox(PAUSED, newTask);
                tasks_paused.push(newTask);
                break;
            case DONE:
                addTaskToBox(DONE, newTask);
                tasks_done.push(newTask);
                break;
            default:
        }
    });
}

function clearAll() {
    clearAllHTML();
    tasks_todo.length = 0;
    tasks_in_progress.length = 0;
    tasks_paused.length = 0;
    tasks_done.length = 0;
}

function clearAllHTML() {
    let status = [TODO, IN_PROGRESS, PAUSED, DONE];
    status.forEach(status => {
        document.getElementById(status).innerHTML = '';
    });
}

function comparePriority(task1, task2) {
    if (task1.getPriority() == task2.getPriority()) {
        return task1.getTitle().localeCompare(task2.getTitle());
    }
    else if ((task2.getPriority() == "high" && task1.getPriority() != "high") || (task2.getPriority() == "medium" && task1.getPriority() == "low")) {
        return -1
    }
    else if ((task1.getPriority() == "high" && task2.getPriority() != "high") || (task1.getPriority() == "medium" && task2.getPriority() == "low")) {
        return 1;
    }
    else {
        return 0;
    }
}

function filterAll(){

    tasks_todo.sort(comparePriority);
    tasks_in_progress.sort(comparePriority);
    tasks_paused.sort(comparePriority);
    tasks_done.sort(comparePriority);

    clearAllHTML();

    renderAllLists();

    console.table(tasks_todo);
}


function renderListOfTask(list, boxId) {
    list.forEach(task => addTaskToBox(boxId, task));
}

function renderAllLists() {
    renderListOfTask(tasks_todo.reverse(), TODO);
    renderListOfTask(tasks_in_progress.reverse(), IN_PROGRESS);
    renderListOfTask(tasks_paused.reverse(), PAUSED);
    renderListOfTask(tasks_done.reverse(), DONE);
}