import { displayMenu } from './utils/displayMenu';
import Navigation from './Navigation/Navigation';
const testData = require('../mock-data/test-data.json');
const mainMenu = document.getElementById('main-menu');

mainMenu.classList.remove('click-menu');

displayMenu(mainMenu, testData.menu);
const navigation = new Navigation({ click: true });

document.addEventListener('DOMContentLoaded', () => {
    navigation.init();
});