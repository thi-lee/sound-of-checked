const storage = require('./localStorage');
const setProject = storage.storage().setProject;
const setTask = storage.storage().setTask;
const deleteTask = storage.storage().deleteTask;

const taskItem = () => {
    let fromStorage = true;
    // template for task tab
    const taskTab = () => {
        const task = document.createElement('div');
        task.classList.add('task');
        return task;
    }

    const checkboxIcon = () => {
        const checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('click', () => {
            const checkboxParent = checkbox.parentNode;
            const sibling = checkbox.nextElementSibling;
            sibling.classList.add('strike-through');
            deleteTask(checkboxParent.classList[1], checkboxParent.id);
            setTimeout(() => checkboxParent.remove(), 500);
      })
      return checkbox;
    }

    const addTaskBtn = (project) => {
        const task = taskTab();
        task.innerHTML = '<i class="fa fa-plus"></i>';
        project.appendChild(task).classList.add('add-task');
        task.addEventListener('click', () => {
            fromStorage = false;
            taskInput(taskTab(), project);
        })
        return task;
    }

    const taskInput = (task, project) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        task.appendChild(input).classList.add('input', 'task-input');

        const realTask = document.querySelector(`div.task.real-task.${project.id}`);
        realTask != null ? project.insertBefore(task, realTask) : project.appendChild(task);

        input.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                addTask(task, input.value, project);
            }
        });

        return input;
    }

    const taskId = (task, input, project) => {
        const id = 'id' + (new Date()).getTime();
        const parent = `${project.id}`;
        task.setAttribute('id', id);
        task.classList.add(parent);

        const realTask = document.querySelector(`div.task.real-task.${project.id}`);
        project.insertBefore(task, realTask).classList.add('real-task', parent);

        if (!fromStorage) {
            setTask(parent, id, input);
        }
    }

    const addTask = (task, input, project) => {
        const title = document.createElement('p');
        if (input.length == 0) {
            setTimeout(() => {
                task.remove();
            }, 1000);
        } else {
            task.innerHTML = '';
            if (input.length > 13) {
                input = input.slice(0, 13) + '...';
            } 
            title.textContent = input;
            task.appendChild(checkboxIcon());
            task.appendChild(title).classList.add('task-title');

            taskId(task, input, project);
        }
    }
  
    return { checkboxIcon, taskTab, addTask, addTaskBtn, fromStorage }
}

const projectItem = () => {
    // template for project item
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

    const addProjectBtn = () => {
        const tab = projectTab();
        tab.projectTitle.innerHTML = '<i class="fa fa-plus"></i>';
        tab.projectHeader.classList.add('add-project');
        tab.project.addEventListener('click', () => projectInput(tab))
        return tab;
    }

    const projectInput = (tab) => {
        const newTab = projectTab();
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        newTab.projectTitle.appendChild(input).classList.add('input', 'project-input');
        document.querySelector('.main').insertBefore(newTab.project, tab.project);

        input.addEventListener('keyup', e => {
            e.preventDefault();
            if (e.keyCode === 13) {
                const title = input.value;
                newTab.projectTitle.innerHTML = title;
                const id = 'id' + (new Date()).getTime();
                newTab.project.setAttribute('id', id);
                taskItem().addTaskBtn(newTab.project);
                setProject(id, title, []);
            }
        })
    }

    const addProject = (id, title) => {
        const project = projectItem().projectTab();
        project.projectTitle.innerHTML = title;
        project.project.id = id;
        taskItem().addTaskBtn(project.project);

        return project;
    }
    return { projectTab, addProjectBtn, projectInput, addProject }
}

exports.defaultProject = () => {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    const main = document.querySelector('.main');
    if (projects.toString() === [].toString()) {
        const title = "Summer '21";
        const id = 'id' + (new Date()).getTime();
        
        const newProject = projectItem().addProject(id, title);
        setProject(id, title, []);
        
        main.appendChild(newProject.project).classList.add('project');
    } else {
        projects.forEach(project => {
            const newProject = projectItem().addProject(project.id, project.title);
            project.tasks.forEach(task => {
                taskItem().fromStorage = true;
                const newTask = taskItem().taskTab();
                taskItem().addTask(newTask, task.title, newProject.project);
            });
            main.appendChild(newProject.project).classList.add('project');
        });
    };
    main.appendChild(projectItem().addProjectBtn().project).classList.add('project');
};