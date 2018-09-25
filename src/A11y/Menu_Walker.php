<?php

namespace A11y;

class Menu_Walker extends \Walker_Nav_Menu {
  private $parentItemCount;
  private $click;

  public function __construct($click = false) {
    $this->parentItemCount = 0;
    $this->click = $click;
  }
  public function start_lvl(&$output, $depth = 0, $args = array()) {
    // the levels are only the interior <ul> tags. they don't include the exterior wrapping tag.

    // each submenu gets a role of menu
    // use js to change this on mouseover, hover, focus...
    
    // may need aria-owns on the controlling element with a unique ID

    $id = $this->parentItemCount - 1;
    $classlist = array('am-submenu-list', 'submenu-list');
    if ( $this->click ) {
<<<<<<< HEAD
      array_push( $classlist, 'click-menu' );
    } else {
      array_push( $classlist, 'hover-menu' );
=======
      array_push($classlist, 'click-menu');
    } else {
      array_push($classlist, 'hover-menu');
>>>>>>> 52fed06d9cdf12f372d4ef42fd9ae192556a30a1
    }
    $classlist_string = implode(" ", $classlist);


    $output .= "<ul id='list-$id' class='" . $classlist_string . "'>";
  }
  public function end_lvl(&$output, $depth = 0, $args = array()) {
    $output .= "</ul>";
  }
  public function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {

    // prevent errors from being thrown if a menu hasn't been set yet.
    if (!$item->db_id) {
      return;
    }

    $classes = null;
    
    // this function handles each item in the list

    // the default will be that items that are parents don't have links that go directly to a top level/parent page.
    $has_top_level_page = false;

    // check that the item has classes and create an html class attribute
    if (!empty($item->classes)) {
      $classes = (array)$item->classes;
    }
    $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args, $depth));
    // a list of class names plus the html class attribute
    $class_names = $class_names ? " class='no-js am-list-item " . esc_attr($class_names) . "'" : "";

    // check that items with children have links
    if (in_array('menu-item-has-children', $classes) && strlen($item->url) > 0) {
      $has_top_level_page = true;
    }

    if (!in_array('menu-item-has-children', $classes)) {
      // if there are no children, just output a link with the href and title
      $output .= "<li $class_names><a class='am-link' href='$item->url'>$item->title</a>";

    } else {
      // trying to use a data attribute to keep track of the list items with children.
      $output .= "<li data-count='$this->parentItemCount' data-has-children='true' $class_names>";
      if (!$has_top_level_page) {
        // if the thing at the top of the list doesn't go to a top level page, make it into a button.
        $output .= "<button aria-haspopup='true' aria-expanded='false' aria-owns='list-$this->parentItemCount' class='am-submenu-toggle submenu-toggle'>$item->title";
        // the data-before attribute let's you change the value via js like with an event handler.
        $output .= "<span class='am-submenu-icon submenu-icon' aria-hidden='true' data-before='∨'></span></button>";
      } else {
        $output .= "<a class='am-submenu-link submenu-link' aria-label='$item->title, tab to the next button to expand the sub-menu' href='$item->url'>$item->title";
        $output .= "</a>
        <button class='am-submenu-button submenu-button submenu-toggle' aria-haspopup='true' aria-expanded='false' aria-label='show submenu' aria-owns='list-$this->parentItemCount'>
        <span aria-hidden='true' class='am-submenu-icon submenu-icon' data-before='∨'></span>
        </button>";
      }
      // build the list items then increment the count of how many contain children
      $this->parentItemCount++;
    }
  }
  public function end_el(&$output, $item, $depth = 0, $args = array()) {
    $output .= "</li>";
  }
  static public function display_menu($args) {
    // a wrapper around wp_nav_menu
    // all arguments should have the same values as the wp_nav_menu function args.
    // extra arguments will be merged.
    // this might not be needed.

    $base_args = array(
      'menu' => '',
      'menu_class' => '',
      'menu_id' => '',
      'container_class' => '',
      'container_id' => '',
      'fallback_cb' => '',
      'before' => '',
      'after' => '',
      'link_before' => '',
      'depth' => 0,
      'item_spacing' => '',
      'echo' => false,
      'theme_location' => $args['theme_location'],
      'items_wrap' => $args['items_wrap'],
      'container' => false,
      'walker' => $args['walker']
    );
    return wp_nav_menu($base_args);
  }
}