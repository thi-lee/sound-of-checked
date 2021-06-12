const taskItem = () => {

    const checkboxIcon = () => {
      const checkbox = document.createElement('div');
      checkbox.classList.add('checkbox');
      return checkbox;
    }
  
    const taskTab = () => {
        const task = document.createElement('div');
        return task;
    }
  
    return { checkboxIcon, taskTab }
  }

exports.projectBoard = () => {
    const createProject = () => {
        const project = document.createElement('div');
        const projectHeader = document.createElement('div');
        
        const projectTitle = document.createElement('h3');
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
                addTask(input.value, project);
            }
        })
        taskTitle.appendChild(input).classList.add('task-input');
        project.appendChild(taskTitle).classList.add('task');
        return input;
    }

    const addTaskBtn = (project) => {
        const addTaskItem = taskItem().taskTab();
        addTaskItem.innerHTML = '<i class="fa fa-plus"></i>';
        project.appendChild(addTaskItem).classList.add('task', 'add-task');
        return addTaskItem;
    }

    const addTask = (input, project) => {
        const taskItemTitle = taskItem().taskTab();
        const title = document.createElement('p');
        if (input.length > 17) {
            input = input.slice(0, 17) + '...';
        }
        title.textContent = input;
        taskItemTitle.appendChild(taskItem().checkboxIcon());
        taskItemTitle.appendChild(title).classList.add('task-title');
        project.appendChild(taskItemTitle).classList.add('task');
    }
    
    return { createProject }
  }