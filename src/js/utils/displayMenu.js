/*
*
* This function will generate the markup for the menu.
* The two arguments are the <ul> to attach the menu to and the json data to read from.
*
*/ 


const displayMenu = (ul, json) => {
  const menuMap = json.map((menuItem, index) => {
    // create a list item
    const li = document.createElement('li');

    // generate the link inside the <li>
    li.innerHTML = `<a href=${menuItem.link}>${menuItem.name}</a>`;

    // check if there are submenu items
    // if there are, create a submenu <ul>
    // then, recursively call this function
    if (menuItem.sub !== null) {
      // create a <ul> to hold the submenu
      const subMenu = document.createElement('ul');
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