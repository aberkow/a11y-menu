import { displayMenu } from './utils/displayMenu';
import Navigation from './Navigation/Navigation';
const testData = require('../mock-data/test-data.json');
const mainMenu = document.getElementById('am-main-menu');

displayMenu(mainMenu, testData.menu);
const navigation = new Navigation({ click: true });

document.addEventListener('DOMContentLoaded', () => {
    navigation.init();
});