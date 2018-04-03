class Navigation {
  constructor() {
    this.menu = null;
    this.previousItemCount = null;
    this.hasNestedSubmenu = false;
  }
  chevronSwitcher(element) {
    if (element.localName !== "button") return;

    const icon = element.children[0];

    element.getAttribute('aria-expanded') === 'true' ? icon.setAttribute('data-before', '∧') : icon.setAttribute('data-before', '∨');
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
    console.log(parentUL, this.menu);


    // maybe check to see if the parents are different?
    // then also if the elements are open?


    // if the parentUL isn't the menu and it contains the target return
    if (parentUL !== this.menu && parentUL.contains(target)) {
      // console.log('something...')
      return
    } else {
      // close the submenu when you leave?
      console.log('get ready to close...')
      const expandedElementCollection = parentUL.querySelectorAll('[aria-expanded="true"]');
      const openElementCollection = parentUL.getElementsByClassName('submenu-list-open');
      // const buttonCollection = parentUL.getElementsByClassName('submenu-toggle');

      console.log(expandedElementCollection, 'expanded', openElementCollection, 'open')

      if (expandedElementCollection.length) {
        expandedElementCollection[0].setAttribute('aria-expanded', 'false');
        openElementCollection[0].classList.remove('submenu-list-open');
        this.chevronSwitcher(expandedElementCollection[0]);
      }



    }



    // let parentCount = null;


    // if (offsetParent.getAttribute('data-count')) {
    //   parentCount = offsetParent.getAttribute('data-count')
    // }

    // const test = this.menu.getElementsByTagName('a');
    // console.log(test)



    // console.log(parentCount)
    // console.dir(parentNode.children);

    // console.dir(offsetParent.children)

    // if (offsetParent.children && offsetParent.children.length > 1) {
    // }


    // console.log(relatedTarget, 'target', offsetParent, 'offsetParent')

    // if (!target.parentNode.getAttribute('data-count')) return;

    // console.log(evt)
    // console.log(target.nextSibling)

    // console.log(target.compareDocumentPosition(offsetParent));



    // const parentItemCount = parseInt(parentNode.getAttribute('data-count'));

    // console.log(offsetParent.contains(target));
    // console.log(relatedTarget.contains(target))


  }
  focusInHandlerOld(evt) {
    // target - the element about to receive focus
    // relatedTarget - the element which has just lost focus

    const { target, relatedTarget } = evt;

    // if the parent doesn't have the attribute return so that we never get undefined as a choice
    if (!target.parentNode.getAttribute('data-count')) return;

    const parentItemCount = parseInt(target.parentNode.getAttribute('data-count'));

    // if the element we're going to doesn't contain the element we're leaving...
    if (!target.contains(relatedTarget)) {
      const topLevelElement = document.querySelector(`[data-count="${this.previousItemCount}"]`);
      const expandedElementCollection = topLevelElement.querySelectorAll('[aria-expanded="true"]');
      const openElementCollection = topLevelElement.getElementsByClassName('submenu-list-open');
      const buttonCollection = topLevelElement.getElementsByClassName('submenu-toggle');

      console.log(topLevelElement, this.previousItemCount)
      this.previousItemCount = parentItemCount;
      
      
      if (expandedElementCollection.length) { console.log(expandedElementCollection, 'expanded') }
      if (target.offsetParent === topLevelElement) { console.log(target.offsetParent, 'offset')}
      
      // handling multi-level submenus.
      // target.offsetParent is the wrapper.
      // if it is the same as the top level li and there's a expanded element, control the other elements.
      // OR...
      // if there's a expanded elemenent and a nested submenu, control the elements.
      // checking to see if there's a nested submenu prevents the submenu from automatically closing by accident
      // if (target.offsetParent === topLevelElement) {
      if ((target.offsetParent === topLevelElement && expandedElementCollection.length) || (!this.hasNestedSubmenu && expandedElementCollection.length  )) {
        console.log(expandedElementCollection, 'expandedElColl')
        console.log(target.offsetParent, topLevelElement);
        console.log(openElementCollection);
        expandedElementCollection[0].setAttribute('aria-expanded', 'false');
        openElementCollection[0].classList.remove('submenu-list-open');
        this.chevronSwitcher(buttonCollection[0]);
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
  init(menuElement) {
    this.menu = menuElement;
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
}

module.exports = Navigation;