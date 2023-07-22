// popup.js
document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');
    const taskInput = document.getElementById('taskInput');
  
    // Load tasks from storage when the popup opens
    chrome.storage.sync.get('tasks', function (data) {
      const tasks = data.tasks || [];
      displayTasks(tasks);
    });
  
    function displayTasks(tasks) {
      taskList.innerHTML = '';
      tasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task;
        li.addEventListener('click', function () {
          this.classList.toggle('completed');
          setTimeout(() => {
            tasks.splice(tasks.indexOf(task), 1);
            displayTasks(tasks);
            saveTasks(tasks);
          }, 2000);
        });
        taskList.appendChild(li);
      });
    }
  
    function saveTasks(tasks) {
      chrome.storage.sync.set({ tasks });
    }
  
    taskInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        const task = taskInput.value.trim();
        if (task !== '') {
          const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
          tasks.push(task);
          displayTasks(tasks);
          saveTasks(tasks);
          taskInput.value = '';
        }
      }
    });
  });
  