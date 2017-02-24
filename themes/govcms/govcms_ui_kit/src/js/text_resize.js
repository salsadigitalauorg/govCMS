/**
 * Text Resize.
 */
(function($, Drupal, window, document, undefined) {

  function increase_font() {
    $('html').addClass('large-fonts');
    return false;
  }

  function decrease_font() {
    $('html').removeClass('large-fonts');
    return false;
  }

  Drupal.behaviors.govcms_ui_kit_text_resize = {
    attach: function(context, settings) {
      $widget = $('.block-govcms-text-resize', context);
      if ($widget.length > 0) {
        $widget.find('.font-large').unbind('click', increase_font).bind('click', increase_font);
        $widget.find('.font-small, a.reset').unbind('click', decrease_font).bind('click', decrease_font);
      }
    }
  };

})(jQuery, Drupal, this, this.document);
