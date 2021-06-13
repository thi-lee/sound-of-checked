const taskItem = () => {

    const checkboxIcon = () => {
      const checkbox = document.createElement('div');
      checkbox.classList.add('checkbox');
      checkbox.addEventListener('click', () => console.log('clicked'))
      return checkbox;
    }
  
    const taskTab = () => {
        const task = document.createElement('div');
        task.classList.add('task');
        return task;
    }

    /*
    Responsibility: append icon to task
                    and append this task to project 
    */
    const addTaskBtn = (project) => {
        const task = taskTab();
        task.innerHTML = '<i class="fa fa-plus"></i>';
        project.appendChild(task).classList.add('add-task');
        task.addEventListener('click', () => {
            taskInput(taskTab(), project);
        })
        return task;
    }

    /*
    Responsibility: (1) create an input field 
                    (2) listen to input event
                    (3) append input value to task (above all current tasks)
                    (4) append task to project 
    */
    const taskInput = (task, project) => {
        // (1)
        const input = document.createElement('input');
        input.setAttribute('type', 'text');

        // (2)
        input.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                task.style.display = 'none';
                addTask(input.value, project);
            }
        })
        
        // (3)
        task.appendChild(input).classList.add('task-input');

        // (4)
        const realTask = document.querySelector('.real-task');
        if (realTask != null) {
            project.insertBefore(task, realTask);
        } else {
            project.appendChild(task);
        }
        return input;
    }

    /*
    Responsibility: append checkbox & input task title (realTask) to task 
                    and append this task to project
    */
    const addTask = (input, project) => {
        const realTask = document.querySelector('.real-task');
        const task = taskTab();
        const title = document.createElement('p');
        if (input.length > 17) {
            input = input.slice(0, 17) + '...';
        } else if (input.length == 0) {
            input = "Untitled";
        }
        title.textContent = input;
        task.appendChild(checkboxIcon());
        task.appendChild(title).classList.add('task-title');
        project.insertBefore(task, realTask).classList.add('real-task');
    }
  
    return { addTaskBtn }
}

exports.projectBoard = () => {

    /*
    Responsibility: create a project (including project header and an add-task button)
                    listen to event on add-task button
    */
    const createProject = (title) => {
        const project = document.createElement('div');
        const projectHeader = document.createElement('div');
        
        const projectTitle = document.createElement('h3');
        projectTitle.innerHTML = title; 
        projectHeader.appendChild(projectTitle).classList.add('project-title');

        if (title == '<i class="fa fa-plus"></i>') {
            project.appendChild(projectHeader).classList.add('project-header', 'add-project');
        } else {
            project.appendChild(projectHeader).classList.add('project-header');
            taskItem().addTaskBtn(project);
        }
        return project;
    }

    const addProjectBtn = () => {
        const project = createProject('<i class="fa fa-plus"></i>');
        project.addEventListener('click', () => {
            document.querySelector('.main').insertBefore(createProject('Project 2'), project).classList.add('project');
        })
        return project;
    }
    
    return { createProject, addProjectBtn }
  }