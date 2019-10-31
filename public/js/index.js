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
eval("__webpack_require__.r(__webpack_exports__);\nclass Navigation {\n    constructor({\n        menuId = 'am-main-menu',\n        click = false\n    } = {}) {\n        this.menu = null\n        this.menuId = menuId\n        this.click = click\n        this.currentItem = null\n    }\n\n    /**\n     * \n     * js is available\n     * remove the no-js class from nav menu list items\n     * \n     */\n    removeNoJs() {\n        const listItems = Array.from(this.menu.querySelectorAll('.no-js'))\n        listItems.map(item => item.classList.remove('no-js'))\n    }\n\n    /**\n     * \n     * Get the button element which is expanded\n     * Helps with identifying the top level list item\n     * \n     * @return DOM element\n     */\n    getCurrentTopLevelItem(target) {\n        if (target !== null) {\n            return target.closest(`#${this.menuId} > li`)\n        }\n    }\n\n    /**\n     *\n     * Manage the state of the top level item associated with targets\n     * \n     * @param {*} target \n     * @returns {Element} the top level <li> associated with the target\n     * @memberof Navigation\n     */\n    toggleCurrentTopLevelItemClass(target) {\n        const topLevelItems = Array.from(document.querySelectorAll(`#${this.menuId} > li`))\n        return topLevelItems.map(item => {\n            item.classList.remove('am-current-item')\n            if (item.contains(target)) {\n                item.classList.add('am-current-item')\n                return item\n            }\n        }).filter(item => {\n            if (item !== undefined) {\n                return item\n            }\n        })[0]\n    }\n\n    /**\n     * \n     * Opens and closes submenus\n     * Change the state of the aria-expanded property and submenu class\n     *\n     * @param {*} target DOM Node - specifically a <button />\n     * @memberof Navigation\n     */\n    manageSubmenuState(target) {\n        const buttons = Array.from(this.menu.querySelectorAll('.am-submenu-toggle'))\n        \n        buttons.map(button => {\n            const prevButton = button.parentElement.parentElement.previousElementSibling;\n            const submenu = button.nextElementSibling\n            const submenuOpenClass = 'am-submenu-list-open'\n            const sameNode = button.isSameNode(target)\n            const ariaExpanded = button.getAttribute('aria-expanded')\n            let parentSubmenu;\n\n            // if for some reason there's a button with no submenu, return immediately\n            if (!submenu) return\n\n            // case - clicking on a sub-submenu button which is currently NOT expanded.\n            if (sameNode && ariaExpanded === 'false' && prevButton) {\n\n                // find the parent submenu\n                parentSubmenu = prevButton.nextElementSibling\n\n                // toggle the states of the previous button and the button/target\n                prevButton.setAttribute('aria-expanded', 'true');\n                button.setAttribute('aria-expanded', 'true');\n\n                // keep the parent submenu open\n                parentSubmenu.classList.add(submenuOpenClass)\n\n                // open the sub-submenu\n                submenu.classList.add(submenuOpenClass)\n            }\n\n            // case - clicking on a sub-submenu button which is currently expanded.\n            else if (sameNode && ariaExpanded === 'true' && prevButton) {\n\n                // find the parent submenu\n                parentSubmenu = prevButton.nextElementSibling\n\n                // keep the previous button expanded and toggle the button/target\n                prevButton.setAttribute('aria-expanded', 'true');\n                button.setAttribute('aria-expanded', 'false');\n\n                // keep the parent submenu open\n                parentSubmenu.classList.add(submenuOpenClass)\n\n                // close the sub-submenu\n                submenu.classList.remove(submenuOpenClass)\n            }\n            // case - clicking on a top level button which is currently NOT expanded\n            else if (sameNode && ariaExpanded === 'false') {\n                // expand the button\n                button.setAttribute('aria-expanded', 'true');\n                // open the submenu\n                submenu.classList.add(submenuOpenClass)\n            }\n            // case - all other buttons\n            else {\n                // reset aria-expanded to false\n                button.setAttribute('aria-expanded', 'false')\n                // close the submenu\n                submenu.classList.remove(submenuOpenClass)\n            }\n        })\n    }\n\n    /**\n     *\n     * remove the am-submenu-list-open class from all submenus not associated with the target\n     * \n     * @param {object} target - the event target\n     * @memberof Navigation\n     */\n    clearSubmenuClass(target) {\n        const menuArray = Array.from(document.querySelectorAll('.am-submenu-list-open'))\n        if (!target.closest('.am-submenu-toggle')) {\n            menuArray.map(menu => menu.classList.remove('am-submenu-list-open'))\n        }\n    }\n\n    /**\n     *\n     * set aria-expanded false on all buttons not associated with the target\n     *\n     * @param {object} target - the event target\n     * @memberof Navigation\n     */\n    clearAllAriaExpanded(target) {\n        const buttonArray = Array.from(document.querySelectorAll('.am-submenu-toggle'))\n        if (!target.closest('.am-submenu-toggle')) {\n            buttonArray.map(button => button.setAttribute('aria-expanded', 'false'))\n        }\n    }\n\n    /**\n     *\n     * close all submenus and set the state of all items with aria-expanded to false\n     * remove event listeners from the document\n     *\n     * @param {object} { target } destructured from the event object\n     * @memberof Navigation\n     */\n    clearAll({ target }) {\n        this.clearSubmenuClass(target)\n        this.clearAllAriaExpanded(target)\n        document.removeEventListener('click', this.clearAll.bind(this))\n        document.removeEventListener('focusin', this.clearAll.bind(this))\n        document.removeEventListener('keydown', this.clearAll.bind(this))\n    }\n\n    /**\n     *\n     * Remove the no-js class and attach event listeners to the menu\n     * \n     * @memberof Navigation\n     */\n    setMenuEventListeners() {\n        let listeners = ['focusin', 'keydown'];\n\n        if (this.click) {\n            listeners.push('mousedown');\n\n            const subMenuList = [].slice.call(this.menu.querySelectorAll('.am-submenu-list'));\n\n            subMenuList.forEach(menu => menu.classList.add('am-click-menu'));\n        }\n\n        for (let i = 0; i < listeners.length; i++) {\n            this.menu.addEventListener(listeners[i], (evt) => {\n                this.eventDispatcher(evt);\n            });\n        }\n    }\n\n    /**\n     *\n     * attach event listeners to the document\n     *  - click: clicks on the body clear the menu\n     *  - focusin: if the body gets focus, clear the menu\n     *  - keydown: if the escape key is pressed, clear the menu\n     *\n     * @param {object} target\n     * @memberof Navigation\n     */\n    setDocumentEventListeners(target) {\n        if (target.getAttribute('aria-expanded') === 'true') {\n            this.clearAll = this.clearAll.bind(this)\n\n            document.addEventListener('click', this.clearAll)\n\n            document.addEventListener('focusin', (evt) => {\n                if (!this.menu.contains(evt.target)) {\n                    this.clearAll({ target: document.body })\n                }\n            })\n            \n            document.addEventListener('keydown', (evt) => {\n                if (evt.which === 27) {\n                    this.clearAll({ target: document.body })\n                }\n            })\n        }\n    }\n\n    /**\n     *\n     * dispatch events to the correct functions.\n     * types include: focusin, keydown, mousedown\n     * \n     * treat keydowns from the return key (13) as mousedown events\n     *\n     * @param {object} evt\n     * @returns void\n     * @memberof Navigation\n     */\n    eventDispatcher(evt) {\n        switch (evt.type) {\n            case 'focusin':\n                this.focusInHandler(evt)\n                break;\n            case 'keydown':\n                if (evt.keyCode === 13) {\n                    this.mouseDownHandler(evt)\n                } \n                break;\n            case 'mousedown':\n                this.mouseDownHandler(evt)\n                break;\n            default:\n                return;\n        }\n    }\n\n    /**\n     *\n     * handle mousedown events by managing\n     * - submenu classes\n     * - aria-expanded state\n     * - event listeners on the document\n     * \n     * @param {object} { target } destructured from the event object\n     * @memberof Navigation\n     */\n    mouseDownHandler(evt) {\n        // a click on the button should not introduce focus\n        evt.preventDefault()\n\n        const { target } = evt\n\n        this.toggleCurrentTopLevelItemClass(target)\n        this.manageSubmenuState(target)\n        this.setDocumentEventListeners(target)\n    }\n\n    /**\n     *\n     * Handle focusin events\n     * \n     * @param {*} { target, relatedTarget } DOM targets \n     * @memberof Navigation\n     */\n    focusInHandler({ target, relatedTarget }) {\n        const topItem = this.toggleCurrentTopLevelItemClass(target)\n        if (this.menu.contains(relatedTarget) && !topItem.contains(relatedTarget)) {\n            this.clearAll({ target: document.body })\n        }\n    }\n\n    init() {\n        this.menu = document.getElementById(this.menuId)\n        this.removeNoJs()\n        this.setMenuEventListeners()\n    }\n}\n\n/* strip-code */\n/* harmony default export */ __webpack_exports__[\"default\"] = (Navigation);\n/* end-strip-code */\n\n//# sourceURL=webpack:///./src/js/Navigation/Navigation.js?");

