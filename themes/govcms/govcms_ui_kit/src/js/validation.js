/**
 * Form validation.
 */
(function($, Drupal, window, document, undefined) {

  // Set error messages.
  jQuery.extend(jQuery.validator.messages, {
    // required: "This field is required.",
    // remote: "Please fix this field.",
    email: "Please enter a valid email address in the format of name@domain.com",
    // url: "Please enter a valid URL.",
    // date: "Please enter a valid date.",
    // dateISO: "Please enter a valid date (ISO).",
    // number: "Please enter a valid number.",
    // digits: "Please enter only digits.",
    // creditcard: "Please enter a valid credit card number.",
    // equalTo: "Please enter the same value again.",
    // accept: "Please enter a value with a valid extension.",
    // maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    // minlength: jQuery.validator.format("Please enter at least {0} characters."),
    // rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    // range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    // max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    // min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
  });

  function get_label(ielem) {
    var $parent = null;
    if (ielem.hasClass('form-radio')) {
      // Radio buttons in grids.
      $parent = ielem.closest('.webform-component-radios, .webform-component-grid');
    }
    else if (ielem.hasClass('form-select') && (ielem.hasClass('day') || ielem.hasClass('month') || ielem.hasClass('year'))) {
      // Date field.
      $parent = ielem.closest('.webform-component-date');
    }
    else {
      // All other fields.
      $parent = ielem.closest('.form-item');
    }
    return $parent.children('label');
  }

  Drupal.behaviors.govcms_ui_kit_form_validation = {
    attach: function(context, settings) {
      // Webform validation.
      $('form.webform-client-form, form.contact-form', context).validate({
        errorElement: 'span',
        errorPlacement: function(error, element) {
          // No multiple error messages - strip any existing ones.
          get_label(element).children('.error').remove();
          // Place error msg within field label.
          error.appendTo(get_label(element));
        },
        showErrors: function(errorMap, errorList) {
          // Remove asterisk and display custom markup for error.
          $(errorList).each(function() {
            get_label($(this.element)).children('.form-required').remove();
            this.message = '(Error - ' + this.message + ')';
          });
          this.defaultShowErrors();
        }
      });
    }
  };

})(jQuery, Drupal, this, this.document);
