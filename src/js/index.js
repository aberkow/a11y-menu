import { displayMenu } from './utils/displayMenu';
import Navigation from './Navigation/Navigation';

const testData = require('../mock-data/test-data.json');
const mainMenu = document.getElementById('main-menu');

const navigation = new Navigation({ click: false });

displayMenu(mainMenu, testData.menu);

document.addEventListener('DOMContentLoaded', () => {
    navigation.init();
});