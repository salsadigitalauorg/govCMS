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

$conf['search_api_override_mode'] = 'load';
$conf['search_api_override_servers']['solr']['name'] = 'Lagoon Solr - Environment:' . getenv('LAGOON_PROJECT');
$conf['search_api_override_servers']['solr']['options']['host'] = (getenv('SOLR_HOST') ?: 'solr');
$conf['search_api_override_servers']['solr']['options']['port'] = 8983;
$conf['search_api_override_servers']['solr']['options']['path'] = '/solr/' . (getenv('SOLR_CORE') ?: 'drupal');
$conf['search_api_override_servers']['solr']['options']['http_user'] = (getenv('SOLR_USER') ?: '');
$conf['search_api_override_servers']['solr']['options']['http_pass'] = (getenv('SOLR_PASSWORD') ?: '');
$conf['search_api_override_servers']['solr']['options']['excerpt'] = 0;
$conf['search_api_override_servers']['solr']['options']['retrieve_data'] = 0;
$conf['search_api_override_servers']['solr']['options']['highlight_data'] = 0;
$conf['search_api_override_servers']['solr']['options']['http_method'] = 'POST';

// Temp directory.
if (getenv('TMP')) {
  $conf['file_temporary_path'] = getenv('TMP');
}

// Last: this servers specific settings files.
if (file_exists(__DIR__ . '/settings.local.php')) {
  include __DIR__ . '/settings.local.php';
}
