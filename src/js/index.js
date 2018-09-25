import { displayMenu } from './utils/displayMenu';

const testData = require('../mock-data/test-data.json');
const mainMenu = document.getElementById('main-menu');

const navigation = new Navigation({ click: false });

displayMenu(mainMenu, testData.menu);

document.addEventListener('DOMContentLoaded', () => {
    navigation.init();
});