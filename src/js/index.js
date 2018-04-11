import { displayMenu } from './utils/displayMenu';
import Navigation from './Navigation/Navigation';

const testData = require('../mock-data/test-data.json');
const mainMenu = document.getElementById('main-menu');
// const menuOpts = {
//   chevronDown: '+',
//   chevronUp: '-'
// }
const menuOpts = {
    chevronDown: '\\f078',
    chevronUp: '\\f077'
  }

const navigation = new Navigation(menuOpts);

displayMenu(mainMenu, testData.menu);

document.addEventListener('DOMContentLoaded', () => {
  navigation.init(mainMenu, menuOpts);
});
