/**
 * Theme twitter.
 * Uses the customize-twitter snippet to inject a stylesheet into the
 * twitter iframe.
 */
(function($, Drupal, window, document, undefined) {

  Drupal.behaviors.govcms_ui_kit_twitter_theme = {
    attach: function(context, settings) {
      var options = {
        "url": settings.basePath + settings.pathToTheme + "/dist/css/custom_twitter_theme.css"
      };
      CustomizeTwitterWidget(options);
    }
  };

})(jQuery, Drupal, this, this.document);
