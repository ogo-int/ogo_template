// Плитка с новстью
$(function () {
  $(".b-news-plate").livequery(function () {
    var $context = $(this);
    var $productSlider = $(".b-news-plate__product-items", $context);
    var $prev = $(".b-news-plate__prev", $context);
    var $next = $(".b-news-plate__next", $context);

    (function initSlider() {
      $productSlider.slick({
        slidesToShow: 2,
        rows: 2,
        prevArrow: $prev,
        nextArrow: $next,
        respondTo: "slider",
        responsive: [{
          breakpoint: 550,
          settings: {
            rows: 1,
            slidesToShow: 1
          }
        }]
      });
    })();

    $context.adaptBlock({
      maxWidth: {
        540: "_mx540"
      }
    });

    $context.on("resize.block", function () {
      $productSlider.slick("slickGoTo", 0);
      $productSlider.slick("checkResponsive");
      $productSlider.slick("setPosition");
    });

    $(window).on("resize", function () {
      $productSlider.slick("slickGoTo", 0);
    });
  });
});