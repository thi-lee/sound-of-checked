// default board

const taskItem = () => {

    const checkboxIcon = () => {
      const checkbox = document.createElement('div');
      checkbox.classList.add('checkbox');
      return checkbox;
    }
  
    const taskTab = () => {
        const task = document.createElement('div');
        
        // const taskTitle = document.createElement('p');
        // taskTitle.textContent = 'Task 1';
        
        // task.appendChild(checkboxIcon());
        // task.appendChild(taskTitle).classList.add('task-title');
        
        return task;
    }
  
    return { taskTab }
  }

exports.projectBoard = () => {
    let tasks = [];

    const createProject = () => {
        const project = document.createElement('div');
        const projectHeader = document.createElement('div');
        
        const projectTitle = document.createElement('h4');
        projectTitle.textContent = 'Project 1'; 
        projectHeader.appendChild(projectTitle).classList.add('project-title');

        project.appendChild(projectHeader).classList.add('project-header');

        // addTask(project);
        const addButton = addTaskBtn(project);
        addButton.addEventListener('click', () => taskInput(taskItem().taskTab(), project))
        return project;
    }

    const taskInput = (taskTitle, project) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'title');
        input.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                taskTitle.style.display = 'none';
                tasks.push(getTaskInput());
                console.log(tasks);
                addTask(project);
            }
        })
        taskTitle.appendChild(input).classList.add('task-input');
        project.appendChild(taskTitle).classList.add('task');
        return input;
    }

    const getTaskInput = () => {
        const input = document.querySelector('.task-input');
        const inputValue = input.value;
        return inputValue;
    }

    const addTaskBtn = (project) => {
        const addTaskItem = taskItem().taskTab();
        addTaskItem.innerHTML = '<i class="fa fa-plus"></i>';
        project.appendChild(addTaskItem).classList.add('task', 'add-task');
        return addTaskItem;
    }

    const addTask = (project) => {
        for (let i = 0; i < tasks.length; i++) {
            const taskItemTitle = taskItem().taskTab();
            taskItemTitle.textContent = tasks[i];
            project.appendChild(taskItemTitle).classList.add('task');
        }
    }
    
    return { createProject }
  }