/**
 * Global variables.
 */
var desktop_breakpoint = 1200;
var large_tablet_breakpoint = 1024;
var tablet_breakpoint = 768;
var mobile_breakpoint = 420;

var desktop_column = 1170;

/**
 * govCMS general bootstrapping.
 */
(function($, Drupal, window, document, undefined) {

  Drupal.behaviors.govcms_ui_kit = {
    attach: function(context, settings) {
      // Object Fit Polyfill for IE. Used on News Teaser Images.
      objectFitImages();

      // Webform validation.
      $('form.webform-client-form, form.contact-form', context).validate({
        errorElement: 'span',
        errorPlacement: function(error, element) {
          // Plave error msg within field label.
          error.appendTo(element.parents('.form-item.webform-component, form.contact-form .form-item').find('> label'));
        },
        showErrors: function(errorMap, errorList) {
          // Remove asterik and display custom markup for error.
          $(errorList).each(function() {
            $(this.element).parents('.form-item.webform-component, form.contact-form .form-item').find('> label .form-required').remove();
            this.message = '(Error - ' + this.message + ')';
          });
          this.defaultShowErrors();
        }
      });
    }
  };

})(jQuery, Drupal, this, this.document);
