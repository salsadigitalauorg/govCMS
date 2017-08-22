<?php

$update_free_access = FALSE;
$drupal_hash_salt = 'Xa7NoAY3eJKYbg7YFylPQHE8-1vgaYYz07lOH_1f-dg';
ini_set('session.gc_probability', 1);
ini_set('session.gc_divisor', 100);
ini_set('session.gc_maxlifetime', 200000);
ini_set('session.cookie_lifetime', 2000000);
$conf['404_fast_paths_exclude'] = '/\/(?:styles)\//';
$conf['404_fast_paths'] = '/\.(?:txt|png|gif|jpe?g|css|js|ico|swf|flv|cgi|bat|pl|dll|exe|asp)$/i';
$conf['404_fast_html'] = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN" "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>404 Not Found</title></head><body><h1>Not Found</h1><p>The requested URL "@path" was not found on this server.</p></body></html>';

if (isset($_ENV['AH_SITE_ENVIRONMENT'])) {
  switch ($_ENV['AH_SITE_ENVIRONMENT']) {
    case 'dev':
      $conf['googleanalytics_account'] = 'UA-';
    break;

    case 'test':
      $conf['googleanalytics_account'] = 'UA-';
    break;

    case 'prod':
    break;
  }
}
else {
  $conf['googleanalytics_account'] = 'UA-';
}

if (isset($_ENV['AH_SITE_GROUP']) && isset($_ENV['AH_SITE_ENVIRONMENT'])) {
  $conf['plupload_temporary_uri'] = "/mnt/gfs/{$_ENV['AH_SITE_GROUP']}.{$_ENV['AH_SITE_ENVIRONMENT']}/tmp";
}

if (file_exists('/var/www/site-php')) {
  require '/var/www/site-php/govcmsnewthm/govcmsnewthm-settings.inc';
}

if (isset($conf['memcache_servers'])) {
  $conf['cache_backends'][] = './sites/all/modules/contrib/memcache/memcache.inc';
  $conf['cache_default_class'] = 'MemCacheDrupal';
  $conf['cache_class_cache_form'] = 'DrupalDatabaseCache';
}

if (file_exists(dirname(__FILE__) . '/../../../local/settings.env.inc')) {
  include_once dirname(__FILE__) . '/../../../local/settings.env.inc';
}
