import _ from 'lodash';
import './style.css';
import '@fortawesome/fontawesome-free/js/all' 

const taskItem = () => {

  const checkboxIcon = () => {
    const checkbox = document.createElement('div');
    checkbox.textContent = 'v';
    checkbox.classList.add('checkbox');
    return checkbox;
  }

  const taskTab = () => {
    const task = document.createElement('div');
    
    const taskTitle = document.createElement('p');
    taskTitle.textContent = 'Task 1';
    
    task.appendChild(checkboxIcon());
    task.appendChild(taskTitle).classList.add('task-title');
    return task;
  }

  return { taskTab }
}

// default board
const projectBoard = (() => {

  // DOM elements
  const project = document.createElement('div');
  const projectHeader = document.createElement('div');

  const projectTitle = document.createElement('h4');
  projectTitle.textContent = 'Project 1';
  projectHeader.appendChild(projectTitle).classList.add('project-title');

  const addTask = document.createElement('div');
  const addTaskButton = document.createElement('button');
  const addIcon = document.createElement('i');
  addTaskButton.appendChild(addIcon).classList.add('fa', 'fa-plus');
  addTask.appendChild(addTaskButton).classList.add('btn')
  projectHeader.appendChild(addTask).classList.add('add-task');
  
  project.appendChild(projectHeader).classList.add('project-header');
  project.appendChild(taskItem().taskTab()).classList.add('task');
  
  document.body.appendChild(project).classList.add('project');
  
  return {  }
})()