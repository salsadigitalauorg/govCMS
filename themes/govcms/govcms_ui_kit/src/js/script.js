/**
 * Global variables.
 */
var desktop_breakpoint = 1200;
var tablet_breakpoint = 768;
var mobile_breakpoint = 420;

/**
 * govCMS general bootstrapping.
 */
(function($, Drupal, window, document, undefined) {

  Drupal.behaviors.govcms_ui_kit = {
    attach: function(context, settings) {
      // Object Fit Polyfill for IE. Used on News Teaser Images.
      objectFitImages();
    }
  };

})(jQuery, Drupal, this, this.document);
