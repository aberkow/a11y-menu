/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Navigation/Navigation.js":
/*!*****************************************!*\
  !*** ./src/js/Navigation/Navigation.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Navigation {\r\n    constructor({\r\n        menuId = 'am-main-menu',\r\n        click = false\r\n    } = {}) {\r\n        this.menu = null\r\n        this.menuId = menuId\r\n        this.click = click\r\n        this.currentItem = null\r\n    }\r\n\r\n    /**\r\n     * \r\n     * js is available\r\n     * remove the no-js class from nav menu list items\r\n     * \r\n     */\r\n    removeNoJs() {\r\n        const listItems = Array.from(this.menu.querySelectorAll('.no-js'))\r\n        listItems.map(item => item.classList.remove('no-js'))\r\n    }\r\n\r\n    /**\r\n     * \r\n     * Get the button element which is expanded\r\n     * Helps with identifying the top level list item\r\n     * \r\n     * @return DOM element\r\n     */\r\n    getCurrentTopLevelItem(target) {\r\n        if (target !== null) {\r\n            return target.closest(`#${this.menuId} > li`)\r\n        }\r\n    }\r\n\r\n    /**\r\n     *\r\n     * Manage the state of the top level item associated with targets\r\n     * \r\n     * @param {*} target \r\n     * @returns {Element} the top level <li> associated with the target\r\n     * @memberof Navigation\r\n     */\r\n    toggleCurrentTopLevelItemClass(target) {\r\n        const topLevelItems = Array.from(document.querySelectorAll(`#${this.menuId} > li`))\r\n        return topLevelItems.map(item => {\r\n            item.classList.remove('am-current-item')\r\n            if (item.contains(target)) {\r\n                item.classList.add('am-current-item')\r\n                return item\r\n            }\r\n        }).filter(item => {\r\n            if (item !== undefined) {\r\n                return item\r\n            }\r\n        })[0]\r\n    }\r\n\r\n    /**\r\n     * \r\n     * Opens and closes submenus\r\n     * Change the state of the aria-expanded property and submenu class\r\n     *\r\n     * @param {*} target DOM Node - specifically a <button />\r\n     * @memberof Navigation\r\n     */\r\n    manageSubmenuState(target) {\r\n        const buttons = Array.from(this.menu.querySelectorAll('.am-submenu-toggle'))\r\n        \r\n        buttons.map(button => {\r\n            const prevButton = button.parentElement.parentElement.previousElementSibling;\r\n            const submenu = button.nextElementSibling\r\n            const submenuOpenClass = 'am-submenu-list-open'\r\n            const sameNode = button.isSameNode(target)\r\n            const ariaExpanded = button.getAttribute('aria-expanded')\r\n            let parentSubmenu;\r\n\r\n            // if for some reason there's a button with no submenu, return immediately\r\n            if (!submenu) return\r\n\r\n            // case - clicking on a sub-submenu button which is currently NOT expanded.\r\n            if (sameNode && ariaExpanded === 'false' && prevButton) {\r\n\r\n                // find the parent submenu\r\n                parentSubmenu = prevButton.nextElementSibling\r\n\r\n                // toggle the states of the previous button and the button/target\r\n                prevButton.setAttribute('aria-expanded', 'true');\r\n                button.setAttribute('aria-expanded', 'true');\r\n\r\n                // keep the parent submenu open\r\n                parentSubmenu.classList.add(submenuOpenClass)\r\n\r\n                // open the sub-submenu\r\n                submenu.classList.add(submenuOpenClass)\r\n            }\r\n\r\n            // case - clicking on a sub-submenu button which is currently expanded.\r\n            else if (sameNode && ariaExpanded === 'true' && prevButton) {\r\n\r\n                // find the parent submenu\r\n                parentSubmenu = prevButton.nextElementSibling\r\n\r\n                // keep the previous button expanded and toggle the button/target\r\n                prevButton.setAttribute('aria-expanded', 'true');\r\n                button.setAttribute('aria-expanded', 'false');\r\n\r\n                // keep the parent submenu open\r\n                parentSubmenu.classList.add(submenuOpenClass)\r\n\r\n                // close the sub-submenu\r\n                submenu.classList.remove(submenuOpenClass)\r\n            }\r\n            // case - clicking on a top level button which is currently NOT expanded\r\n            else if (sameNode && ariaExpanded === 'false') {\r\n                // expand the button\r\n                button.setAttribute('aria-expanded', 'true');\r\n                // open the submenu\r\n                submenu.classList.add(submenuOpenClass)\r\n            }\r\n            // case - all other buttons\r\n            else {\r\n                // reset aria-expanded to false\r\n                button.setAttribute('aria-expanded', 'false')\r\n                // close the submenu\r\n                submenu.classList.remove(submenuOpenClass)\r\n            }\r\n        })\r\n    }\r\n\r\n    /**\r\n     *\r\n     * remove the am-submenu-list-open class from all submenus not associated with the target\r\n     * \r\n     * @param {object} target - the event target\r\n     * @memberof Navigation\r\n     */\r\n    clearSubmenuClass(target) {\r\n        const menuArray = Array.from(document.querySelectorAll('.am-submenu-list-open'))\r\n        if (!target.closest('.am-submenu-toggle')) {\r\n            menuArray.map(menu => menu.classList.remove('am-submenu-list-open'))\r\n        }\r\n    }\r\n\r\n    /**\r\n     *\r\n     * set aria-expanded false on all buttons not associated with the target\r\n     *\r\n     * @param {object} target - the event target\r\n     * @memberof Navigation\r\n     */\r\n    clearAllAriaExpanded(target) {\r\n        const buttonArray = Array.from(document.querySelectorAll('.am-submenu-toggle'))\r\n        if (!target.closest('.am-submenu-toggle')) {\r\n            buttonArray.map(button => button.setAttribute('aria-expanded', 'false'))\r\n        }\r\n    }\r\n\r\n    /**\r\n     *\r\n     * close all submenus and set the state of all items with aria-expanded to false\r\n     * remove event listeners from the document\r\n     *\r\n     * @param {object} { target } destructured from the event object\r\n     * @memberof Navigation\r\n     */\r\n    clearAll({ target }) {\r\n        this.clearSubmenuClass(target)\r\n        this.clearAllAriaExpanded(target)\r\n        document.removeEventListener('click', this.clearAll.bind(this))\r\n        document.removeEventListener('focusin', this.clearAll.bind(this))\r\n        document.removeEventListener('keydown', this.clearAll.bind(this))\r\n    }\r\n\r\n    /**\r\n     *\r\n     * Remove the no-js class and attach event listeners to the menu\r\n     * \r\n     * @memberof Navigation\r\n     */\r\n    setMenuEventListeners() {\r\n        let listeners = ['focusin', 'keydown'];\r\n\r\n        if (this.click) {\r\n            listeners.push('click');\r\n\r\n            const subMenuList = [].slice.call(this.menu.querySelectorAll('.am-submenu-list'));\r\n\r\n            subMenuList.forEach(menu => menu.classList.add('am-click-menu'));\r\n        }\r\n\r\n        for (let i = 0; i < listeners.length; i++) {\r\n            this.menu.addEventListener(listeners[i], (evt) => {\r\n                this.eventDispatcher(evt);\r\n            });\r\n        }\r\n    }\r\n\r\n    /**\r\n     *\r\n     * attach event listeners to the document\r\n     *  - click: clicks on the body clear the menu\r\n     *  - focusin: if the body gets focus, clear the menu\r\n     *  - keydown: if the escape key is pressed, clear the menu\r\n     *\r\n     * @param {object} target\r\n     * @memberof Navigation\r\n     */\r\n    setDocumentEventListeners(target) {\r\n        if (target.getAttribute('aria-expanded') === 'true') {\r\n            this.clearAll = this.clearAll.bind(this)\r\n\r\n            document.addEventListener('click', this.clearAll)\r\n\r\n            document.addEventListener('focusin', (evt) => {\r\n                if (!this.menu.contains(evt.target)) {\r\n                    this.clearAll({ target: document.body })\r\n                }\r\n            })\r\n            \r\n            document.addEventListener('keydown', (evt) => {\r\n                if (evt.which === 27) {\r\n                    this.clearAll({ target: document.body })\r\n                }\r\n            })\r\n        }\r\n    }\r\n\r\n    /**\r\n     *\r\n     * dispatch events to the correct functions.\r\n     * types include: focusin, keydown, mousedown\r\n     * \r\n     * treat keydowns from the return key (13) as click events\r\n     *\r\n     * @param {object} evt\r\n     * @returns void\r\n     * @memberof Navigation\r\n     */\r\n    eventDispatcher(evt) {\r\n        switch (evt.type) {\r\n            case 'focusin':\r\n                this.focusInHandler(evt)\r\n                break;\r\n            case 'click':\r\n                this.clickHandler(evt)\r\n                break;\r\n            default:\r\n                return;\r\n        }\r\n    }\r\n\r\n    /**\r\n     *\r\n     * handle mousedown events by managing\r\n     * - submenu classes\r\n     * - aria-expanded state\r\n     * - event listeners on the document\r\n     * \r\n     * @param {object} { target } destructured from the event object\r\n     * @memberof Navigation\r\n     */\r\n    clickHandler({ target }) {\r\n        if (target.localName !== 'button') return\r\n        this.toggleCurrentTopLevelItemClass(target)\r\n        this.manageSubmenuState(target)\r\n        this.setDocumentEventListeners(target)\r\n    }\r\n\r\n    /**\r\n     *\r\n     * Handle focusin events\r\n     * \r\n     * @param {*} { target, relatedTarget } DOM targets \r\n     * @memberof Navigation\r\n     */\r\n    focusInHandler({ target, relatedTarget }) {\r\n        const topItem = this.toggleCurrentTopLevelItemClass(target)\r\n        if (this.menu.contains(relatedTarget) && !topItem.contains(relatedTarget)) {\r\n            this.clearAll({ target: document.body })\r\n        }\r\n    }\r\n\r\n    init() {\r\n        this.menu = document.getElementById(this.menuId)\r\n        this.removeNoJs()\r\n        this.setMenuEventListeners()\r\n    }\r\n}\r\n\r\n/* strip-code */\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Navigation);\r\n/* end-strip-code */\n\n//# sourceURL=webpack:///./src/js/Navigation/Navigation.js?");

/***/ }),

/***/ "./src/js/exports.js":
/*!***************************!*\
  !*** ./src/js/exports.js ***!
  \***************************/
/*! exports provided: default, displayMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Navigation_Navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navigation/Navigation */ \"./src/js/Navigation/Navigation.js\");\n/* harmony import */ var _utils_displayMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/displayMenu */ \"./src/js/utils/displayMenu.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"displayMenu\", function() { return _utils_displayMenu__WEBPACK_IMPORTED_MODULE_1__[\"displayMenu\"]; });\n\n// provide one file from which to export assets for the npm package.\r\n\r\n\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (_Navigation_Navigation__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\r\n\n\n//# sourceURL=webpack:///./src/js/exports.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exports */ \"./src/js/exports.js\");\n\r\n\r\nconst menus = document.querySelectorAll('nav[id^=\"am-\"]');\r\nconst testData = __webpack_require__(/*! ../mock-data/test-data.json */ \"./src/mock-data/test-data.json\");\r\nconst mainMenu = document.getElementById('am-main-menu');\r\n\r\nObject(_exports__WEBPACK_IMPORTED_MODULE_0__[\"displayMenu\"])(mainMenu, testData.menu);\r\nconst navigation = new _exports__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ click: true });\r\n\r\ndocument.addEventListener('DOMContentLoaded', (evt) => {\r\n    Prism.highlightAll();\r\n    navigation.init();\r\n});\r\n\r\nmenus.forEach(menu => {\r\n    menu.addEventListener('click', (evt) => {\r\n        if (evt.target.localName === 'a') {\r\n            evt.preventDefault();\r\n            alert('Sorry but the links in these menus don\\'t go anywhere.');\r\n        }\r\n    })\r\n})\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/utils/displayMenu.js":
/*!*************************************!*\
  !*** ./src/js/utils/displayMenu.js ***!
  \*************************************/
/*! exports provided: displayMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"displayMenu\", function() { return displayMenu; });\n/*\r\n *\r\n * This function takes in a json menu item and returns the appropriate markup\r\n *\r\n */\r\n\r\nconst generateMenuItemMarkup = (menuItem) => {\r\n    // set a state for having a submenu and/or link\r\n    let hasSubmenu = false;\r\n    let hasLink = false;\r\n    \r\n    if (menuItem.hasOwnProperty('sub') && menuItem.sub !== null && menuItem.sub.length) {\r\n        hasSubmenu = true;\r\n    }\r\n\r\n    if (menuItem.hasOwnProperty('link') && menuItem.link.length && menuItem.link !== '#') {\r\n        hasLink = true;\r\n    }\r\n    if (hasLink && hasSubmenu) {\r\n        return `<a class='am-submenu-link' aria-label='${menuItem.name}, tab to the next button to expand the sub-menu' href=${menuItem.link}>${menuItem.name}</a><button class='am-submenu-button am-submenu-toggle' aria-haspopup='true' aria-expanded='false' aria-label='show submenu'><span class='am-submenu-icon' aria-hidden='true' data-before='∨'></span></button>`;\r\n    } else if (!hasLink || !hasLink && hasSubmenu) {\r\n        return `<button aria-haspopup='true' aria-expanded='false' class='am-submenu-toggle'>${menuItem.name}<span class='am-submenu-icon' aria-hidden='true' data-before='∨'></span></button>`;\r\n    } else {\r\n        // just a link\r\n        return `<a href=${menuItem.link}>${menuItem.name}</a>`;\r\n    }\r\n}\r\n\r\n/*\r\n *\r\n * This function will generate the markup for the menu.\r\n * The two arguments are the <ul> to attach the menu to and the json data to read from.\r\n *\r\n */\r\n\r\nconst displayMenu = (ul, json) => {\r\n    const menuMap = json.map((menuItem, index) => {\r\n        let classes = [];\r\n        // create a list item\r\n        const li = document.createElement('li');\r\n\r\n        li.innerHTML = generateMenuItemMarkup(menuItem);\r\n\r\n        if (menuItem.hasOwnProperty('classes') && menuItem.classes !== null && menuItem.classes.length) {\r\n            classes = menuItem.classes;\r\n            classes.push('no-js');\r\n        } else {\r\n            classes.push('no-js');\r\n        }\r\n\r\n        li.classList.add(...classes);\r\n\r\n        // check if there are submenu items\r\n        // if there are, create a submenu <ul>\r\n        // then, recursively call this function\r\n\r\n        // this if statement is clearly ridiculous and needs to be refactored\r\n        if (menuItem.hasOwnProperty('sub') && menuItem.sub !== null && menuItem.sub.length) {\r\n            // li.setAttribute('data-count', index);\r\n            li.setAttribute('data-has-children', 'true');\r\n            // create a <ul> to hold the submenu\r\n            const subMenu = document.createElement('ul');\r\n            // ul.classList.add('submenu-list');\r\n            subMenu.classList.add('am-submenu-list');\r\n            // this is super temporary. just to get things rolling...\r\n            subMenu.id = `am-submenu-${menuItem.slug}`;\r\n            // create the submenu structure by recursively calling this same function\r\n            // it will recieve the subMenu created above and the array of items from the json object\r\n            displayMenu(subMenu, menuItem.sub);\r\n            // append it to the correct list element\r\n            li.appendChild(subMenu);\r\n            return li;\r\n        }\r\n        // return the list element\r\n        return li;\r\n    });\r\n\r\n    // append the items of the menuMap to the menu <ul>\r\n    menuMap.forEach((item, index) => {\r\n        ul.appendChild(menuMap[index]);\r\n    });\r\n    // return the generated menu\r\n    return menuMap;\r\n}\r\n\r\n// the recursive function call wasn't working when it was inside the module.exports object directly.\r\n// so break it out and set the function here.\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/utils/displayMenu.js?");

/***/ }),

