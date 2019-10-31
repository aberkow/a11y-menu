class Navigation {
    constructor({
        menuId = 'am-main-menu',
        click = false
    } = {}) {
        this.menu = null
        this.menuId = menuId
        this.click = click
        this.currentItem = null
    }

    /**
     * 
     * js is available
     * remove the no-js class from nav menu list items
     * 
     */
    removeNoJs() {
        const listItems = Array.from(this.menu.querySelectorAll('.no-js'))
        listItems.map(item => item.classList.remove('no-js'))
    }

    /**
     * 
     * Get the button element which is expanded
     * Helps with identifying the top level list item
     * 
     * @return DOM element
     */
    getCurrentTopLevelItem(target) {
        if (target !== null) {
            return target.closest(`#${this.menuId} > li`)
        }
    }

    /**
     *
     * Manage the state of the top level item associated with targets
     * 
     * @param {*} target 
     * @returns {Element} the top level <li> associated with the target
     * @memberof Navigation
     */
    toggleCurrentTopLevelItemClass(target) {
        const topLevelItems = Array.from(document.querySelectorAll(`#${this.menuId} > li`))
        return topLevelItems.map(item => {
            item.classList.remove('am-current-item')
            if (item.contains(target)) {
                item.classList.add('am-current-item')
                return item
            }
        }).filter(item => {
            if (item !== undefined) {
                return item
            }
        })[0]
    }

    /**
     * 
     * Opens and closes submenus
     * Change the state of the aria-expanded property and submenu class
     *
     * @param {*} target DOM Node - specifically a <button />
     * @memberof Navigation
     */
    manageSubmenuState(target) {
        const buttons = Array.from(this.menu.querySelectorAll('.am-submenu-toggle'))
        
        buttons.map(button => {
            const prevButton = button.parentElement.parentElement.previousElementSibling;
            const submenu = button.nextElementSibling
            const submenuOpenClass = 'am-submenu-list-open'
            const sameNode = button.isSameNode(target)
            const ariaExpanded = button.getAttribute('aria-expanded')
            let parentSubmenu;

            // if for some reason there's a button with no submenu, return immediately
            if (!submenu) return

            // case - clicking on a sub-submenu button which is currently NOT expanded.
            if (sameNode && ariaExpanded === 'false' && prevButton) {

                // find the parent submenu
                parentSubmenu = prevButton.nextElementSibling

                // toggle the states of the previous button and the button/target
                prevButton.setAttribute('aria-expanded', 'true');
                button.setAttribute('aria-expanded', 'true');

                // keep the parent submenu open
                parentSubmenu.classList.add(submenuOpenClass)

                // open the sub-submenu
                submenu.classList.add(submenuOpenClass)
            }

            // case - clicking on a sub-submenu button which is currently expanded.
            else if (sameNode && ariaExpanded === 'true' && prevButton) {

                // find the parent submenu
                parentSubmenu = prevButton.nextElementSibling

                // keep the previous button expanded and toggle the button/target
                prevButton.setAttribute('aria-expanded', 'true');
                button.setAttribute('aria-expanded', 'false');

                // keep the parent submenu open
                parentSubmenu.classList.add(submenuOpenClass)

                // close the sub-submenu
                submenu.classList.remove(submenuOpenClass)
            }
            // case - clicking on a top level button which is currently NOT expanded
            else if (sameNode && ariaExpanded === 'false') {
                // expand the button
                button.setAttribute('aria-expanded', 'true');
                // open the submenu
                submenu.classList.add(submenuOpenClass)
            }
            // case - all other buttons
            else {
                // reset aria-expanded to false
                button.setAttribute('aria-expanded', 'false')
                // close the submenu
                submenu.classList.remove(submenuOpenClass)
            }
        })
    }

    /**
     *
     * remove the am-submenu-list-open class from all submenus not associated with the target
     * 
     * @param {object} target - the event target
     * @memberof Navigation
     */
    clearSubmenuClass(target) {
        const menuArray = Array.from(document.querySelectorAll('.am-submenu-list-open'))
        if (!target.closest('.am-submenu-toggle')) {
            menuArray.map(menu => menu.classList.remove('am-submenu-list-open'))
        }
    }

    /**
     *
     * set aria-expanded false on all buttons not associated with the target
     *
     * @param {object} target - the event target
     * @memberof Navigation
     */
    clearAllAriaExpanded(target) {
        const buttonArray = Array.from(document.querySelectorAll('.am-submenu-toggle'))
        if (!target.closest('.am-submenu-toggle')) {
            buttonArray.map(button => button.setAttribute('aria-expanded', 'false'))
        }
    }

    /**
     *
     * close all submenus and set the state of all items with aria-expanded to false
     * remove event listeners from the document
     *
     * @param {object} { target } destructured from the event object
     * @memberof Navigation
     */
    clearAll({ target }) {
        this.clearSubmenuClass(target)
        this.clearAllAriaExpanded(target)
        document.removeEventListener('click', this.clearAll.bind(this))
        document.removeEventListener('focusin', this.clearAll.bind(this))
        document.removeEventListener('keydown', this.clearAll.bind(this))
    }

    /**
     *
     * Remove the no-js class and attach event listeners to the menu
     * 
     * @memberof Navigation
     */
    setMenuEventListeners() {
        let listeners = ['focusin', 'keydown'];

        if (this.click) {
            listeners.push('mousedown');

            const subMenuList = [].slice.call(this.menu.querySelectorAll('.am-submenu-list'));

            subMenuList.forEach(menu => menu.classList.add('am-click-menu'));
        }

        for (let i = 0; i < listeners.length; i++) {
            this.menu.addEventListener(listeners[i], (evt) => {
                this.eventDispatcher(evt);
            });
        }
    }

    /**
     *
     * attach event listeners to the document
     *  - click: clicks on the body clear the menu
     *  - focusin: if the body gets focus, clear the menu
     *  - keydown: if the escape key is pressed, clear the menu
     *
     * @param {object} target
     * @memberof Navigation
     */
    setDocumentEventListeners(target) {
        if (target.getAttribute('aria-expanded') === 'true') {
            this.clearAll = this.clearAll.bind(this)

            document.addEventListener('click', this.clearAll)

            document.addEventListener('focusin', (evt) => {
                if (!this.menu.contains(evt.target)) {
                    this.clearAll({ target: document.body })
                }
            })
            
            document.addEventListener('keydown', (evt) => {
                if (evt.which === 27) {
                    this.clearAll({ target: document.body })
                }
            })
        }
    }

    /**
     *
     * dispatch events to the correct functions.
     * types include: focusin, keydown, mousedown
     * 
     * treat keydowns from the return key (13) as mousedown events
     *
     * @param {object} evt
     * @returns void
     * @memberof Navigation
     */
    eventDispatcher(evt) {
        switch (evt.type) {
            case 'focusin':
                this.focusInHandler(evt)
                break;
            case 'keydown':
                if (evt.keyCode === 13) {
                    this.mouseDownHandler(evt)
                } 
                break;
            case 'mousedown':
                this.mouseDownHandler(evt)
                break;
            default:
                return;
        }
    }

    /**
     *
     * handle mousedown events by managing
     * - submenu classes
     * - aria-expanded state
     * - event listeners on the document
     * 
     * @param {object} { target } destructured from the event object
     * @memberof Navigation
     */
    mouseDownHandler(evt) {
        // a click on the button should not introduce focus
        evt.preventDefault()

        const { target } = evt

        this.toggleCurrentTopLevelItemClass(target)
        this.manageSubmenuState(target)
        this.setDocumentEventListeners(target)
    }

    /**
     *
     * Handle focusin events
     * 
     * @param {*} { target, relatedTarget } DOM targets 
     * @memberof Navigation
     */
    focusInHandler({ target, relatedTarget }) {
        const topItem = this.toggleCurrentTopLevelItemClass(target)
        if (this.menu.contains(relatedTarget) && !topItem.contains(relatedTarget)) {
            this.clearAll({ target: document.body })
        }
    }

    init() {
        this.menu = document.getElementById(this.menuId)
        this.removeNoJs()
        this.setMenuEventListeners()
    }
}

/* strip-code */
export default Navigation;
/* end-strip-code */