# a11y Menu
This is still a work in progress and not ready for production yet.

This project aims to create a re-useable and accessible main navigation module. There are a few goals...
- 
- 
-

## Usage
To begin developing
- `yarn install`
- `npm run develop`

## Structure

### /public
#### index.html
Loads two examples of the menu for testing. The first example is created via javascript. The second is hardcoded into the file. This is to test how the menu responds when javascript is not available.
#### /build
Built assets from `/src` will be placed here and used by `index.html`
#### /css and /js
These are examples of overrides/additions for the base css and/or js can be tested here. This is especially useful for styling since the base styles that are created are largely unopinionated.

### /src
#### /js/Navigation
The class that
- handles event listeners/handlers
- assigns icons to menu items with dropdowns
- initializes the menu interaction

#### /js/utils
Exports a helper function to create a menu based on a tree-like json file

#### /mock-data
json files to create menus. The structure of items in the test file needs to be
```json
{
  "name": "Menu Item",
  "slug": "menu-item",
  "link": "/menu-item",
  "sub": null, // or array of menu item objects
  "classes": ["an", "array", "of", "class", "names"] 
}
```
The `sub` and `classes` keys are optional.
#### /scss
Base styles for the menu.
### webpack.config.js
Handles webpack and asset management.
