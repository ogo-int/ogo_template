// Слайдер продуктов
$(function () {
  $(".b-small-product-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-small-product-slider__slider", $context);
    var $prev = $(".b-small-product-slider__prev", $context);
    var $next = $(".b-small-product-slider__next", $context);

    $context.removeClass("_nojs");

    $slider.slick({
      slidesToShow: 4,
      slidesToScroll: 2,
      prevArrow: $prev,
      nextArrow: $next,
      respondTo: "slider",
      infinite: false,
      responsive: [{
        breakpoint: 1070,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 790,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      ]
    });

    $context.on("resize.block", function () {
      $slider.slick("checkResponsive");
      $slider.slick("setPosition");
    });

    $context.on("reinit.block", function () {
      $slider.slick("unslick");
      $("[role=\"option\"]", $context).remove();
      $slider.slick({
        slidesToShow: 4,
        slidesToScroll: 2,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        infinite: false,
        responsive: [{
          breakpoint: 1070,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 790,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 560,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        ]
      });
    });


    $context.adaptBlock({
      maxWidth: {
        950: "_mx950",
        700: "_mx700",
        400: "_mx400"
      }
    });
  });
});