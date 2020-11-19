<?php

/**
 * Header file for the Twenty Twenty WordPress default theme.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

use A11y\Menu_Walker;

?>
<!DOCTYPE html>

<html class="no-js" <?php language_attributes(); ?>>

<head>

  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="profile" href="https://gmpg.org/xfn/11">

  <?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

  <?php
  wp_body_open();
  ?>

  <header id="site-header" class="header-footer-group" role="banner">

    <div class="header-inner section-inner">

      <div class="header-titles-wrapper">
        <div class="header-titles">

          <?php
          // Site title or logo.
          twentytwenty_site_logo();

          // Site description.
          twentytwenty_site_description();
          ?>

        </div><!-- .header-titles -->

        <button class="toggle nav-toggle mobile-nav-toggle" data-toggle-target=".menu-modal" data-toggle-body-class="showing-menu-modal" aria-expanded="false" data-set-focus=".close-nav-toggle">
          <span class="toggle-inner">
            <span class="toggle-icon">
              <?php twentytwenty_the_theme_svg('ellipsis'); ?>
            </span>
            <span class="toggle-text"><?php _e('Menu', 'twentytwenty'); ?></span>
          </span>
        </button><!-- .nav-toggle -->

      </div><!-- .header-titles-wrapper -->

      <div class="header-navigation-wrapper">
        <nav id="am-nav">
          <?php
          if (has_nav_menu('primary') || !has_nav_menu('expanded')) {

            if (has_nav_menu('primary')) {

              wp_nav_menu(
                array(
                  'container'  => '',
                  'container_id' => 'primary-nav',
                  'menu_id' => 'am-main-menu',
                  'items_wrap' => '<ul id="%1$s" class="am-click-menu %2$s">%3$s</ul>',
                  'theme_location' => 'primary',
                  // use the custom A11Y walker menu
                  'walker' => new Menu_Walker()
                )
              );
            } elseif (!has_nav_menu('expanded')) {

              wp_list_pages(
                array(
                  'match_menu_classes' => true,
                  'show_sub_menu_icons' => true,
                  'title_li' => false,
                  'walker'   => new TwentyTwenty_Walker_Page(),
                )
              );
            }
          }

          if (has_nav_menu('expanded')) {
          ?>

            <div class="header-toggles hide-no-js">

              <?php
              if (has_nav_menu('expanded')) {
              ?>

                <div class="toggle-wrapper nav-toggle-wrapper has-expanded-menu">

                  <button class="toggle nav-toggle desktop-nav-toggle" data-toggle-target=".menu-modal" data-toggle-body-class="showing-menu-modal" aria-expanded="false" data-set-focus=".close-nav-toggle">
                    <span class="toggle-inner">
                      <span class="toggle-text"><?php _e('Menu', 'twentytwenty'); ?></span>
                      <span class="toggle-icon">
                        <?php twentytwenty_the_theme_svg('ellipsis'); ?>
                      </span>
                    </span>
                  </button><!-- .nav-toggle -->

                </div><!-- .nav-toggle-wrapper -->

              <?php
              }
              ?>

            </div><!-- .header-toggles -->
          <?php
          }
          ?>
        </nav>
        <?php
        if (has_nav_menu('secondary-header-menu')) {
          echo '<p><strong>Secondary Navigation for testing.</strong></p>';
          wp_nav_menu(
            array(
              'container'  => 'nav',
              'container_id' => 'am-secondary-nav',
              'menu_id' => 'am-secondary-menu',
              'items_wrap' => '<ul id="%1$s" class="am-click-menu %2$s">%3$s</ul>',
              'theme_location' => 'secondary-header-menu',
              // use the custom A11Y walker menu
              'walker' => new Menu_Walker()
            )
          );
        }
        ?>
      </div><!-- .header-navigation-wrapper -->

    </div><!-- .header-inner -->
  </header><!-- #site-header -->

  <?php
  // Output the menu modal.
  get_template_part('template-parts/modal-menu');
