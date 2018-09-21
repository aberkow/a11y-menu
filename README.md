# a11y Menu
This is still a work in progress and not ready for production yet.

This project aims to create a re-useable and accessible main navigation module. There are a few goals...
- Be able to include this package as a standalone or in a WordPress plugin/theme
- Allow for quick implementation of accessible menus
- Menus should allow for developer customization particularly with respect to style
- Menu functionality should take into account different modes of user input (e.g. mouse, keyboard)

## Usage
### Installing via Composer.
This package can be installed as a dependency via [Composer](https://getcomposer.org/). To check if you have Composer installed, run the `composer` command in the terminal. If Composer's not available, install it. Then within your project run `composer require ucomm/a11y-menu`.
### Creating a WordPress menu in a theme.
In order to use the custom Walker within your theme, you'll need to do the following
```php
// functions.php
require_once('vendor/autoload.php');

// register a menu location. 
// this is optional if you're using a child theme with pre-registered locations
function register_nav() {
  register_nav_menu('menu-name', __('Menu Name', 'text-domain'));
}
add_action('after_setup_theme', 'register_nav');


function load_scripts() {
  // enqueue the base nav styles
  wp_enqueue_style('a11y-menu', get_stylesheet_directory_uri() . '/vendor/ucomm/a11y-menu/dist/main.css');
  // register/enqueue the JS Navigation script
  wp_register_script('a11y-menu', get_stylesheet_directory_uri() . '/vendor/ucomm/a11y-menu/dist/Navigation.js', array(), false, true);

  wp_enqueue_script('a11y-menu');

  // the Navigation script is a dependency of the script where you wish to instantiate the class.
  wp_enqueue_script('theme-script', get_stylesheet_directory_uri() . '/index.js', array('a11y-menu', false, true));
}
add_action('wp_enqueue_scripts', 'load_scripts');
```

```php
/**
 * header.php (or whichever file you want to use for displaying the menu)
 * container -> this should be set to 'nav' to make sure the CSS works.
 * items_wrap -> ensures that you can use a custom ID for the <ul> element
 * menu_id -> 'main-menu' is the default ID used by the Navigation JS class.
 *  However this can be overridden if you like
 * walker -> the instance of the walker class
 */
$args = array(
  'container' => 'nav',
  'items_wrap' => '<ul id="%1$s" class="nav navbar-nav %2$s">%3$s</ul>',
  'menu_id' => 'main-menu',
  'theme_location' => 'menu-name',
  'walker' => new A11y\Menu_Walker()
);
wp_nav_menu($args);
```

```js
/**
* 
* the main index.js file or wherever you wish to instantiate the Navigation class.
* see below for overriding the constructor defaults.
* NB - this is written in ES6. To use ES5 syntax, convert the arrow function to a regular function like this.
* () => {} becomes function() {}
*/

document.addEventListener('DOMContentLoaded', () => {
  const navigation = new Navigation();
  navigation.init();
})
```


### Javascript Defaults
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
