// Промослайдер
$(function () {
  $(".b-promo-block3-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-promo-block3-slider__slider", $context);

    console.log($slider);

    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      draggable: false,
      dots: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 8000
    });

    $context.adaptBlock({
      maxWidth: {

      }
    });

    $context.on("resize.block", function () {
      $slider.slick("setPosition");
    });
  });
});