/***/ }),

/***/ "./src/js/exports.js":
/*!***************************!*\
  !*** ./src/js/exports.js ***!
  \***************************/
/*! exports provided: default, displayMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Navigation_Navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navigation/Navigation */ \"./src/js/Navigation/Navigation.js\");\n/* harmony import */ var _utils_displayMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/displayMenu */ \"./src/js/utils/displayMenu.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"displayMenu\", function() { return _utils_displayMenu__WEBPACK_IMPORTED_MODULE_1__[\"displayMenu\"]; });\n\n// provide one file from which to export assets for the npm package.\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_Navigation_Navigation__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n\n//# sourceURL=webpack:///./src/js/exports.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _exports__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exports */ \"./src/js/exports.js\");\n\n\nconst menus = document.querySelectorAll('nav[id^=\"am-\"]');\nconst testData = __webpack_require__(/*! ../mock-data/test-data.json */ \"./src/mock-data/test-data.json\");\nconst mainMenu = document.getElementById('am-main-menu');\n\nObject(_exports__WEBPACK_IMPORTED_MODULE_0__[\"displayMenu\"])(mainMenu, testData.menu);\nconst navigation = new _exports__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ click: true });\n\ndocument.addEventListener('DOMContentLoaded', (evt) => {\n    Prism.highlightAll();\n    navigation.init();\n});\n\nmenus.forEach(menu => {\n    menu.addEventListener('click', (evt) => {\n        if (evt.target.localName === 'a') {\n            evt.preventDefault();\n            alert('Sorry but the links in these menus don\\'t go anywhere.');\n        }\n    })\n})\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/utils/displayMenu.js":
/*!*************************************!*\
  !*** ./src/js/utils/displayMenu.js ***!
  \*************************************/
