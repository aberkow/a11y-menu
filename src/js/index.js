import { displayMenu } from './utils/displayMenu';
import Navigation from './Navigation/Navigation';

const testData = require('../mock-data/test-data.json');
const mainMenu = document.getElementById('main-menu');

// an example with basic characters.
// const menuOpts = {
//   fontAwesome: false,
//   chevronDown: '+',
//   chevronUp: '-'
// }

// the fontawesome icons need to be in the escaped html format. 
const menuOpts = {
  fontFamily: 'Font Awesome 5 Free',
  chevronDown: '\\f078',
  chevronUp: '\\f077'
}

const navigation = new Navigation(menuOpts);

displayMenu(mainMenu, testData.menu);

document.addEventListener('DOMContentLoaded', () => {
  navigation.init(mainMenu);
});
