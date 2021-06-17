exports.storage = () => {
    const sampleProject = (id, title, tasks) => {
        const project = { 'id': id, 'title': title, 'tasks': tasks }
        return project;
    }

    const setProject = (id, title, tasks) => {
        let allProjects = JSON.parse(localStorage.getItem('projects')) || [];
        allProjects.push(sampleProject(id, title, tasks));
        localStorage.setItem('projects', JSON.stringify(allProjects));
    }

    const sampleTask = (parent, id, title) => {
        const task = { 'parent': parent, 'id': id, 'title': title }
        return task;
    }

    const setTask = (parent, id, title) => {
        const task = sampleTask(parent, id, title);
        const taskParent = task.parent;
        const projects = JSON.parse(localStorage.getItem('projects'));
        const result = projects.find(project => project.id == taskParent);
        result.tasks.push(task);
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    return { setProject, setTask };
};