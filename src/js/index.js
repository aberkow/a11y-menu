import Navigation, { displayMenu } from './exports';

const menus = document.querySelectorAll('nav[id^="am-"]');
const testData = require('../mock-data/test-data.json');
const mainMenu = document.getElementById('am-main-menu');

displayMenu(mainMenu, testData.menu);
const navigation = new Navigation({ click: true });

document.addEventListener('DOMContentLoaded', (evt) => {
    Prism.highlightAll();
    navigation.init();
});

menus.forEach(menu => {
    menu.addEventListener('click', (evt) => {
        if (evt.target.localName === 'a') {
            evt.preventDefault();
            alert('Sorry but the links in these menus don\'t go anywhere.');
        }
    })
})