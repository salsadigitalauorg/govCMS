/**
 * Mobile Menu.
 */
(function($, Drupal, window, document, undefined) {

  var $widget = null;
  var $button = null;
  var $logo_wrapper = null;
  var menu_toggle_enabled = false;

  function menu_bar_resize() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    if (w >= tablet_breakpoint && menu_toggle_enabled) {
      // Desktop.
      menu_toggle_enabled = false;
      $widget.removeClass('menu-toggle');
      $button.detach();
    }
    else if (w < tablet_breakpoint && !menu_toggle_enabled) {
      // Mobile.
      menu_toggle_enabled = true;
      $widget.addClass('menu-toggle');
      $logo_wrapper.append($button);
    }
  }

  function toggle_menu(e) {
    if (menu_toggle_enabled) {
      var was_open = $widget.hasClass('menu-open');
      $widget.toggleClass('menu-open');
      if (was_open) {
        $widget.attr('aria-hidden', 'true');
        $button.removeClass('menu-open').attr('aria-expanded', 'false');
      }
      else {
        $widget.attr('aria-hidden', 'false');
        $button.addClass('menu-open').attr('aria-expanded', 'true');
      }
    }
    e.stopPropagation();
    return false;
  }

  Drupal.behaviors.govcms_ui_kit_menu = {
    attach: function(context, settings) {
      $widget = $('#mobile-nav', context);
      if ($widget.length > 0) {
        $button = $('<button class="mobile_expand_menu" aria-controls="' + $widget.attr('id') + '" aria-expanded="false">Toggle menu navigation</button>');
        $logo_wrapper = $('.logo-wrapper');
        $button.unbind('click', toggle_menu).bind('click', toggle_menu);
        $(window).unbind('resize', menu_bar_resize).bind('resize', menu_bar_resize);
        menu_bar_resize();
      }
    }
  };

})(jQuery, Drupal, this, this.document);


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


/**
 * Header Search Field.
 */
(function($, Drupal, window, document, undefined) {

  var $widget = null;
  var $button = null;
  var $logo_wrapper = null;
  var search_toggle_enabled = false;

  function search_bar_resize() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    if (w >= tablet_breakpoint && search_toggle_enabled) {
      // Desktop.
      search_toggle_enabled = false;
      $widget.removeClass('search-toggle');
      $button.detach();
    }
    else if (w < tablet_breakpoint && !search_toggle_enabled) {
      // Mobile.
      search_toggle_enabled = true;
      $widget.addClass('search-toggle');
      $logo_wrapper.after($button);
    }
  }

  function toggle_search(e) {
    if (search_toggle_enabled) {
      var was_open = $widget.hasClass('search-open');
      $widget.toggleClass('search-open');
      if (was_open) {
        $widget.attr('aria-hidden', 'true');
        $button.removeClass('search-open').attr('aria-expanded', 'false');
      }
      else {
        $widget.attr('aria-hidden', 'false');
        $button.addClass('search-open').attr('aria-expanded', 'true');
      }
    }
    e.stopPropagation();
    return false;
  }

  Drupal.behaviors.govcms_ui_kit_search = {
    attach: function(context, settings) {
      $widget = $('header .search-form-widget', context);
      if ($widget.length > 0) {
        $button = $('<button class="mobile_expand_search" aria-controls="' + $widget.attr('id') + '" aria-expanded="false">Toggle search form</button>');
        $logo_wrapper = $('.logo-wrapper .header__logo');
        $button.unbind('click', toggle_search).bind('click', toggle_search);
        $(window).unbind('resize', search_bar_resize).bind('resize', search_bar_resize);
        search_bar_resize();
      }
    }
  };

})(jQuery, Drupal, this, this.document);


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
