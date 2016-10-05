<?php

/**
 * @file
 * Theme settings for govCMS UI Kit theme.
 */

/**
 * Implements hook_system_theme_settings_alter().
 */
function govcms_uikit_form_system_theme_settings_alter(&$form, $form_state) {
  $form['govcms_uikit_options'] = array(
    '#type' => 'fieldset',
    '#title' => t('govCMS UI-Kit settings'),
    '#weight' => 5,
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
  );

  $form['govcms_uikit_options']['header_title'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Header title'),
    '#default_value' => theme_get_setting('header_title'),
    '#description'   => t("Text to display beside the site logo in the top header."),
  );

  $form['govcms_uikit_options']['footer_copyright'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Footer copyright'),
    '#default_value' => theme_get_setting('footer_copyright'),
    '#description'   => t("Text to display beside the sub menu links. Defaults to <em>&copy; [current year]. [Site Name]. All rights reserved.</em>"),
  );
}
