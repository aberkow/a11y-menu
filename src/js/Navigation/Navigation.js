// polyfill to support IE
import '@babel/polyfill';

class Navigation {
    constructor({
        menuId = 'main-menu',
        click = false
    } = {}) {
        this.hasNestedSubmenu = false;
        this.menu = null;
        this.menuId = menuId;
        this.click = click;
    }

    hoverHandler(evt) {
        const { type, target } = evt;
        if (type === 'mouseout' && target.getAttribute('aria-haspopup') === "true") {
            target.setAttribute('aria-expanded', 'false');
        } else if (type === 'mouseover' && target.getAttribute('aria-haspopup') === "false") {
            target.setAttribute('aria-expanded', 'true');
        }
    }
    /**
     *
     * Handle incoming clicks
     *
     * @param {object} evt object
     * @returns void
     * @memberof Navigation
     */
    clickHandler(evt) {
        let target = evt.target;
        let submenuList = null;

        // if the click is inside the menu on a button, prevent the target from gaining focus and continue.
        // otherwise do nothing.
        if (this.menu.contains(target) && target.localName !== 'a') {
            evt.preventDefault();
        } else {
            // the click is on a link or outside the menu so it should be cleared.
            this.clearAll();
            return;
        }

        // people might click on the icon instead of the button.
        // if so, set the target to the parent (button)
        if (target.localName === 'span') {
            target = target.parentElement;
        }
        
        // if there's an open submenu with sub-submenus...
        if (document.querySelectorAll('.submenu-list-open').length > 0 && !document.querySelectorAll('.submenu-list-open')[0].contains(target)) {
            
            const submenuArray = Array.from(document.querySelectorAll('.submenu-list-open'));

            if (target.nextSibling && target.nextSibling.localName === 'ul') {
                // if you click from one menu item to another, open the next menu and close the previous one immediately.
                const nextMenu = target.nextSibling;
                nextMenu.classList.add('submenu-list-open');    
            }
            
            submenuArray.forEach((el) => {
                // toggle all the menus in the NodeList
                this.toggleSubmenuMenuClass(el);
            })
            
            
            this.toggleButtonAria(target);
    
        } else {
            // we're near a submenu by clicking on a button but the menu isn't initially open.
            if (target.nextSibling !== null) {
                submenuList = target.nextSibling;

                // check if there's a nested submenu
                submenuList.getElementsByTagName('ul').length ?
                    this.hasNestedSubmenu = true :
                    this.hasNestedSubmenu = false;
        
                this.toggleSubmenuMenuClass(submenuList);
                this.toggleButtonAria(target);
            } 
        }
    }

    /**
     * 
     * Handle automatically closing the sub-menus.
     * When a person opens a sub-menu and then leaves by tabbing, close the sub-menu.
     * 
     * @param {object} evt
     * @return - void
     * @memberof Navigation
     */
    focusInHandler(evt) {
        
        const { target, target: { offsetParent: { parentNode } } } = evt;

        let expandedButtonArray = Array.from(this.menu.querySelectorAll('[aria-expanded="true"]'));
        let openMenuArray = Array.from(this.menu.querySelectorAll('.submenu-list-open'));

        if (!this.menu.contains(target) && expandedButtonArray.length) {
            // if we leave the menu, clear everything
            this.clearAll();
        } else if (this.menu.contains(target) && openMenuArray.length > 1) {
            // if focus is still in the menu and there's a sub-sub-menu, 
            // handle openning and closing when focus leaves.
            openMenuArray.forEach(menu => {
                if (!menu.contains(target)) {
                    this.toggleSubmenuMenuClass(menu);
                    this.toggleButtonAria(menu.previousElementSibling);
                }
            })
        } else {
            // still in the menu, but moving from one <li> to another
            // toggle just the button and submenu for the elements that received focusout.
            expandedButtonArray = Array.from(parentNode.querySelectorAll('[aria-expanded="true"]'));
            openMenuArray = Array.from(parentNode.querySelectorAll('.submenu-list-open'));
            
            // check to make sure that the user hasn't moved to a different menu.
            if (parentNode.id === this.menuId) {
                this.toggleButtonAria(expandedButtonArray[0]);
                this.toggleSubmenuMenuClass(openMenuArray[0]);
            }
        }
        return;
    }

    /**
     * 
     * Toggle the class of the submenu element or reset the classes for all menus
     *
     * @param {object} el - a submenu (<ul>) element.
     * @memberof Navigation
     */
    toggleSubmenuMenuClass(el) {
        if (el !== null && el !== undefined) {
            el.classList.toggle('submenu-list-open');
        } else {
            this.clearMenus();
        }
    }

