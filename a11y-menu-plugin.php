<?php
/*
Plugin Name: A11Y Menu
Description: A plugin to generate accessible main navigation menus
Author: Adam Berkowitz
Version: 0.0.1
Text Domain: a11y-menu
*/

define('A11y_MENU_URL', plugins_url('a11y-menu-plugin'));
define('A11y_MENU_PATH', plugin_dir_path(__FILE__));

require_once A11y_MENU_PATH . '/src/classes/class-a11y-menu-public.php';
require_once A11y_MENU_PATH . '/src/classes/class-a11y-menu-settings.php';
require_once A11y_MENU_PATH . '/src/classes/class-a11y-menu-walker.php';

add_filter('wp_nav_menu_args', 'A11y_Menu_Public::modify_nav_args');

add_action('wp_enqueue_scripts', 'A11y_Menu_Public::enqueue_scripts');