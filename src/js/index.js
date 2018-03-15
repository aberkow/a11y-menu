import { displayMenu } from './utils/displayMenu';

const data = require('../mock-data/mock-menu.json');
const menu = document.getElementById('main-menu');

displayMenu(menu, data.menu);

