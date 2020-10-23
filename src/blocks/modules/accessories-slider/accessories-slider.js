// Слайдер аксессуаров
$(function blockAccessoriesSlider() {
  $(".b-accessories-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-accessories-slider__slider", $context);
    var $prev = $(".b-accessories-slider__prev", $context);
    var $next = $(".b-accessories-slider__next", $context);
    var $items = $(".b-accessories-slider__item", $context);
    var $slickTrack;

    (function initSlider() {
      $slider.on("init", function () {
        $slickTrack = $(".slick-track", $context);
        $slickTrack.height("auto");
        $slickTrack.height($slickTrack.height());
      });

      $slider.slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        responsive: [{
          breakpoint: 1000,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 730,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        ]
      });

      $slider.on("setPosition", function () {
        $slider.height("auto");
        $slider.height($slider.height());
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