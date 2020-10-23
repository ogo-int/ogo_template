// Слайдер продуктов
$(function () {
  $(".b-product-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-product-slider__slider", $context);
    var $prev = $(".b-product-slider__prev", $context);
    var $next = $(".b-product-slider__next", $context);

    $context.removeClass("_nojs");

    (function initSlider() {
      $slider.on("reInit", function () {
        $(".iblock", $slider).trigger("resize.block");
      });

      $slider.slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        infinite: false,
        responsive: [{
          breakpoint: 950,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
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
          breakpoint: 555,
          settings: {
            slidesToShow: 1,
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
        950: "_mx950"
      }
    });
  });
});