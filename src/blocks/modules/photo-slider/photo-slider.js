// Слайдер фотографий товара
$(function () {
  $(".b-photo-slider").livequery(function () {
    var $context = $(this);
    var $slider = $(".b-photo-slider__slider", $context);
    var $slides = $(".b-photo-slider__slide", $context);
    var $prev = $(".b-photo-slider__prev", $context);
    var $next = $(".b-photo-slider__next", $context);
    var slideQtty = $slides.length;
    var parentWidth;


    function buildPager(qttyToShow) {
      var $pagerHolder = $("<div class=\"b-photo-slider__pager-holder\"></div>");
      var $pagerList = $("<ul class=\"b-photo-slider__pager\"></div>");
      var $pagerItem = $("<li class=\"b-photo-slider__pager-item\"></li>");
      var $pagerLink = $("<span class=\"b-photo-slider__pager-link\"></span>");

      $pagerHolder.append($pagerList);
      $pagerItem.append($pagerLink);

      for (var i = 0; i < slideQtty; i++) {
        $pagerList.append($pagerItem.clone());
      }

      $context.append($pagerHolder);
      changePager(0, 3);
    }

    function changePager(nextSlideIndex, qttyToShow) {
      var endIndex = nextSlideIndex + qttyToShow;
      var $links = $(".b-photo-slider__pager-link", $context);
      var $targetLinks;
      var $tmp = $([]);

      $targetLinks = $links.slice(nextSlideIndex, endIndex);

      if (endIndex > ($links.length)) {
        $tmp = $links.slice(0, endIndex - $links.length);
      }

      $links.removeClass("_active");
      $targetLinks.addClass("_active");
      $tmp.addClass("_active");
    }

    function pagerLinksHandler() {
      var $link = $(this);
      var $item = $link.closest("li");
      var index = $item.index();

      $slider.slick("slickGoTo", index);
      return false;
    }

    $slider.on("init", function (event, slick) {
      buildPager();
    });


    $slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      changePager(nextSlide, $slider.slick("slickGetOption", "slidesToShow"));
    });

    $slider.slick({
      prevArrow: $prev,
      nextArrow: $next,
      respondTo: "slider",
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
      ]
    });

    $context.on("click", ".b-photo-slider__pager-link", pagerLinksHandler);
  });
});