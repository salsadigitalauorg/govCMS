/**
 * External Link detector.
 */
(function($, Drupal, window, document, undefined) {

  var current_domain = '';
  var domainRe = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;

  function domain(url) {
    var arr = domainRe.exec(url);
    return (arr !== null) ? arr[1] : current_domain;
  }

  function isExternalRegexClosure(url) {
    return current_domain !== domain(url);
  }

  Drupal.behaviors.govcms_ui_kit_external_links = {
    attach: function(context, settings) {
      // Get current domain.
      current_domain = domain(location.href);

      // Find all links and apply a rel if external.
      $('a', context).each(function() {
        var $this = $(this);
        if (isExternalRegexClosure($this.attr('href'))) {
          $this.attr('rel', 'external');
        }
      })
    }
  };

})(jQuery, Drupal, this, this.document);


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


/**
 * Mobile Menu.
 */
(function($, Drupal, window, document, undefined) {

  var $widget = null;
  var $button = null;
  var $nav_wrapper = null;
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
      $nav_wrapper.prepend($button);
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
        $button = $('<button class="mobile-expand-menu" aria-controls="' + $widget.attr('id') + '" aria-expanded="false">Toggle menu navigation</button>');
        $nav_wrapper = $('#nav');
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
        $button = $('<button class="mobile-expand-search" aria-controls="' + $widget.attr('id') + '" aria-expanded="false">Toggle search form</button>');
        $logo_wrapper = $('.logo-wrapper .header-title');
        $button.unbind('click', toggle_search).bind('click', toggle_search);
        $(window).unbind('resize', search_bar_resize).bind('resize', search_bar_resize);
        search_bar_resize();
      }
    }
  };

})(jQuery, Drupal, this, this.document);


/**
 * Side Bar Menu.
 */
(function($, Drupal, window, document, undefined) {

  var $widget = null;
  var is_menu_desktop = true;

  // =========================================================
  // DESKTOP TOGGLES
  // =========================================================
  function toggle_button_click(e) {
    var $button = $(e.currentTarget);
    var $menu = $button.parent().children('ul.menu');
    var was_closed = $button.hasClass('menu-closed');

    if (was_closed) {
      expand($menu, $button);
    }
    else {
      collapse($menu, $button);
    }
  }

  function collapse($menu, $button) {
    $menu.addClass('menu-closed').attr('aria-hidden', 'true');
    $button.addClass('menu-closed').attr('aria-expanded', 'false').attr('title', 'Expand menu');
  }

  function expand($menu, $button) {
    $menu.removeClass('menu-closed').attr('aria-hidden', 'false');
    $button.removeClass('menu-closed').attr('aria-expanded', 'true').attr('title', 'Collapse menu');
  }

  function add_toggle_buttons() {
    // Only add buttons to first level of menu items.
    $widget.find('.menu-block-wrapper > ul > li').each(function(idx) {
      var $list_item = $(this);
      var $sub_menu = $list_item.children('ul.menu');
      if ($sub_menu.length > 0) {
        var is_active_trail = $list_item.hasClass('active-trail');
        $sub_menu.attr('id', 'sidebar-submenu-' + idx);
        var $button = $('<button class="sidebar-toggle-menu" aria-controls="' + $sub_menu.attr('id') + '">Toggle sub menu</button>');
        if (is_active_trail) {
          expand($sub_menu, $button);
        }
        else {
          collapse($sub_menu, $button);
        }
        $list_item.children('a').after($button);
        $button.unbind('click', toggle_button_click).bind('click', toggle_button_click);
      }
    });
  }

  function remove_toggle_buttons() {
    // Clean up any elements and attributes created.
    $widget.find('.sidebar-toggle-menu').remove();
    $widget.find('[id^=sidebar-submenu]').removeAttr('id').removeAttr('aria-hidden').removeClass('menu-closed');
  }

  // =========================================================
  // MOBILE ACCORDION
  // =========================================================
  function enable_mobile_accordion() {
    var display_text = $widget.children('h2').html();
    var $content = $widget.children('.content');
    $content.attr('id', 'sidebar-menu-content');
    var $button = $('<button aria-controls="sidebar-menu-content" aria-expanded="false">' + display_text + '</button>');
    $widget.children('h2').html($button);
    $button.unbind('click', sidebar_accordion_button_click).bind('click', sidebar_accordion_button_click);
  }

  function disable_mobile_accordion() {
    var display_text = $widget.children('h2').children('button').html();
    $widget.children('h2').empty().html(display_text);
    $widget.children('.content').removeAttr('id').removeClass('showing');
  }

  function sidebar_accordion_button_click(e) {
    var $button = $(e.currentTarget);
    var was_showing = $button.hasClass('showing');

    if (was_showing) {
      $button.removeClass('showing').attr('aria-expanded', 'false');
      $widget.children('.content').removeClass('showing');
    }
    else {
      $button.addClass('showing').attr('aria-expanded', 'true');
      $widget.children('.content').addClass('showing');
    }
  }

  // =========================================================
  // RESPONSIVE
  // =========================================================
  function side_menu_responsive() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    // Mobile (No toggles).
    if (w < large_tablet_breakpoint && is_menu_desktop) {
      // Disable menu toggles.
      is_menu_desktop = false;
      remove_toggle_buttons();
      enable_mobile_accordion();
    }
    // Desktop (Toggles).
    else if (w >= large_tablet_breakpoint && !is_menu_desktop) {
      is_menu_desktop = true;
      add_toggle_buttons();
      disable_mobile_accordion();
    }
  }

  Drupal.behaviors.govcms_ui_kit_sidebar = {
    attach: function(context, settings) {
      $widget = $('#block-menu-block-govcms-menu-block-sidebar', context);
      if ($widget.length > 0) {
        add_toggle_buttons();
        $(window).unbind('resize', side_menu_responsive).bind('resize', side_menu_responsive);
        side_menu_responsive();
      }
    }
  };

})(jQuery, Drupal, this, this.document);


