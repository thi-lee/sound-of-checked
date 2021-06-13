import './style.css';
import '@fortawesome/fontawesome-free/js/all'; 
import { projectBoard }from './modules/project';

const header = document.createElement('div');
const headerText = document.createElement('h1');
headerText.textContent = 'Get it done!';
header.appendChild(headerText).classList.add('header-text');
document.body.appendChild(header).classList.add('header');

const main = document.createElement('main');
main.appendChild(projectBoard().createProject('Project 1')).classList.add('project');
main.appendChild(projectBoard().addProjectBtn()).classList.add('project');

document.body.appendChild(main).classList.add('main');
