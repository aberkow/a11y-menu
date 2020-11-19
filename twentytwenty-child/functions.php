<?php

require get_stylesheet_directory() . '/a11y-menu-src/A11y/Menu_Walker.php';

add_action('wp_enqueue_scripts', 'twentytwenty_child_enqueue_styles');
add_action('wp_enqueue_scripts', 'twentytwenty_child_enqueue_scripts');
add_action('after_setup_theme', 'twentytwenty_child_register_menus');

function twentytwenty_child_enqueue_scripts() {
  wp_register_script('a11y-menu', get_stylesheet_directory_uri() . '/a11y-menu-dist/Navigation.js', [], false, true);
  wp_enqueue_script('twentytwenty-child', get_stylesheet_directory_uri() . '/index.js', ['a11y-menu'], false, true);
}

function twentytwenty_child_enqueue_styles() {
  $parent_handle = 'twentytwenty-style';
  wp_enqueue_style('fontawesome', 'https://use.fontawesome.com/releases/v5.15.1/css/all.css');
  wp_enqueue_style('a11y-menu', get_stylesheet_directory_uri() . '/a11y-menu-dist/main.css');
  wp_enqueue_style($parent_handle, get_template_directory_uri() . '/style.css', []);
  wp_enqueue_style('twentytwenty-child', get_stylesheet_uri(), [$parent_handle, 'fontawesome','a11y-menu']);
}

function twentytwenty_child_register_menus() {
  register_nav_menu('secondary-header-menu', __('Secondary Menu - Header', 'twentytwentychild'));
}