    /**
     * Close all submenus
     * 
     * @returns void
     * @memberof Navigation
     */
    clearMenus() {
        const menuNode = Array.from(document.querySelectorAll('.submenu-list-open'));
        menuNode.forEach(menu => {
            menu.classList.toggle('submenu-list-open');
        })
        return;
    }

    /**
     * Toggle all visual icons and set aria-expanded to false.
     *
     * @returns void
     * @memberof Navigation
     */
    clearButtons() {
        const buttonNode = Array.from(document.querySelectorAll('.submenu-toggle'));
        buttonNode.forEach((button) => {
            button.setAttribute('aria-expanded', 'false');
        })
        return;
    }

    /**
     * 
     * Toggle the state of each button to reflect the aria-expanded state
     *
     * @param {*} target - the DOM element returned by evt.target
     * @returns void
     * @memberof Navigation
     */
    toggleButtonAria(target) {
        const buttonNode = Array.from(document.querySelectorAll('.submenu-toggle'));
        
        buttonNode.forEach(button => {
            // for each button, determine if there is a button "above" it
            const prevButton = button.parentElement.parentElement.previousElementSibling;
            
            // case - clicking on a sub-submenu button which is currently NOT expanded.
            if (button.isSameNode(target) && button.getAttribute('aria-expanded') === 'false' && prevButton) {
                // toggle the states of the previous button and the button/target
                prevButton.setAttribute('aria-expanded', 'true');
                button.setAttribute('aria-expanded', 'true');
            }
            // case - clicking on a sub-submenu button which is currently expanded.
            else if (button.isSameNode(target) && button.getAttribute('aria-expanded') === 'true' && prevButton) {
                // keep the previous button expanded and toggle the button/target
                prevButton.setAttribute('aria-expanded', 'true');
                button.setAttribute('aria-expanded', 'false');
            } 
            // case - clicking on a top level button which is currently NOT expanded
            else if (button.isSameNode(target) && button.getAttribute('aria-expanded') === 'false') {
                // expand the button
                button.setAttribute('aria-expanded', 'true');
            } 
            // case - all other buttons
            else {
                // reset the state to false
                button.setAttribute('aria-expanded', 'false')
            }
        });
        return;
    }

    /**
     * 
     * Completely reset the state of the menu
     * 
     * @returns void
     * @memberof Navigation
     */
    clearAll() {
        this.clearMenus();
        this.clearButtons();
        return;
    }

    /**
     *
     * dispatch events to the correct functions.
     * types include: click, focusin, keydown, mousedown
     *
     * @param {object} evt
     * @returns void
     * @memberof Navigation
     */
    eventDispatcher(evt) {
        
        // mousedown focusin click
        // keydown focusin keydown click

        switch (evt.type) {
            case 'focusin':
                this.focusInHandler(evt);
                break;
            case 'keydown':
                if (evt.keyCode === 13) {
                    // if the keydown is caused by the return key, it should be a click
                    this.clickHandler(evt);
                } else if (evt.keyCode === 27) {
                    // if the keydown is caused by the escape key, close the menus
                    this.clearAll();
                } else {
                    // throw away all other events.
                    return;
                }
                break;
            
            case 'mousedown':
                this.clickHandler(evt);
                break;
            
            default:
                return;
        }
    }

    /**
     *
     * Remove the no-js class and attach event listeners
     * 
     * @memberof Navigation
     */
    setEventListeners() {
        // if this script is running, remove the 'no-js' class from the elements.
        const listElements = Array.from(this.menu.getElementsByClassName('no-js'));
        listElements.forEach(element => {
            element.classList.remove('no-js');
        });
        // define a list of possible event listeners
        let listeners = ['click', 'focusin', 'keydown', 'mouseover'];

        if (this.click) {
            listeners.push('mousedown', 'mouseup');
            
            const subMenuList = Array.from(this.menu.querySelectorAll('.submenu-list'));
            
            subMenuList.forEach(menu => menu.classList.add('click-menu'));

        } else {
            listeners.push('mouseout');
        }
        // attach them to the document.
        for (let i = 0; i < listeners.length; i++) {
            document.addEventListener(listeners[i], (evt) => {
                // dispatch the events to the class methods.
                this.eventDispatcher(evt);
            });
        }
    }

    /**
     * 
     * Initialize the menu by
     * - attaching event listeners
     * - adding styles to the <head>
     *
     * @memberof Navigation
     */
    init() {
        this.menu = document.getElementById(this.menuId);
        this.setEventListeners();
        // this.setSubmenuIcon();
    }
}

/* strip-code */
module.exports = Navigation;
/* end-strip-code */