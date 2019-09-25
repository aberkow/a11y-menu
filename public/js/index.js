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
eval("__webpack_require__.r(__webpack_exports__);\nclass Navigation {\n    constructor({\n        menuId = 'am-main-menu',\n        click = false\n    } = {}) {\n        this.hasNestedSubmenu = false;\n        this.menu = null;\n        this.menuId = menuId;\n        this.click = click;\n        this.currentItem = null;\n    }\n\n    hoverHandler(evt) {\n        const { type, target } = evt;\n        const customEvt = this.createCustomEvt();\n        if (type === 'mouseout' && target.getAttribute('aria-haspopup') === \"true\") {\n            target.setAttribute('aria-expanded', 'false');\n        } else if (type === 'mouseover' && target.getAttribute('aria-haspopup') === \"false\") {\n            target.setAttribute('aria-expanded', 'true');\n        }\n        target.dispatchEvent(customEvt)\n    }\n    /**\n     *\n     * Handle incoming clicks\n     *\n     * @param {object} evt object\n     * @returns void\n     * @memberof Navigation\n     */\n    clickHandler(evt) {\n        let target = evt.target;\n        let submenuList = null;\n\n        // if the click is inside the menu on a button, prevent the target from gaining focus and continue.\n        // otherwise do nothing.\n\n        if (!this.menu.contains(target) && (evt.type === 'mousedown' || evt.type === 'keydown')) {\n            this.clearAll();\n        } else if (this.menu.contains(target) && evt.type !== 'keydown') {\n            evt.preventDefault();\n        } \n\n        // people might click on the icon instead of the button.\n        // if so, set the target to the parent (button)\n        if (target.localName === 'span') {\n            target = target.parentElement;\n        }\n        \n        // if there's an open submenu with sub-submenus...\n        if (document.querySelectorAll('.am-submenu-list-open').length > 0 && !document.querySelectorAll('.am-submenu-list-open')[0].contains(target)) {\n\n            const submenuArray = Array.from(document.querySelectorAll('.am-submenu-list-open'));\n\n            if (target.nextSibling && target.nextSibling.localName === 'ul') {\n                // if you click from one menu item to another, open the next menu and close the previous one immediately.\n                const nextMenu = target.nextSibling;\n                nextMenu.classList.add('am-submenu-list-open');    \n            }\n            \n            submenuArray.forEach((el) => {\n                // toggle all the menus in the NodeList\n                this.toggleSubmenuMenuClass(el);\n            })\n            \n            this.toggleButtonAria(target);\n    \n        } else {\n            const nextSibling = target.nextElementSibling;\n            \n            // we're near a submenu by clicking on a button but the menu isn't initially open.\n            if (nextSibling !== null && nextSibling.localName === 'ul') {\n                submenuList = nextSibling;\n\n                // check if there's a nested submenu\n                submenuList.getElementsByTagName('ul').length ?\n                    this.hasNestedSubmenu = true :\n                    this.hasNestedSubmenu = false;\n        \n                this.toggleSubmenuMenuClass(submenuList);\n                this.toggleButtonAria(target);\n            }\n        }\n\n        // set a class on the top level parent of the current selection\n        const currentItem = this.getCurrentItem()\n\n        if (currentItem && currentItem !== 'undefined') {\n            this.setCurrentItem(currentItem)\n        }\n\n    }\n\n    /**\n     * \n     * Handle automatically closing the sub-menus.\n     * When a person opens a sub-menu and then leaves by tabbing, close the sub-menu.\n     * \n     * @param {object} evt\n     * @return - void\n     * @memberof Navigation\n     */\n    focusInHandler(evt) {\n        \n        const { target, target: { offsetParent: { parentNode } } } = evt;\n\n        let expandedButtonArray = Array.from(this.menu.querySelectorAll('[aria-expanded=\"true\"]'));\n        let openMenuArray = Array.from(this.menu.querySelectorAll('.am-submenu-list-open'));\n\n        if (!this.menu.contains(target) && expandedButtonArray.length) {\n            // if we leave the menu, clear everything\n            this.clearAll();\n        } else if (this.menu.contains(target) && openMenuArray.length > 1) {\n            // if focus is still in the menu and there's a sub-sub-menu, \n            // handle openning and closing when focus leaves.\n            openMenuArray.forEach(menu => {\n                if (!menu.contains(target)) {\n                    this.toggleSubmenuMenuClass(menu);\n                    this.toggleButtonAria(menu.previousElementSibling);\n                }\n            })\n        } else {\n            // still in the menu, but moving from one <li> to another\n            // toggle just the button and submenu for the elements that received focusout.\n            expandedButtonArray = Array.from(parentNode.querySelectorAll('[aria-expanded=\"true\"]'));\n            openMenuArray = Array.from(parentNode.querySelectorAll('.am-submenu-list-open'));\n            \n            // check to make sure that the user hasn't moved to a different menu.\n            if (parentNode.id === this.menuId) {\n                this.toggleButtonAria(expandedButtonArray[0]);\n                this.toggleSubmenuMenuClass(openMenuArray[0]);\n                this.clearCurrent();\n            }\n        }\n        return;\n    }\n\n    /**\n     * \n     * Toggle the class of the submenu element or reset the classes for all menus\n     *\n     * @param {object} el - a submenu (<ul>) element.\n     * @memberof Navigation\n     */\n    toggleSubmenuMenuClass(el) {\n        if (el !== null && el !== undefined) {\n            el.classList.toggle('am-submenu-list-open');\n        } else {\n            this.clearMenus();\n        }\n    }\n\n    /**\n     * \n     * Toggle the state of each button to reflect the aria-expanded state\n     *\n     * @param {*} target - the DOM element returned by evt.target\n     * @returns void\n     * @memberof Navigation\n     */\n    toggleButtonAria(target) {\n        const buttonNode = Array.from(document.querySelectorAll('.am-submenu-toggle'));\n        \n        buttonNode.forEach(button => {\n            // for each button, determine if there is a button \"above\" it\n            const prevButton = button.parentElement.parentElement.previousElementSibling;\n\n            // case - clicking on a sub-submenu button which is currently NOT expanded.\n            if (button.isSameNode(target) && button.getAttribute('aria-expanded') === 'false' && prevButton) {\n                // toggle the states of the previous button and the button/target\n                prevButton.setAttribute('aria-expanded', 'true');\n                button.setAttribute('aria-expanded', 'true');\n            }\n            // case - clicking on a sub-submenu button which is currently expanded.\n            else if (button.isSameNode(target) && button.getAttribute('aria-expanded') === 'true' && prevButton) {\n                // keep the previous button expanded and toggle the button/target\n                prevButton.setAttribute('aria-expanded', 'true');\n                button.setAttribute('aria-expanded', 'false');\n            } \n            // case - clicking on a top level button which is currently NOT expanded\n            else if (button.isSameNode(target) && button.getAttribute('aria-expanded') === 'false') {\n                // expand the button\n                button.setAttribute('aria-expanded', 'true');\n            } \n            // case - all other buttons\n            else {\n                // reset the state to false\n                button.setAttribute('aria-expanded', 'false')\n            }\n        });\n        return;\n    }\n\n    /**\n     * Close all submenus\n     * \n     * @returns void\n     * @memberof Navigation\n     */\n    clearMenus() {\n        const menuArray = Array.from(this.menu.querySelectorAll('.am-submenu-list-open'));\n        if (menuArray.length > 0) {\n            menuArray.forEach(menu => {\n                menu.classList.toggle('am-submenu-list-open');\n            })\n        }\n        return;\n    }\n\n    /**\n     * Toggle all visual icons and set aria-expanded to false.\n     *\n     * @returns void\n     * @memberof Navigation\n     */\n    clearButtons() {\n        const buttonArray = Array.from(this.menu.querySelectorAll('.am-submenu-toggle'))\n        buttonArray.forEach((button) => {\n            button.setAttribute('aria-expanded', 'false');\n        })\n        return;\n    }\n\n    /**\n     * Remove the current item from the menu\n     * \n     * @returns void\n     * @memberof Navigation\n     */\n    clearCurrent() {\n        const currentItem = this.menu.querySelector('.am-current-item');\n        if (currentItem) {\n            currentItem.classList.remove('am-current-item');\n        }\n        return;\n    }\n\n    /**\n     * \n     * Completely reset the state of the menu\n     * \n     * @returns void\n     * @memberof Navigation\n     */\n    clearAll() {\n        this.clearMenus();\n        this.clearButtons();\n        this.clearCurrent();\n        return;\n    }\n\n    /**\n     * \n     * Get the button element which is expanded\n     * Helps with identifying the top level list item\n     * \n     * @return DOM element\n     */\n    getCurrentItem() {\n        const expandedEl = this.menu.querySelector('[aria-expanded=\"true\"]')\n        if (expandedEl) {\n            return expandedEl.parentElement;\n        }        \n    }\n\n    /**\n     * \n     * Add a class to the current top level list item\n     * \n     * @param obj the event object\n     * @return void  \n     */\n    setCurrentItem(current) {\n        const itemNode = Array.from(this.menu.querySelectorAll('li'));\n        itemNode.forEach(item => {\n            item.classList.remove('am-current-item');\n        })\n\n        \n        if (current) {\n            this.currentItem = current;\n            this.currentItem.classList.add('am-current-item');\n        }\n    }\n\n    /**\n     *\n     * dispatch events to the correct functions.\n     * types include: click, focusin, keydown, mousedown\n     *\n     * @param {object} evt\n     * @returns void\n     * @memberof Navigation\n     */\n    eventDispatcher(evt) {\n        \n        // mousedown focusin click\n        // keydown focusin keydown click\n        switch (evt.type) {\n            case 'focusin':\n                this.focusInHandler(evt);\n                break;\n            case 'keydown':\n                if (evt.keyCode === 13) {\n                    // if the keydown is caused by the return key, it should be a click\n                    this.clickHandler(evt);\n                } else if (evt.keyCode === 27) {\n                    // if the keydown is caused by the escape key, close the menus\n                    this.clearAll();\n                } else {\n                    // throw away all other events.\n                    return;\n                }\n                break;\n            \n            case 'mousedown':\n                this.clickHandler(evt);\n                break;\n            \n            default:\n                return;\n        }\n    }\n\n    /**\n     *\n     * Remove the no-js class and attach event listeners\n     * \n     * @memberof Navigation\n     */\n    setEventListeners() {\n        // define a list of possible event listeners\n        let listeners = ['focusin', 'keydown', 'mouseover'];\n\n        if (this.click) {\n            listeners.push('mousedown');\n            \n            const subMenuList = Array.from(this.menu.querySelectorAll('.am-submenu-list'));\n            \n            subMenuList.forEach(menu => menu.classList.add('am-click-menu'));\n\n        } else {\n            listeners.push('mouseout');\n        }\n        // attach them to the document.\n        for (let i = 0; i < listeners.length; i++) {\n            document.addEventListener(listeners[i], (evt) => {\n                // dispatch the events to the class methods.\n                this.eventDispatcher(evt);\n            });\n        }\n    }\n\n    /**\n     * \n     * remove the no-js class from list elements\n     * \n     */\n    removeNoJs() {\n        const listElements = Array.from(this.menu.querySelectorAll('.no-js'));\n        listElements.forEach(element => {\n            element.classList.remove('no-js');\n        });\n    }\n\n    /**\n     * \n     * Initialize the menu by\n     * - assigning the menu\n     * - attaching event listeners\n     *\n     * @memberof Navigation\n     */\n    init() {\n        this.menu = document.getElementById(this.menuId);\n        this.removeNoJs()\n        this.setEventListeners();\n    }\n}\n\n/* strip-code */\n/* harmony default export */ __webpack_exports__[\"default\"] = (Navigation);\n/* end-strip-code */\n\n//# sourceURL=webpack:///./src/js/Navigation/Navigation.js?");

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