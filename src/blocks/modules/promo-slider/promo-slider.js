// Промослайдер
$(function () {
  $(".b-promo-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-promo-slider__slider", $context);

    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true,
      fade: true
    });

    $context.adaptBlock({
      maxWidth: {
        930: "_mx930",
        660: "_mx660",
        360: "_mx360"
      }
    });

    $context.on("resize.block", function () {
      $slider.slick("setPosition");
    });
  });
});
