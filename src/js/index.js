import { displayMenu } from './utils/displayMenu';
const testData = require('../mock-data/test-data.json');
const mainMenu = document.getElementById('main-menu');

displayMenu(mainMenu, testData.menu);

document.addEventListener('DOMContentLoaded', () => {
    const navigation = new Navigation({ click: true });
    navigation.init();
});