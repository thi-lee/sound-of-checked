exports.storage = () => {
    /*
    project id = `project ${i}` (let i = 0; i++)
    task id = `task ${j}` (let j = 0; j++)
    */
    const projectId = 'project-1';
    const projectTitle = 'first project';
    const tasksParentId = 'project-1';
    const tasksId = 'tasks-1';
    const tasksChildren = [];
    const taskParent = 'tasks-1';
    const taskId = 'task-1';
    const taskTitle = 'dinner at 4';
    const taskDue = '4pm';

    let project = eachProjectStorage(projectId, projectTitle);
    let task = eachTaskStorage(taskParent, taskId, taskTitle, taskDue);
    // let tasks = 

    const createStorage = () => {
        const projectStorage = () => {
            let projects = [];
            return projects;
        }
        const taskStorage = () => {
            let tasks = {'parent': parent, 'children': []};
            return tasks;
        }
        const eachTaskStorage = (parent, id, title, duedate) => {
            const task = {'parent': parent,'id': id, 'task-title': title, 'duedate': duedate};
            return task;   
        }
        const storeTaskToTasks = () => {
            const tasks = taskStorage().children.push(eachTaskStorage());
            return tasks;
        }
        const eachProjectStorage = (id, title) => {
            const project = {'id': id, 'project-title': title, 'tasks': []}
            return project;
        }
        const storeProjectToProjects = () => {
            const projects = projectStorage().push(eachProjectStorage());
            return projects;
        }

    }

    // let task = [
    //     {'id': 1, 'title': 'task 1', 'duedate': 'jan 22'},
    //     {'id': 2, 'title': 'task 2', 'duedate': 'jan 23'},
    // ]
    // let project = [
    //     {'id': 1, 'title': 'project 1', 'tasks': task},
    //     {'id': 2, 'title': 'project 1', 'tasks': [
    //         {'id': 1, 'title': 'task 1', 'duedate': 'jan 24'},
    //         {'id': 2, 'title': 'task 2', 'duedate': 'jan 25'},
    //     ]},
    // ];

    // localStorage.setItem('project', JSON.stringify(project));
}