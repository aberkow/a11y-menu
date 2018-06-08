<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

 /**
  * Disable auto updates + file mods (should be done from Composer)
  */
 define( 'AUTOMATIC_UPDATER_DISABLED', true );
 define( 'WP_AUTO_UPDATE_CORE', false );
 define( 'DISALLOW_FILE_MODS', true );

/**
 * If you change these, make sure to update docker-compose.yml
 */
define('DB_NAME', 'wordpress');
define('DB_USER', 'wordpress');
define('DB_PASSWORD', 'wordpress');
define('DB_HOST', 'mysql');
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', '');

define( 'WP_HOME', 'http://' . $_SERVER['HTTP_HOST'] );
define( 'WP_SITEURL', WP_HOME. '/wordpress' );

// Move directories so that wordpess can be managed separately
define( 'WP_CONTENT_DIR', dirname(__FILE__) . '/content' );
define( 'WP_CONTENT_URL', WP_HOME . '/content' );


/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
 define('AUTH_KEY',         '}48I_k`=f%#b?*wRD-g}KFcG=L`|a;!+1FfSt|2d#^[ll&Xh1;?5N+FJ-<t<rT//');
 define('SECURE_AUTH_KEY',  'S`1yx9nAp+*SvwHJ44N[OQ.zI[+;H$-0pX)`<df;{+D$p]Q5sl+h0H6i+]gH7wU^');
 define('LOGGED_IN_KEY',    '!&12?+owz:AzbX6j@[N;/Xvl)#>,_|rUNNODC#di0nPs*oAlfbt;q!>FFcVH7ai;');
 define('NONCE_KEY',        '),yng`Qq(^]Z(m>SwpP m}|TV:t?5-7#|Wt:GuXA+]`l[Cy9aXs<,X> E6|OKXIf');
 define('AUTH_SALT',        'G}Tn~F]~p`e()3fIrp,m+[#>#7VBKTyB[pg5;Qf+6#/[(2_k:x,.spBTA,mjIjn]');
 define('SECURE_AUTH_SALT', 'vc /=mx@n>q0#  jv=nG%/ic~Zm;#+VDbJ5u:=1_PQ];?E}(8W08<0%VIg#;(w#e');
 define('LOGGED_IN_SALT',   'g$l.&*<kw6$ uaWVPPz.+_; +{O6]y#iz|ZTfrR=kS0pA6IAc?^$f~^Hn+ XJBC^');
 define('NONCE_SALT',       'ia`E|R@;7<@zFM|GeV*9~!-JGe6UqhZHg?/#@X2OXelW7_*}(2:hYUd}hTBLDE(d');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
