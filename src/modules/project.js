import { storage } from './localStorage';
const setProject = storage().setProject;
const setTask = storage().setTask;
const deleteTask = storage().deleteTask;

/*
@task: task template 
@project: project template
*/

const taskItem = () => {
    /*
    TODO: consider storing project into a variable and use through out 
          maybe make it an argument for taskItem()
    */
    let fromStorage = true;
    
    const taskTab = () => {
        const task = document.createElement('div');
        task.classList.add('task');
        return task;
    }

    const checkboxIcon = () => {
        const checkbox = document.createElement('div');
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('click', () => checkboxLogic(checkbox));
      return checkbox;
    }
    // TODO: delete function still has bugs
    const checkboxLogic = (checkbox) => {
        const checkboxParent = checkbox.parentNode;
        const sibling = checkbox.nextElementSibling;
        sibling.classList.add('strike-through');
        deleteTask(checkboxParent.classList[1], checkboxParent.id);
        setTimeout(() => checkboxParent.remove(), 500);
    }

    const addTaskBtn = (project) => {
        const task = taskTab();
        task.innerHTML = '<i class="fa fa-plus"></i>';
        project.appendChild(task).classList.add('add-task');
        task.addEventListener('click', () => {
            fromStorage = false;
            // instead of using task declared above, I need to create a new task tab
            taskInput(taskTab(), project);
        })
        return task;
    }

    const taskInput = (task, project) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.placeholder = 'Task title must have less than 40 characters'
        task.appendChild(input).classList.add('input', 'task-input');

        // figure out where to put the new input task
        const realTask = document.querySelector(`div.task.real-task.${project.id}`);
        realTask != null ? project.insertBefore(task, realTask) : project.appendChild(task);

        // TODO: consider separating this to a new function
        input.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                addTask(task, input.value, project);
            }
        });

        return input;
    }

    // TODO: this function is doing too much
    const addTask = (task, input, project) => {
        const title = document.createElement('p');
        // what to do when user click add task but doesn't do anything? 
        if (input.length == 0) {
            setTimeout(() => {
                task.remove();
            }, 1000);
        } 
        if (validTaskInput(input)) {
            task.innerHTML = '';
            title.textContent = input;
            task.appendChild(checkboxIcon());
            task.appendChild(title).classList.add('task-title', 'title');

            taskId(task, input, project);
        }
    }

    // TODO: add more conditions for input
    const validTaskInput = (input) => {
        let isValid = false;
        if (input.length <= 40) {
            isValid = true;
        }
        return isValid;
    }

    const taskId = (task, input, project) => {
        const id = 'id' + (new Date()).getTime();
        const parent = `${project.id}`;
        task.id = id;
        task.classList.add(parent);

        const realTask = document.querySelector(`div.task.real-task.${project.id}`);
        project.insertBefore(task, realTask).classList.add('real-task', parent);

        if (!fromStorage) {
            setTask(parent, id, input);
        }
    }

    const editTitle = () => {
        const titles = document.querySelectorAll('.title');
        titles.forEach(title => {
            title.addEventListener('click', () => {
                if (title.classList.contains('project-title')) {
                    console.log('this is project');
                } else {
                    const task = title.parentNode;
                    const project = task.parentNode;
                    const currentValue = title.textContent;
                    title.innerHTML = '';
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = currentValue;
                    task.appendChild(input).classList.add('input', 'task-input');
                    input.addEventListener('keyup', (e) => {
                        e.preventDefault();
                        if (e.keyCode === 13) {
                            addTask(task, input.value, project);
                        }
                    });
                }
            });
        })
    }
  
    return { fromStorage, taskTab, addTask, addTaskBtn, editTitle }
}

const projectItem = () => {
    // template for project item
    const projectTab = () => {
        const main = document.createElement('div');
        main.classList.add('project');

        const header = document.createElement('div');
        main.appendChild(header).classList.add('project-header');
        const title = document.createElement('h3');
        header.appendChild(title).classList.add('project-title', 'title');
        
        return { main, header, title };
    }

    const addProjectBtn = () => {
        const project = projectTab();
        project.title.innerHTML = '<i class="fa fa-plus"></i>';
        project.header.classList.add('add-project');
        project.main.addEventListener('click', () => projectInput(project))
        return project;
    }

    const projectInput = (project) => {
        const newProject = projectTab();
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.placeholder = 'Project title must have less than 20 characters';
        newProject.title.appendChild(input).classList.add('input', 'project-input');
        document.querySelector('.main').insertBefore(newProject.main, project.main);

        input.addEventListener('keyup', e => {
            e.preventDefault();
            if (e.keyCode === 13) {
                const id = 'id' + (new Date()).getTime();
                newProject.main.id = id;
                const title = input.value;
                newProject.title.innerHTML = title;
                taskItem().addTaskBtn(newProject.main);
                setProject(id, title, []);
            }
        })
    }

    const addProject = (id, title) => {
        const project = projectTab();
        project.title.innerHTML = title;
        project.main.id = id;
        taskItem().addTaskBtn(project.main);

        return project;
    }
    return { addProjectBtn, addProject }
}

export function defaultProject() {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    const main = document.querySelector('.main');
    if (projects.toString() === [].toString()) {
        const title = "Summer '21";
        const id = 'id' + (new Date()).getTime();

        const newProject = projectItem().addProject(id, title);
        setProject(id, title, []);
        
        main.appendChild(newProject.main).classList.add('project');
    } else {
        projects.forEach(project => {
            const newProject = projectItem().addProject(project.id, project.title);
            project.tasks.forEach(task => {
                taskItem().fromStorage = true;
                const newTask = taskItem().taskTab();
                taskItem().addTask(newTask, task.title, newProject.main);
            });
            main.appendChild(newProject.main).classList.add('project');
        });
    }
    main.insertBefore(projectItem().addProjectBtn().main, null).classList.add('project');
}