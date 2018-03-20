import { displayMenu } from './utils/displayMenu';
import Navigation from './Navigation/Navigation';

const testData = require('../mock-data/test-data.json');
const menu = document.getElementById('main-menu');
const navigation = new Navigation();

displayMenu(menu, testData.menu);

document.addEventListener('DOMContentLoaded', () => {
  navigation.init(menu);
});
