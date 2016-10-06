<?php

/**
 * @file
 * template.php
 */

/**
 * Implements hook_html_head_alter().
 */
function govcms_ui_kit_html_head_alter(&$head_elements) {
  // Mobile Viewport.
  $head_elements['viewport'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array('name' => 'viewport', 'content' => 'width=device-width, initial-scale=1'),
  );
  // IE Latest Browser.
  $head_elements['ie_view'] = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array('http-equiv' => 'x-ua-compatible', 'content' => 'ie=edge'),
  );
}

/**
 * Implements hook_preprocess_html().
 */
function govcms_ui_kit_preprocess_html(&$variables) {
  drupal_add_js("(function(h) {h.className = h.className.replace('no-js', '') })(document.documentElement);", array('type' => 'inline', 'scope' => 'header'));
}

/**
 * Implements hook_preprocess_field().
 */
function govcms_ui_kit_preprocess_field(&$variables) {
  if ($variables['element']['#field_name'] === 'field_slide_image') {
    // kpr($variables);
    $variables['items'][0]['#image_style'] = 'govcms_ui_kit_banner';
  }
}

/**
 * Implements hook_image_styles_alter().
 */
function govcms_ui_kit_image_styles_alter(&$styles) {
  $styles['govcms_ui_kit_banner'] = array(
    'label' => 'govCMS UI-KIT - Banner',
    'name' => 'govcms_ui_kit_banner',
    'storage' => IMAGE_STORAGE_NORMAL,
    'effects' => array(
      array(
        'label' => 'Scale and crop',
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 1650,
          'height' => 440,
          'upscale' => 1,
        ),
        'effect callback' => 'image_scale_and_crop_effect',
        'dimensions callback' => 'image_resize_dimensions',
        'form callback' => 'image_resize_form',
        'summary theme' => 'image_resize_summary',
        'module' => 'image',
        'weight' => 0,
      ),
    ),
  );
  return $styles;
}
