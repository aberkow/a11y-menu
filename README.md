# a11y Menu
This is still a work in progress and not ready for production yet.

This project aims to create a re-useable and accessible main navigation module. There are a few goals...
- Be able to include this package as a standalone or in a WordPress plugin/theme
- Allow for quick implementation of accessible menus
- Menus should allow for developer customization particularly with respect to style
- Menu functionality should take into account different modes of user input (e.g. mouse, keyboard)

## Usage
### Defaults
The constructor comes with the following defaults. These can be overridden as needed
- `menuId` - the default is `'main-menu'`
- `fontFamily` - the default is `'Font Awesome 5 Free'`. Note that currently the other supported font families are 
  - `'FontAwesome'`
  - `'Glyphicons Halflings'` (for Bootstrap)
- `chevronDown` - the default is '\\f078',
- `chevronUp` - the default is '\\f077'

**NB - When using FontAwesome, Bootstrap icons, or similar, you must use the HTML escaped versions.**

### Most basic case
The `Navigation` class is designed to be as simple to use as possible. In order to use it, create a new `Navigation` constructor and assign it to a variable. Inside of an event listener, use the `init` method on the the instance.
```javascript
const navigation = new Navigation();
document.addEventListener('DOMContentLoaded', () => {
  navigation.init();
})
```

### Overridding defaults
Defaults can be overridden individually. For instance, to change the icon used, pass the constructor a configuration object with the appropriate keys and values. 
```javascript
const menuOpts = {
  chevronDown: '\\f13a',
  chevronUp: '\\f139'
}
const navigation = new Navigation(menuOpts);
```
This will use the `chevron-circle-down` and `chevron-circle-up` FontAwesome icons.

## Development
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
