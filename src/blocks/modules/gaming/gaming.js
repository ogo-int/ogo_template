// Gaming
$(function () {
  $('.b-gaming-slider').slick({
    useTransform: true,
    speed: 640,
    cssEase: 'cubic-bezier(0.65, 0.05, 0.36, 1)',
    prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"></button>'
  });
  $('.b-gaming-carousel').slick({
    arrows: true,
    dots: false,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: 0,
    swipeToSlide: true,
    useTransform: true,
    touchThreshold: 20,
    speed: 640,
    cssEase: 'cubic-bezier(0.65, 0.05, 0.36, 1)',
    prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"></button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          slidesToShow: 3,
          centerPadding: 0,
        }
      },
      {
        breakpoint: 640,
        settings: {
          arrows: true,
          dots: true,
          slidesToShow: 1,
          centerPadding: 0,
        }
      }
    ]
  });
  $('.b-gaming-slider__slide-price').text(
    function() {
      var price = $(this).text();
      return price.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
  );
})