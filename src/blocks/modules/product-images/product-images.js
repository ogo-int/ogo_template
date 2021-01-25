// Изображения в карточке товара
$(function () {
  
  var $slider = $(".b-product-images__slider");
  var $thumbs = $(".b-product-images__thumbs");
  var gallery = $('.b-product-images__slide-link');

  //при клике на ссылку в слайде запускаем галерею
  $('.b-product-images__slide-link').on('click', function (e) {
    e.preventDefault();
    //узнаём индекс слайда без учёта клонов
    var totalSlides = +$(this).parents('.slider').slick("getSlick").slideCount,
      dataIndex = +$(this).parents('.slide').data('slick-index'),
      trueIndex;
    switch (true) {
      case (dataIndex < 0):
        trueIndex = totalSlides + dataIndex;
        break;
      case (dataIndex >= totalSlides):
        trueIndex = dataIndex % totalSlides;
        break;
      default:
        trueIndex = dataIndex;
    }
    //вызывается элемент галереи, соответствующий индексу слайда
    $.fancybox.open(gallery, {}, trueIndex);
    return false;
  });

  $slider.slick({
    asNavFor: $thumbs,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: false,
    speed: 400,
    fade: true,
    infinite: false,
    focusOnSelect: true,
    swipeToSlide: true,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"><svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M27.5 45L12.5 30L27.5 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"><svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg"><g><path d="M22.5 45L37.5 30L22.5 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg></button>',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: true
        }
      }
    ]
  });
  $thumbs.slick({
    asNavFor: $slider,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    centerMode: true,
    centerPadding: 0,
    vertical: true,
    verticalSwiping: true,
    infinite: false,
    focusOnSelect: true,
    swipeToSlide: true,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"></button>',
    responsive: [
      {
        breakpoint: 767,
        settings: 'unslick'
      }
    ]
  });
});