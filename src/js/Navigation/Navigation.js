class Navigation {
    constructor({
        menuId = 'main-menu',
        fontFamily = 'Font Awesome 5 Free',
        chevronDown = '\\f078',
        chevronUp = '\\f077',
        click = false
    } = {}) {
        this.chevronDown = chevronDown;
        this.chevronUp = chevronUp;
        this.fontFamilies = ['FontAwesome', 'Font Awesome 5 Free', 'Glyphicons Halflings'];
        this.fontFamily = fontFamily;
        this.hasNestedSubmenu = false;
        this.menu = null;
        this.menuId = menuId;
        this.click = click;
    }
    clickHandler(evt) {
        let target = evt.target;
        if (target.localName == "span") {
            target = target.parentElement;
        }
        const submenuList = target.nextSibling;
        // find out if there is a nested submenu inside a top level item
        submenuList.getElementsByTagName('ul').length ? this.hasNestedSubmenu = true : this.hasNestedSubmenu = false;
        // if something weird happens, don't allow any further event handling.
        if (!target.getAttribute('aria-haspopup')) return;

        // if we're on a list item that is really just a toggle, 
        // that is it doesn't have a page that it goes to, prevent the page from reloading.
        target.classList.contains('submenu-toggle') ? evt.preventDefault() : null;

        submenuList.classList.toggle('submenu-list-open');
        target.setAttribute('aria-expanded', 'true');

        submenuList.classList.contains('submenu-list-open') ? null : target.setAttribute('aria-expanded', 'false');
    }
    focusInHandler(evt) {
        const { target } = evt;
        const { offsetParent: { parentNode } } = target;

        // if the parentUL isn't the menu and it contains the target return
        if (parentNode !== this.menu && parentNode.contains(target)) {
            return
        } else {
            // close the submenu when you leave
            const expandedElementCollection = parentNode.querySelectorAll('[aria-expanded="true"]');
            const openElementCollection = parentNode.getElementsByClassName('submenu-list-open');

            if (expandedElementCollection.length) {
                // expandedElementCollection[0].setAttribute('aria-expanded', 'false');
                // openElementCollection[0].classList.remove('submenu-list-open');
            }
        }
    }
    keyDownHandler(evt) {
        const { keyCode, target } = evt;
        const { offsetParent: { parentNode } } = target;
        const expandedElementCollection = parentNode.querySelectorAll('[aria-expanded="true"]')[0];
        const openSubmenu = parentNode.getElementsByClassName('submenu-list-open')[0];

        if (keyCode === 27 && openSubmenu) {
            expandedElementCollection.setAttribute('aria-expanded', 'false');
            openSubmenu.classList.remove('submenu-list-open');
        }

    }
    hoverHandler(evt) {
        const { type, target } = evt;
        if (type === 'mouseout' && target.getAttribute('aria-haspopup') === "true") {
            target.setAttribute('aria-expanded', 'false');
        } else if (type === 'mouseover' && target.getAttribute('aria-haspopup') === "false") {
            target.setAttribute('aria-expanded', 'true');
        }
    }
    eventDispatcher(evt) {
        // dispatch event listeners to the correct functions.
        switch (evt.type) {
            case 'click':
                this.clickHandler(evt);
                break;
            case 'focusin':
                this.focusInHandler(evt);
                break;
            case 'keydown':
                this.keyDownHandler(evt);
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
        let listeners = ['focusin', 'keydown', 'mouseover'];
        console.log(this.click);
        if (this.click) {
            listeners.push('click');
        } else {
            listeners.push('mouseout');
        }
        // attach them to the menu.
        for (let i = 0; i < listeners.length; i++) {
            this.menu.addEventListener(listeners[i], (evt) => {
                // dispatch the events to the class methods.
                this.eventDispatcher(evt);
            });
        }
    }
    setSubmenuIcon() {
        // possible font-family for the icons
        let fontFamily = this.fontFamily;

        if (!this.fontFamilies.includes(fontFamily)) {
            fontFamily = '';
        }

        // the list of all the submenu icons
        const icons = this.menu.querySelectorAll('.submenu-icon');
        // the css to inject into the page
        const hoverCss = `
      nav ul li span::before {
        content: '${this.chevronDown}';
        font-family: '${fontFamily}';
        font-weight: bold;
      }
      nav ul.click-menu li > button[aria-expanded="true"] span::before,
      nav ul:not(.click-menu) li:hover > button span::before,
      nav ul li:focus > button span::before { 
        content: '${this.chevronUp}';
        font-family: '${fontFamily}'; 
        font-weight: bold;
      }`;

        // create a style tag
        const style = document.createElement('style');
        // add the styles to the tag (or a stylesheet if it exists)
        if (style.styleSheet) {
            style.styleSheet.cssText = hoverCss;
        } else {
            style.appendChild(document.createTextNode(hoverCss));
        }
        // add the tag to the <head>
        document.getElementsByTagName('head')[0].appendChild(style);
        // set the data-before attribute to the values passed in the constructor.
        icons.forEach((icon) => {
            icon.setAttribute('data-before', this.chevronDown);
        })
    }
    init() {
        this.menu = document.getElementById(this.menuId);
        this.setEventListeners();
        this.setSubmenuIcon();
    }
}

module.exports = Navigation;