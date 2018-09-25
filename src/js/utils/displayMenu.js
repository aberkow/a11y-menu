/*
 *
 * This function takes in a json menu item and returns the appropriate markup
 *
 */

const generateMenuItemMarkup = (menuItem) => {
    // set a state for having a submenu and/or link
    let hasSubmenu = false;
    let hasLink = false;

    if (menuItem.hasOwnProperty('sub') && menuItem.sub !== null && menuItem.sub.length) {
        hasSubmenu = true;
    }

    if (menuItem.hasOwnProperty('link') && menuItem.link.length) {
        hasLink = true;
    }
    if (hasLink && hasSubmenu) {
        return `<a class='submenu-link' aria-label='${menuItem.name}, tab to the next button to expand the sub-menu' href=${menuItem.link}>${menuItem.name}</a><button class='submenu-button submenu-toggle' aria-haspopup='true' aria-expanded='false' aria-label='show submenu'><span class='submenu-icon' aria-hidden='true' data-before='∨'></span></button>`;
    } else if (!hasLink || !hasLink && hasSubmenu) {
        return `<button aria-haspopup='true' aria-expanded='false' class='submenu-toggle'>${menuItem.name}<span class='submenu-icon' aria-hidden='true' data-before='∨'></span></button>`;
    } else {
        // just a link
        return `<a href=${menuItem.link}>${menuItem.name}</a>`;
    }
}

/*
 *
 * This function will generate the markup for the menu.
 * The two arguments are the <ul> to attach the menu to and the json data to read from.
 *
 */

const displayMenu = (ul, json) => {
    const menuMap = json.map((menuItem, index) => {
        let classes = [];
        // create a list item
        const li = document.createElement('li');

        li.innerHTML = generateMenuItemMarkup(menuItem);

        if (menuItem.hasOwnProperty('classes') && menuItem.classes !== null && menuItem.classes.length) {
            classes = menuItem.classes;
            classes.push('no-js');
        } else {
            classes.push('no-js');
        }

        li.classList.add(...classes);


        // check if there are submenu items
        // if there are, create a submenu <ul>
        // then, recursively call this function

        // this if statement is clearly ridiculous and needs to be refactored
        if (menuItem.hasOwnProperty('sub') && menuItem.sub !== null && menuItem.sub.length) {
            // li.setAttribute('data-count', index);
            li.setAttribute('data-has-children', 'true');
            // create a <ul> to hold the submenu
            const subMenu = document.createElement('ul');
            ul.classList.add('submenu-list');
            // this is super temporary. just to get things rolling...
            subMenu.id = `submenu-${menuItem.slug}`;
            // create the submenu structure by recursively calling this same function
            // it will recieve the subMenu created above and the array of items from the json object
            displayMenu(subMenu, menuItem.sub);
            // append it to the correct list element
            li.appendChild(subMenu);
            return li;
        }
        // return the list element
        return li;
    });

    // append the items of the menuMap to the menu <ul>
    menuMap.forEach((item, index) => {
        ul.appendChild(menuMap[index]);
    });

    // return the generated menu
    return menuMap;
}

// the recursive function call wasn't working when it was inside the module.exports object directly.
// so break it out and set the function here.
module.exports.displayMenu = displayMenu;