/**
 * Webform.js
 */
(function($, Drupal, window, document, undefined) {

  Drupal.behaviors.govcms_ui_kit_webform = {
    attach: function(context, settings) {
      // Flip the order of radio checkboxes with labels.
      // UI Kit styling only works if the label appears after.
      $('.webform-grid-option > .form-type-radio').each(function() {
        var $this = $(this);
        $this.append($this.children('label'));
      });
    }
  };

})(jQuery, Drupal, this, this.document);
