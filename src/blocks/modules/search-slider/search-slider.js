// Слайдер результатов поиска
$(function () {
  $(".b-search-slider").each(function () {
    var $context = $(this);
    var $slider = $(".b-search-slider__slider", $context);
    var $prev = $(".b-search-slider__prev", $context);
    var $next = $(".b-search-slider__next", $context);
    var $items = $(".b-search-slider__item", $context);

    (function initSlider() {
      $slider.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        responsive: [{
          breakpoint: 900,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 470,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
        ]
      });
    })();

    $context.on("resize.block", function () {
      $slider.slick("checkResponsive");
      $slider.slick("setPosition");
    });
  });
});