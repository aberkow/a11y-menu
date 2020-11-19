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
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Navigation {\n  constructor(\n    {\n      menuId = 'main-menu',\n      fontFamily = 'Font Awesome 5 Free',\n      chevronDown = '\\\\f078',\n      chevronUp = '\\\\f077'\n    } = {}\n  ) {\n    this.chevronDown = chevronDown;\n    this.chevronUp = chevronUp;\n    this.fontFamilies = ['FontAwesome', 'Font Awesome 5 Free', 'Glyphicons Halflings'];\n    this.fontFamily = fontFamily;\n    this.hasNestedSubmenu = false;\n    this.menu = null;\n    this.menuId = menuId;\n  }\n  chevronSwitcher(element) {\n    if (element.localName !== \"button\") return;\n    \n    const icon = element.children[0];\n\n    element.getAttribute('aria-expanded') === 'true' ? icon.setAttribute('data-before', this.chevronUp) : icon.setAttribute('data-before', this.chevronDown);\n  }\n  clickHandler(evt) {\n    const target = evt.target;\n    const submenuList = target.nextSibling;\n    // find out if there is a nested submenu inside a top level item\n    submenuList.getElementsByTagName('ul').length ? this.hasNestedSubmenu = true : this.hasNestedSubmenu = false;\n    // if something weird happens, don't allow any further event handling.\n    if (!target.getAttribute('aria-haspopup')) return;\n\n    // if we're on a list item that is really just a toggle, \n    // that is it doesn't have a page that it goes to, prevent the page from reloading.\n    target.className === 'submenu-toggle' ? evt.preventDefault() : null;\n\n    submenuList.classList.toggle('submenu-list-open');\n    target.setAttribute('aria-expanded', 'true');\n\n    submenuList.classList.contains('submenu-list-open') ? null : target.setAttribute('aria-expanded', 'false');\n\n    if (target.children) {\n      this.chevronSwitcher(target);\n    }\n  }\n  focusInHandler(evt) {\n    const { target, relatedTarget } = evt;\n    const { parentNode, offsetParent } = target;\n    const parentUL = offsetParent.parentNode;\n \n    // if the parentUL isn't the menu and it contains the target return\n    if (parentUL !== this.menu && parentUL.contains(target)) {\n      return\n    } else {\n      // close the submenu when you leave\n      const expandedElementCollection = parentUL.querySelectorAll('[aria-expanded=\"true\"]');\n      const openElementCollection = parentUL.getElementsByClassName('submenu-list-open');\n\n      if (expandedElementCollection.length) {\n        expandedElementCollection[0].setAttribute('aria-expanded', 'false');\n        openElementCollection[0].classList.remove('submenu-list-open');\n        this.chevronSwitcher(expandedElementCollection[0]);\n      }\n    }\n  }\n  hoverHandler(evt) {\n    const { type, target } = evt;\n    if (type === 'mouseout' && target.getAttribute('aria-haspopup') === \"true\") {\n      target.setAttribute('aria-expanded', 'false');\n    } else if (type === 'mouseover' && target.getAttribute('aria-haspopup') === \"false\") {\n      target.setAttribute('aria-expanded', 'true');\n    }\n\n    // if you hover and the htmlcollection length is greater than 0\n    if (target.children.length > 0) {\n      this.chevronSwitcher(target);\n    }\n  }\n  eventDispatcher(evt) {\n    // dispatch event listeners to the correct functions.\n    switch (evt.type) {\n      case 'click':\n        this.clickHandler(evt);\n        break;\n      case 'focusin':\n        this.focusInHandler(evt);\n        break;\n      case 'mouseover':\n      case 'mouseout':\n        this.hoverHandler(evt);\n        break;\n      default:\n        return;\n        break;\n    }\n  }\n  setEventListeners() {\n    // if this script is running, remove the 'no-js' class from the elements.\n    const listElements = Array.prototype.slice.call(this.menu.getElementsByClassName('no-js'));\n    listElements.forEach(element => {\n      element.classList.remove('no-js');\n    });\n    // define a list of possible event listeners\n    const listeners = ['click', 'focusin', 'mouseout', 'mouseover'];\n    // attach them to the menu.\n    for (let i = 0; i < listeners.length; i++) {\n      this.menu.addEventListener(listeners[i], (evt) => {\n        // dispatch the events to the class methods.\n        this.eventDispatcher(evt);\n      });\n    }\n  }\n  setSubmenuIcon() {\n    // possible font-family for the icons\n    let fontFamily = this.fontFamily;\n\n    if (!this.fontFamilies.includes(fontFamily)) {\n      fontFamily = '';\n    }\n\n    // the list of all the submenu icons\n    const icons = this.menu.querySelectorAll('.submenu-icon');\n    // the css to inject into the page\n    const hoverCss = `\n      nav ul li span::before {\n        content: '${this.chevronDown}';\n        font-family: '${fontFamily}';\n        font-weight: bold;\n      }\n      nav ul li:hover > button span::before,\n      nav ul li:focus > button span::before { \n        content: '${this.chevronUp}';\n        font-family: '${fontFamily}'; \n        font-weight: bold;\n      }`;\n\n    // create a style tag\n    const style = document.createElement('style');\n    // add the styles to the tag (or a stylesheet if it exists)\n    if (style.styleSheet) {\n      style.styleSheet.cssText = hoverCss;\n    } else {\n      style.appendChild(document.createTextNode(hoverCss));\n    }\n    // add the tag to the <head>\n    document.getElementsByTagName('head')[0].appendChild(style);\n    // set the data-before attribute to the values passed in the constructor.\n    icons.forEach((icon) => {\n      icon.setAttribute('data-before', this.chevronDown);\n    })\n  }\n  init() {\n    this.menu = document.getElementById(this.menuId);\n    this.setEventListeners();\n    this.setSubmenuIcon();\n  }\n}\n/* start-remove */\nmodule.exports = Navigation;\n/* end-remove */\n\n//# sourceURL=webpack:///./src/js/Navigation/Navigation.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_displayMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/displayMenu */ \"./src/js/utils/displayMenu.js\");\n/* harmony import */ var _utils_displayMenu__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_displayMenu__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Navigation_Navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Navigation/Navigation */ \"./src/js/Navigation/Navigation.js\");\n/* harmony import */ var _Navigation_Navigation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Navigation_Navigation__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nconst testData = __webpack_require__(/*! ../mock-data/test-data.json */ \"./src/mock-data/test-data.json\");\nconst mainMenu = document.getElementById('main-menu');\n\nconst navigation = new _Navigation_Navigation__WEBPACK_IMPORTED_MODULE_1___default.a();\n\nObject(_utils_displayMenu__WEBPACK_IMPORTED_MODULE_0__[\"displayMenu\"])(mainMenu, testData.menu);\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  navigation.init();\n});\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/utils/displayMenu.js":
/*!*************************************!*\
  !*** ./src/js/utils/displayMenu.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n*\n* This function takes in a json menu item and returns the appropriate markup\n*\n*/\n\nconst generateMenuItemMarkup = (menuItem) => {\n  // set a state for having a submenu and/or link\n  let hasSubmenu = false;\n  let hasLink = false;\n\n  if (menuItem.hasOwnProperty('sub') && menuItem.sub !== null && menuItem.sub.length) {\n    hasSubmenu = true;\n  }\n\n  if (menuItem.hasOwnProperty('link') && menuItem.link.length) {\n    hasLink = true;\n  }\n  if (hasLink && hasSubmenu) {\n    return `<a class='submenu-link' aria-label='${menuItem.name}, tab to the next button to expand the sub-menu' href=${menuItem.link}>${menuItem.name}</a><button class='submenu-button submenu-toggle' aria-haspopup='true' aria-expanded='false' aria-label='show submenu'><span class='submenu-icon' aria-hidden='true' data-before='∨'></span></button>`;\n  } else if (!hasLink || !hasLink && hasSubmenu) {\n    return `<button aria-haspopup='true' aria-expanded='false' class='submenu-toggle'>${menuItem.name}<span class='submenu-icon' aria-hidden='true' data-before='∨'></span></button>`;\n  } else {\n    // just a link\n    return `<a href=${menuItem.link}>${menuItem.name}</a>`;\n  }\n}\n\n/*\n*\n* This function will generate the markup for the menu.\n* The two arguments are the <ul> to attach the menu to and the json data to read from.\n*\n*/ \n\nconst displayMenu = (ul, json) => {\n  const menuMap = json.map((menuItem, index) => {\n    let classes = [];\n    // create a list item\n    const li = document.createElement('li');\n\n    li.innerHTML = generateMenuItemMarkup(menuItem);\n\n    if (menuItem.hasOwnProperty('classes') && menuItem.classes !== null && menuItem.classes.length) {\n      classes = menuItem.classes;\n      classes.push('no-js');\n    } else {\n      classes.push('no-js');\n    }\n\n    li.classList.add(...classes);\n\n\n    // check if there are submenu items\n    // if there are, create a submenu <ul>\n    // then, recursively call this function\n\n    // this if statement is clearly ridiculous and needs to be refactored\n    if (menuItem.hasOwnProperty('sub') && menuItem.sub !== null && menuItem.sub.length) {\n      // li.setAttribute('data-count', index);\n      li.setAttribute('data-has-children', 'true');\n      // create a <ul> to hold the submenu\n      const subMenu = document.createElement('ul');\n      ul.classList.add('submenu-list');\n      // this is super temporary. just to get things rolling...\n      subMenu.id = `submenu-${menuItem.slug}`;\n      // create the submenu structure by recursively calling this same function\n      // it will recieve the subMenu created above and the array of items from the json object\n      displayMenu(subMenu, menuItem.sub);\n      // append it to the correct list element\n      li.appendChild(subMenu);\n      return li;\n    } \n    // return the list element\n    return li;\n  });\n\n  // append the items of the menuMap to the menu <ul>\n  menuMap.forEach((item, index) => {\n    ul.appendChild(menuMap[index]);\n  });\n\n  // return the generated menu\n  return menuMap;\n}\n\n// the recursive function call wasn't working when it was inside the module.exports object directly.\n// so break it out and set the function here.\nmodule.exports.displayMenu = displayMenu;\n\n//# sourceURL=webpack:///./src/js/utils/displayMenu.js?");

/***/ }),

/***/ "./src/mock-data/test-data.json":
/*!**************************************!*\
  !*** ./src/mock-data/test-data.json ***!
  \**************************************/
/*! exports provided: menu, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"menu\\\":[{\\\"name\\\":\\\"Basic Link\\\",\\\"slug\\\":\\\"\\\",\\\"link\\\":\\\"/\\\",\\\"sub\\\":null},{\\\"name\\\":\\\"Item with classes\\\",\\\"slug\\\":\\\"item-with-classes\\\",\\\"link\\\":\\\"/item-with-classes\\\",\\\"sub\\\":null,\\\"classes\\\":[\\\"test-class\\\",\\\"another-class\\\",\\\"last-class\\\"]},{\\\"name\\\":\\\"Link with complete submenu\\\",\\\"slug\\\":\\\"link-with-complete-submenu\\\",\\\"link\\\":\\\"/link-with-complete-submenu\\\",\\\"sub\\\":[{\\\"name\\\":\\\"Submenu Item 1\\\",\\\"slug\\\":\\\"submenu-item-1\\\",\\\"link\\\":\\\"/submenu-item-1\\\",\\\"sub\\\":[{\\\"name\\\":\\\"Grandchild 1\\\",\\\"slug\\\":\\\"grandchild-1\\\",\\\"link\\\":\\\"/submenu-item-1/grandchild-1\\\",\\\"sub\\\":null},{\\\"name\\\":\\\"Grandchild 2\\\",\\\"slug\\\":\\\"grandchild-2\\\",\\\"link\\\":\\\"/submenu-item-1/grandchild-2\\\",\\\"sub\\\":null}]},{\\\"name\\\":\\\"Submenu Item 2\\\",\\\"slug\\\":\\\"submenu-item-2\\\",\\\"link\\\":\\\"/submenu-item-2\\\",\\\"sub\\\":null}]},{\\\"name\\\":\\\"Link with non-null submenu\\\",\\\"slug\\\":\\\"link-with-non-null-submenu\\\",\\\"link\\\":\\\"/link-with-non-null-submenu\\\",\\\"sub\\\":[]},{\\\"name\\\":\\\"Non-linked Item\\\",\\\"slug\\\":\\\"non-linked-item\\\"},{\\\"name\\\":\\\"Non-linked Item with empty link\\\",\\\"slug\\\":\\\"non-linked-item-with-empty-link\\\",\\\"link\\\":\\\"\\\"},{\\\"name\\\":\\\"Non-linked Item with Submenu\\\",\\\"slug\\\":\\\"non-linked-item-with-submenu\\\",\\\"link\\\":\\\"\\\",\\\"sub\\\":[{\\\"name\\\":\\\"Child 1\\\",\\\"slug\\\":\\\"child-1\\\",\\\"link\\\":\\\"/child-1\\\"},{\\\"name\\\":\\\"Child 2\\\",\\\"slug\\\":\\\"child-2\\\",\\\"link\\\":\\\"/child-2\\\"}]}]}\");\n\n//# sourceURL=webpack:///./src/mock-data/test-data.json?");

/***/ })

/******/ });