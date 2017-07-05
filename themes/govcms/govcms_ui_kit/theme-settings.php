<?php

/**
 * @file
 * Theme settings for govCMS UI Kit theme.
 */

/**
 * Implements hook_system_theme_settings_alter().
 */
function govcms_ui_kit_form_system_theme_settings_alter(&$form, $form_state) {
  $form['govcms_ui_kit_options'] = array(
    '#type' => 'fieldset',
    '#title' => t('govCMS UI Kit settings'),
    '#weight' => 5,
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
  );

  $form['govcms_ui_kit_options']['govcms_ui_kit_header_title'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Header title'),
    '#default_value' => theme_get_setting('govcms_ui_kit_header_title'),
    '#description'   => t("Text to display beside the site logo in the top header."),
  );

  $form['govcms_ui_kit_options']['govcms_ui_kit_header_logo_alt'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Header logo alternative text'),
    '#default_value' => theme_get_setting('govcms_ui_kit_header_logo_alt'),
    '#description'   => t("Alternative text to assign to the logo in the top header."),
  );

  $form['govcms_ui_kit_options']['govcms_ui_kit_footer_copyright'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Footer copyright'),
    '#default_value' => theme_get_setting('govcms_ui_kit_footer_copyright'),
    '#description'   => t("Text to display beside the sub menu links. Defaults to <em>&copy; [current year]. [Site Name]. All rights reserved.</em>"),
  );

  $form['govcms_ui_kit_options']['govcms_ui_kit_override_image_styles'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Override image styles'),
    '#default_value' => theme_get_setting('govcms_ui_kit_override_image_styles'),
    '#description'   => t("Enable this to override any user-defined image styles with govCMS UI Kit default styles. Disabling this is recommend if modifying site."),
  );

  $form['govcms_ui_kit_options']['govcms_ui_kit_fix_site_width'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Fix site width'),
    '#default_value' => theme_get_setting('govcms_ui_kit_fix_site_width'),
    '#description'   => t("Enable this to fix the width of the site contents and footer to a max of 1650 pixels."),
  );

  $form['govcms_ui_kit_options']['govcms_ui_kit_show_webform_assistance'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Show webform assistance'),
    '#default_value' => theme_get_setting('govcms_ui_kit_show_webform_assistance'),
    '#description'   => t("Display \"Fields marked * are required.\" message on all webforms."),
  );
}
