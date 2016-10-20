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

var desktop_column = 1170;

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
        $logo_wrapper = $('.logo-wrapper .header-title');
        $button.unbind('click', toggle_search).bind('click', toggle_search);
        $(window).unbind('resize', search_bar_resize).bind('resize', search_bar_resize);
        search_bar_resize();
      }
    }
  };

})(jQuery, Drupal, this, this.document);


/**
 * Home page slider.
 * An implementation of the Owl Carousel with custom controls.
 */
(function($, Drupal, window, document, undefined) {

  function slider_responsive() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    // Mobile (No Slider).
    if (w < tablet_breakpoint && is_slider_running) {
      // Disable Slick (and a little extra housekeeping).
      is_slider_running = false;
      owl.destroy();
      destroy_custom_controls();
      $slider.removeAttr('style').removeAttr('class');
    }
    // Desktop (Slider).
    else if (w >= tablet_breakpoint && !is_slider_running) {
      is_slider_running = true;
      $slider.owlCarousel(banner_settings).removeClass('mobile');
      owl = $slider.data('owlCarousel');
      owl.stop();
      create_custom_controls();
    }
  }

  // =========================================================
  // CUSTOM CONTROLS
  // =========================================================
  function create_custom_controls() {
    var slides_len = $slider.find('li.views-row').length;

    // Generate page elements.
    var html = '<div class="slider-controls">';
    html += '<button class="slider-prev" title="Previous slide">Previous Slide</button>';
    html += '<ul class="slider-pagination">';
    for (var i = 0; i < slides_len; i++) {
      var num = (i + 1);
      html += '<li><button class="slider-dot" data-slide="' + i + '" aria-label="Slide ' + num + '" title="View slide ' + num + '">' + num + '</button></li>';
    }
    html += '</ul>';
    html += '<button class="slider-next" title="Next slide">Next Slide</button>';
    html += '<button class="slider-play paused" title="Play slideshow">Play</button>';
    html += '</div>';
    $slider.after(html);

    // Apply listeners.
    $('.slider-prev').bind('click', previous_button_click);
    $('.slider-next').bind('click', next_button_click);
    $('.slider-dot').bind('click', dot_button_click);
    $('.slider-play').bind('click', play_button_click);
    update_dots_custom_controls();
    position_custom_controls();
  }

  function destroy_custom_controls() {
    $('.slider-controls').remove();
  }

  function update_dots_custom_controls() {
    if (owl !== null) {
      var dot_item = owl.currentItem;
      var $pagination = $('.slider-pagination');
      $pagination.find('.slider-dot').removeClass('active');
      $pagination.find('.slider-dot[data-slide="' + dot_item + '"]').addClass('active');
    }
  }

  function position_custom_controls() {
    var left = ($(window).width() * 0.5) - (desktop_column * 0.5);
    left = (left < 20) ? 20 : left;
    $('.slider-controls').css('left', left);
  }

  function previous_button_click(e) {
    owl.prev();
  }

  function next_button_click(e) {
    owl.next();
  }

  function dot_button_click(e) {
    var target_slide = $(e.currentTarget).data('slide');
    if (target_slide !== owl.currentItem) {
      owl.goTo($(e.currentTarget).data('slide'));
    }
  }

  function play_button_click(e) {
    var $this = $(e.currentTarget);
    if ($this.hasClass('paused')) {
      owl.play();
      $this.removeClass('paused').html('Pause').attr('title', 'Pause slideshow');
    }
    else {
      owl.stop();
      $this.addClass('paused').html('Play').attr('title', 'Play slideshow');
    }
  }

  // =========================================================
  // SLIDER INITIALIZATION
  // =========================================================
  var owl = null;
  var is_slider_running = true;
  var $slider = null;
  var banner_settings = {
    items: 1,
    mouseDrag: false,
    touchDrag: false,
    pagination: false,
    paginationNumbers: false,
    autoPlay: 5000,
    singleItem: true,
    navigation: false,
    slideSpeed: 900,
    navSpeed: 900,
    transitionStyle: "fade",
    afterAction: update_dots_custom_controls,
    afterUpdate: position_custom_controls
  };

  Drupal.behaviors.govcms_ui_kit_slider = {
    attach: function(context, settings) {
      $slider = $('.view-slideshow > div > ul');
      if ($slider.length > 0) {
        $slider.owlCarousel(banner_settings).removeClass('mobile');
        owl = $slider.data('owlCarousel');
        owl.stop();
        create_custom_controls();
        $(window).unbind('resize', slider_responsive).bind('resize', slider_responsive);
        slider_responsive();
        objectFitImages($slider.find('img'));
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
