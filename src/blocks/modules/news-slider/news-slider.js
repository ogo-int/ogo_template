// Слайдер новостей
$(function () {
  $(".b-news-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-news-slider__slider", $context);
    var $prev = $(".b-news-slider__prev", $context);
    var $next = $(".b-news-slider__next", $context);

    $context.removeClass("_nojs");

    (function initSlider() {
      $slider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        infinite: false,
        draggable: false,
        responsive: [{
          breakpoint: 930,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1
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
        950: "_mx950"
      }
    });
  });
});