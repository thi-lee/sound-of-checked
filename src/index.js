import './style.css';
import '@fortawesome/fontawesome-free/js/all'; 
import { projectBoard }from './modules/project';

document.body.appendChild(projectBoard().createProject()).classList.add('project');
