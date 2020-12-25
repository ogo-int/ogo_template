// Промослайдер
$(function () {
  $(".b-subcategory-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-subcategory-slider__slider", $context);

    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      draggable: false,
      dots: true,
      fade: true,
      autoplay: true,
      autoplaySpeed: 5000
    });

    $context.on("resize.block", function () {
      $slider.slick("setPosition");
    });
  });
});
