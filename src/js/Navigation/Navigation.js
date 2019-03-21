class Navigation {
    constructor({
        menuId = 'am-main-menu',
        click = false
    } = {}) {
        this.hasNestedSubmenu = false;
        this.menu = null;
        this.menuId = menuId;
        this.click = click;
        this.currentItem = null;
    }

    hoverHandler(evt) {
        const { type, target } = evt;
        const customEvt = this.createCustomEvt();
        if (type === 'mouseout' && target.getAttribute('aria-haspopup') === "true") {
            target.setAttribute('aria-expanded', 'false');
        } else if (type === 'mouseover' && target.getAttribute('aria-haspopup') === "false") {
            target.setAttribute('aria-expanded', 'true');
        }
        target.dispatchEvent(customEvt)
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

        if (!this.menu.contains(target) && (evt.type === 'mousedown' || evt.type === 'keydown')) {
            this.clearAll();
        } else if (this.menu.contains(target) && evt.type !== 'keydown') {
            evt.preventDefault();
        } 

        // people might click on the icon instead of the button.
        // if so, set the target to the parent (button)
        if (target.localName === 'span') {
            target = target.parentElement;
        }
        
        // if there's an open submenu with sub-submenus...
        if (document.querySelectorAll('.am-submenu-list-open').length > 0 && !document.querySelectorAll('.am-submenu-list-open')[0].contains(target)) {

            const submenuArray = Array.from(document.querySelectorAll('.am-submenu-list-open'));

            if (target.nextSibling && target.nextSibling.localName === 'ul') {
                // if you click from one menu item to another, open the next menu and close the previous one immediately.
                const nextMenu = target.nextSibling;
                nextMenu.classList.add('am-submenu-list-open');    
            }
            
            submenuArray.forEach((el) => {
                // toggle all the menus in the NodeList
                this.toggleSubmenuMenuClass(el);
            })
            
            this.toggleButtonAria(target);
    
        } else {
            const nextSibling = target.nextElementSibling;
            
            // we're near a submenu by clicking on a button but the menu isn't initially open.
            if (nextSibling !== null && nextSibling.localName === 'ul') {
                submenuList = nextSibling;

                // check if there's a nested submenu
                submenuList.getElementsByTagName('ul').length ?
                    this.hasNestedSubmenu = true :
                    this.hasNestedSubmenu = false;
        
                this.toggleSubmenuMenuClass(submenuList);
                this.toggleButtonAria(target);
            }
        }
        const customEvt = this.createCustomEvt();
        target.dispatchEvent(customEvt)
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
        let openMenuArray = Array.from(this.menu.querySelectorAll('.am-submenu-list-open'));

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
            openMenuArray = Array.from(parentNode.querySelectorAll('.am-submenu-list-open'));
            
            // check to make sure that the user hasn't moved to a different menu.
            if (parentNode.id === this.menuId) {
                this.toggleButtonAria(expandedButtonArray[0]);
                this.toggleSubmenuMenuClass(openMenuArray[0]);
                this.clearCurrent();
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
            el.classList.toggle('am-submenu-list-open');
        } else {
            this.clearMenus();
        }
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
        const buttonNode = Array.from(document.querySelectorAll('.am-submenu-toggle'));
        
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
     * Close all submenus
     * 
     * @returns void
     * @memberof Navigation
     */
    clearMenus() {
        const menuArray = Array.from(this.menu.querySelectorAll('.am-submenu-list-open'));
        if (menuArray.length > 0) {
            menuArray.forEach(menu => {
                menu.classList.toggle('am-submenu-list-open');
            })
        }
        return;
    }

    /**
     * Toggle all visual icons and set aria-expanded to false.
     *
     * @returns void
     * @memberof Navigation
     */
    clearButtons() {
        const buttonArray = Array.from(this.menu.querySelectorAll('.am-submenu-toggle'))
        buttonArray.forEach((button) => {
            button.setAttribute('aria-expanded', 'false');
        })
        return;
    }

    /**
     * Remove the current item from the menu
     * 
     * @returns void
     * @memberof Navigation
     */
    clearCurrent() {
        const currentItem = this.menu.querySelector('.am-current-item');
        if (currentItem) {
            currentItem.classList.remove('am-current-item');
        }
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
        this.clearCurrent();
        return;
    }

    /**
     * 
     * Get the button element which is expanded
     * Helps with identifying the top level list item
     * 
     * @return DOM element
     */
    getCurrentItem() {
        const expandedEl = this.menu.querySelector('[aria-expanded="true"]')
        if (expandedEl) {
            return expandedEl.parentElement;
        }        
    }

    /**
     * 
     * Add a class to the current top level list item
     * 
     * @param obj the event object
     * @return void  
     */
    setCurrentItem(evt) {
        const { detail: { current } } = evt;
        const itemNode = Array.from(this.menu.querySelectorAll('li'));
        itemNode.forEach(item => {
            item.classList.remove('am-current-item');
        })

        
        if (current) {
            this.currentItem = current;
            this.currentItem.classList.add('am-current-item');
        }
    }


    /**
     * 
     * Create a custom event to hook into on clicks and hovers.
     * 
     * @return obj 
     */
    createCustomEvt() {
        return new CustomEvent('am-set-current-item', {
            bubbles: true,
            detail: {
                current: this.getCurrentItem()
            }
        })
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
        const listElements = Array.from(this.menu.querySelectorAll('.no-js'));
        listElements.forEach(element => {
            element.classList.remove('no-js');
        });
        // define a list of possible event listeners
        let listeners = ['focusin', 'keydown', 'mouseover'];

        if (this.click) {
            listeners.push('mousedown');
            
            const subMenuList = Array.from(this.menu.querySelectorAll('.am-submenu-list'));
            
            subMenuList.forEach(menu => menu.classList.add('am-click-menu'));

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
        this.menu.addEventListener('am-set-current-item', (evt) => {
            this.setCurrentItem(evt);
        })
    }

    /**
     * 
     * Initialize the menu by
     * - assigning the menu
     * - attaching event listeners
     *
     * @memberof Navigation
     */
    init() {
        this.menu = document.getElementById(this.menuId);
        this.setEventListeners();
    }
}

/* strip-code */
export default Navigation;
/* end-strip-code */