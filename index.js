function showDescription(element) {
	let description = element;
	console.log(element);
	if (description && description.style.display === "flex") {
		description.style.display = "none";
	} else if (description !== null) {
		description.style.display = "flex";
	}
}
window.onload = function () {
	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	tasks.forEach(task => {
		const taskElement = document.createElement('div');
		//taskElement.setAttribute('onclick', 'showDescription(this)');
		const btnSubmit = document.createElement('button');
		btnSubmit.className = "submit";

		const taskArea = document.createElement('div');

		const taskName = document.createElement('li');
		//taskName.setAttribute('onclick', 'showDescription(hiddenInfo)');
		taskName.for = 'checkbox';
		taskName.textContent = task.name;


		const hiddenInfo = document.createElement('div');
		hiddenInfo.className = 'info option';
		const taskDescriptionBase = document.createElement('label');
		taskDescriptionBase.className = 'infoUnit';
		taskDescriptionBase.textContent = "Описание задачи:";

		const taskDescription = document.createElement('input');
		taskDescription.value = task.description;

		const importancyBase = document.createElement('label');
		importancyBase.className = 'infoUnit';
		importancyBase.textContent = 'Степень важности: '

		const importancy = document.createElement('select');
		importancy.value = task.importance;
		const low = document.createElement('option');
		low.value = "low";
		low.textContent = "Неавжно";
		const medium = document.createElement('option');
		medium.value = "medium";
		medium.textContent = "Средне";
		const high = document.createElement('option');
		high.value = "high";
		high.textContent = "Важно";

		const taskDeadlineBase = document.createElement('label');
		taskDeadlineBase.className = 'infoUnit';
		taskDeadlineBase.textContent = 'Дедлайн:';

		const taskDeadline = document.createElement('input');
		taskDeadline.value = task.deadline;
		taskDeadline.type = "date";

		const buttonUpdate = document.createElement('button');
		buttonUpdate.className = 'infoUnit';
		buttonUpdate.textContent = 'Update: '

		// Append the elements to the task container
		//taskElement.appendChild(btnSubmit);
		const showHideButton = document.createElement('button');
		showHideButton.textContent = 'Show/Hide Description';
		showHideButton.addEventListener('click', function () {
			showDescription(hiddenInfo);
		});
		taskArea.appendChild(showHideButton);
		taskElement.appendChild(taskArea);
		taskArea.appendChild(taskName);
		taskArea.appendChild(hiddenInfo);
		hiddenInfo.appendChild(taskDescriptionBase);
		hiddenInfo.appendChild(taskDescription);
		hiddenInfo.appendChild(importancyBase);
		hiddenInfo.appendChild(importancy);
		importancy.appendChild(low);
		importancy.appendChild(medium);
		importancy.appendChild(high);
		hiddenInfo.appendChild(taskDeadlineBase);
		hiddenInfo.appendChild(taskDeadline);
		hiddenInfo.appendChild(buttonUpdate);


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

function addTask() {
	const newTask = document.getElementById('newTask').value;
	const importance = document.getElementById('importance').value;
	const deadline = document.getElementById('deadline').value;
	const taskDescription = document.getElementById('taskDescription').value;
	const task = {
		name: newTask,
		importance: importance,
		deadline: deadline,
		description: taskDescription
	};
	let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
	document.getElementById('taskName').value = '';
	document.getElementById('importance').value = 'low';
	document.getElementById('deadline').value = '';
	document.getElementById('taskDescription').value = '';
}