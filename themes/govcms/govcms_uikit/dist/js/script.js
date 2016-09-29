/**
 * govCMS general bootstrapping.
 */
(function($, Drupal, window, document, undefined) {

  Drupal.behaviors.govcms_uikit = {
    attach: function(context, settings) {
      // ...
    }
  };

})(jQuery, Drupal, this, this.document);


/**
 * Header Search Field.
 */
(function($, Drupal, window, document, undefined) {

  Drupal.behaviors.govcms_uikit_search = {
    attach: function(context, settings) {
      var $widget = $('header .search-form-widget', context);
      console.log($widget);
    }
  };

})(jQuery, Drupal, this, this.document);
