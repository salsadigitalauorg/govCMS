/**
 * Card features.
 */
(function($, Drupal, window, document, undefined) {

  Drupal.behaviors.govcms_ui_kit_listing_component = {
    attach: function(context, settings) {
      $('.listing-component.has-thumbnail', context).find('img').on('click', function() {
        var href = $(this).closest('.listing-component').find('a').attr('href');
        window.location.href = href;
      });
    }
  };

})(jQuery, Drupal, this, this.document);
