// Слайдер категорий товара
$(function () {
  $(".b-category-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-category-slider__slider", $context);
    var $prev = $(".b-category-slider__prev", $context);
    var $next = $(".b-category-slider__next", $context);

    (function initSlider() {
      $slider.slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        infinite: true,
        draggable: false,
        responsive: [{
          breakpoint: 930,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 600,
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

    $context.adaptBlock({
      maxWidth: {
        720: "_mx720",
        400: "_mx400"
      }
    });
  });
});