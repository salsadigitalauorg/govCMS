<?php

/**
 * @file
 * Drupal 7 configuration file.
 */

$conf['install_profile'] = 'govcms';

$databases['default']['default'] = [
  'driver' => 'mysql',
  'database' => getenv('MARIADB_DATABASE') ?: 'drupal',
  'username' => getenv('MARIADB_USERNAME') ?: 'drupal',
  'password' => getenv('MARIADB_PASSWORD') ?: 'drupal',
  'host' => getenv('MARIADB_HOST') ?: 'mariadb',
  'port' => 3306,
  'prefix' => '',
];

$drupal_hash_salt = getenv('DRUPAL_HASH_SALT') ?: 'changeme';

if (getenv('TMP')) {
  $conf['file_temporary_path'] = getenv('TMP');
}
