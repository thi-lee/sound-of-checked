const projects = [];

const taskItem = () => {
    // template for task tab
    const taskTab = () => {
        const task = document.createElement('div');
        task.classList.add('task');
        return task;
    }

    // TODO: edit event on event listener
    const checkboxIcon = () => {
        const checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('click', () => {
            const checkboxParent = checkbox.parentNode;
            const sibling = checkbox.nextElementSibling;
            sibling.classList.add('strike-through');
            setTimeout(() => checkboxParent.remove(), 500);
      })
      return checkbox;
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
    // TODO: add correct id/className to (4)
    const taskInput = (task, project) => {
        // (1)
        const input = document.createElement('input');
        input.setAttribute('type', 'text');

        // (2)
        input.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                addTask(task, input.value, project);
            }
        })
        
        // (3)
        task.appendChild(input).classList.add('input', 'task-input');

        // (4)
        console.log(`div.${project.classList[1]}.real-task`)
        const realTask = document.querySelector(`div.${project.classList[1]}.real-task`);
        console.log(realTask);
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
    const addTask = (task, input, project) => {
        const realTask = document.querySelector(`div.${project.classList[1]}.real-task`);
        const title = document.createElement('p');
        if (input.length > 13) {
            input = input.slice(0, 13) + '...';
        } else if (input.length == 0) {
            input = "Untitled";
        }
        title.textContent = input;
        task.innerHTML = '';
        task.appendChild(checkboxIcon());
        task.appendChild(title).classList.add('task-title');
        project.insertBefore(task, realTask).classList.add('real-task', `${project.classList[1]}`);
    }

    const removeTask = () => {

    }
  
    return { addTaskBtn }
}

exports.projectBoard = () => {

    /*
    Responsibility: project tab skeleton
    */
    const projectTab = () => {
        const project = document.createElement('div');
        project.classList.add('project');

        const projectHeader = document.createElement('div');
        projectHeader.classList.add('project-header');
        const projectTitle = document.createElement('h3');
        projectHeader.appendChild(projectTitle).classList.add('project-title');
        project.appendChild(projectHeader);
        
        return { project, projectHeader, projectTitle };
    }

    /*
    Every project, except add-project button, will have an add-task button
    Responsibility: 
    */
    const createProject = () => {
        const tab = projectTab();
        tab.project.setAttribute('id', 'project-1');
        tab.projectTitle.innerHTML = "Summer '21";
        const uniq = 'id' + (new Date()).getTime();
        getProjectId(tab.project, uniq);
        taskItem().addTaskBtn(tab.project);

        return tab;
    }

    const addProjectBtn = () => {
        const tab = projectTab();
        tab.projectTitle.innerHTML = '<i class="fa fa-plus"></i>';
        tab.projectHeader.classList.add('add-project');
        tab.project.addEventListener('click', () => projectInput(tab))
        return tab;
    }

    const projectInput = (tab) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');

        const newTab = projectTab();
        newTab.projectTitle.appendChild(input).classList.add('input', 'project-input');
        document.querySelector('.main').insertBefore(newTab.project, tab.project);

        input.addEventListener('keyup', e => {
            e.preventDefault();
            if (e.keyCode === 13) {
                newTab.projectTitle.innerHTML = input.value;
                const uniq = 'id' + (new Date()).getTime();
                getProjectId(newTab.project, uniq)
                taskItem().addTaskBtn(newTab.project);
            }
        })
    }

    const getProjectId = (project, id) => {
        projects.push(id);
        console.log(projects);
        project.classList.add(`project-${projects.indexOf(id)}`);
    }
    
    return { createProject, addProjectBtn }
  }