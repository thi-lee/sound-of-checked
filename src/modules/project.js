const storage = require('./localStorage');
const setProject = storage.storage().setProject;
const setTask = storage.storage().setTask;

const projects = [];

const taskItem = () => {
    // template for task tab
    const taskTab = () => {
        const task = document.createElement('div');
        task.classList.add('task');
        return task;
    }

    // TO-DO need to remove from local storage 
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

        input.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                addTask(task, input.value, project);
            }
        });

        const realTask = document.querySelector(`div#${project.id}.project.real-task`);
        realTask != null ? project.insertBefore(task, realTask) : project.appendChild(task);
        return input;
    }

    const addTask = (task, input, project) => {
        console.log(project.id);
        const realTask = document.querySelectorAll(`div#${project.id}.project.real-task`);
        console.log(`real task ${JSON.stringify(realTask)}`)
        const title = document.createElement('p');
        if (input.length == 0) {
            setTimeout(() => {
                task.remove();
            }, 1000);
        } else {
            task.innerHTML = '';
            if (input.length > 13) {
                input = input.slice(0, 13) + '...';
            } // conditions for input
            title.textContent = input;
            task.appendChild(checkboxIcon());
            task.appendChild(title).classList.add('task-title');

            // every task has parent id
            const parent = `${project.id}`;
            const id = 'id' + (new Date()).getTime();
            task.setAttribute('id', id);
            project.insertBefore(task, realTask[0]).classList.add('real-task', parent);
            setTask(parent, id, input);
        }
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
        const title = "Summer '21";
        tab.projectTitle.innerHTML = "Summer '21";
        const id = 'id' + (new Date()).getTime();
        tab.project.setAttribute('id', id);
        taskItem().addTaskBtn(tab.project);
        setProject(id, title, [])

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
                const title = input.value;
                newTab.projectTitle.innerHTML = title;
                const id = 'id' + (new Date()).getTime();
                newTab.project.setAttribute('id', id);
                taskItem().addTaskBtn(newTab.project);
                setProject(id, title, []);
            }
        })
    }
    
    return { createProject, addProjectBtn }
}