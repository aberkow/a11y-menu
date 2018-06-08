<?php

class A11y_Menu_Settings {
  public function __construct() {
    $this->slug = 'a11y-menu-plugin';
    $this->icon_font_families = array(
      'Glyphicons Halflings' => 'Bootstrap Glyphicons',
      'FontAwesome' => 'FontAwesome 4',
      'Font Awesome 5 Free' => 'FontAwesome 5'
    );
    $this->icon_closed_array = array(
      '\\e094' => 'Bootstrap Arrow',
      '\\e134' => 'Bootstrap Arrow w/ Circle',
      '\\e114' => 'Bootstrap Chevron',
      '\\e159' => 'Bootstrap Collapse',
      '\\2b' => 'Bootstrap Plus',
      '\\f063' => 'FontAwesome Arrow',
      '\\f0ab' => 'FontAwesome Arrow w/ Circle',
      '\\f01a' => 'FontAwesome Arrow w/ Open Circle',
      '\\f0d7' => 'FontAwesome Caret',
      '\\f150' => 'FontAwesome Caret w/ Square',
      '\\f078' => 'FontAwesome Chevron',
      '\\f13a' => 'FontAwesome Chevron w/ Circle',
      '\\f067' => 'FontAwesome Plus',
      '\\f055' => 'FontAwesome Plus w/ Circle',
      '\\f0fe' => 'FontAwesome Plus w/ Square',
      '\\f196' => 'FontAwesome Minus w/ Open Square'
    );
    $this->icon_opened_array = array(
      '\\e093' => 'Bootstrap Arrow',
      '\\e133' => 'Bootstrap Arrow w/ Circle',
      '\\e113' => 'Bootstrap Chevron',
      '\\e160' => 'Bootstrap Collapse',
      '\\2212' => 'Bootstrap Minus',
      '\\f062' => 'FontAwesome Arrow',
      '\\f0aa' => 'FontAwesome Arrow w/ Circle',
      '\\f01b' => 'FontAwesome Arrow w/ Open Circle',
      '\\f0d8' => 'FontAwesome Caret',
      '\\f151' => 'FontAwesome Caret w/ Square',
      '\\f077' => 'FontAwesome Chevron',
      '\\f139' => 'FontAwesome Chevron w/ Circle',
      '\\f068' => 'FontAwesome Minus',
      '\\f056' => 'FontAwesome Minus w/ Circle',
      '\\f146' => 'FontAwesome Minus w/ Square',
      '\\f147' => 'FontAwesome Minus w/ Open Square'
    );
  }
  // create the settings page under the WP general settings area.
  public function create_settings_page() {
    $page_title = 'A11Y Menu Settings';
    $menu_title = 'A11Y Menu Settings';
    $cap = 'manage_options';
    $callback = array($this, 'settings_page_content');
    add_options_page(
      $page_title, 
      $menu_title, 
      $cap, 
      $this->slug, 
      $callback
    );
  }
  // include the form markup for the page.
  public function settings_page_content() {
    include_once(A11y_MENU_PATH . '/partials/settings-page-content.php');
  }
  // create sections for the page as needed.
  public function create_sections() {
    $sections = array(
      array(
        'id' => 'a11y_menu_section_1',
        'label' => 'Section Title',
        'callback' => array($this, 'section_callback'),
      )
    );

    foreach($sections as $index => $section) {
      add_settings_section(
        $section['id'],
        $section['label'],
        $section['callback'],
        $this->slug
      );
    }
  }
  public function section_callback($arguments) {
    switch($arguments['id']) {
      case 'a11y_menu_section_1':
        include_once(A11y_MENU_PATH . '/partials/sections/section-1.php');
        break;
    }
  }
  public function create_fields() {
    $fields = array(
      array(
        'id' => 'optional_menu_id',
        'label' => 'Menu ID (optional)',
        'section' => 'a11y_menu_section_1',
        'type' => 'text',
        'options' => false,
        'placeholder' => 'enter some text',
        'helper' => 'helper text',
        'supplemental' => 'supplemental text',
        'default' => false
      ),
      array(
        'id' => 'icon_font_family',
        'label' => 'Icon Font Family',
        'section' => 'a11y_menu_section_1',
        'type' => 'select',
        'options' => $this->icon_font_families,
        'default' => 'FontAwesome'
      ),
      array(
        'id' => 'icon_closed',
        'label' => 'Closed Icon',
        'section' => 'a11y_menu_section_1',
        'type' => 'select',
        'options' => $this->icon_closed_array,
        'default' => 'maybe'
      ),
      array(
        'id' => 'icon_opened',
        'label' => 'Opened Icon',
        'section' => 'a11y_menu_section_1',
        'type' => 'select',
        'options' => $this->icon_opened_array,
        'default' => 'maybe'
      ),
      array(
        'id' => 'custom_css',
        'label' => 'Custom Menu CSS',
        'section' => 'a11y_menu_section_1',
        'type' => 'textarea'
      )
    );

    foreach ($fields as $index => $field) {
      add_settings_field(
        $field['id'],
        $field['label'],
        array($this, 'field_callback'),
        $this->slug,
        $field['section'],
        $field
      );
    }
    register_setting($this->slug, 'a11y_menu_options');
  }
  public function field_callback($arguments) {

    $id = $arguments['id'];

    $options = get_option('a11y_menu_options');

    // needs a way to update the options if the id isn't already present

    $value = $options[$id];

    switch ($arguments['type']) {
      case 'select':
        include(A11y_MENU_PATH . '/partials/inputs/select-input.php');
        break;
      case 'text':
        include(A11y_MENU_PATH . '/partials/inputs/text-input.php');
        break;
      case 'textarea':
        include(A11y_MENU_PATH . '/partials/inputs/textarea-input.php');
        break;
    }
  }
  public function sanitize_input($input) {

    $clean_input = array();

    foreach ($input as $key => $value) {
      switch ($key) {
        case 'optional_menu_id':
          $clean_input[$key] = sanitize_text_field($value);
          break;
        case 'icon_closed':
        case 'icon_opened':
          // this doesn't really seem to work. needs a better way to handle validating select boxes.
          if (
              ($key === 'icon_closed' && array_key_exists($value, $this->icon_closed_array)) || 
              ($key === 'icon_opened' && array_key_exists($value, $this->icon_opened_array) ||
              ($key === 'icon_font_family' && array_key_exists($value, $this->icon_font_families))
              )
          ) {
            $clean_input[$key] = $value;
          }
          break;
        case 'custom_css':
          $clean_input[$key] = sanitize_textarea_field($value);
          break;
      }
    }

    return $clean_input;
  }
  public function init() {

    $option_defaults = array(
      'optional_menu_id' => 'main-menu',
      'icon_font_family' => 'FontAwesome',
      'icon_closed' => '\\f078',
      'icon_opened' => '\\f077',
      'custom_css' => ''
    );
    add_option('a11y_menu_options', $option_defaults);

    add_action('admin_menu', array($this, 'create_settings_page'));
    add_action('admin_init', array($this, 'create_sections'));
    add_action('admin_init', array($this, 'create_fields'));
  }
}

$settings = new A11y_Menu_Settings();
$settings->init();