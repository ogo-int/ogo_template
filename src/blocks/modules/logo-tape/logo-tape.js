// Слайдер логотипов партнеров
$(function () {
  $(".b-logo-tape").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-logo-tape__items", $context);
    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      // autoplay: true,
      arrows: false,
      draggable: false,
      autoplaySpeed: 2500,
      speed: 500,
      respondTo: "slider",
      responsive: [{
        breakpoint: 960,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3
        }
      }
      ]
    });


    $context.on("resize.block", function () {
      $slider.slick("checkResponsive");
      $slider.slick("setPosition");
    });

    $context.adaptBlock({
      maxWidth: {
        960: "_mx960",
        600: "_mx600"
      }
    });
  });
});