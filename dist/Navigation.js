'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navigation = function () {
  function Navigation() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$menuId = _ref.menuId,
        menuId = _ref$menuId === undefined ? 'main-menu' : _ref$menuId,
        _ref$fontFamily = _ref.fontFamily,
        fontFamily = _ref$fontFamily === undefined ? 'Font Awesome 5 Free' : _ref$fontFamily,
        _ref$chevronDown = _ref.chevronDown,
        chevronDown = _ref$chevronDown === undefined ? '\\f078' : _ref$chevronDown,
        _ref$chevronUp = _ref.chevronUp,
        chevronUp = _ref$chevronUp === undefined ? '\\f077' : _ref$chevronUp;

    _classCallCheck(this, Navigation);

    this.chevronDown = chevronDown;
    this.chevronUp = chevronUp;
    this.fontFamilies = ['FontAwesome', 'Font Awesome 5 Free', 'Glyphicons Halflings'];
    this.fontFamily = fontFamily;
    this.hasNestedSubmenu = false;
    this.menu = null;
    this.menuId = menuId;
  }

  _createClass(Navigation, [{
    key: 'chevronSwitcher',
    value: function chevronSwitcher(element) {
      if (element.localName !== "button") return;

      var icon = element.children[0];

      element.getAttribute('aria-expanded') === 'true' ? icon.setAttribute('data-before', this.chevronUp) : icon.setAttribute('data-before', this.chevronDown);
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler(evt) {
      var target = evt.target;
      var submenuList = target.nextSibling;
      // find out if there is a nested submenu inside a top level item
      submenuList.getElementsByTagName('ul').length ? this.hasNestedSubmenu = true : this.hasNestedSubmenu = false;
      // if something weird happens, don't allow any further event handling.
      if (!target.getAttribute('aria-haspopup')) return;

      // if we're on a list item that is really just a toggle, 
      // that is it doesn't have a page that it goes to, prevent the page from reloading.
      target.className === 'submenu-toggle' ? evt.preventDefault() : null;

      submenuList.classList.toggle('submenu-list-open');
      target.setAttribute('aria-expanded', 'true');

      submenuList.classList.contains('submenu-list-open') ? null : target.setAttribute('aria-expanded', 'false');

      if (target.children) {
        this.chevronSwitcher(target);
      }
    }
  }, {
    key: 'focusInHandler',
    value: function focusInHandler(evt) {
      var target = evt.target,
          relatedTarget = evt.relatedTarget;
      var parentNode = target.parentNode,
          offsetParent = target.offsetParent;

      var parentUL = offsetParent.parentNode;

      // if the parentUL isn't the menu and it contains the target return
      if (parentUL !== this.menu && parentUL.contains(target)) {
        return;
      } else {
        // close the submenu when you leave
        var expandedElementCollection = parentUL.querySelectorAll('[aria-expanded="true"]');
        var openElementCollection = parentUL.getElementsByClassName('submenu-list-open');

        if (expandedElementCollection.length) {
          expandedElementCollection[0].setAttribute('aria-expanded', 'false');
          openElementCollection[0].classList.remove('submenu-list-open');
          this.chevronSwitcher(expandedElementCollection[0]);
        }
      }
    }
  }, {
    key: 'hoverHandler',
    value: function hoverHandler(evt) {
      var type = evt.type,
          target = evt.target;

      if (type === 'mouseout' && target.getAttribute('aria-haspopup') === "true") {
        target.setAttribute('aria-expanded', 'false');
      } else if (type === 'mouseover' && target.getAttribute('aria-haspopup') === "false") {
        target.setAttribute('aria-expanded', 'true');
      }

      // if you hover and the htmlcollection length is greater than 0
      if (target.children.length > 0) {
        this.chevronSwitcher(target);
      }
    }
  }, {
    key: 'eventDispatcher',
    value: function eventDispatcher(evt) {
      // dispatch event listeners to the correct functions.
      switch (evt.type) {
        case 'click':
          this.clickHandler(evt);
          break;
        case 'focusin':
          this.focusInHandler(evt);
          break;
        case 'mouseover':
        case 'mouseout':
          this.hoverHandler(evt);
          break;
        default:
          return;
          break;
      }
    }
  }, {
    key: 'setEventListeners',
    value: function setEventListeners() {
      var _this = this;

      // if this script is running, remove the 'no-js' class from the elements.
      var listElements = Array.prototype.slice.call(this.menu.getElementsByClassName('no-js'));
      listElements.forEach(function (element) {
        element.classList.remove('no-js');
      });
      // define a list of possible event listeners
      var listeners = ['click', 'focusin', 'mouseout', 'mouseover'];
      // attach them to the menu.
      for (var i = 0; i < listeners.length; i++) {
        this.menu.addEventListener(listeners[i], function (evt) {
          // dispatch the events to the class methods.
          _this.eventDispatcher(evt);
        });
      }
    }
  }, {
    key: 'setSubmenuIcon',
    value: function setSubmenuIcon() {
      var _this2 = this;

      // possible font-family for the icons
      var fontFamily = this.fontFamily;

      if (!this.fontFamilies.includes(fontFamily)) {
        fontFamily = '';
      }

      // the list of all the submenu icons
      var icons = this.menu.querySelectorAll('.submenu-icon');
      // the css to inject into the page
      var hoverCss = '\n      nav ul li span::before {\n        content: \'' + this.chevronDown + '\';\n        font-family: \'' + fontFamily + '\';\n        font-weight: bold;\n      }\n      nav ul li:hover > button span::before,\n      nav ul li:focus > button span::before { \n        content: \'' + this.chevronUp + '\';\n        font-family: \'' + fontFamily + '\'; \n        font-weight: bold;\n      }';

      // create a style tag
      var style = document.createElement('style');
      // add the styles to the tag (or a stylesheet if it exists)
      if (style.styleSheet) {
        style.styleSheet.cssText = hoverCss;
      } else {
        style.appendChild(document.createTextNode(hoverCss));
      }
      // add the tag to the <head>
      document.getElementsByTagName('head')[0].appendChild(style);
      // set the data-before attribute to the values passed in the constructor.
      icons.forEach(function (icon) {
        icon.setAttribute('data-before', _this2.chevronDown);
      });
    }
  }, {
    key: 'init',
    value: function init() {
      this.menu = document.getElementById(this.menuId);
      this.setEventListeners();
      this.setSubmenuIcon();
    }
  }]);

  return Navigation;
}();

module.exports = Navigation;
//# sourceMappingURL=Navigation.js.map