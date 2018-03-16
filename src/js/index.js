import { displayMenu } from './utils/displayMenu';

const testData = require('../mock-data/test-data.json');
const menu = document.getElementById('main-menu');

displayMenu(menu, testData.menu);
