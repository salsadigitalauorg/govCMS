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
  if (theme_get_setting('govcms_ui_kit_override_image_styles') == 1) {
    // Define custom image style for image banners on home page.
    if ($variables['element']['#field_name'] === 'field_slide_image') {
      if ($variables['items'][0]['#image_style'] === 'feature_article') {
        $variables['items'][0]['#image_style'] = 'govcms_ui_kit_banner';
      }
    }
    // Define custom image style for thumbnails on news / blogs / etc.
    elseif ($variables['element']['#field_name'] === 'field_thumbnail') {
      $image_style = $variables['items'][0]['#image_style'];
      if ($image_style === 'medium' || $image_style === 'thumbnail') {
        $variables['items'][0]['#image_style'] = 'govcms_ui_kit_thumbnail';
      }
    }
    // Define custom image style for views.
    elseif ($variables['element']['#field_name'] === 'field_image') {
      if ($variables['items'][0]['#image_style'] === 'medium') {
        $variables['items'][0]['#image_style'] = 'govcms_ui_kit_thumbnail';
      }
    }
  }
}

/**
 * Implements hook_views_pre_render().
 */
function govcms_ui_kit_views_pre_render(&$variables) {
  if (theme_get_setting('govcms_ui_kit_override_image_styles') == 1) {
    if ($variables->name === 'footer_teaser') {
      $len = count($variables->result);
      for ($i = 0; $i < $len; $i++) {
        // Define custom image style for thumbnails on footer_teaser.
        if ($variables->result[$i]->field_field_image[0]['rendered']['#image_style'] == 'blog_teaser_thumbnail') {
          $variables->result[$i]->field_field_image[0]['rendered']['#image_style'] = 'govcms_ui_kit_thumbnail';
        }
      }
    }
  }
}

/**
 * Implements hook_image_styles_alter().
 */
function govcms_ui_kit_image_styles_alter(&$styles) {
  if (theme_get_setting('govcms_ui_kit_override_image_styles') == 1) {
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
    $styles['govcms_ui_kit_thumbnail'] = array(
      'label' => 'govCMS UI-KIT - Thumbnail',
      'name' => 'govcms_ui_kit_thumbnail',
      'storage' => IMAGE_STORAGE_NORMAL,
      'effects' => array(
        array(
          'label' => 'Scale and crop',
          'name' => 'image_scale_and_crop',
          'data' => array(
            'width' => 370,
            'height' => 275,
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
  }
  return $styles;
}

/**
 * Implements hook_preprocess_node().
 */
function govcms_ui_kit_preprocess_node(&$variables) {
  if ($variables['view_mode'] === 'teaser' || $variables['view_mode'] === 'compact') {
    $has_thumb = !empty($variables['content']['field_thumbnail']);
    $has_image = !empty($variables['content']['field_image']);
    if ($has_thumb || $has_image) {
      $variables['classes_array'][] = 'has-thumbnail';
    }
  }
}
