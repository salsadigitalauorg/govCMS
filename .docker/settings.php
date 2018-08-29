<?php

/**
 * @file
 * Drupal 7 configuration file.
 */

$databases['default']['default'] = [
  'driver' => 'mysql',
  'database' => getenv('MARIADB_DATABASE') ?: 'drupal',
  'username' => getenv('MARIADB_USERNAME') ?: 'drupal',
  'password' => getenv('MARIADB_PASSWORD') ?: 'drupal',
  'host' => getenv('MARIADB_HOST') ?: 'mariadb',
  'port' => 3306,
  'prefix' => '',
];

// Temp directory.
if (getenv('TMP')) {
  $conf['file_temporary_path'] = getenv('TMP');
}
