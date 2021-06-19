const storage = require('./localStorage');
const setProject = storage.storage().setProject;
const setTask = storage.storage().setTask;
const deleteTask = storage.storage().deleteTask;

const taskItem = () => {
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

        setTask(parent, id, input);
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
  
    return { checkboxIcon, taskTab, addTask, addTaskBtn }
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
    return { projectTab, addProjectBtn }
}

exports.defaultProject = () => {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    if (projects.toString() === [].toString()) {
        const newProject = projectItem().projectTab();
        newProject.projectTitle.innerHTML = "Summer '21";

        const id = 'id' + (new Date()).getTime();
        newProject.project.setAttribute('id', id);
        taskItem().addTaskBtn(newProject.project);

        const main = document.querySelector('.main');
        main.appendChild(newProject.project).classList.add('project');
        main.appendChild(projectItem().addProjectBtn().project).classList.add('project');
        setProject(id, "Summer '21", [])
    } else {
        const main = document.querySelector('.main');
        projects.forEach(project => {
            const newProject = projectItem().projectTab();
            newProject.projectTitle.innerHTML = project.title;
            newProject.project.id = project.id;
            taskItem().addTaskBtn(newProject.project);
            project.tasks.forEach(task => {
                const newTask = taskItem().taskTab();

                const title = document.createElement('p');
                newTask.innerHTML = '';
                title.textContent = task.title;
                newTask.id = task.id;
                newTask.classList.add(task.parent);
                newTask.appendChild(taskItem().checkboxIcon());
                newTask.appendChild(title).classList.add('task-title');
                newProject.project.appendChild(newTask).classList.add('real-task');
            });
            main.appendChild(newProject.project).classList.add('project');
        });
        main.appendChild(projectItem().addProjectBtn().project).classList.add('project');
    }
};