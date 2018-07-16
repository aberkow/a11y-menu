<?php

namespace A11y;

class Menu_Public {
  public function enqueue_scripts() {

    wp_register_script('test', A11y_MENU_URL . '/dist/Navigation.js', array(), null, true);
    // register the main script for the plugin
    // wp_register_script('a11y-menu', A11y_MENU_URL . '/build/index.js', array('test'), null, true);
    wp_register_script('a11y-menu', A11y_MENU_URL . '/dist/test.js', array('test'), null, true);

    // get a value from the options table
    $value = get_option('a11y_menu_options');

    // localize the value as a11yOpts to pass to index.js
    wp_localize_script('a11y-menu', 'a11yOpts', $value);

    // enqueue the script
    wp_enqueue_script('test');
    wp_enqueue_script('a11y-menu');

    // wp_enqueue_style('a11y-menu', A11y_MENU_URL . '/build/main.css');
    wp_enqueue_style('a11y-menu', A11y_MENU_URL . '/public/build/style.css');
  }
  public function modify_nav_args($args) {

    $options = get_option('a11y_menu_options');
    $menu_id = "main-menu";

    if ($options['optional_menu_id']) {
      $menu_id = $options['optional_menu_id'];
    }

    $args['menu_id'] = $menu_id;
    $args['items_wrap'] = '<ul id="%1$s" class="tests nav navbar-nav %2$s">%3$s</ul>';
    $args['walker'] = new A11y_Menu_Walker();
    return $args;
  }
}
