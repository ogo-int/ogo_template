// Слайдер топовых продуктов
$(function () {
  $(".b-top-product-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-top-product-slider__slider", $context);
    var $prev = $(".b-top-product-slider__prev", $context);
    var $next = $(".b-top-product-slider__next", $context);

    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      prevArrow: $prev,
      nextArrow: $next,
      respondTo: "slider",
      infinite: false,
      responsive: [{
        breakpoint: 614,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
    });

    $context.on("resize.block", function () {
      $slider.slick("checkResponsive");
      $slider.slick("setPosition");
    });
  });
});