window.onload = function () {
	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	tasks.forEach((task, taskIndex) => {

		// Create the DOM tree as a string
		const taskHtml = `
		<div class="position-relative">
        <div class="${tasks[taskIndex].completed ? 'finished' : ''} ">
            <li class="name">${task.name}</li>
            <div class="info option">
                <label class="infoUnit">Описание задачи:</label>
                <input class="changed description" value="${task.description}">
                <label class="infoUnit">Степень важности:</label>
                <select class="changed importance">
                    <option value="low" ${task.importance === 'low' ? 'selected' : ''}>Неавжно</option>
                    <option value="medium" ${task.importance === 'medium' ? 'selected' : ''}>Средне</option>
                    <option value="high" ${task.importance === 'high' ? 'selected' : ''}>Важно</option>
                </select>
                <label class="infoUnit">Дедлайн:</label>
                <input class="changed deadline" value="${task.deadline}" type="date">
                <button class="infoUnit update btn btn-success">Update:</button>
                <button class="infoUnit delete btn btn-danger">Delete</button>
            </div>
        </div>
		<div class="bottom-0 d-flex">
    		<button class="showHideButton btn btn-primary rounded-2">Show/Hide Description</button>
  		</div>
`;


		// Create a new DOM element from the HTML string
		const taskElement = document.createElement('div');
		taskElement.innerHTML = taskHtml;

		const hiddenInfo = taskElement.querySelector('.info.option');
		const updateButton = taskElement.querySelector('.infoUnit.update');
		updateButton.addEventListener('click', function () {
			console.log("Button pressed");
			let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
			task.description = document.querySelector('.changed.description').value;
			task.importance = document.querySelector('.changed.importance').value;
			task.deadline = document.querySelector('.changed.deadline').value;
			console.log(task);
			tasks[taskIndex] = task;
			localStorage.setItem('tasks', JSON.stringify(tasks));

		});

		// Add event listener to the "Delete" button
		const deleteButton = taskElement.querySelector('.infoUnit.delete');
		deleteButton.addEventListener('click', function () {
			deleteTask(taskIndex);
			taskElement.remove();
		});

		// Add event listener to the "Show/Hide Description" button
		const showHideButton = taskElement.querySelector('.showHideButton');
		showHideButton.addEventListener('click', function () {
			showDescription(hiddenInfo);
		});

		const nameLabel = taskElement.querySelector(".name");
		nameLabel.addEventListener('click', function () {
			markTaskAsCompleted(taskIndex);
		})

		document.getElementById('taskContainer').appendChild(taskElement);
	});
}

function showForm() {

	if (document.getElementById('taskForm').style.display == 'block') {
		document.getElementById('taskForm').style.display = 'none';
	}
	else {
		document.getElementById('taskForm').style.display = 'block';
	}
}

function showDescription(element) {
	if (element instanceof Element) {
		if (element.style.display === "flex") {
			element.style.display = "none";
		} else {
			element.style.display = "flex";
		}
	} else {
		console.error("Invalid element");
	}
}

function addTask() {
	const newTask = document.getElementById('newTask').value;
	const importance = document.getElementById('importance').value;
	const deadline = document.getElementById('deadline').value;
	const taskDescription = document.getElementById('taskDescription').value;
	const task = {
		name: newTask,
		importance: importance,
		deadline: deadline,
		description: taskDescription,
		completed: false
	};
	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	document.getElementById('taskName').value = '';
	document.getElementById('deadline').value = '';
	document.getElementById('taskDescription').value = '';
}

function deleteTask(index) {
	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	tasks.splice(index, 1);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}


function markTaskAsCompleted(index) {
	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	tasks[index].completed = !tasks[index].completed;
	console.log(tasks[index]);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	const taskElement = document.getElementById('taskContainer').children[index].children[0].children[0];
	if (tasks[index].completed) {
		taskElement.classList.add('finished');
	} else {
		taskElement.classList.remove('finished');
	}
}