/**
 * Home page slider.
 * An implementation of the Owl Carousel with custom controls.
 */
(function($, Drupal, window, document, undefined) {

  var $html = null;
  var $slider_controls = null;
  var $owl_carousel = null;

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
    $slider_controls = $(html);
    $slider.after($slider_controls);

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
    // Positioning must also cater for html text_resize functionality.
    var base_scale = parseInt($html.css('font-size'));
    var scale_perc = base_scale / 16;
    var left = ($owl_carousel.width() * 0.5) - ((desktop_column * 0.5) * scale_perc);
    left = (left < 20) ? '20px' : (left / base_scale) + 'rem';
    $slider_controls.css('left', left);
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
      $slider = $('.view-slideshow > div > ul', context);
      if ($slider.length > 0) {
        // Slider only initialized if more than 1 item present.
        if ($slider.children().length > 1) {
          $html = $('html');
          $slider.owlCarousel(banner_settings).removeClass('mobile');
          owl = $slider.data('owlCarousel');
          owl.stop();
          $owl_carousel = $('.owl-carousel');
          create_custom_controls();
          $(window).unbind('resize', slider_responsive).bind('resize', slider_responsive);
          slider_responsive();
          objectFitImages($slider.find('img'));

          // Add support for text resize widget.
          $html.on('font-size-change', position_custom_controls);
        }
      }
    }
  };

})(jQuery, Drupal, this, this.document);


/**
 * Text Resize.
 */
(function($, Drupal, window, document, undefined) {

  function increase_font() {
    $('html').addClass('large-fonts').trigger('font-size-change');
    return false;
  }

  function decrease_font() {
    $('html').removeClass('large-fonts').trigger('font-size-change');
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
 * Apply a custom theme to the twitter frame.
 * Based on https://github.com/kevinburke/customize-twitter-1.1
 * with an additional load event to trigger a resize of the module.
 */
(function($, Drupal, window, document, undefined) {

  var embedCss = function(frame, doc, url) {
    var $link = $('<link href="' + url + '" rel="stylesheet" type="text/css" />');

    $link.on('load', function() {
      // Force twitter frame height update.
      var outer_height = frame.frameElement.clientHeight;
      var inner_height = frame.document.body.children[0].clientHeight;
      if (inner_height !== outer_height) {
        $(frame.frameElement).height(inner_height);
      }
    });

    $('head', doc).append($link);
  };

  Drupal.behaviors.govcms_ui_kit_twitter_theme = {
    attach: function(context, settings) {
      // Wait for twitter to load, then apply a custom style.
      var url = settings.basePath + settings.pathToTheme + "/dist/css/custom_twitter_theme.css";

      if (typeof twttr !== 'undefined') {
        twttr.ready(function() {
          twttr.events.bind('loaded', function(event) {
            // Inject a custom stylesheet into the twitter frame.
            for (var i = 0; i < frames.length; i++) {
              var frame = frames[i];
              try {
                if (frame.frameElement.id.indexOf('twitter-widget') >= 0) {
                  embedCss(frame, frame.document, url);
                }
              }
              catch (e) {
                console.log("caught an error");
                console.log(e);
              }
            }
          });
        });
      }
    }
  };

})(jQuery, Drupal, this, this.document);


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

  Drupal.behaviors.govcms_ui_kit_form_validation = {
    attach: function(context, settings) {
      // Webform validation.
      $('form.webform-client-form, form.contact-form', context).validate({
        errorElement: 'span',
        errorPlacement: function(error, element) {
          // Place error msg within field label.
          error.appendTo(element.closest('.form-item').children('label'));
        },
        showErrors: function(errorMap, errorList) {
          // Remove asterisk and display custom markup for error.
          $(errorList).each(function() {
            $(this.element).closest('.form-item').children('label').children('.form-required').remove();
            this.message = '(Error - ' + this.message + ')';
          });
          this.defaultShowErrors();
        }
      });
    }
  };

})(jQuery, Drupal, this, this.document);


/**
 * Webform.js
 */
(function($, Drupal, window, document, undefined) {

  var $grid_components = null;
  var is_overflowing = null;

  // Apply a class to grid element if table exceeds overflow width.
  function component_grid_resize() {
    for (var i = 0; i < $grid_components.length; i++) {
      var $grid = $($grid_components[i]);
      var $table = $grid.find('.webform-grid');
      var has_overflow = $grid.width() < $table.width();
      if (has_overflow && !is_overflowing) {
        is_overflowing = true;
        $grid.addClass('is-overflowing');
      }
      else if (!has_overflow && is_overflowing) {
        is_overflowing = false;
        $grid.removeClass('is-overflowing');
      }
    }
  }

  Drupal.behaviors.govcms_ui_kit_webform = {
    attach: function(context, settings) {
      // Flip the order of radio checkboxes with labels.
      // UI Kit styling only works if the label appears after.
      $('.webform-grid-option > .form-type-radio', context).each(function() {
        var $this = $(this);
        $this.append($this.children('label'));
      });

      // Grid overflow - check on resize.
      $grid_components = $('.webform-component-grid');
      $(window).unbind('resize', component_grid_resize);
      if ($grid_components.length > 0) {
        component_grid_resize();
        $(window).bind('resize', component_grid_resize);
      }
    }
  };

})(jQuery, Drupal, this, this.document);
