/**
 * Slider.
 */
(function($, Drupal, window, document, undefined) {

  var is_slick_running = true;
  var $slider = null;
  var banner_settings = {
    dots: true,
    infinite: true,
    speed: 900,
    fade: true,
    autoplay: false,
    cssEase: 'linear',
    arrows: false,
    swipe: false,
    customPaging: function(slider, i) {
      return $('<button type="button" data-role="none" title="Slide ' + (i + 1) + '" />').text('Slide ' + (i + 1));
    }
  };

  function slider_responsive() {
    var w = window.innerWidth || document.documentElement.clientWidth;
    // Mobile (No Slider).
    if (w < tablet_breakpoint && is_slick_running) {
      if ($slider.hasClass('slick-initialized')) {
        // Disable Slick (and a little extra housekeeping).
        is_slick_running = false;
        $slider.slick('unslick').addClass('mobile');
        $slider.children('li').removeAttr('tabindex').removeAttr('role').removeAttr('aria-describedby');
      }
    }
    // Desktop (Slider).
    else if (w >= tablet_breakpoint && !is_slick_running) {
      is_slick_running = true;
      $slider.slick(banner_settings).removeClass('mobile');
    }
  }

  Drupal.behaviors.govcms_ui_kit_slider = {
    attach: function(context, settings) {
      $slider = $('.view-slideshow > div > ul');
      if ($slider.length > 0) {
        $slider.bind('init', function() {
          setTimeout(slider_responsive, 1);
        });
        $slider.slick(banner_settings).removeClass('mobile');
        $(window).unbind('resize', slider_responsive).bind('resize', slider_responsive);
        slider_responsive();
        objectFitImages($slider.find('img'));
        console.log("hello");
        console.log($slider.find('img'));
      }
    }
  };

})(jQuery, Drupal, this, this.document);
