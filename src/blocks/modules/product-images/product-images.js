// Изображения в карточке товара
$(function () {
  $(".b-product-images").livequery(function () {
    var $context = $(this);
    var $thumbs = $(".b-product-images__thumb", $context);
    var $thumbLinks = $(".b-product-images__thumb-link", $context);
    var $slider = $(".b-product-images__slider", $context);
    var $prev = $(".b-product-images__prev", $context);
    var $next = $(".b-product-images__next", $context);
    var $thumb = $(".b-product-images__thumbs", $context);

    $context.removeClass("_nojs");

    function changeMainImage(customIndex) {
      var $link = $(this);
      var currentImageIndex = $thumbLinks.index($link);

      if ($link.hasClass("_active")) return false;

      $thumbLinks.removeClass("_active");

      $thumbLinks.eq(currentImageIndex).addClass("_active");

      $slider.slick("slickGoTo", currentImageIndex);

      return false;
    }

    //Слайдер
    function initSlider() {
      $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: $prev,
        nextArrow: $next,
        adaptiveHeight: true,
        speed: 400,
        fade: true,
        asNavFor: $thumb
      });

      $thumb.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: $slider,
        dots: false,
        centerMode: false,
        vertical: true,
        infinite: false,
        focusOnSelect: true
      });
    }

    initSlider();

    //$thumbLinks.on('click', changeMainImage);

    $context.on("resize.block", function () {
      $slider.slick("setPosition");
    });

    $context.adaptBlock({
      maxWidth: {
        540: "_mx540",
        420: "_mx420"
      }
    });
  });
});