exports.storage = () => {
    let allProjects = [];
    const createTask = (parent, id) => {
        const task = { 'parent': parent, 'id': id};
        return task;
    }

    /*
    let allProjects = []; // list of projects

    const uniqId1 = `id + ${(new Date()).getTime()}`;
    const uniqId2 = `id + ${(new Date()).getTime()}`;

    const tasks = [
        { 'parent': uniqId1 },
        { 'parent': uniqId2 },
    ]

    allProjects = [
        {'uniqId': uniqId1, 'tasks': tasks.filter( task => task.parent == uniqId1) },
        {'uniqId': uniqId2, 'tasks': tasks.filter( task => task.parent == uniqId2) },
    ];

    console.log(JSON.stringify(allProjects));

    */

   return { allProjects, createTask };
}