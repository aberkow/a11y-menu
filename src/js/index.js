import Navigation, { displayMenu } from './exports';

const testData = require('../mock-data/test-data.json');
const mainMenu = document.getElementById('am-main-menu');

displayMenu(mainMenu, testData.menu);
const navigation = new Navigation({ click: true });

document.addEventListener('DOMContentLoaded', (evt) => {
    navigation.init();
});

document.addEventListener('click', (evt) => {
    if (evt.target.localName === 'a') {
        evt.preventDefault();
        alert('Sorry but the links on this page don\'t go anywhere. Feel free to click the buttons!');
    }
})