# a11y Menu
This project aims to create a re-useable and accessible main navigation module. There are a few goals...
- Be able to include this package as a standalone or in a WordPress plugin/theme
- Allow for quick implementation of accessible menus
- Menus should allow for developer customization particularly with respect to style
- Menu functionality should take into account different modes of user input (e.g. mouse, keyboard)

## Usage
### Installing via NPM
This package can be installed via npm using `npm install a11y-menu`. This will provide access to the JS and sass files, but _not_ the WordPress menu walker. The intention is to give javascript developers access to the JS menu walker, navigation script, and styles in a way that can be used with webpack or other bundlers.

### Creating a menu via JS
There are two functions and one stylesheet that can be used together to create an accessible menu.

- `displayMenu`
- `Navigation`
- main.scss

`displayMenu()` takes a json file (see /mock-data below for the format). It can be imported and used as follows
```js
import { displayMenu } from 'a11y-menu';
// testData is an arbitrary json file.
import { menu } from './test-data.json';
const mainMenu = document.getElementById('main-menu');

displayMenu(mainMenu, menu); 
```
This can be combined with the `Navigation` class to create a working menu with submenus that display on either click or hover events.

```js
// clickable menu
import Navigation, { displayMenu } from 'a11y-menu';
// testData is an arbitrary json file.
import { menu } from './test-data.json';
const mainMenu = document.getElementById('main-menu');

mainMenu.classList.add('am-click-menu');

displayMenu(mainMenu, menu);

const navigation = new Navigation({ click: true });

document.addEventListener('DOMContentLoaded', () => {
    navigation.init();
});

```
```js
// hoverable menu
import Navigation, { displayMenu } from 'a11y-menu';
// testData is an arbitrary json file.
import { menu } from './test-data.json';

const mainMenu = document.getElementById('main-menu');

// if needed
mainMenu.classList.remove('am-click-menu');

displayMenu(mainMenu, menu);

const navigation = new Navigation();

document.addEventListener('DOMContentLoaded', () => {
    navigation.init();
});

```

`main.scss` can be required using webpack or similar. Another option is to include in your project the transpiled css file that can be found at `dist/main.css`.


### Installing via Composer.
This package can be installed as a dependency via [Composer](https://getcomposer.org/). To check if you have Composer installed, run the `composer` command in the terminal. If Composer's not available, install it. Then within your project run `composer require ucomm/a11y-menu`.
### Creating a menu with PHP
For non-WordPress PHP projects, you can use the [`aberkow/a11y-menu-php` composer package](https://github.com/aberkow/a11y-menu-php). The package takes the place of the javascript `displayMenu` function for PHP projects. It can be installed with `composer require aberkow/a11y-menu-php` and exposes a single static method which can be used like this:
```php
<?php

require('vendor/autoload.php');
$data = file_get_contents('path/to/file.json');
$menu = json_decode($data)->menu;

?>
<nav id="am-navigation">
  <ul id="am-php-menu">
    <?php echo A11y\Menu_Generator::display_menu($menu); ?>
  </ul>
</nav>
```
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
 * 
 * container -> this should be set to 'nav' for better accessibility and to make sure the CSS works.
 * items_wrap -> ensures that you can use a custom ID for the <ul> element.
 * menu_id -> The ID should be prefixed with 'am-' to act as a namespace. 
 *  For instance, 'am-main-menu' is the default ID used by the Navigation JS class.
 *  However this can be overridden if you like
 * walker -> the instance of the walker class
 */
$args = array(
  'container' => 'nav',
  'items_wrap' => '<ul id="%1$s" class="nav navbar-nav %2$s">%3$s</ul>',
  'menu_id' => 'am-main-menu',
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
*/

document.addEventListener('DOMContentLoaded', () => {
  const navigation = new Navigation();
  navigation.init();
})
```

### Javascript Defaults
The constructor comes with the following defaults. These can be overridden as needed
- `menuId` - the default is `'am-main-menu'`
- `click` - the default is `false`

### Most basic case
The `Navigation` class is designed to be as simple to use as possible. In order to use it, create a new `Navigation` constructor and assign it to a variable. Inside of an event listener, use the `init` method on the the instance. This implementation will create a **hover** menu.
```javascript
const navigation = new Navigation();
document.addEventListener('DOMContentLoaded', () => {
  navigation.init();
})
```

### Overridding defaults
Defaults can be overridden individually or together.
```javascript
const menuOpts = {
  // assumes a <ul> with an id of 'am-my-navigation'
  menuId: 'am-my-navigation',
  click: true
}
const navigation = new Navigation(menuOpts);
```
This will create a nav menu with an id of `main-nav` and it will use the `click` functionality instead of hover.

## Sass defaults
The stylesheet provided is meant to provide a skeleton on which to add additional styles (e.g. colors, padding, etc...). An example of adding icons is provided in `src/scss/icon-styles.scss`. These styles will override the baseline text icons in favor of Font Awesome icons.

Overriding and changing the styles of the menu is as easy as either making the selectors more specific or placing your custom styles lower in the cascade. Greater specificity can be achieved by using the provided `am-` class names.

## Development
To begin developing

- `yarn install`
- `gulp watch`

This will begin watching the js and scss files and place them in the appropriate directories. `Navigation.js` and `main.scss` will be transpiled and sent to `/dist`. Serving `/public/index.html` will read those files from the `/dist` directory.

## Production
To create a new production version run `gulp` from the root.

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
### gulp.js
Watches and builds js/scss files as appropriate.
### webpack.config.js
Handles bundling for local testing.

## TODO

- separate out the main WordPress walker and dependencies from any other implementation. Ideas for a plugin should be handled in a different package.