/*! exports provided: displayMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"displayMenu\", function() { return displayMenu; });\n/*\n *\n * This function takes in a json menu item and returns the appropriate markup\n *\n */\n\nconst generateMenuItemMarkup = (menuItem) => {\n    // set a state for having a submenu and/or link\n    let hasSubmenu = false;\n    let hasLink = false;\n    \n    if (menuItem.hasOwnProperty('sub') && menuItem.sub !== null && menuItem.sub.length) {\n        hasSubmenu = true;\n    }\n\n    if (menuItem.hasOwnProperty('link') && menuItem.link.length && menuItem.link !== '#') {\n        hasLink = true;\n    }\n    if (hasLink && hasSubmenu) {\n        return `<a class='am-submenu-link' aria-label='${menuItem.name}, tab to the next button to expand the sub-menu' href=${menuItem.link}>${menuItem.name}</a><button class='am-submenu-button am-submenu-toggle' aria-haspopup='true' aria-expanded='false' aria-label='show submenu'><span class='am-submenu-icon' aria-hidden='true' data-before='∨'></span></button>`;\n    } else if (!hasLink || !hasLink && hasSubmenu) {\n        return `<button aria-haspopup='true' aria-expanded='false' class='am-submenu-toggle'>${menuItem.name}<span class='am-submenu-icon' aria-hidden='true' data-before='∨'></span></button>`;\n    } else {\n        // just a link\n        return `<a href=${menuItem.link}>${menuItem.name}</a>`;\n    }\n}\n\n/*\n *\n * This function will generate the markup for the menu.\n * The two arguments are the <ul> to attach the menu to and the json data to read from.\n *\n */\n\nconst displayMenu = (ul, json) => {\n    const menuMap = json.map((menuItem, index) => {\n        let classes = [];\n        // create a list item\n        const li = document.createElement('li');\n\n        li.innerHTML = generateMenuItemMarkup(menuItem);\n\n        if (menuItem.hasOwnProperty('classes') && menuItem.classes !== null && menuItem.classes.length) {\n            classes = menuItem.classes;\n            classes.push('no-js');\n        } else {\n            classes.push('no-js');\n        }\n\n        li.classList.add(...classes);\n\n        // check if there are submenu items\n        // if there are, create a submenu <ul>\n        // then, recursively call this function\n\n        // this if statement is clearly ridiculous and needs to be refactored\n        if (menuItem.hasOwnProperty('sub') && menuItem.sub !== null && menuItem.sub.length) {\n            // li.setAttribute('data-count', index);\n            li.setAttribute('data-has-children', 'true');\n            // create a <ul> to hold the submenu\n            const subMenu = document.createElement('ul');\n            // ul.classList.add('submenu-list');\n            subMenu.classList.add('am-submenu-list');\n            // this is super temporary. just to get things rolling...\n            subMenu.id = `am-submenu-${menuItem.slug}`;\n            // create the submenu structure by recursively calling this same function\n            // it will recieve the subMenu created above and the array of items from the json object\n            displayMenu(subMenu, menuItem.sub);\n            // append it to the correct list element\n            li.appendChild(subMenu);\n            return li;\n        }\n        // return the list element\n        return li;\n    });\n\n    // append the items of the menuMap to the menu <ul>\n    menuMap.forEach((item, index) => {\n        ul.appendChild(menuMap[index]);\n    });\n    // return the generated menu\n    return menuMap;\n}\n\n// the recursive function call wasn't working when it was inside the module.exports object directly.\n// so break it out and set the function here.\n\n\n\n//# sourceURL=webpack:///./src/js/utils/displayMenu.js?");

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