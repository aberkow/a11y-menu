class Navigation {
  constructor() {
    this.menu = null;
    this.hasNestedSubmenu = false;
    this.opts = {}
  }
  chevronSwitcher(element) {
    if (element.localName !== "button") return;

    const icon = element.children[0];
    const { chevronDown, chevronUp } = this.opts;
    element.getAttribute('aria-expanded') === 'true' ? icon.setAttribute('data-before', chevronUp) : icon.setAttribute('data-before', chevronDown);
  }
  clickHandler(evt) {
    const target = evt.target;
    const submenuList = target.nextSibling;
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
  focusInHandler(evt) {
    const { target, relatedTarget } = evt;
    const { parentNode, offsetParent } = target;
    const parentUL = offsetParent.parentNode;
 
    // if the parentUL isn't the menu and it contains the target return
    if (parentUL !== this.menu && parentUL.contains(target)) {
      return
    } else {
      // close the submenu when you leave
      const expandedElementCollection = parentUL.querySelectorAll('[aria-expanded="true"]');
      const openElementCollection = parentUL.getElementsByClassName('submenu-list-open');

      console.log(expandedElementCollection, 'expanded', openElementCollection, 'open')

      if (expandedElementCollection.length) {
        expandedElementCollection[0].setAttribute('aria-expanded', 'false');
        openElementCollection[0].classList.remove('submenu-list-open');
        this.chevronSwitcher(expandedElementCollection[0]);
      }
    }
  }
  hoverHandler(evt) {
    const { type, target } = evt;
    if (type === 'mouseout' && target.getAttribute('aria-haspopup') === "true") {
      target.setAttribute('aria-expanded', 'false');
    } else if (type === 'mousein' && target.getAttribute('aria-haspopup') === "false") {
      target.setAttribute('aria-expanded', 'true');
    }

    // if you hover and the htmlcollection length is greater than 0
    if (target.children.length > 0) {
      this.chevronSwitcher(target);
    }
  }
  eventDispatcher(evt) {
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
  setEventListeners() {
    // if this script is running, remove the 'no-js' class from the elements.
    const listElements = Array.prototype.slice.call(this.menu.getElementsByClassName('no-js'));
    listElements.forEach(element => {
      element.classList.remove('no-js');
    });
    // define a list of possible event listeners
    const listeners = ['click', 'focusin', 'mouseout', 'mouseover'];
    // attach them to the menu.
    for (let i = 0; i < listeners.length; i++) {
      this.menu.addEventListener(listeners[i], (evt) => {
        // dispatch the events to the class methods.
        this.eventDispatcher(evt);
      });
    }
  }
  setSubmenuIcon() {
    const icons = this.menu.querySelectorAll('.submenu-icon');
    const hoverCss = `
      nav ul li:hover > button span::before,
      nav ul li:focus > button span::before { 
        content: '${this.opts.chevronUp}'; 
      }`;
    const style = document.createElement('style');
    if (style.styleSheet) {
      style.styleSheet.cssText = hoverCss;
    } else {
      style.appendChild(document.createTextNode(hoverCss));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    icons.forEach((icon) => {
      icon.setAttribute('data-before', this.opts.chevronDown);
    })
  }
  init(menuElement, opts = { chevronDown: '∨', chevronUp: '∧' }) {
    this.menu = menuElement;
    this.opts = opts;
    this.setEventListeners();
    this.setSubmenuIcon();
  }
}

module.exports = Navigation;