/***/ "./src/mock-data/test-data.json":
/*!**************************************!*\
  !*** ./src/mock-data/test-data.json ***!
  \**************************************/
/*! exports provided: menu, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"menu\\\":[{\\\"name\\\":\\\"Basic Link\\\",\\\"slug\\\":\\\"\\\",\\\"link\\\":\\\"/\\\",\\\"sub\\\":null},{\\\"name\\\":\\\"Item with classes\\\",\\\"slug\\\":\\\"item-with-classes\\\",\\\"link\\\":\\\"/item-with-classes\\\",\\\"sub\\\":null,\\\"classes\\\":[\\\"test-class\\\",\\\"another-class\\\",\\\"last-class\\\"]},{\\\"name\\\":\\\"Link with complete submenu\\\",\\\"slug\\\":\\\"link-with-complete-submenu\\\",\\\"link\\\":\\\"/link-with-complete-submenu\\\",\\\"sub\\\":[{\\\"name\\\":\\\"Submenu Item 1\\\",\\\"slug\\\":\\\"submenu-item-1\\\",\\\"link\\\":\\\"/submenu-item-1\\\",\\\"sub\\\":[{\\\"name\\\":\\\"Grandchild 1\\\",\\\"slug\\\":\\\"grandchild-1\\\",\\\"link\\\":\\\"/submenu-item-1/grandchild-1\\\",\\\"sub\\\":null},{\\\"name\\\":\\\"Grandchild 2\\\",\\\"slug\\\":\\\"grandchild-2\\\",\\\"link\\\":\\\"/submenu-item-1/grandchild-2\\\",\\\"sub\\\":null}]},{\\\"name\\\":\\\"Submenu Item 2\\\",\\\"slug\\\":\\\"submenu-item-2\\\",\\\"link\\\":\\\"/submenu-item-2\\\",\\\"sub\\\":null}]},{\\\"name\\\":\\\"Link with non-null submenu\\\",\\\"slug\\\":\\\"link-with-non-null-submenu\\\",\\\"link\\\":\\\"/link-with-non-null-submenu\\\",\\\"sub\\\":[]},{\\\"name\\\":\\\"Non-linked Item\\\",\\\"slug\\\":\\\"non-linked-item\\\"},{\\\"name\\\":\\\"Non-linked Item with empty link\\\",\\\"slug\\\":\\\"non-linked-item-with-empty-link\\\",\\\"link\\\":\\\"\\\"},{\\\"name\\\":\\\"Non-linked Item with Submenu\\\",\\\"slug\\\":\\\"non-linked-item-with-submenu\\\",\\\"link\\\":\\\"\\\",\\\"sub\\\":[{\\\"name\\\":\\\"Child 1\\\",\\\"slug\\\":\\\"child-1\\\",\\\"link\\\":\\\"/child-1\\\"},{\\\"name\\\":\\\"Child 2\\\",\\\"slug\\\":\\\"child-2\\\",\\\"link\\\":\\\"/child-2\\\"}]},{\\\"name\\\":\\\"Link w/ # & Submenu\\\",\\\"slug\\\":\\\"link-with-hash-and-submenu\\\",\\\"link\\\":\\\"#\\\",\\\"sub\\\":[{\\\"name\\\":\\\"Child 1\\\",\\\"slug\\\":\\\"child-1\\\",\\\"link\\\":\\\"/child-1\\\"},{\\\"name\\\":\\\"Child 2\\\",\\\"slug\\\":\\\"child-2\\\",\\\"link\\\":\\\"/child-2\\\"}]}]}\");\n\n//# sourceURL=webpack:///./src/mock-data/test-data.json?");

/***/ })

/******/ });